const agendaList = [
  "За:",
  "Против:"
];

const abilitiesList = [
  "«ЗАГРАДИТЕЛЬНЫЙ ОГОНЬ»",
  "«КОСМИЧЕСКАЯ ПУШКА»",
  "«ПОГЛОЩЕНИЕ УРОНА»",
  "«ПЛАНЕТАРНЫЙ ЩИТ»",
  "«ПРОИЗВОДСТВО»",
  "«БОМБАРДИРОВКА»",
  "«РАЗВЁРТЫВАНИЕ»"   // На всякий случай
];

const breaker = "<br>";
const nbsp = '\u00A0';
const newLineChar = '\n';
const multiplicationChar = '×';
const starChar = '✦';
const spaceChar = ' ';
const hyphenChar = '-';

const agendaPush = -43;
const xTextShiftAmount = 120;
const xAbilityShiftAmount = 120;
const yAbilityShiftAmount = 325;
const yAbilityShiftAmountSmall = 300;
const starFontSize = 45;
const starPush = 10;

const unitImagesPush = {
  Mech:        { X: 750, Y: 350 },
  Infantry:    { X: 750, Y: 350 },
  SpaceDock:   { X: 750, Y: 350 },
  PDS:         { X: 750, Y: 350 },
  Fighter:     { X: 750, Y: 50  },
  Flagship:    { X: 300, Y: 50  },
  Dreadnought: { X: 300, Y: 50  },
  Carrier:     { X: 300, Y: 50  },
  Cruiser:     { X: 300, Y: 50  },
  Destroyer:   { X: 300, Y: 50  },
  WarSun:      { X: 350, Y: 45  },
};

const tileComponents = {
  Name: {
    P11:  { X: 1245,  Y: 1525 },
    P21:  { X: 947,   Y: 220  },
    P22:  { X: 1714,  Y: 1080 },
    P31:  { X: 1140,  Y: 123  },
    P32:  { X: 613,   Y: 1577 },
    P33:  { X: 1705,  Y: 1211 },
    PL11: { X: 1268,  Y: 1970 },
    PT22: { X: 1108,  Y: 2120 },
    PT31: { X: 1243,  Y: 204  },
    PT33: { X: 1629,  Y: 1285 },
  },
  Resource: {
    P11:  { X: 947,   Y: 1323 },
    P21:  { X: 644,   Y: 337  },
    P22:  { X: 1398,  Y: 1200 },
    P31:  { X: 1818,  Y: 142  },
    P32:  { X: 325,   Y: 1374 },
    P33:  { X: 1392,  Y: 1333 },
    PL11: { X: 910,   Y: 1832 },
    PT22: { X: 1762,  Y: 2042 },
    PT31: { X: 1856,  Y: 219  },
    PT33: { X: 1370,  Y: 1402 },
  },
  Influence: {
    P11:  { X: 1100,  Y: 1431 },
    P21:  { X: 797,   Y: 234  },
    P22:  { X: 1552,  Y: 1094 },
    P31:  { X: 1973,  Y: 255  },
    P32:  { X: 482,   Y: 1483 },
    P33:  { X: 1544,  Y: 1226 },
    PL11: { X: 1090,  Y: 1896 },
    PT22: { X: 1917,  Y: 1937 },
    PT31: { X: 2009,  Y: 331  },
    PT33: { X: 1523,  Y: 1298 },
  },
  Icon: {
    P11: { X: 784,  Y: 1255 },
    P21: { X: 497,  Y: 480  },
    P22: { X: 1956, Y: 1716 },
    P31: { X: 2048, Y: 473  },
    P32: { X: 168,  Y: 1119 },
    P33: { X: 1221, Y: 1544 },
  },
  Object: {
    P11: { X: 1149, Y: 966  },
    P21: { X: 836,  Y: 464  },
    P22: { X: 1391, Y: 1500 },
    P31: { X: 1484, Y: 440  },
    P32: { X: 455,  Y: 852  },
    P33: { X: 1519, Y: 1580 },
  },
  Crosshair: {
    P11:  { X: 655,   Y: 346, D: 1464 },
    PL11: { X: 493,   Y: 274, D: 1846 },
    P21:  { X: 351,   Y: 38,  D: 1464 },
    P22:  { X: 1106,  Y: 890, D: 1464 },
    P2:   { X: 579,   Y: 402, D: 1630 },
    P3:   { X: 496,   Y: 319, D: 1795 },
  },
  TextBoxes: {
    Hazardous:  "H",
    Industrial: "I",
    Cultural:   "C",
  },
};

function __getLineSpacing__(baseFontSize) { return Math.round(1.5*baseFontSize); }
function __getAbilityFontSize__(baseFontSize) { return Math.round(0.8*baseFontSize); }
function __getAbilityOffset__(baseFontSize) { return 9 + (baseFontSize > 30 ? 1 : 0) + Math.floor(Math.max(0, baseFontSize-35)/2.5); }
function __getAbilityOffsetThin__(baseFontSize) { return 8 + Math.ceil(Math.max(0, baseFontSize-35.25)/2.5); }
function __getParagraphSpacing__(baseFontSize) { return Math.round(0.9*baseFontSize); }

function __getPushMarkup__(x, y = 0) { return `<push=${x};${y}>`; }
function __getParagraphMarkup__(baseFontSize) { return breaker + __getPushMarkup__(0, __getParagraphSpacing__(baseFontSize)); }

function __wrapAbility__(text, baseFontSize, isThin = false) {
  let offsetSize = isThin ? __getAbilityOffsetThin__(baseFontSize, isThin) : __getAbilityOffset__(baseFontSize, isThin);
  return `${__getPushMarkup__(0, offsetSize)}<f=Russo One;${__getAbilityFontSize__(baseFontSize)};0;0;0;0>${text}</f>${__getPushMarkup__(0, -offsetSize)}`;
}
function __wrapCentered__(text) { return `<ac>${text}</ac>`; }
function __wrapCondition__(text, baseFontSize) { return `<f=Myriad Pro;${baseFontSize};1;0;0;0>${text}</f>`; }
function __wrapColor__(text, color) { return `<fc=${color}>${text}</fc>`; }
function __wrapFS__(text, baseFontSize) { return `<fs=${baseFontSize}>${text}</fs>`; }
function __wrapColorFS__(text, baseFontSize, color) { return __wrapColor__(__wrapFS__(text, baseFontSize), color); }
function __wrapItalic__(text, baseFontSize) { return `<f=Myriad Pro Light;${baseFontSize};1;0;1;0>${text}</f>`; }
function __wrapLSFS__(text, baseFontSize) { return `<ls=${__getLineSpacing__(baseFontSize)}>${__wrapFS__(text, baseFontSize)}</ls>`; }

function __replaceAbilities__(text, baseFontSize, isThin = false) { return text.replace(/«[А-ЯЁA-Z×()\d\s\-<br>]*»/g, __wrapAbility__("$&", baseFontSize, isThin)); }
function __replaceAgendaBinaryChoices__(text, baseFontSize) { return text.replace(new RegExp(agendaList.join('|'), 'g'), __getPushMarkup__(agendaPush) + __wrapItalic__("$&", baseFontSize)); }
function __replaceConditions__(text, baseFontSize) { return text.replace(/(?<=^|\n)(?=.{7,}:)[^\n]*?:/g
, __wrapCondition__("$&", baseFontSize)); }
function __replaceBreakes__(text) { return text.replaceAll(newLineChar, breaker); }
function __replaceParagraphs__(text, baseFontSize) { return text.replaceAll(newLineChar, __getParagraphMarkup__(baseFontSize)); }

function __filterTextList__(...texts) { return texts.filter(text => (typeof text === "string") && (text.length > 0) && (text !== "null")).map(text => text.trim()); }
function __applyStyles__(text, baseFontSize, isThin, ...styles) { return styles.reduce((result, replacer) => replacer(result, baseFontSize, isThin), text); }
function __getTextFormatted__(text, baseFontSize, isThin = false, ...additionalStyles) { return __applyStyles__(text, baseFontSize, isThin, __replaceAbilities__, __replaceConditions__, __replaceParagraphs__, __wrapLSFS__, ...additionalStyles); }

function __insertNBSPformatted__(text, minLineSize = 0, maxLineSize = 999, separatorSubstring = "", isCentered = false) {
  const splitIndex = Math.max(text.indexOf(separatorSubstring), 0) + separatorSubstring.length;
  const prefix = text.slice(0, splitIndex);
  const content = text.slice(splitIndex);
  const words = content.split(spaceChar).filter(w => w.length > 0);
  if (words.length === 0) {
    return text;
  }
  const resultParts = prefix.length > 0 ? [prefix] : [];

  // 1. Отрываем ведущие newLineChar / breaker от первого слова
  for (const marker of [newLineChar, breaker]) {
    const i = words[0].indexOf(marker);
    if (i !== -1) {
      resultParts.push(words[0].slice(0, i));
      words[0] = words[0].slice(i + marker.length);
    }
  }
  if (words[0].length === 0) {
    words.shift();
  }

  // 2. Жадная упаковка слов в строки
  let currentLine = "";
  for (const word of words) {
    if (currentLine.length === 0) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxLineSize) {
      currentLine += nbsp + word;
    } else {
      resultParts.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine.length !== 0) {
    resultParts.push(currentLine);
  }

  // 3. Добивка + склейка
  const pad = (part) => {
    const total = Math.max(0, minLineSize - part.length);
    const left  = isCentered ? Math.floor(total / 2) : 0;
    const right = isCentered ? left : total;
    return nbsp.repeat(left) + part + nbsp.repeat(right);
  };

  return resultParts.map(pad).join(breaker);
}

function __getTilePresetCommon__(index, amount, planetType, planetSpecial) { return `P${planetSpecial === "L" ? planetSpecial : (planetType !== "null") && (((amount === 2) && (index === 2)) || ((amount === 3) && ((index === 1) || (index === 3)))) ? "T" : ""}${amount}${index}`; }
