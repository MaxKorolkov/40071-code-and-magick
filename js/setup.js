'use strict';
// Возвращение случайного элемента из массива
function randomArrayElement(array) {
  return array[randomInteger(0, array.length - 1)];
}

// объект с данными для похожих персонажей
var wizardsData = {
  firstNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

// создание случайного персонажа методом случайной выборки из wizardsData
function getRandomWizard() {
  return {
    name: randomArrayElement(wizardsData.firstNames) + ' ' + randomArrayElement(wizardsData.lastNames),
    coatColor: randomArrayElement(wizardsData.coatColor),
    eyesColor: randomArrayElement(wizardsData.eyesColor)
  };
}

// заполнение массива похожих персонажей
function getWizardsArray(number) {
  var array = [];
  for (i = 0; i < number; i++) {
    array.push(getRandomWizard());
  }
  return array;
}

// объявление массива похожих персонажей и заполнение через функцию с количеством эллементов;
var wizards = getWizardsArray(4);

// Показ диалога инвентаря
document.querySelector('.setup').classList.remove('hidden');

// переменные списка похожих персонажей и шаблона персонажа
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// заполнение шаблона персонажа из массива
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

// Добавление персонажей через DocumentFragment
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// показ списка похожих персонажей
document.querySelector('.setup-similar').classList.remove('hidden');
