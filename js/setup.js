'use strict';

var SIMILAR_WIZARDS_AMMOUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var USER_DIALOG = document.querySelector('.setup');
var SIMILAR_LIST_ELEMENT = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var myWisards = [];

var copyArr = function (arr) {
  return arr.slice(0, arr.length);
};

var wizardNamesCopied = copyArr(WIZARD_NAMES);
var wizardSurnamesCopied = copyArr(WIZARD_SURNAMES);
var coatColorsCopied = copyArr(COAT_COLORS);
var eyesColorsCopied = copyArr(EYES_COLORS);

// возвращает случайный елемент переданного массива, мб даже без повтора
var generateItem = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  var str = arr[i];
  arr.splice(i, 1);

  return str;
};

// пушит магов в массив
var generateMyWisards = function (arr, ammount) {
  for (var i = 0; i < ammount; i++) {
    var newWizard = {
      name: generateItem(wizardNamesCopied),
      surName: generateItem(wizardSurnamesCopied),
      coatColor: generateItem(coatColorsCopied),
      eyesColor: generateItem(eyesColorsCopied)
    };
    arr.push(newWizard);
  }
  return arr;
};

var renderWizard = function (wizard) {
  var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var placeWizardsInTemplate = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  SIMILAR_LIST_ELEMENT.appendChild(fragment);
};

// генерируем массив магов
myWisards = generateMyWisards(myWisards, SIMILAR_WIZARDS_AMMOUNT);

placeWizardsInTemplate(myWisards);

USER_DIALOG.classList.remove('hidden');
USER_DIALOG.querySelector('.setup-similar').classList.remove('hidden');
