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

function BREAKTHROUGH_CARD(text, fontSize) { return (__filterTextList__(text).length > 0) ? __getPushMarkup__(0, fontSize) + __getTextFormatted__(text, fontSize, true) : ""; }

function EXPLORATION_EFFECT_CARD(text, fontSize) { return __getTextFormatted__(text, fontSize); }

function EXPLORATION_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); };

function LEADER_FRONT_CARD(conditionText, resolveText, fontSize) { return __getTextFormatted__(__filterTextList__(conditionText, resolveText).join(newLineChar), fontSize); }

function LEADER_BACK_UNLOCK_CARD(text, fontSize) { return (__filterTextList__(text).length === 0) ? "" : __getTextFormatted__(text, fontSize); }

function LEADER_BACK_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); };

function PLANET_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); }

function PLANET_LEGENDARY_EFFECT_CARD(text, fontSize) { return EXPLORATION_EFFECT_CARD(text, fontSize); }

function PLANET_LEGENDARY_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); }

function POLICY_EFFECT_CARD(text, fontSize) { return TECH_CARD(text, fontSize); }

function PROMISSORY_CARD(conditionText, resolveText, fontSize) {
  let texts = __filterTextList__(conditionText, resolveText);
  if(texts.length > 1) {
    texts[0] = __wrapCondition__(texts[0], fontSize);
  }
  return __getTextFormatted__(texts.join(newLineChar), fontSize, true);
}

function TECH_CARD(text, commonFontSize, textXshift = 0) { return (__filterTextList__(text).length > 0) ? ((textXshift === 1 ? `$[x:#math;&[x]+${xTextShiftAmount}#]$[width:#math;&[width]-${xTextShiftAmount}#]` : "") + __getPushMarkup__(0, Math.round(commonFontSize/2)) + __getTextFormatted__(text, commonFontSize)) : ""; }

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

  // specsBreakValue = -1,  => переносов нет;
  // specsBreakValue = 0,   => перенос на каждой строке;
  // specsBreakValue > 0,   => перенос после указанной строки один раз
  return overridesStr + lines
    .map((line, i) => {
        if (i === lines.length - 1) return line;
        if ((specsBreakValue === 0) || (i === specsBreakValue - 1)) return line + breaker;
        return line + spaceChar + spaceChar;
    }).join("");
}

function TECH_CARD_UNIT_IMAGE(unitType, coordinateType) { return unitImagesPush[unitType][coordinateType] || 0; }

function TILE_CROSSHAIR_COORDS(amount, firstPlanetSpecial, secondPlanetSpecial) {
  if (amount === 0) {
    return "";
  }
  const preset = `P${firstPlanetSpecial === "L" ? firstPlanetSpecial : ""}${amount}${amount === 1 ? "1" : ""}${amount === 2 ? (firstPlanetSpecial === "" ? "2" : (secondPlanetSpecial === "" ? "1" : "")) : ""}`;
  const {X, Y, D} = tileComponents.Crosshair[preset];
  return `$[x:${X}]$[y:${Y}]$[width:${D}]$[height:${D}]`;
}

function TILE_PLANET_NAME(text, fontSize, index, amount, planetType, planetSpecial) {
  if (text === "") {
    return "";
  }
  const preset = __getTilePresetCommon__(index, amount, planetType, planetSpecial);
  const { X, Y } = tileComponents.Name[preset];
  return `$[x:${X}]$[y:${Y}]${__wrapFS__(text, fontSize)}`;
}

function TILE_PLANET_OBJECT_IMAGE(planetImage, objectImage, index, amount, X, Y, W, H) {
  if (planetImage !== "") {
    return `$[x:${X}]$[y:${Y}]$[width:${W}]$[height:${H}]Images/Planets/${planetImage}`;
  } else if (objectImage !== "") {
    const preset = `P${amount}${index}`;
    if((X === "") || (Y === "")) {
      ({X, Y} = tileComponents.Object[preset]);
    }
    return `$[x:${X}]$[y:${Y}]${((W !== "") && (H !== "")) ? `$[width:${W}]$[height:${H}]` : ""}Images/Tiles/${objectImage}`;
  } else {
    return "";
  }
}

function TILE_PLANET_STATS(value, valueType, index, amount, planetType, planetSpecial) {
  if(value === "") {
    return "";
  }
  const preset = __getTilePresetCommon__(index, amount, planetType, planetSpecial);
  const {X, Y} = tileComponents[valueType][preset];
  return `$[x:${X}]$[y:${Y}]${value}`;
}

function TILE_PLANET_TEXTBOX(index, amount, planetType, planetSpecial) { return (planetType !== "") ? `${planetSpecial === "L" ? planetSpecial : ""}${tileComponents.TextBoxes[planetType] ?? ""}${amount}${index}` : ""; }

function TILE_PLANET_SPECIAL_ICON(index, amount, planetSpecial) {
  if ((planetSpecial === "") || (planetSpecial === "null") || (planetSpecial === "L")) {
    return "";
  }
  const preset = `P${amount}${index}`;
  const {X, Y} = tileComponents.Icon[preset];
  return `$[x:${X}]$[y:${Y}]Images/Req${planetSpecial}_a.png`;
}
