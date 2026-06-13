const scoreLabels = {
  promptAdherence: { en: "Prompt", ru: "Промпт" },
  domainLogic: { en: "Domain logic", ru: "Логика" },
  codeQuality: { en: "Code quality", ru: "Код" },
  ux: { en: "UX", ru: "UX" },
  ui: { en: "UI", ru: "UI" },
  mobile: { en: "Mobile", ru: "Мобайл" },
  accessibility: { en: "A11y", ru: "A11y" },
  robustness: { en: "Robustness", ru: "Надежность" },
};

const translations = {
  en: {
    documentTitle: "LLM Expense Tracker Benchmark",
    workspaceLabel: "LLM benchmark workspace",
    languageSwitcherLabel: "Choose language",
    eyebrow: "Fixed prompt benchmark",
    headline: "Local vs frontier model results",
    intro:
      "One React + TypeScript expense tracker prompt, five frozen model outputs, scored by external product and engineering review.",
    methodologyEyebrow: "Methodology",
    methodologyTitle: "How to read this benchmark",
    methodologyOne: "All models received the same fixed prompt.",
    methodologyTwo: "Generated apps are frozen artifacts and are not edited here.",
    methodologyThree:
      "Scores are external expert evaluation; build pass only means the app compiled.",
    methodologyFour:
      "Raw model outputs are marked unavailable unless explicitly captured.",
    summaryLabel: "Benchmark summary",
    bestOverall: "Best overall",
    bestLocal: "Best local",
    bestFrontier: "Best frontier",
    fastest: "Fastest",
    criticalCount: "Critical issues",
    noCritical: "No critical issues",
    evidenceRecorded: "Evidence recorded",
    comparisonEyebrow: "Scorecard",
    comparisonTitle: "Model comparison",
    filterLabel: "Filter benchmark results",
    filterAll: "All",
    filterLocal: "Local",
    filterFrontier: "Frontier",
    filterCritical: "Critical issues",
    columnModel: "Model",
    columnType: "Type",
    columnTime: "Time",
    columnBuild: "Build",
    columnScore: "Score",
    columnVerdict: "Verdict",
    columnIssues: "Issues",
    columnNote: "Note",
    openResult: "Open app",
    scoreLabel: "Score",
    verdictLabel: "Verdict",
    buildLabel: "Build",
    scoreBreakdownLabel: "Score breakdown",
    strengthsTitle: "Strengths",
    criticalTitle: "Critical issues",
    evidenceTitle: "Evidence",
    completenessTitle: "Artifact completeness",
    previewEyebrow: "Frozen output",
    previewTitle: "Selected app preview",
    promptEyebrow: "Shared input",
    promptTitle: "Prompt",
    rawPrompt: "Raw",
    loadingPrompt: "Loading prompt...",
    promptError:
      "Prompt could not be loaded. Open prompt.md from the published site root.",
    benchmarkError: "Benchmark data could not be loaded.",
    none: "None observed",
    local: "Local",
    frontier: "Frontier",
    pass: "Pass",
    fail: "Fail",
    yes: "Yes",
    no: "No",
    rawOutputAvailable: "Raw output available",
    manualEditsKnown: "Manual edits known",
    readmeProvided: "README provided",
    ready: "Ready",
    usable_with_fixes: "Usable with fixes",
    partial: "Partial",
    failed: "Failed",
    critical_bug: "Critical bug",
  },
  ru: {
    documentTitle: "Benchmark LLM Expense Tracker",
    workspaceLabel: "Рабочая область benchmark LLM",
    languageSwitcherLabel: "Выбор языка",
    eyebrow: "Benchmark фиксированного промпта",
    headline: "Локальные модели против frontier-моделей",
    intro:
      "Один промпт React + TypeScript expense tracker, пять замороженных результатов моделей и внешняя продуктово-инженерная оценка.",
    methodologyEyebrow: "Методология",
    methodologyTitle: "Как читать этот benchmark",
    methodologyOne: "Все модели получили один и тот же фиксированный промпт.",
    methodologyTwo: "Generated apps являются замороженными артефактами и здесь не редактируются.",
    methodologyThree:
      "Оценки являются внешней экспертной оценкой; успешная сборка означает только, что приложение скомпилировалось.",
    methodologyFour:
      "Raw model outputs считаются недоступными, если они явно не зафиксированы.",
    summaryLabel: "Сводка benchmark",
    bestOverall: "Лучший общий",
    bestLocal: "Лучший local",
    bestFrontier: "Лучший frontier",
    fastest: "Самый быстрый",
    criticalCount: "Критичные проблемы",
    noCritical: "Критичных проблем нет",
    evidenceRecorded: "Evidence зафиксирован",
    comparisonEyebrow: "Scorecard",
    comparisonTitle: "Сравнение моделей",
    filterLabel: "Фильтр результатов benchmark",
    filterAll: "Все",
    filterLocal: "Local",
    filterFrontier: "Frontier",
    filterCritical: "Критичные",
    columnModel: "Модель",
    columnType: "Тип",
    columnTime: "Время",
    columnBuild: "Сборка",
    columnScore: "Score",
    columnVerdict: "Verdict",
    columnIssues: "Проблемы",
    columnNote: "Заметка",
    openResult: "Открыть app",
    scoreLabel: "Score",
    verdictLabel: "Verdict",
    buildLabel: "Сборка",
    scoreBreakdownLabel: "Разбивка score",
    strengthsTitle: "Сильные стороны",
    criticalTitle: "Критичные проблемы",
    evidenceTitle: "Evidence",
    completenessTitle: "Полнота артефакта",
    previewEyebrow: "Замороженный результат",
    previewTitle: "Preview выбранного app",
    promptEyebrow: "Общий ввод",
    promptTitle: "Промпт",
    rawPrompt: "Исходник",
    loadingPrompt: "Загружаем промпт...",
    promptError:
      "Промпт не удалось загрузить. Откройте prompt.md из корня опубликованного сайта.",
    benchmarkError: "Данные benchmark не удалось загрузить.",
    none: "Не обнаружено",
    local: "Local",
    frontier: "Frontier",
    pass: "Pass",
    fail: "Fail",
    yes: "Да",
    no: "Нет",
    rawOutputAvailable: "Raw output доступен",
    manualEditsKnown: "Ручные правки известны",
    readmeProvided: "README предоставлен",
    ready: "Ready",
    usable_with_fixes: "Usable with fixes",
    partial: "Partial",
    failed: "Failed",
    critical_bug: "Critical bug",
  },
};

const state = {
  currentLanguage: getInitialLanguage(),
  results: [],
  selectedId: null,
  filter: "all",
  sortKey: "totalScore",
  sortDirection: "desc",
  promptLoaded: false,
};

const elements = {
  languageButtons: document.querySelectorAll("[data-lang]"),
  filterButtons: document.querySelectorAll("[data-filter]"),
  sortableHeaders: document.querySelectorAll("[data-sort]"),
  summaryCards: document.querySelector("#summary-cards"),
  resultsTable: document.querySelector("#results-table"),
  activeModelType: document.querySelector("#active-model-type"),
  activeTitle: document.querySelector("#active-title"),
  activeScore: document.querySelector("#active-score"),
  activeVerdict: document.querySelector("#active-verdict"),
  activeBuild: document.querySelector("#active-build"),
  activeNote: document.querySelector("#active-note"),
  scoreBars: document.querySelector("#score-bars"),
  strengthsList: document.querySelector("#strengths-list"),
  criticalList: document.querySelector("#critical-list"),
  evidenceList: document.querySelector("#evidence-list"),
  completenessList: document.querySelector("#completeness-list"),
  resultFrame: document.querySelector("#result-frame"),
  openResult: document.querySelector("#open-result"),
  promptText: document.querySelector("#prompt-text"),
};

function t(key) {
  return translations[state.currentLanguage][key] ?? translations.en[key] ?? key;
}

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem("llm-benchmark-language");

  if (savedLanguage === "ru" || savedLanguage === "en") {
    return savedLanguage;
  }

  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

function applyStaticTranslations() {
  document.documentElement.lang = state.currentLanguage;
  document.title = t("documentTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });

  elements.languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === state.currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!state.promptLoaded) {
    elements.promptText.textContent = t("loadingPrompt");
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function formatVerdict(verdict) {
  return t(verdict);
}

function formatBuild(status) {
  return t(status);
}

function formatType(type) {
  return t(type);
}

function selectedResult() {
  return state.results.find((result) => result.id === state.selectedId) ?? bestOverall();
}

function bestOverall() {
  return [...state.results].sort((a, b) => b.totalScore - a.totalScore)[0];
}

function bestByType(type) {
  return [...state.results]
    .filter((result) => result.modelType === type)
    .sort((a, b) => b.totalScore - a.totalScore)[0];
}

function fastestResult() {
  return [...state.results].sort((a, b) => a.timeSeconds - b.timeSeconds)[0];
}

function renderSummary() {
  elements.summaryCards.textContent = "";

  const criticalCount = state.results.reduce(
    (count, result) => count + result.criticalIssues.length,
    0,
  );

  const cards = [
    {
      label: t("bestOverall"),
      value: bestOverall()?.label ?? "-",
      detail: `${bestOverall()?.totalScore ?? 0}/100`,
    },
    {
      label: t("bestLocal"),
      value: bestByType("local")?.label ?? "-",
      detail: `${bestByType("local")?.totalScore ?? 0}/100`,
    },
    {
      label: t("bestFrontier"),
      value: bestByType("frontier")?.label ?? "-",
      detail: `${bestByType("frontier")?.totalScore ?? 0}/100`,
    },
    {
      label: t("fastest"),
      value: fastestResult()?.label ?? "-",
      detail: fastestResult()?.totalTime ?? "-",
    },
    {
      label: t("criticalCount"),
      value: String(criticalCount),
      detail: criticalCount === 0 ? t("noCritical") : t("evidenceRecorded"),
    },
  ];

  cards.forEach((card) => {
    const article = createElement("article", "summary-card");
    article.append(createElement("span", null, card.label));
    article.append(createElement("strong", null, card.value));
    article.append(createElement("small", null, card.detail));
    elements.summaryCards.append(article);
  });
}

function filteredResults() {
  const filtered = state.results.filter((result) => {
    if (state.filter === "critical") {
      return result.criticalIssues.length > 0;
    }
    if (state.filter === "all") {
      return true;
    }
    return result.modelType === state.filter;
  });

  return filtered.sort((a, b) => compareResults(a, b));
}

function compareResults(a, b) {
  const key = state.sortKey;
  const direction = state.sortDirection === "asc" ? 1 : -1;

  let left;
  let right;

  if (key === "criticalCount") {
    left = a.criticalIssues.length;
    right = b.criticalIssues.length;
  } else {
    left = a[key];
    right = b[key];
  }

  if (typeof left === "number" && typeof right === "number") {
    return (left - right) * direction;
  }

  return String(left).localeCompare(String(right)) * direction;
}

function renderTable() {
  elements.resultsTable.textContent = "";

  filteredResults().forEach((result) => {
    const row = document.createElement("tr");
    row.className = result.id === state.selectedId ? "is-selected" : "";
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute("aria-pressed", String(result.id === state.selectedId));
    row.dataset.model = result.id;

    const model = createElement("td");
    model.innerHTML = `<strong>${escapeHtml(result.label)}</strong><small>${escapeHtml(result.modelName)}</small>`;

    const type = createElement("td");
    type.append(createBadge(formatType(result.modelType), result.modelType));

    const time = createElement("td", null, result.totalTime);

    const build = createElement("td");
    build.append(createBadge(formatBuild(result.buildStatus), result.buildStatus));

    const score = createElement("td", "score-cell", `${result.totalScore}/100`);

    const verdict = createElement("td");
    verdict.append(createBadge(formatVerdict(result.verdict), result.verdict));

    const issues = createElement("td", null, String(result.criticalIssues.length));
    const note = createElement("td", null, result.notes);

    row.append(model, type, time, build, score, verdict, issues, note);

    row.addEventListener("click", () => setActiveResult(result.id, true));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveResult(result.id, true);
      }
    });

    elements.resultsTable.append(row);
  });
}

function createBadge(text, tone) {
  const badge = createElement("span", `badge badge--${tone}`, text);
  return badge;
}

function renderList(container, items) {
  container.textContent = "";

  const listItems = items.length > 0 ? items : [t("none")];
  listItems.forEach((item) => {
    container.append(createElement("li", null, item));
  });
}

function renderScoreBars(result) {
  elements.scoreBars.textContent = "";

  Object.entries(result.scores).forEach(([key, value]) => {
    const row = createElement("div", "score-row");
    const label = createElement("span", null, scoreLabels[key][state.currentLanguage]);
    const meter = createElement("div", "score-meter");
    const fill = createElement("span");
    fill.style.width = `${(value / 5) * 100}%`;
    meter.append(fill);
    const score = createElement("strong", null, `${value}/5`);
    row.append(label, meter, score);
    elements.scoreBars.append(row);
  });
}

function renderCompleteness(result) {
  elements.completenessList.textContent = "";

  Object.entries(result.artifactCompleteness).forEach(([key, value]) => {
    const wrapper = createElement("div");
    wrapper.append(createElement("dt", null, t(key)));
    wrapper.append(createElement("dd", null, value ? t("yes") : t("no")));
    elements.completenessList.append(wrapper);
  });
}

function setActiveResult(modelId, syncUrl = false) {
  const fallback = bestOverall();
  const result = state.results.find((item) => item.id === modelId) ?? fallback;
  if (!result) {
    return;
  }

  state.selectedId = result.id;

  elements.activeModelType.textContent = formatType(result.modelType);
  elements.activeTitle.textContent = `${result.label} - ${result.modelName}`;
  elements.activeScore.textContent = `${result.totalScore}/100`;
  elements.activeVerdict.textContent = formatVerdict(result.verdict);
  elements.activeBuild.textContent = formatBuild(result.buildStatus);
  elements.activeNote.textContent = result.notes;
  elements.resultFrame.src = result.appUrl;
  elements.openResult.href = result.appUrl;

  renderScoreBars(result);
  renderList(elements.strengthsList, result.strengths);
  renderList(elements.criticalList, result.criticalIssues);
  renderList(elements.evidenceList, result.evidence);
  renderCompleteness(result);
  renderTable();

  if (syncUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("model", result.id);
    window.history.replaceState({}, "", url);
  }
}

function setFilter(filter) {
  state.filter = filter;
  elements.filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderTable();
}

function setSort(sortKey) {
  if (state.sortKey === sortKey) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = sortKey;
    state.sortDirection = sortKey === "timeSeconds" ? "asc" : "desc";
  }
  renderTable();
}

function initialModelId() {
  const params = new URLSearchParams(window.location.search);
  const model = params.get("model");
  if (state.results.some((result) => result.id === model)) {
    return model;
  }
  return bestOverall()?.id;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setupEvents() {
  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentLanguage = button.dataset.lang;
      localStorage.setItem("llm-benchmark-language", state.currentLanguage);
      applyStaticTranslations();
      renderSummary();
      renderTable();
      setActiveResult(state.selectedId);
    });
  });

  elements.filterButtons.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });

  elements.sortableHeaders.forEach((header) => {
    header.tabIndex = 0;
    header.setAttribute("role", "button");
    header.addEventListener("click", () => setSort(header.dataset.sort));
    header.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSort(header.dataset.sort);
      }
    });
  });
}

async function loadBenchmarkData() {
  const response = await fetch("./data/benchmark-results.json");
  if (!response.ok) {
    throw new Error(`Benchmark data request failed: ${response.status}`);
  }
  state.results = await response.json();
  state.results.sort((a, b) => b.totalScore - a.totalScore);
}

async function loadPrompt() {
  try {
    const response = await fetch("./prompt.md");
    if (!response.ok) {
      throw new Error(`Prompt request failed: ${response.status}`);
    }
    const prompt = await response.text();
    state.promptLoaded = true;
    elements.promptText.textContent = prompt.trim();
  } catch {
    state.promptLoaded = true;
    elements.promptText.textContent = t("promptError");
  }
}

async function init() {
  applyStaticTranslations();
  setupEvents();
  loadPrompt();

  try {
    await loadBenchmarkData();
    renderSummary();
    setFilter("all");
    setActiveResult(initialModelId(), true);
  } catch {
    elements.resultsTable.innerHTML = `<tr><td colspan="8">${t("benchmarkError")}</td></tr>`;
  }
}

init();
