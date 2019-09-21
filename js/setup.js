'use strict'

var SIMILAR_WIZARDS_AMMOUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var myWisards = [];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// возвращает случайный елемент переданного массива
var generateItem = function (arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

// пушит магов в массив
var generateMyWisards = function (arr, ammount) {
  for (var i = 0; i < ammount; i++) {
    var newWizard = {
      name: generateItem(WIZARD_NAMES),
      surName: generateItem(WIZARD_SURNAMES),
      coatColor: generateItem(COAT_COLORS),
      eyesColor: generateItem(EYES_COLORS)
    };
    arr.push(newWizard);
  }
  return arr;
}

// генерируем массив магов
myWisards = generateMyWisards(myWisards, SIMILAR_WIZARDS_AMMOUNT);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < myWisards.length; i++) {
  fragment.appendChild(renderWizard(myWisards[i]));
}
similarListElement.appendChild(fragment);