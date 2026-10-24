/**
 * Вставляет переносы строк (breaker) в текст по указанным позициям.
 * Если символ в позиции — пробел или перенос строки, он заменяется на breaker;
 * иначе перед символом вставляется дефис и breaker.
 *
 * @param {string} text Исходный текст.
 * @param {string} indexString Позиции вставки переносов (через запятую и/или пробел).
 * @return {string} Текст с вставленными переносами.
 * @customfunction
 */
function INSERT_BREAKES(text, indexString) {
  __getBreakIndexes__(indexString, text.length).forEach(index => {
      text = (text[index] === spaceChar) || (text[index] === newLineChar)
        ? text.slice(0, index) + breaker + text.slice(index + 1)
        : text.slice(0, index) + hyphenChar + breaker + text.slice(index);
    });

  return text;
}
