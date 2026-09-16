function TITLE(text, fontSize, minLineSize = 0, maxLineSize = 999, separatorSubstring = "", isCentered = false) {
  return `<fs=${fontSize}>${__insertNBSPformatted__(text, minLineSize, maxLineSize, separatorSubstring, isCentered)}</fs>`;
}

function SUBTITLE(text, fontSize, color) {
  return `<fc=${color}><fs=${fontSize}>${text}</fs></fc>`
}
