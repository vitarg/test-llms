const results = {
  qwen27b: {
    label: "Qwen 27B",
    model: "Qwen3.6-27B-UD-Q8_K_XL",
    title: "Expense tracker by Qwen 27B",
    url: "./apps/qwen27b/",
    note:
      "Straightforward Vite implementation with category filtering, persisted expenses, and a visual header asset.",
    time: "18 minutes",
    process: "Installed dependencies and produced the project through a longer full setup flow.",
  },
  claude: {
    label: "Claude",
    model: "claude 4.8 opus High",
    title: "Expense tracker by Claude",
    url: "./apps/claude/",
    note:
      "Compact implementation with strongly separated hooks, utilities, types, and presentational components.",
    time: "2 minutes",
    process: "Wrote the code and handed it into the project without installing dependencies.",
  },
  gpt: {
    label: "GPT",
    model: "gpt 5.5 high",
    title: "Expense tracker by GPT",
    url: "./apps/gpt/",
    note:
      "Polished dashboard-style implementation with local state ownership and reusable expense helpers.",
    time: "5 minutes total",
    process:
      "Wrote the code in about 3 minutes, then installed dependencies, opened the result in a browser, reviewed the UI, fixed issues, reinstalled dependencies, and ran builds.",
  },
};

const buttons = document.querySelectorAll("[data-model]");
const activeModel = document.querySelector("#active-model");
const activeModelName = document.querySelector("#active-model-name");
const activeTitle = document.querySelector("#active-title");
const activeNote = document.querySelector("#active-note");
const activeTime = document.querySelector("#active-time");
const activeProcess = document.querySelector("#active-process");
const resultFrame = document.querySelector("#result-frame");
const openResult = document.querySelector("#open-result");
const promptText = document.querySelector("#prompt-text");

function setActiveResult(modelKey) {
  const result = results[modelKey] ?? results.qwen27b;

  buttons.forEach((button) => {
    const isActive = button.dataset.model === modelKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activeModel.textContent = result.label;
  activeModelName.textContent = result.model;
  activeTitle.textContent = result.title;
  activeNote.textContent = result.note;
  activeTime.textContent = result.time;
  activeProcess.textContent = result.process;
  resultFrame.src = result.url;
  openResult.href = result.url;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveResult(button.dataset.model);
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
    promptText.textContent = prompt.trim();
  })
  .catch(() => {
    promptText.textContent =
      "Prompt could not be loaded. Open prompt.md from the published site root.";
  });

setActiveResult("qwen27b");
