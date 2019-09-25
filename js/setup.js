'use strict';

var SIMILAR_WIZARDS_AMMOUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var USER_DIALOG = document.querySelector('.setup');
var SIMILAR_LIST_ELEMENT = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP = document.querySelector('.setup');
var SETUP_CLOSE = SETUP.querySelector('.setup-close');
var cloneArray = function (array) {
  return array.slice();
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var openPopup = function () {
  SETUP.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  SETUP.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

SETUP_OPEN.addEventListener('click', function () {
  openPopup();
});
SETUP_OPEN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

SETUP_CLOSE.addEventListener('click', function () {
  closePopup();
});
SETUP_CLOSE.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

// возвращает случайный елемент переданного массива без повторов
var getRandomItem = function (array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
};

// пушит магов в массив из копий
var generateWizardList = function (ammount) {
  var wizardList = [];
  var wizardNames = cloneArray(WIZARD_NAMES);
  var wizardSurnames = cloneArray(WIZARD_SURNAMES);
  var coatColors = cloneArray(COAT_COLORS);
  var eyesColors = cloneArray(EYES_COLORS);
  for (var i = 0; i < ammount; i++) {
    var wizard = {
      name: getRandomItem(wizardNames),
      surName: getRandomItem(wizardSurnames),
      coatColor: getRandomItem(coatColors),
      eyesColor: getRandomItem(eyesColors)
    };
    wizardList.push(wizard);
  }
  return wizardList;
};

var prepareWizardElement = function (wizard) {
  var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(prepareWizardElement(arr[i]));
  }
  SIMILAR_LIST_ELEMENT.appendChild(fragment);
};

// генерируем массив магов
renderWizards(generateWizardList(SIMILAR_WIZARDS_AMMOUNT));

USER_DIALOG.querySelector('.setup-similar').classList.remove('hidden');
