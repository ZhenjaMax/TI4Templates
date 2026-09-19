function TITLE(text, fontSize, minLineSize = 0, maxLineSize = 999, separatorSubstring = "", isCentered = false) { return __applyStyles__(__insertNBSPformatted__(text, minLineSize, maxLineSize, separatorSubstring, isCentered), fontSize, false, __wrapFS__); }

function SUBTITLE(text, fontSize, color) { return __wrapColorFS__(text, fontSize, color); }
