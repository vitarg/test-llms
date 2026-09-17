import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { translations, scoreLabels } from "../site/i18n.js";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const results = JSON.parse(await read("../site/data/benchmark-results.json"));
const html = await read("../site/index.html");
const source = await read("../site/app.js");
const languages = ["en", "ru"];
const requiredKeys = new Set([
  ...Object.keys(translations.en),
  ...[...html.matchAll(/data-i18n(?:-aria|-title)?="([^"]+)"/g)].map((match) => match[1]),
  ...[...source.matchAll(/\bt\("([^"]+)"\)/g)].map((match) => match[1]),
  ...results.flatMap((result) => [result.modelType, result.buildStatus, result.verdict, ...Object.keys(result.artifactCompleteness)]),
]);

function checkText(value, name, language) {
  assert.equal(typeof value, "string", `${name}: translation must be a string`);
  assert.ok(value.trim(), `${name}: translation must not be empty`);
  if (language === "ru") {
    assert.match(value, /[а-яё]/i, `${name}: Russian translation is missing`);
  }
}

for (const language of languages) {
  assert.deepEqual(Object.keys(translations[language]).sort(), [...requiredKeys].sort(), `${language}: translation keys differ`);
  for (const key of requiredKeys) {
    checkText(translations[language][key], `${language}.${key}`, language);
  }
  for (const key of new Set(results.flatMap((result) => Object.keys(result.scores)))) {
    checkText(scoreLabels[key]?.[language], `scoreLabels.${key}.${language}`, language);
  }
  for (const result of results) {
    const localized = language === "en" ? result : result.translations?.[language];
    assert.ok(localized, `${result.id}: ${language} translations missing`);
    for (const key of ["notes", "totalTime"]) {
      checkText(localized[key], `${result.id}.${language}.${key}`, language);
    }
    if (result.previewNote !== undefined) {
      checkText(localized.previewNote, `${result.id}.${language}.previewNote`, language);
    }
    for (const key of ["strengths", "criticalIssues", "evidence"]) {
      assert.ok(Array.isArray(localized[key]), `${result.id}.${language}.${key}: expected an array`);
      assert.equal(localized[key].length, result[key].length, `${result.id}.${language}.${key}: translated item count differs`);
      localized[key].forEach((value, index) => checkText(value, `${result.id}.${language}.${key}[${index}]`, language));
    }
  }
}

checkText(await read("../site/prompt.ru.md"), "prompt.ru.md", "ru");
assert.match(html, /data-i18n-title="previewFrameTitle"/, "Preview title must be localized");
assert.match(html, /data-i18n="previewLanguageNote"/, "Original app language must be explained");
assert.match(html, /data-i18n="promptLanguageNote"/, "Translated prompt must be labeled");
console.log(`Localization is complete: ${requiredKeys.size} UI keys, ${Object.keys(scoreLabels).length} criteria, ${results.length} model reviews (EN/RU).`);
