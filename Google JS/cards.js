/**
 * Формирует текст карты действия из условия, эффекта
 * и (опционально) дополнительного текста эффекта.
 *
 * @param {string} conditionText Текст условия.
 * @param {string} resolveText Текст эффекта.
 * @param {number} fontSize Размер шрифта.
 * @param {string} [additionalResolveText=""] Дополнительный текст эффекта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function ACTION_EFFECT_CARD(conditionText, resolveText, fontSize, additionalResolveText = "") { return __getTextFormatted__(__filterTextList__(conditionText, resolveText, additionalResolveText).join(newLineChar), fontSize); }

/**
 * Формирует лор карты действия.
 *
 * @param {string} text Текст лора.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function ACTION_LORE_CARD(text, fontSize) { return (__filterTextList__(text).length > 0) ? __applyStyles__(text, fontSize, false, __replaceParagraphs__, __wrapLSFS__) : ""; }

/**
 * Формирует текст карты политики из трёх частей с выравниванием и выделением.
 *
 * @param {string} text1 Первый текстовый блок.
 * @param {string} text2 Второй текстовый блок.
 * @param {string} text3 Третий текстовый блок.
 * @param {number} binaryIndex Режим выравнивания: 0 — всё по центру, 1 - всё слева, 2 — только первый блок по центру.
 * @param {number} boldTextIndex Индекс (с 1) блока для выделения жирным; "null" — без выделения.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
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

/**
 * Формирует текст карты прорыва с отступом.
 *
 * @param {string} text Текст карты.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function BREAKTHROUGH_CARD(text, fontSize) { return (__filterTextList__(text).length > 0) ? __getPushMarkup__(0, fontSize) + __getTextFormatted__(text, fontSize, true) : ""; }

/**
 * Формирует текст карты исследования.
 *
 * @param {string} text Текст эффекта.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function EXPLORATION_EFFECT_CARD(text, fontSize) { return __getTextFormatted__(text, fontSize); }

/**
 * Формирует лор карты исследования (делегирует в ACTION_LORE_CARD).
 *
 * @param {string} text Текст лора.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function EXPLORATION_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); };

/**
 * Формирует цитату на лицевой стороне планшета фракции с указанием автора.
 *
 * @param {string} text Текст цитаты.
 * @param {string} author Автор цитаты.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function FACTION_SHEET_FRONT_QUOTE(text, author, fontSize) {
  return __wrapItalic__(text, fontSize) + __getParagraphMarkup__(fontSize-42) + author;
}

/**
 * Формирует блок способностей на лицевой стороне планшета фракции (до трёх пар «название — описание»).
 *
 * @param {string} name1 Название первой способности.
 * @param {string} text1 Описание первой способности.
 * @param {string} name2 Название второй способности.
 * @param {string} text2 Описание второй способности.
 * @param {string} name3 Название третьей способности.
 * @param {string} text3 Описание третьей способности.
 * @param {number} nameFontSize Размер шрифта названий.
 * @param {number} textFontSize Размер шрифта описаний.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function FACTION_SHEET_FRONT_ABILITIES(name1, text1, name2, text2, name3, text3, nameFontSize, textFontSize) {
  const nameList = __filterTextList__(name1, name2, name3);
  const textList = __filterTextList__(text1, text2, text3);
  return nameList
    .map((_, index) => __getPushMarkup__(factionSheetFrontAbilityPush) +  __applyStyles__(nameList[index], nameFontSize, false, __wrapAbility__, __wrapCaps__) + __getParagraphMarkup__(Math.round(textFontSize*0.7)) + __getTextFormatted__(textList[index], textFontSize))
    .join(__getParagraphMarkup__(__getAbilityFontSize__(nameFontSize)));
}

/**
 * Формирует заголовки характеристик фракции на обратной стороне планшета фракции.
 * Опционально сдвигает блок по вертикали и добавляет пустые строки для указанных индексов (1–4).
 *
 * @param {string} [indexString=""] Список индексов (через запятую или пробел) для дополнительного сдвига.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function FACTION_SHEET_BACK_DESCRIPTION_HEADERS(indexString = "") {
  const idx = indexString.split(/[,\s]+/)
    .map(Number)
    .filter(i => i > 0 && i < 5);
  const body = factionBackHeaders.map((h, i) => h + breaker + (idx.includes(i + 1) ? breaker : ""))
    .join("");
  return (idx.length ? `$[y:#math;&[y]+${factionSheetBackDescriptionYPush}#]` : "") + body;
}

/**
 * Формирует значения характеристик на обратной стороне планшета фракции.
 * Опционально сдвигает блок по вертикали.
 *
 * @param {string} text Текст значений.
 * @param {string} [indexString=""] Список индексов (через запятую или пробел) для дополнительного сдвига.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function FACTION_SHEET_BACK_DESCRIPTION_VALUES(text, indexString = "") {
  return (idx = indexString.split(/[,\s]+/).map(Number).filter(i => i > 0 && i < 5).length > 0 ? `$[y:#math;&[y]+${factionSheetBackDescriptionYPush}#]` : "") + text.replaceAll(newLineChar, breaker);
}

/**
 * Формирует лор на обратной стороне планшета фракции.
 *
 * @param {string} text Текст цитаты.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function FACTION_SHEET_BACK_DESCRIPTION_LORE(text, fontSize) {
  return __wrapLS__(__wrapFS__(text, fontSize), Math.round(fontSize*1.63));
}

/**
 * Формирует список стартовых технологий на обратной стороне планшета фракции.
 * Цвета задаются посимвольно ('W' — без цвета).
 *
 * @param {string} text Список технологий (по одной в строке).
 * @param {string} colors Строка цветовых кодов, по одному символу на строку.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function FACTION_SHEET_BACK_STARTING_TECHS(text, colors) {
  return text.split(newLineChar)
    .map((techLine, index) => __getPushMarkup__((techLine[0] === starChar) ? factionSheetBackStartingTechPushX : factionSheetBackStartingTechPushXSpecial) + __wrapColor__(techLine, `@[GetTechColorFactionSheetBack,${colors?.[index] || 'W'}]`))
    .join(breaker);
}

/**
 * Возвращает первую или вторую половину строк текста (по '\n'), склеенных через breaker.
 * При нечётном количестве строк в первой половине на одну строку больше.
 *
 * @param {string} text Исходный многострочный текст.
 * @param {boolean} [isLast=false] Если true — вернуть вторую половину, иначе первую.
 * @return {string} Склеенные строки выбранной половины.
 * @customfunction
 */
function FACTION_SHEET_BACK_STARTING_UNITS_PART(text, isLast = false) {
  const unitsList = text.split('\n');
  const mid = Math.ceil(unitsList.length / 2);
  return unitsList.slice(isLast ? mid : 0, isLast ? undefined : mid).join(breaker);
}

/**
 * Возвращает первую или вторую часть текста описания фракции.
 *
 * @param {string} text Исходный многострочный текст.
 * @param {number} splitIndex Индекс разделения текста на части.
 * @param {boolean} [isLast=false] Если true — вернуть вторую часть, иначе первую.
 * @return {string} Форматированный текст выбранной части.
 * @customfunction
 */
function FACTION_SHEET_BACK_TEXT_PARTS(text, indexString, splitIndex, isLast = false) {
  const allIndexes = __getBreakIndexes__(indexString, text.length, 0);
  if(Number(splitIndex) == 0) {
    splitIndex = Infinity;
  }
  const partIndexes = isLast
    ? allIndexes.filter(i => i > splitIndex).map(i => i - splitIndex)
    : allIndexes.filter(i => i < splitIndex);

  let partText = isLast ? text.slice(splitIndex) : text.slice(0, splitIndex);

  // Перенос ровно на границе разреза — отдаём первой части
  const boundaryBreak = !isLast && allIndexes.includes(splitIndex);

  // === инлайн INSERT_BREAKES ===
  // Внутрисловный разрыв → дефис + пробел (мягкий перенос, без <br>).
  // Разрыв по границе слова (пробел / \n) → breaker, как раньше.
  partIndexes.forEach(index => {
    partText = (partText[index] === spaceChar) || (partText[index] === newLineChar)
      ? partText.slice(0, index) + breaker + partText.slice(index + 1)
      : partText.slice(0, index)
        + (partText[index - 1] === hyphenChar ? spaceChar : hyphenChar + spaceChar)
        + partText.slice(index);
  });
  // === /инлайн ===

  // Перенос ровно на границе — добираем в конец первой части.
  if (boundaryBreak && !partText.endsWith(breaker)) {
    const ch = text[splitIndex];
    if (ch !== newLineChar && ch !== undefined) {
      partText += (ch === spaceChar) ? breaker : hyphenChar + spaceChar;
    }
  }

  const paragraphPush = __getPushMarkup__(factionSheetBackTextParagraphPush);
  // Реальные \n → breaker + отступ абзаца; чистка краёв
  partText = partText.replaceAll(newLineChar, breaker + paragraphPush).trim();
  if (isLast && partText.startsWith(breaker)) {
    partText = partText.slice(breaker.length);
  }

  return isLast ? partText : (paragraphPush + partText);
}

/**
 * Формирует условие и эффект карты лидера на лицевой стороне.
 *
 * @param {string} conditionText Текст условия.
 * @param {string} resolveText Текст эффекта.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function LEADER_FRONT_CARD(conditionText, resolveText, fontSize) { return __getTextFormatted__(__filterTextList__(conditionText, resolveText).join(newLineChar), fontSize); }

/**
 * Формирует условие разблокировки на обратной стороне карты лидера.
 *
 * @param {string} text Текст разблокировки.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function LEADER_BACK_UNLOCK_CARD(text, fontSize) { return (__filterTextList__(text).length === 0) ? "" : __getTextFormatted__(text, fontSize); }

/**
 * Формирует лор на обратной стороне карты лидера (делегирует в ACTION_LORE_CARD).
 *
 * @param {string} text Текст лора.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function LEADER_BACK_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); };

/**
 * Формирует лор планеты (делегирует в ACTION_LORE_CARD).
 *
 * @param {string} text Текст лора.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function PLANET_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); }

/**
 * Формирует эффект легендарной планеты (делегирует в EXPLORATION_EFFECT_CARD).
 *
 * @param {string} text Текст эффекта.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function PLANET_LEGENDARY_EFFECT_CARD(text, fontSize) { return EXPLORATION_EFFECT_CARD(text, fontSize); }

/**
 * Формирует лор легендарной планеты (делегирует в ACTION_LORE_CARD).
 *
 * @param {string} text Текст лора.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function PLANET_LEGENDARY_LORE_CARD(text, fontSize) { return ACTION_LORE_CARD(text, fontSize); }

/**
 * Формирует эффект карты курса (делегирует в TECH_CARD).
 *
 * @param {string} text Текст эффекта.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function POLICY_EFFECT_CARD(text, fontSize) { return TECH_CARD(text, fontSize); }

/**
 * Формирует текст карты обещания из условия (при наличии) и эффекта.
 *
 * @param {string} conditionText Текст условия.
 * @param {string} resolveText Текст эффекта.
 * @param {number} fontSize Размер шрифта.
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function PROMISSORY_CARD(conditionText, resolveText, fontSize) {
  let texts = __filterTextList__(conditionText, resolveText);
  if(texts.length > 1) {
    texts[0] = __wrapCondition__(texts[0], fontSize);
  }
  return __getTextFormatted__(texts.join(newLineChar), fontSize, true);
}

/**
 * Формирует текст карты технологии с опциональным горизонтальным сдвигом.
 *
 * @param {string} text Текст карты.
 * @param {number} commonFontSize Базовый размер шрифта.
 * @param {number} [textXshift=0] Индекс сдвига по X из techTextXShiftList.
 * @return {string} Отформатированная строка либо пустая строка.
 * @customfunction
 */
function TECH_CARD(text, commonFontSize, textXshift = 0) { 
  return (__filterTextList__(text).length > 0) ? `$[x:#math;&[x]+${techTextXShiftList[textXshift]}#]$[width:#math;&[width]-${techTextXShiftList[textXshift]}#]`
    + __getPushMarkup__(0, Math.round(commonFontSize/2))
    + __getTextFormatted__(text, commonFontSize) : "";
}

/**
 * Формирует блок способностей отряда на карте технологии.
 *
 * @param {number} abilityXshift Индекс сдвига по X из techAbilityXShiftList.
 * @param {number} abilityYshift Индекс сдвига по Y из techAbilityYShiftList.
 * @param {number} specsBreakValue Переносов способностей: -1 — без переносов, 0 — перенос после каждой строки, >0 — перенос после указанной строки.
 * @param {number} fontSize Размер шрифта.
 * @param {string} spaceCannonStrength Космическая пушка, значение ("null" — нет).
 * @param {number} spaceCannonAmount Космическая пушка, количество.
 * @param {string} antiFighterStrength Заградительный огонь, значение ("null" — нет).
 * @param {number} antiFighterAmount Заградительный огонь, количество.
 * @param {number} sustainDamage Поглощение урона (0 — нет).
 * @param {number} planetaryShield Планетарный щит (0 — нет).
 * @param {string} bombardmentStrength Бомбардировка, значение ("null" — нет).
 * @param {number} bombardmentAmount Бомбардировка, количество.
 * @param {string} production Производство ("null" — нет).
 * @return {string} Отформатированная строка.
 * @customfunction
 */
function TECH_CARD_UNIT_ABILITIES(
    abilityXshift, abilityYshift, 
    specsBreakValue, fontSize,
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
      value: planetaryShield,
      amount: null,
      visible: planetaryShield !== 0,
      showValue: false
    },
    {
      label: labels[1],
      value: sustainDamage,
      amount: null,
      visible: sustainDamage !== 0,
      showValue: false
    },
    {
      label: labels[2],
      value: antiFighterStrength,
      amount: antiFighterAmount,
      visible: antiFighterStrength != "null",
      showValue: true
    },
    {
      label: labels[3],
      value: bombardmentStrength,
      amount: bombardmentAmount,
      visible: bombardmentStrength != "null",
      showValue: true
    },
    {
      label: labels[4],
      value: spaceCannonStrength,
      amount: spaceCannonAmount,
      visible: spaceCannonStrength != "null",
      showValue: true
    },
    {
      label: labels[5],
      value: production,
      amount: null,
      visible: production != "null",
      showValue: true
    }
  ].filter(a => a.visible);

  const lines = [];
  const specialFontSize = __getTechAbilitySpecialCharacterFontSize__(fontSize),
        starPush = __getTechAbilityStarPush__(fontSize);
  for (let i = 0; i < visibleAbilities.length; i++) {
    const ability = visibleAbilities[i];

    let line = __wrapFS__(starChar, specialFontSize) + __getPushMarkup__(starPush) + ability.label;
    if (ability.showValue && ability.value != "null" && ability.value != 0) {
      line += spaceChar + ability.value;
    }
    if (ability.amount != null && ability.amount > 1) {
      line += spaceChar + __wrapRoundBrackets__(__wrapFS__(multiplicationChar, specialFontSize) + ability.amount);
    }

    lines.push(__insertNBSPformatted__(line));
  }

  // specsBreakValue = -1,  => переносов нет;
  // specsBreakValue = 0,   => перенос на каждой строке;
  // specsBreakValue > 0,   => перенос после указанной строки один раз
  return  __wrapLS__(__wrapFS__(`$[x:#math;&[x]+${techAbilityXShiftList[abilityXshift]}#]$[width:#math;&[width]-${techAbilityXShiftList[abilityXshift]}#]` 
    + `$[height:#math;&[height]-${techAbilityYShiftList[abilityYshift]}#]` 
    + lines.map((line, i) => {
      if (i === lines.length - 1) return line;
      if ((specsBreakValue === 0) || (i === specsBreakValue - 1)) return line + breaker;
      return line + spaceChar + spaceChar;
    }).join(""), fontSize), __getTechAbilityLineSpacing__(fontSize));
}

/**
 * Возвращает параметры изображения отряда на карте технологии (позиция и размер).
 *
 * @param {string} unitType Тип юнита (ключ в unitImages).
 * @param {number} [additionalX=0] Дополнительный сдвиг по X.
 * @param {number} [additionalY=0] Дополнительный сдвиг по Y.
 * @param {boolean} [isPrinted=false] Флаг для напечатанной версии.
 * @param {boolean} [isUnique=false] Для напечатанной версии — использовать дополнительный сдвиг pY.
 * @return {string} Строка с параметрами markup либо пустая строка.
 * @customfunction
 */
function TECH_CARD_UNIT_IMAGE_PARAMETERS(unitType, additionalX = 0, additionalY = 0, isPrinted = false, isUnique = false) {
  if (unitType === "") {
    return "";
  }

  const unitImage = unitImages[unitType];

  const x = Number(additionalX) + ((isPrinted) ? 0 : Number(unitImage.X));
  const y = Number(additionalY) + ((isPrinted) 
    ? (isUnique ? Number(unitImage?.pY || 0) : 0) 
    : Number(unitImage.Y));
  const coordinatesSubstring = `$[x:${x}]$[y:${y}]`;

  const w = (isPrinted) ? 0 : (unitImage?.W || 0);
  const h = (isPrinted) ? 0 : (unitImage?.H || 0);
  let sizeSubstring = ((w > 0) || (h > 0)) ? `$[width:${w}]$[height:${h}]` : "";

  return coordinatesSubstring + sizeSubstring;
}

/**
 * Возвращает разметку линий вокруг планеты на тайле.
 *
 * @param {number} amount Количество планет (0 — без линий).
 * @param {string} firstPlanetSpecial Спецсимвол первой планеты.
 * @param {string} secondPlanetSpecial Спецсимвол второй планеты.
 * @return {string} Строка с параметрами разметки либо пустая строка.
 * @customfunction
 */
function TILE_CROSSHAIR_COORDS(amount, firstPlanetSpecial, secondPlanetSpecial) {
  if ((amount === 0) || ((firstPlanetSpecial === "") && (secondPlanetSpecial === ""))) {
    return "";
  }
  const preset = `P${firstPlanetSpecial === "L" ? firstPlanetSpecial : ""}${amount}${amount === 1 ? "1" : ""}${amount === 2 ? (firstPlanetSpecial === "" ? "2" : (secondPlanetSpecial === "" ? "1" : "")) : ""}`;
  const {X, Y, D} = tileComponents.Crosshair[preset];
  return `$[x:${X}]$[y:${Y}]$[width:${D}]$[height:${D}]`;
}

/**
 * Возвращает разметку названия планеты на тайле с учётом пресета координат.
 *
 * @param {string} text Название планеты; пустая строка — без вывода.
 * @param {number} fontSize Размер шрифта.
 * @param {number} index Индекс планеты на тайле.
 * @param {number} amount Количество планет на тайле.
 * @param {string} planetType Тип планеты.
 * @param {string} planetSpecial Спецсимвол планеты.
 * @return {string} Строка с параметрами разметки и текстом либо пустая строка.
 * @customfunction
 */
function TILE_PLANET_NAME(text, fontSize, index, amount, planetType, planetSpecial) {
  if (text === "") {
    return "";
  }
  const preset = __getTilePresetCommon__(index, amount, planetType, planetSpecial);
  const { X, Y } = tileComponents.Name[preset];
  return `$[x:${X}]$[y:${Y}]${__wrapFS__(text, fontSize)}`;
}

/**
 * Возвращает разметку изображения планеты или объекта на тайле.
 *
 * @param {string} planetImage Имя файла планеты (приоритетно); пустая строка — не используется.
 * @param {string} objectImage Имя файла объекта; используется, если planetImage пустая.
 * @param {number} index Индекс планеты/объекта на тайле.
 * @param {number} amount Количество планет/объектов на тайле.
 * @param {number|string} X Координата X; пустая строка — из пресета.
 * @param {number|string} Y Координата Y; пустая строка — из пресета.
 * @param {number|string} W Ширина; пустая строка — без явного размера.
 * @param {number|string} H Высота; пустая строка — без явного размера.
 * @return {string} Строка с параметрами разметки либо пустая строка.
 * @customfunction
 */
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

/**
 * Возвращает разметку значения характеристики планеты на тайле с учётом пресета координат.
 *
 * @param {string|number} value Значение характеристики; пустая строка — без вывода.
 * @param {string} valueType Тип характеристики (ключ в tileComponents).
 * @param {number} index Индекс планеты на тайле.
 * @param {number} amount Количество планет на тайле.
 * @param {string} planetType Тип планеты.
 * @param {string} planetSpecial Спецсимвол планеты.
 * @return {string} Строка с параметрами разметки и значением либо пустая строка.
 * @customfunction
 */
function TILE_PLANET_STATS(value, valueType, index, amount, planetType, planetSpecial) {
  if(value === "") {
    return "";
  }
  const preset = __getTilePresetCommon__(index, amount, planetType, planetSpecial);
  const {X, Y} = tileComponents[valueType][preset];
  return `$[x:${X}]$[y:${Y}]${value}`;
}

/**
 * Возвращает идентификатор пресета текстового поля планеты на тайле.
 *
 * @param {number} index Индекс планеты на тайле.
 * @param {number} amount Количество планет на тайле.
 * @param {string} planetType Тип планеты; пустая строка — пустой результат.
 * @param {string} planetSpecial Спецсимвол планеты.
 * @return {string} Идентификатор пресета либо пустая строка.
 * @customfunction
 */
function TILE_PLANET_TEXTBOX(index, amount, planetType, planetSpecial) { return (planetType !== "") ? `${planetSpecial === "L" ? planetSpecial : ""}${tileComponents.TextBoxes[planetType] ?? ""}${amount}${index}` : ""; }

/**
 * Возвращает разметку изображения специльной иконки планеты на тайле.
 *
 * @param {number} index Индекс планеты на тайле.
 * @param {number} amount Количество планет на тайле.
 * @param {string} planetSpecial Спецсимвол планеты ("" / "null" / "L" — без иконки).
 * @return {string} Строка с параметрами разметки либо пустая строка.
 * @customfunction
 */
function TILE_PLANET_SPECIAL_ICON(index, amount, planetSpecial) {
  if ((planetSpecial === "") || (planetSpecial === "null") || (planetSpecial === "L")) {
    return "";
  }
  const preset = `P${amount}${index}`;
  const {X, Y} = tileComponents.Icon[preset];
  return `$[x:${X}]$[y:${Y}]Images/Req${planetSpecial}_a.png`;
}
