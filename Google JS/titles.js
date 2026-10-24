/**
 * Форматирует заголовок: вставляет неразрывные пробелы в заданных границах длины строк,
 * опционально центрирует и применяет базовые стили.
 *
 * @param {string} text Текст заголовка.
 * @param {number} fontSize Размер шрифта.
 * @param {number} [minLineSize=0] Минимальная длина строки для вставки NBSP.
 * @param {number} [maxLineSize=999] Максимальная длина строки для вставки NBSP.
 * @param {string} [separatorSubstring=""] Подстрока-разделитель для обработки строк.
 * @param {boolean} [isCentered=false] Признак центрирования текста.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function TITLE(text, fontSize, minLineSize = 0, maxLineSize = 999, separatorSubstring = "", isCentered = false) { return (text.length > 0) ? __applyStyles__(__insertNBSPformatted__(text, minLineSize, maxLineSize, separatorSubstring, isCentered), fontSize, false, __wrapFS__) : ""; }

/**
 * Форматирует подзаголовок: применяет цвет (при наличии) и размер шрифта,
 *
 * @param {string} text Текст подзаголовка.
 * @param {number} fontSize Размер шрифта.
 * @param {string} [color=""] Цвет текста; пустая строка — без окрашивания.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function SUBTITLE(text, fontSize, color = "") { return (color.length) > 0 ? __wrapColorFS__(text, fontSize, color) : __wrapFS__(text, fontSize); }
