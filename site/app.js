const results = {
  claude: {
    label: "Claude",
    title: "Expense tracker by Claude",
    url: "./apps/claude/",
    note:
      "Compact implementation with strongly separated hooks, utilities, types, and presentational components.",
  },
  gpt: {
    label: "GPT",
    title: "Expense tracker by GPT",
    url: "./apps/gpt/",
    note:
      "Polished dashboard-style implementation with local state ownership and reusable expense helpers.",
  },
  qwen27b: {
    label: "Qwen 27B",
    title: "Expense tracker by Qwen 27B",
    url: "./apps/qwen27b/",
    note:
      "Straightforward Vite implementation with category filtering, persisted expenses, and a visual header asset.",
  },
};

const buttons = document.querySelectorAll("[data-model]");
const activeModel = document.querySelector("#active-model");
const activeTitle = document.querySelector("#active-title");
const activeNote = document.querySelector("#active-note");
const resultFrame = document.querySelector("#result-frame");
const openResult = document.querySelector("#open-result");
const promptText = document.querySelector("#prompt-text");

function setActiveResult(modelKey) {
  const result = results[modelKey] ?? results.claude;

  buttons.forEach((button) => {
    const isActive = button.dataset.model === modelKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activeModel.textContent = result.label;
  activeTitle.textContent = result.title;
  activeNote.textContent = result.note;
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

setActiveResult("claude");
