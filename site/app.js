const results = {
  qwen27b: {
    label: "Qwen 27B",
    model: "Qwen3.6-27B-UD-Q8_K_XL",
    url: "./apps/qwen27b/",
    title: {
      en: "Expense tracker by Qwen 27B",
      ru: "Трекер расходов от Qwen 27B",
    },
    note: {
      en: "Straightforward Vite implementation with category filtering, persisted expenses, and a visual header asset.",
      ru: "Прямолинейная реализация на Vite с фильтрацией по категориям, сохранением расходов и визуальным hero-ассетом.",
    },
    time: {
      en: "18 minutes",
      ru: "18 минут",
    },
    process: {
      en: "Installed dependencies and produced the project through a longer full setup flow.",
      ru: "Устанавливал зависимости и создавал проект через более длинный setup-процесс.",
    },
  },
  claude: {
    label: "Claude",
    model: "claude 4.8 opus High",
    url: "./apps/claude/",
    title: {
      en: "Expense tracker by Claude",
      ru: "Трекер расходов от Claude",
    },
    note: {
      en: "Compact implementation with strongly separated hooks, utilities, types, and presentational components.",
      ru: "Компактная реализация с четким разделением hooks, utilities, types и презентационных компонентов.",
    },
    time: {
      en: "2 minutes",
      ru: "2 минуты",
    },
    process: {
      en: "Wrote the code and handed it into the project without installing dependencies.",
      ru: "Написал код и отдал его в проект без установки зависимостей.",
    },
  },
  fable: {
    label: "Claude Fable",
    model: "claude fable",
    url: "./apps/fable/",
    title: {
      en: "Expense tracker by Claude Fable",
      ru: "Трекер расходов от Claude Fable",
    },
    note: {
      en: "Minimal but complete implementation with localStorage persistence, category filtering, totals, and deletion.",
      ru: "Минималистичная, но цельная реализация с сохранением в localStorage, фильтрацией по категориям, итогами и удалением.",
    },
    time: {
      en: "about 2 minutes",
      ru: "около 2 минут",
    },
    process: {
      en: "Installed dependencies and successfully produced a production build.",
      ru: "Установил зависимости и успешно собрал production build.",
    },
  },
  gemma4: {
    label: "Gemma 4",
    model: "Gemma 4 26B A4B Instruct UD Q6_K",
    url: "./apps/gemma4/",
    title: {
      en: "Expense tracker by Gemma 4",
      ru: "Трекер расходов от Gemma 4",
    },
    note: {
      en: "Small, functional implementation with add/delete flows, category filters, totals, and localStorage persistence, but with very plain UI and more fragile storage handling.",
      ru: "Небольшая рабочая реализация с добавлением и удалением расходов, фильтрацией по категориям, итогами и localStorage, но с очень простой UI-подачей и более хрупкой обработкой storage.",
    },
    time: {
      en: "2 minutes 33 seconds",
      ru: "2 минуты 33 секунды",
    },
    process: {
      en: "Created the React + TypeScript source quickly, but did not include project/build files until the result was integrated into this viewer.",
      ru: "Быстро создал исходники React + TypeScript, но не добавил проектные и сборочные файлы до интеграции в эту витрину.",
    },
  },
  gpt: {
    label: "GPT",
    model: "gpt 5.5 high",
    url: "./apps/gpt/",
    title: {
      en: "Expense tracker by GPT",
      ru: "Трекер расходов от GPT",
    },
    note: {
      en: "Polished dashboard-style implementation with local state ownership and reusable expense helpers.",
      ru: "Более вылизанная dashboard-реализация с локальным управлением состоянием и переиспользуемыми helper-функциями для расходов.",
    },
    time: {
      en: "5 minutes total",
      ru: "5 минут всего",
    },
    process: {
      en: "Wrote the code in about 3 minutes, then installed dependencies, opened the result in a browser, reviewed the UI, fixed issues, reinstalled dependencies, and ran builds.",
      ru: "Написал код примерно за 3 минуты, затем установил зависимости, открыл результат в браузере, посмотрел UI, исправил проблемы, снова работал с зависимостями и запускал билды.",
    },
  },
};

const translations = {
  en: {
    documentTitle: "LLM Expense Tracker Results",
    workspaceLabel: "LLM results viewer",
    eyebrow: "React + TypeScript prompt test",
    headline: "Five LLM results",
    modelSwitcherLabel: "Choose model result",
    languageSwitcherLabel: "Choose language",
    openResult: "Open",
    modelLabel: "Model",
    timeLabel: "Total time",
    processLabel: "Process",
    promptEyebrow: "Shared input",
    promptTitle: "Prompt",
    rawPrompt: "Raw",
    loadingPrompt: "Loading prompt...",
    promptError:
      "Prompt could not be loaded. Open prompt.md from the published site root.",
  },
  ru: {
    documentTitle: "Результаты LLM Expense Tracker",
    workspaceLabel: "Просмотр результатов LLM",
    eyebrow: "Тест промпта React + TypeScript",
    headline: "Пять результатов LLM",
    modelSwitcherLabel: "Выбор результата модели",
    languageSwitcherLabel: "Выбор языка",
    openResult: "Открыть",
    modelLabel: "Модель",
    timeLabel: "Время",
    processLabel: "Процесс",
    promptEyebrow: "Общий ввод",
    promptTitle: "Промпт",
    rawPrompt: "Исходник",
    loadingPrompt: "Загружаем промпт...",
    promptError:
      "Промпт не удалось загрузить. Откройте prompt.md из корня опубликованного сайта.",
  },
};

const buttons = document.querySelectorAll("[data-model]");
const languageButtons = document.querySelectorAll("[data-lang]");
const activeModel = document.querySelector("#active-model");
const activeModelName = document.querySelector("#active-model-name");
const activeTitle = document.querySelector("#active-title");
const activeNote = document.querySelector("#active-note");
const activeTime = document.querySelector("#active-time");
const activeProcess = document.querySelector("#active-process");
const resultFrame = document.querySelector("#result-frame");
const openResult = document.querySelector("#open-result");
const promptText = document.querySelector("#prompt-text");
let currentModel = "qwen27b";
let currentLanguage = getInitialLanguage();
let promptLoaded = false;

function translate(value) {
  return typeof value === "string" ? value : value[currentLanguage];
}

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem("llm-results-language");

  if (savedLanguage === "ru" || savedLanguage === "en") {
    return savedLanguage;
  }

  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

function applyStaticTranslations() {
  const dictionary = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.title = dictionary.documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!promptLoaded) {
    promptText.textContent = dictionary.loadingPrompt;
  }
}

function setActiveResult(modelKey) {
  currentModel = modelKey;
  const result = results[modelKey] ?? results.qwen27b;

  buttons.forEach((button) => {
    const isActive = button.dataset.model === modelKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activeModel.textContent = result.label;
  activeModelName.textContent = result.model;
  activeTitle.textContent = translate(result.title);
  activeNote.textContent = translate(result.note);
  activeTime.textContent = translate(result.time);
  activeProcess.textContent = translate(result.process);
  resultFrame.src = result.url;
  openResult.href = result.url;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveResult(button.dataset.model);
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLanguage = button.dataset.lang;
    localStorage.setItem("llm-results-language", currentLanguage);
    applyStaticTranslations();
    setActiveResult(currentModel);
  });
});

fetch("./prompt.md")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Prompt request failed: ${response.status}`);
    }

    return response.text();
  })
  .then((prompt) => {
    promptLoaded = true;
    promptText.textContent = prompt.trim();
  })
  .catch(() => {
    promptLoaded = true;
    promptText.textContent = translations[currentLanguage].promptError;
  });

applyStaticTranslations();
setActiveResult("qwen27b");
