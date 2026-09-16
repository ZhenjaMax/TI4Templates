function ACTION_CARD(conditionText, resolveText, fontSize, additionalResolveText = "") { return __getTextFormatted__(__filterTextList__([conditionText, resolveText, additionalResolveText]).join(newLine), fontSize); }

function AGENDA_CARD(text1, text2, text3, binaryIndex, boldTextIndex, fontSize) {
  let texts = __filterTextList__([text1, text2, text3]);

  if(binaryIndex === 0) {
    texts = texts.map(text => __getCenteredMarkup__(text));
  } else if(binaryIndex === 2) {
    texts[0] = __getCenteredMarkup__(texts[0]);
  }
  if(typeof boldTextIndex !== "null") {
    texts[boldTextIndex-1] = __getConditionMarkup__(texts[boldTextIndex-1], fontSize);
  }

  texts[0] = texts[0].replace(new RegExp(newLine + starChar, 'g'), breaker + starChar)
    .replace(new RegExp(breaker + starChar), newLine + starChar);

  return __getTextFormatted__(texts.join(newLine), fontSize, true);
}

function BREAKTHROUGH_CARD(text, commonFontSize) { return `<push=0;${commonFontSize}>${__getTextFormatted__(text, commonFontSize, true)}`; }

function PROMISSORY_CARD(conditionText, resolveText, fontSize) {
  let texts = __filterTextList__([conditionText, resolveText]);
  if(texts.length > 1) {
    texts[0] = __getConditionMarkup__(texts[0], fontSize);
  }
  return __getTextFormatted__(texts.join(newLine), fontSize, true);
}

function TECH_CARD(text, commonFontSize, commonLineSpace, paragraphSpace, abilityFontSize, abilityPush) { return `<push=0;${Math.round(commonFontSize/2)}>${__getTextFormatted__(text, commonFontSize)}`; }
