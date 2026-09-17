import { scoreLabels, translations } from "./i18n.js";

const state = {
  currentLanguage: getInitialLanguage(),
  results: [],
  selectedId: null,
  filter: "all",
  sortKey: "totalScore",
  sortDirection: "desc",
  prompts: {},
  benchmarkStatus: "loading",
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
  modelPanels: document.querySelectorAll("[data-model-panel]"),
};

function t(key) {
  return translations[state.currentLanguage][key] ?? translations.en[key] ?? key;
}

function resultText(result) {
  return result.translations?.[state.currentLanguage] ?? result;
}

function formatNumber(value) {
  return new Intl.NumberFormat(state.currentLanguage).format(value);
}

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem("llm-benchmark-language");
    if (savedLanguage === "ru" || savedLanguage === "en") {
      return savedLanguage;
    }
  } catch {
    // Language switching also works when browser storage is unavailable.
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

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });

  elements.languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === state.currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderPrompt();
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
      detail: fastestResult() ? resultText(fastestResult()).totalTime : "-",
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

  if (state.benchmarkStatus !== "ready") {
    const row = document.createElement("tr");
    const cell = createElement("td", null, t(state.benchmarkStatus === "error" ? "benchmarkError" : "benchmarkLoading"));
    cell.colSpan = 8;
    row.append(cell);
    elements.resultsTable.append(row);
    return;
  }

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

    const time = createElement("td", null, resultText(result).totalTime);

    const build = createElement("td");
    build.append(createBadge(formatBuild(result.buildStatus), result.buildStatus));

    const score = createElement("td", "score-cell", `${result.totalScore}/100`);

    const verdict = createElement("td");
    verdict.append(createBadge(formatVerdict(result.verdict), result.verdict));

    const issues = createElement("td", null, String(result.criticalIssues.length));
    const note = createElement("td", null, resultText(result).notes);

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
    const score = createElement("strong", null, `${formatNumber(value)}/5`);
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
  elements.modelPanels.forEach((panel) => { panel.hidden = false; });

  elements.activeModelType.textContent = formatType(result.modelType);
  elements.activeTitle.textContent = `${result.label} - ${result.modelName}`;
  elements.activeScore.textContent = `${result.totalScore}/100`;
  elements.activeVerdict.textContent = formatVerdict(result.verdict);
  elements.activeBuild.textContent = formatBuild(result.buildStatus);
  elements.activeNote.textContent = resultText(result).notes;
  if (elements.resultFrame.getAttribute("src") !== result.appUrl) {
    elements.resultFrame.src = result.appUrl;
  }
  elements.openResult.href = result.appUrl;

  renderScoreBars(result);
  const localized = resultText(result);
  renderList(elements.strengthsList, localized.strengths);
  renderList(elements.criticalList, localized.criticalIssues);
  renderList(elements.evidenceList, localized.evidence);
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
      try {
        localStorage.setItem("llm-benchmark-language", state.currentLanguage);
      } catch {
        // Keep the selected language for this page even if it cannot be saved.
      }
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
  state.benchmarkStatus = "ready";
}

function renderPrompt() {
  const prompt = state.prompts[state.currentLanguage];
  elements.promptText.lang = state.currentLanguage;
  elements.promptText.textContent = prompt === undefined
    ? t("loadingPrompt")
    : prompt === null ? t("promptError") : prompt;
}

async function loadPrompt(language) {
  try {
    const response = await fetch(language === "en" ? "./prompt.md" : "./prompt.ru.md");
    if (!response.ok) {
      throw new Error(`Prompt request failed: ${response.status}`);
    }
    const prompt = await response.text();
    state.prompts[language] = prompt.trim();
  } catch {
    state.prompts[language] = null;
  }
  renderPrompt();
}

async function init() {
  applyStaticTranslations();
  setupEvents();
  renderTable();
  loadPrompt("en");
  loadPrompt("ru");

  try {
    await loadBenchmarkData();
    renderSummary();
    setFilter("all");
    setActiveResult(initialModelId(), true);
  } catch {
    state.benchmarkStatus = "error";
    renderTable();
  }
}

init();
