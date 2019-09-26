'use strict';

var SIMILAR_WIZARDS_AMMOUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIRE_BALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var USER_DIALOG = document.querySelector('.setup');
var SIMILAR_LIST_ELEMENT = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var KEY_ESC = 27;
var KEY_ENTER = 13;
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP = document.querySelector('.setup');
var SETUP_CLOSE = SETUP.querySelector('.setup-close');
var WIZARD_SETUP = document.querySelector('.setup-player');
var USER_NAME_INPUT = SETUP.querySelector('.setup-user-name');
var WIZARD_COAT = WIZARD_SETUP.querySelector('.wizard-coat');
var WIZARD_COAT_INPUT = WIZARD_SETUP.querySelector('input[name$="coat-color"]');
var WIZARD_EYES = WIZARD_SETUP.querySelector('.wizard-eyes');
var WIZARD_EYES_INPUT = WIZARD_SETUP.querySelector('input[name$="eyes-color"]');
var WIZARD_FIRE_BALL = WIZARD_SETUP.querySelector('.setup-fireball-wrap');
var WIZARD_FIRE_BALL_INPUT = WIZARD_SETUP.querySelector('input[name$="fireball-color"]');

var cloneArray = function (array) {
  return array.slice();
};

// отображение и прятки попап
var onPopupEscPress = function (evt) {
  if (evt.keyCode === KEY_ESC) {
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
  if (evt.keyCode === KEY_ENTER) {
    openPopup();
  }
});

SETUP_CLOSE.addEventListener('click', function () {
  closePopup();
});
SETUP_CLOSE.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    closePopup();
  }
});

// собщения при валидации формы
USER_NAME_INPUT.addEventListener('invalid', function () {
  if (USER_NAME_INPUT.validity.tooShort) {
    USER_NAME_INPUT.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (USER_NAME_INPUT.validity.tooLong) {
    USER_NAME_INPUT.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (USER_NAME_INPUT.validity.valueMissing) {
    USER_NAME_INPUT.setCustomValidity('Обязательное поле');
  } else {
    USER_NAME_INPUT.setCustomValidity('');
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

// обработчики
// обработчик пальто
var handleWizardCoatClick = function () {
  var color = COAT_COLORS[[Math.floor(Math.random() * COAT_COLORS.length)]];
  WIZARD_COAT.style.fill = color;
  WIZARD_COAT_INPUT.value = color;
};
// обработчик глаз
var handleWizardEyesColor = function () {
  var color = EYES_COLORS[[Math.floor(Math.random() * EYES_COLORS.length)]];
  WIZARD_EYES.style.fill = color;
  WIZARD_EYES_INPUT.value = color;
};
// обработчик файербола
var handleWizardFireBallColor = function () {
  var color = FIRE_BALL_COLORS[[Math.floor(Math.random() * FIRE_BALL_COLORS.length)]];
  WIZARD_FIRE_BALL.style.backgroundColor = color;
  WIZARD_FIRE_BALL_INPUT.value = color;
};

// изменение цвета мантии персонажа по нажатию
WIZARD_COAT.addEventListener('click', handleWizardCoatClick);

// изменение цвета глаз персонажа по нажатию
WIZARD_EYES.addEventListener('click', handleWizardEyesColor);

// изменение цвета файербола
WIZARD_FIRE_BALL.addEventListener('click', handleWizardFireBallColor);

// генерируем массив магов
renderWizards(generateWizardList(SIMILAR_WIZARDS_AMMOUNT));

USER_DIALOG.querySelector('.setup-similar').classList.remove('hidden');
