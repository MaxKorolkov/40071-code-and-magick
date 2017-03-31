'use strict';

// Переменные
var textColor = '#000';
var fontColor = '14px PT Mono';
var histogramHeight = 150;
var histogramWidth = 40;
var indent = 90;
var initialX = 120;
var initialY = 100;

// Получение максимального элемента в массиве
function getMax(array) {
  var max = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

// Функция возвращения случайного числа
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Цвет гистограммы - генерация случайного числа
function getHistogramColor() {
  return '#' + randomInteger(0, 255).toString(16) + randomInteger(0, 255).toString(16) + randomInteger(0, 255).toString(16);
}

// Функция прорисовки облака
function createCloud(ctx, color, cloudX, cloudY, width, height) {
  // Тень
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetY = 10;
  ctx.shadowOffsetX = 10;

  ctx.fillStyle = color;
  ctx.fillRect(cloudX, cloudY, width, height);

  // Отмена прорисовки тени
  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;
}

// Функция добавления текста
function createText(ctx, color, font, text, textX, textY) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, textX, textY);
}

// Отрисовка гистограммы
function createHistogram(ctx, times, numberTimes, step) {
  ctx.fillStyle = getHistogramColor();
  var xPos = initialX + indent * numberTimes;
  var yPos = initialY + histogramHeight - times[numberTimes] * step;
  var width = histogramWidth;
  var height = times[numberTimes] * step;
  ctx.fillRect(xPos, yPos, width, height);
}

// текст сверху - число на гистограмме
function topTextHistogram(ctx, times, numberTimes, step) {
  var text = Math.floor(times[numberTimes]);
  var xPos = initialX + indent * numberTimes;
  var yPos = initialY + histogramHeight - times[numberTimes] * step - 10;
  createText(ctx, textColor, fontColor, text, xPos, yPos);
}

// текст снизу - имя
function bottomTextHistogram(ctx, names, numberTimes) {
  var text = names[numberTimes];
  var xPos = initialX + indent * numberTimes;
  var yPos = initialY + histogramHeight + 20;
  createText(ctx, textColor, fontColor, text, xPos, yPos);
}


window.renderStatistics = function (ctx, names, times) {
  // Начало программы - отрисовка облака
  createCloud(ctx, '#fff', 100, 10, 420, 270);

  // Текст в облаке
  createText(ctx, textColor, fontColor, 'Ура вы победили!', 120, 40);
  createText(ctx, textColor, fontColor, 'Список результатов:', 120, 60);

  // получение шага для высоты гистрограммы
  var step = histogramHeight / getMax(times);

  // Отрисовка гистограмм для элементов массива times
  for (var i = 0; i < times.length; i++) {
    topTextHistogram(ctx, times, i, step);
    createHistogram(ctx, times, i, step);
    bottomTextHistogram(ctx, names, i);
  }
};
