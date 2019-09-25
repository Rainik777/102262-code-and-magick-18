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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP = document.querySelector('.setup');
var SETUP_CLOSE = SETUP.querySelector('.setup-close');
var WIZARD_SETUP = document.querySelector('.setup-player');
var userNameInput = SETUP.querySelector('.setup-user-name');
var wizardCoat = WIZARD_SETUP.querySelector('.wizard-coat');
var wizardCoatInput = WIZARD_SETUP.querySelector('input[name$="coat-color"]');
var wizardEyes = WIZARD_SETUP.querySelector('.wizard-eyes');
var wizardEyesInput = WIZARD_SETUP.querySelector('input[name$="eyes-color"]');
var wizardFireBall = WIZARD_SETUP.querySelector('.setup-fireball-wrap');
var wizardFireBallInput = WIZARD_SETUP.querySelector('input[name$="fireball-color"]');

var cloneArray = function (array) {
  return array.slice();
};

// отображение и прятки попап
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

// собщения при валидации формы
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
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

// изменение цвета
var changeColor = function (array) {
  var arrayCloned = cloneArray(array);

  return getRandomItem(arrayCloned);
};

// изменение цвета мантии персонажа по нажатию
wizardCoat.addEventListener('click', function () {
  var color = changeColor(COAT_COLORS);
  wizardCoat.style.fill = color;
  wizardCoatInput.value = color;
});

// изменение цвета глаз персонажа по нажатию
wizardEyes.addEventListener('click', function () {
  var color = changeColor(EYES_COLORS);
  wizardEyes.style.fill = color;
  wizardEyesInput.value = color;
});

// изменение цвета файрбола
wizardFireBall.addEventListener('click', function () {
  var color = changeColor(FIRE_BALL_COLORS);
  wizardFireBall.style.backgroundColor = color;
  wizardFireBallInput.value = color;
});

// генерируем массив магов
renderWizards(generateWizardList(SIMILAR_WIZARDS_AMMOUNT));

USER_DIALOG.querySelector('.setup-similar').classList.remove('hidden');
