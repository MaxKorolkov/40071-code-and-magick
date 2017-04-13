'use strict';
/* global randomInteger */

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

// переменые для работы с окном персонажа
var setup = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var formUserInput = document.forms[0].elements[0];
var focusUserInput = false;

// обработчики фокуса на поле ввода имени пользователя
formUserInput.addEventListener('focus', function () {
  focusUserInput = true;
});

formUserInput.addEventListener('blur', function () {
  focusUserInput = false;
});

// функция закрытия окна персонажа
function closePopup() {
  setup.classList.add('hidden');
}

// обработчик нажатия Esc для закрытия окна персонажа
function onPopupEscPress(evt) {
  if (evt.keyCode === 27 && !focusUserInput) {
    closePopup();
  }
}

// закрытие окна при фокусе на иконку закрытия и нажатия Enter
function onSetupCloseEnter(evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
}

// функция открытия окна персонажа
function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('keydown', onSetupCloseEnter);
}

// обработчик клика по иконке пользователя
setupOpenIcon.addEventListener('click', openPopup);

// открытие персонажа при фокусе на иконке пользователя и нажатии Enter
function onIconEnterPress(evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
}

// обработчик нажатия Enter при фокусе на иконке пользователя
setupOpenIcon.addEventListener('keydown', onIconEnterPress);

// обработчик закрытия формы
setupClose.addEventListener('click', closePopup);

// объект с разными вариантами цветов для персонажа
var wizardColors = {
  'coat': ['rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  'eyes': ['black', 'red', 'blue', 'yellow', 'green'],
  'fireball': ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

// переменные элементов персонажа
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

// обработчики событий на нажатие элементов персонажа
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = randomArrayElement(wizardColors.coat);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = randomArrayElement(wizardColors.eyes);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = randomArrayElement(wizardColors.fireball);
});

