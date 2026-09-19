function INSERT_BREAKES(text, indexString) {
  indexString.split(/[,\s]+/)
    .map(Number)
    .filter(index => (index < text.length) && (index > 0))
    .sort((a, b) => b - a)
    .forEach(index => {
      text = (text[index] === spaceChar) || (text[index] === newLineChar)
        ? text.slice(0, index) + breaker + text.slice(index + 1)
        : text.slice(0, index) + hyphenChar + breaker + text.slice(index);
    });

  return text;
}
