function ACTION_EFFECT_CARD(conditionText, resolveText, fontSize, additionalResolveText = "") { return __getTextFormatted__(__filterTextList__(conditionText, resolveText, additionalResolveText).join(newLineChar), fontSize); }

function ACTION_LORE_CARD(text, fontSize) { return (__filterTextList__(text).length > 0) ? __applyStyles__(text, fontSize, false, __replaceParagraphs__, __wrapLSFS__) : ""; }

function AGENDA_CARD(text1, text2, text3, binaryIndex, boldTextIndex, fontSize) {
  let texts = __filterTextList__(text1, text2, text3);

  if(binaryIndex === 0) {
    texts = texts.map(text => __wrapCentered__(text));
  } else if(binaryIndex === 2) {
    texts[0] = __wrapCentered__(texts[0]);
  }
  if(typeof boldTextIndex !== "null") {
    texts[boldTextIndex-1] = __wrapCondition__(texts[boldTextIndex-1], fontSize);
  }

  texts[0] = texts[0].slice(0, texts[0].indexOf(newLineChar)+1) + __replaceBreakes__(texts[0].slice(texts[0].indexOf(newLineChar)+1));

  return __getTextFormatted__(texts.join(newLineChar), fontSize, true, __replaceAgendaBinaryChoices__);
}

function BREAKTHROUGH_CARD(text, fontSize) { return __getPushMarkup__(0, fontSize) + __getTextFormatted__(text, fontSize, true); }

function EXPLORATION_EFFECT_CARD(text, fontSize) { return __getTextFormatted__(text, fontSize); }

function EXPLORATION_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); };

function LEADER_FRONT_CARD(conditionText, resolveText, fontSize) { return __getTextFormatted__(__filterTextList__(conditionText, resolveText).join(newLineChar), fontSize); }

function LEADER_BACK_UNLOCK_CARD(text, fontSize) { return (__filterTextList__(text).length === 0) ? "" : __getTextFormatted__(text, fontSize); }

function LEADER_BACK_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); };

function PROMISSORY_CARD(conditionText, resolveText, fontSize) {
  let texts = __filterTextList__(conditionText, resolveText);
  if(texts.length > 1) {
    texts[0] = __wrapCondition__(texts[0], fontSize);
  }
  return __getTextFormatted__(texts.join(newLineChar), fontSize, true);
}

function TECH_CARD(text, commonFontSize) { return __getPushMarkup__(0, Math.round(commonFontSize/2)) + __getTextFormatted__(text, commonFontSize); }

function TECH_CARD_UNIT_ABILITIES(
    abilityXshift, abilityYshift, specsBreakValue,
    spaceCannonStrength, spaceCannonAmount, 
    antiFighterStrength, antiFighterAmount,
    sustainDamage,
    planetaryShield,
    bombardmentStrength, bombardmentAmount,
    production
) {
  const labels = abilitiesList
    .slice(0, 6)
    .map(ability => ability.slice(1, -1));

  const visibleAbilities = [
    {
      label: labels[0],
      value: antiFighterStrength,
      amount: antiFighterAmount,
      visible: antiFighterStrength != "null",
      showValue: true
    },
    {
      label: labels[1],
      value: spaceCannonStrength,
      amount: spaceCannonAmount,
      visible: spaceCannonStrength != "null",
      showValue: true
    },
    {
      label: labels[2],
      value: sustainDamage,
      amount: null,
      visible: sustainDamage !== 0,
      showValue: false
    },
    {
      label: labels[3],
      value: planetaryShield,
      amount: null,
      visible: planetaryShield !== 0,
      showValue: false
    },
    {
      label: labels[4],
      value: production,
      amount: null,
      visible: production != "null",
      showValue: true
    },
    {
      label: labels[5],
      value: bombardmentStrength,
      amount: bombardmentAmount,
      visible: bombardmentStrength != "null",
      showValue: true
    }
  ].filter(a => a.visible);

  const lines = [];
  for (let i = 0; i < visibleAbilities.length; i++) {
    const ability = visibleAbilities[i];

    let line = __wrapFS__(starChar, starFontSize) + __getPushMarkup__(starPush) + ability.label;
    if (ability.showValue && ability.value != "null" && ability.value != 0) {
      line += spaceChar + ability.value;
    }
    if (ability.amount != null && ability.amount > 1) {
      line += spaceChar + __wrapFS__(multiplicationChar, starFontSize) + ability.amount;
    }

    lines.push(__insertNBSPformatted__(line));
  }

  let overridesStr = "";
  if (abilityXshift === 1) {
    overridesStr += `$[x:#math;&[x]+${xAbilityShiftAmount}#]$[width:#math;&[width]-${xAbilityShiftAmount}#]`;
  }
  if (abilityYshift === 0) {
    overridesStr += `$[height:#math;&[height]-${yAbilityShiftAmount}#]`;
  } else if (abilityYshift === 1) {
    overridesStr += `$[height:#math;&[height]-${yAbilityShiftAmountSmall}#]`;
  }

  return overridesStr + lines
    .map((line, i) => {
        if (i === lines.length - 1) return line;
        if ((specsBreakValue === 0) || (i === specsBreakValue - 1)) return line + breaker;
        return line + spaceChar + spaceChar;
    }).join("");
}
