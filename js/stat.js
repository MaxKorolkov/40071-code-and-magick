'use strict';
window.renderStatistics = function (ctx, names, times) {
  // Тень
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetY = 10;
  ctx.shadowOffsetX = 10;

  // Облако
  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  // Отмена прорисовки тени
  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;

  // Текст в облаке
  ctx.fillStyle = '#000';
  ctx.font = '14px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Определение максимального времени в массиве times
  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  // Переменные для гистограммы
  var histogramHeight = 150;
  var step = histogramHeight / max;
  var histogramWidth = 40;
  var indent = 90;
  var initialX = 120;
  var initialY = 100;

  // Цвет гистограммы
  function getHistogramColor(nameHist) {
    if (nameHist === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    }
    return 'rgba(0, 0, 255, ' + Math.random() + ')';
  }

  // Отрисовка гистограммы
  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), initialX + indent * i, initialY + histogramHeight - times[i] * step - 10);

    ctx.fillStyle = getHistogramColor(names[i]);
    ctx.fillRect(initialX + indent * i, initialY + histogramHeight - times[i] * step, histogramWidth, times[i] * step);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight + 20);
  }
};
