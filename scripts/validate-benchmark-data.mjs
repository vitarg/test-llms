import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = resolve(root, "site/data/benchmark-results.json");
const raw = await readFile(dataPath, "utf8");
const results = JSON.parse(raw);

const expectedIds = new Set(["qwen27b", "claude", "fable", "gemma4", "gpt"]);
const modelTypes = new Set(["local", "frontier"]);
const buildStatuses = new Set(["pass", "fail"]);
const verdicts = new Set([
  "ready",
  "usable_with_fixes",
  "partial",
  "failed",
  "critical_bug",
]);

const weights = {
  promptAdherence: 20,
  domainLogic: 20,
  codeQuality: 20,
  ux: 15,
  ui: 10,
  mobile: 5,
  accessibility: 5,
  robustness: 5,
};

function fail(message) {
  console.error(`Benchmark data validation failed: ${message}`);
  process.exitCode = 1;
}

function assertString(value, path) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${path} must be a non-empty string`);
  }
}

function assertStringArray(value, path) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(`${path} must be an array of strings`);
  }
}

function expectedVerdict(result) {
  if (result.criticalIssues.length > 0) {
    return "critical_bug";
  }

  if (result.totalScore >= 85) {
    return "ready";
  }

  if (result.totalScore >= 70) {
    return "usable_with_fixes";
  }

  if (result.totalScore >= 50) {
    return "partial";
  }

  return "failed";
}

if (!Array.isArray(results)) {
  fail("root must be an array");
} else if (results.length !== expectedIds.size) {
  fail(`expected ${expectedIds.size} model results, got ${results.length}`);
}

const seenIds = new Set();

for (const result of Array.isArray(results) ? results : []) {
  assertString(result.id, "id");
  seenIds.add(result.id);

  if (!expectedIds.has(result.id)) {
    fail(`${result.id} is not an expected model id`);
  }

  assertString(result.label, `${result.id}.label`);
  assertString(result.modelName, `${result.id}.modelName`);
  assertString(result.appUrl, `${result.id}.appUrl`);
  assertString(result.totalTime, `${result.id}.totalTime`);
  assertString(result.notes, `${result.id}.notes`);

  if (!modelTypes.has(result.modelType)) {
    fail(`${result.id}.modelType must be local or frontier`);
  }

  if (!buildStatuses.has(result.buildStatus)) {
    fail(`${result.id}.buildStatus must be pass or fail`);
  }

  if (!verdicts.has(result.verdict)) {
    fail(`${result.id}.verdict is invalid`);
  }

  if (!Number.isFinite(result.timeSeconds) || result.timeSeconds <= 0) {
    fail(`${result.id}.timeSeconds must be a positive number`);
  }

  if (!result.scores || typeof result.scores !== "object") {
    fail(`${result.id}.scores must be an object`);
    continue;
  }

  let weightedScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    const score = result.scores[key];
    if (!Number.isFinite(score) || score < 0 || score > 5) {
      fail(`${result.id}.scores.${key} must be a number from 0 to 5`);
      continue;
    }
    weightedScore += (score / 5) * weight;
  }

  const rounded = Math.round(weightedScore);
  if (result.totalScore !== rounded) {
    fail(`${result.id}.totalScore must be ${rounded}, got ${result.totalScore}`);
  }

  assertStringArray(result.strengths, `${result.id}.strengths`);
  assertStringArray(result.criticalIssues, `${result.id}.criticalIssues`);
  assertStringArray(result.evidence, `${result.id}.evidence`);

  if (result.verdict !== expectedVerdict(result)) {
    fail(`${result.id}.verdict must be ${expectedVerdict(result)} for the current score and critical issues`);
  }

  const completeness = result.artifactCompleteness;
  if (!completeness || typeof completeness !== "object") {
    fail(`${result.id}.artifactCompleteness must be an object`);
  } else {
    for (const key of ["rawOutputAvailable", "manualEditsKnown", "readmeProvided"]) {
      if (typeof completeness[key] !== "boolean") {
        fail(`${result.id}.artifactCompleteness.${key} must be boolean`);
      }
    }
  }
}

for (const id of expectedIds) {
  if (!seenIds.has(id)) {
    fail(`missing model result ${id}`);
  }
}

if (process.exitCode) {
  process.exit();
}

console.log("Benchmark data is valid.");
