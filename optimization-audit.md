# Аудит оптимизации

Дата: 2026-09-22. Область: `site/`, `scripts/`, `.github/workflows`, гигиена репо, сравнительный проход `test-*` (без правок — замороженные артефакты бенчмарка).

## Исправлено

### critical / high

1. **iframe предпросмотра грузился eager при загрузке страницы** — полный React-бандл приложения (145–231 КБ JS) тянулся сразу, хотя панель ниже фолда и не была нужна.
   - `site/index.html`: `loading="eager"` → `loading="lazy"`, добавлен `referrerpolicy="no-referrer"`.

2. **Полная пересборка таблицы при выборе строки** — `setActiveResult()` вызывал `renderTable()`: 10 строк × 8 ячеек пересоздавались + перевешивались 20 слушателей ради смены `is-selected`.
   - `site/app.js:333` — новый `updateSelection()`: только `classList.toggle` + `aria-pressed`. `setActiveResult` больше не трогает таблицу.

3. **Слушатели на каждой строке пересоздавались при каждом рендере** — `renderTable` вешал `click`/`keydown` на каждый `tr`.
   - `site/app.js:412-427` — делегирование на `tbody` (`closest("tr[data-model]")`), слушатели вешаются один раз в `setupEvents`.

4. **Двойной прогон сортировок в сводке** — `bestOverall`/`bestByType`/`fastestResult` вызывались по 2–3 раза, каждый — `[...arr].sort(...)` (O(n log n) + копия).
   - `site/app.js:107` — `summaryLeaders()`: один линейный проход, результат используется в `renderSummary`. `bestOverall` — линейный scan без копирования.

### medium

5. **`model.innerHTML` + `escapeHtml`** — единственное место с HTML-инъекционным контрастом к остальному `createElement`-коду.
   - `site/app.js:266` — `createElement("strong"/"small")` + `append`. `escapeHtml` удалён (0 ссылок).

6. **Повторный `querySelectorAll` на каждое переключение языка** — 3 полных прохода по DOM в `applyStaticTranslations`.
   - `site/app.js:22-24` — NodeLists кэшированы в `elements.i18nText/i18nAria/i18nTitle`.

7. **`new Intl.NumberFormat` на каждый вызов `formatNumber`** — по конструктору на каждый балл в `renderScoreBars`.
   - `site/app.js:47-54` — кэш форматтеров в `Map` по языку.

### low

8. **Языковой переключатель дёргал `renderTable` дважды** — явно + внутри `setActiveResult`. После фикса №2 — один проход.

9. **Сборка приложений в `build-pages.mjs` была строго последовательной** — 10 `npm run build` подряд.
   - `scripts/build-pages.mjs` — `Promise.allSettled` по всем проектам; при провале — агрегированный отчёт и ненулевой выход.

10. **CI: 10 последовательных `npm ci`** — сетевые задержки складывались.
    - `.github/workflows/pages.yml` — один шаг `xargs -P 4` (параллельная установка с ограничением, чтобы не убить диск/сеть раннера).

11. **CI: валидация данных шла после 10 установок** — битые данные/локализация валидировались только после ~полного прогона.
    - Валидации вынесены **до** `npm ci` (им node_modules не нужен) — fail-fast на раннере.

12. **`pages-dist/` обновлён** под исправленный `site/` (локальная копия для превью; CI пересобирает с нуля).

## Замечания без правок (замороженные `test-*`)

Сравнительный проход моделей. Менять нельзя — это артефакты бенчмарка.

| Модель | Наблюдения (оптимизация) |
|---|---|
| **claude, fable, laguna** | Чистые `useMemo`/`useCallback`, фильтр+сумма мемоизированы, `useLocalStorage` с lazy-read. Лучший слой оптимизации в группе. |
| **MiMo-V2.6-Pro** | `useCallback` + `useMemo` для total, lazy init. Почти как claude; `useEffect`-persist без debounce (мелочь на таких объёмах). |
| **qwen27b** | `useMemo` есть, но двойная сериализация: `next.map(e => JSON.stringify(e))` в сторе + `JSON.stringify` в `saveExpenses` — лишняя аллокация на каждую запись. |
| **gemma4** | Persist-effect вызывает `loadExpenses().length` на каждой записи — лишний парс JSON из localStorage. `addExpense`/`deleteExpense` без `useCallback`. |
| **ornith** | `useFilteredExpenses` внутри вызывает `useExpenses()` — второй экземпляр состояния/подписки. `ExpenseList` сортирует `[...expenses].sort()` без `useMemo` на каждый рендер. `useCallback` на функцию-фабрику в `App.tsx` — не даёт эффекта (вызывается сразу как `filtered()`). |
| **gpt** | `useMemo` для фильтра/суммы есть; `addExpense`/`deleteExpense` без `useCallback` (мелочь). |
| **astra** | `topCategory` — O(CATEGORIES × n) пересчёт на каждый рендер без мемоизации; сортировка `visibleExpenses` там же. На 10 пунктах незаметно, при росте — да. |
| **qwen35b** | JS-бандл 228 КБ — самый тяжёлый после astra (231 КБ). Остальные ~146 КБ. |
| **Vite-конфиги** | У всех дефолтный `defineConfig` без `build.rollupOptions`/manualChunks. Для SPA 145 КБ — нормально, code-splitting не нужен. |

## Что сознательно не делало

- **Workspaces/hoisting `node_modules`** (~750 МБ на диске): ломает независимость `npm ci` и lock-файлов замороженных артефактов. Стоимость — место у разработчика, не в git (node_modules в `.gitignore`).
- **Минификация `site/*.js`**: исходники и есть артефакт публикации, выгода ~5 КБ gzip не окупает потерю читаемости.
- **Сплит `benchmark-results.json` (52 КБ)**: один запрос, один рендер, нет смысла.
- **`useMemo`/`memo` в `test-*`**: запрещено политикой репозитория (факты бенчмарка).

## Итог по весам

| Артефакт | Было | Стало |
|---|---|---|
| iframe при загрузке страницы | до 231 КБ JS | 0 (lazy) |
| Выбор строки | rebuild 10×8 + 20 слушателей | toggle 2 атрибутов |
| `renderSummary` сортировок | ~7 × O(n log n) | 1 × O(n) |
| CI installs | 10 последовательных `npm ci` | `xargs -P 4` |
| CI fail-fast (данные) | после ~10 install | до install |
| Builds | 10 последовательных | параллельные |
