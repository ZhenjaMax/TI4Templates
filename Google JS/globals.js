const agendaList = [
  "За:",
  "Против:"
];

const breaker = "<br>";
const nbsp = '\u00A0';
const newLine = '\n';
const multiplicationChar = '×';
const starChar = '✦';

const agendaPush = -43;
function __getLineSpacing__(baseFontSize) { return Math.round(1.5*baseFontSize); }
function __getAbilityFontSize__(baseFontSize) { return Math.round(0.8*baseFontSize); }
function __getAbilityOffset__(baseFontSize) { return 9 + (baseFontSize > 30 ? 1 : 0) + Math.floor(Math.max(0, baseFontSize-35)/2.5); }
function __getAbilityOffsetThin__(baseFontSize) { return 8 + Math.ceil(Math.max(0, baseFontSize-35.25)/2.5); }
function __getParagraphSpacing__(baseFontSize) { return Math.round(0.9*baseFontSize); }

function __getAbilityMarkup__(text, baseFontSize, isThin = false) {
  let offsetSize = isThin ? __getAbilityOffsetThin__(baseFontSize, isThin) : __getAbilityOffset__(baseFontSize, isThin);
  return `<push=0;${offsetSize}><f=Russo One;${__getAbilityFontSize__(baseFontSize)};0;0;0;0>${text}</f><push=0;-${offsetSize}>`;
}
function __getAgendaMarkup__(text, baseFontSize) { return `<push=${agendaPush}><f=Myriad Pro Light;${baseFontSize};1;0;1;0>${text}</f>`; }
function __getConditionMarkup__(text, baseFontSize) { return `<f=Myriad Pro;${baseFontSize};1;0;0;0>${text}</f>`; }
function __getCenteredMarkup__(text) { return `<ac>${text}</ac>`; }
function __getParagraphMarkup__(baseFontSize) { return `${breaker}<push=0;${__getParagraphSpacing__(baseFontSize)}>`; }

function __replaceAbilities__(text, baseFontSize, isThin = false) { return text.replace(/«[А-ЯЁA-Z×()\d\s\-<br>]*»/g, __getAbilityMarkup__("$&", baseFontSize, isThin)); }
function __replaceAgendas__(text, baseFontSize) { return text.replace(new RegExp(agendaList.join('|'), 'g'), __getAgendaMarkup__("$&", baseFontSize)); }
function __replaceConditions__(text, baseFontSize) { return text.replace(/(?<=^|\n)(?=.{8,}:)[^\n]*?:/g
, __getConditionMarkup__("$&", baseFontSize)); }
function __replaceParagraphs__(text, baseFontSize) { return text.replaceAll(newLine, __getParagraphMarkup__(baseFontSize)); }

function __filterTextList__(texts) { return texts.filter(text => (typeof text === "string") && (text.length > 0) && (text !== "null")).map(text => text.trim()); }

function __getTextFormatted__(text, baseFontSize, isThin = false) {
  return `<ls=${__getLineSpacing__(baseFontSize)}><fs=${baseFontSize}>${[__replaceAbilities__, __replaceAgendas__, __replaceConditions__, __replaceParagraphs__].reduce((result, replacer) => replacer(result, baseFontSize, isThin), text)}</fs></ls>`;
}

function __insertNBSPformatted__(text, minLineSize = 0, maxLineSize = 999, separatorSubstring = "", isCentered = false) {
  const indexOfSeparator = Math.max(text.indexOf(separatorSubstring), 0);
  const prefix = text.slice(0, indexOfSeparator + separatorSubstring.length);
  const content = text.slice(indexOfSeparator + separatorSubstring.length);
  
  const words = content.split(" ").filter(word => word !== "");
  if (words.length === 0) {
    return text;
  }

  const resultParts = [];

  const checkFirstWordList = [newLine, breaker];
  checkFirstWordList.forEach(checkWord => {
    let checkIndex = words[0].indexOf(checkWord);
    if(checkIndex !== -1) {
      resultParts.push(words[0].slice(0, checkIndex));
      words[0] = words[0].slice(checkIndex + checkWord.length);
    }
  });
  if(words[0] === "") {
    words.shift();
  }

  let currentLine = "";
  words.forEach((word) => {
    if (currentLine.length === 0) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxLineSize) {
      currentLine = currentLine + nbsp + word;
    } else {
      resultParts.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine.length !== 0) {
    resultParts.push(currentLine);
  }
  if(prefix.length !== 0) {
    resultParts.unshift(prefix);
  }
  return resultParts
    .map(part => (isCentered) ? nbsp.repeat(Math.floor(Math.max(0, minLineSize-part.length)/2)) + part + nbsp.repeat(Math.floor(Math.max(0, minLineSize-part.length)/2)) : part + nbsp.repeat(Math.max(0, minLineSize-part.length)))
    .join(breaker);
}
