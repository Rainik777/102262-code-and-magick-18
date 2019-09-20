'use strict';

// Высота гистограммы 150px.
// Ширина колонки 40px.
// Расстояние между колонками 50px.
// Цвет колонки игрока Вы rgba(255, 0, 0, 1).
// Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.

var STAT_CLOUD_WIDTH = 420;
var STAT_CLOUD_HEIGHT = 270;
var STAT_CLOUD_X = 100;
var STAT_CLOUD_Y = 10;
var GAP = 10;
var MIN_SATURATION = 20; // для генератора цвета, min = 0
var MAX_SATURATION = 90; // для генератора цвета, max = 0
var HUE = 240; // для генератора цвета, 240 - синий цвет
var LIGHTNESS = '50%'; // для генератора цвета, яркость 50% - нормальный цвет
// цвета в константах
var COLOR = {
  black: '#000',
  blackTransperant: 'rgba(0, 0, 0, 0.7)',
  white: '#fff',
  red: 'rgba(255, 0, 0, 1)',
};

var statBlock = {
  height: 150,
  width: 40,
  gap: 50
};

// Генерирует цвет отдельного блока статистики
var generateColor = function () {
  var saturation = Math.floor(Math.random() * (MAX_SATURATION - MIN_SATURATION) + MIN_SATURATION) + '%';

  return ('hsl(' + HUE + ', ' + saturation + ', ' + LIGHTNESS + ')');
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, STAT_CLOUD_WIDTH, STAT_CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, STAT_CLOUD_X + GAP, STAT_CLOUD_Y + GAP, COLOR.blackTransperant);
  renderCloud(ctx, STAT_CLOUD_X, STAT_CLOUD_Y, COLOR.white);

  ctx.fillStyle = COLOR.black;

  var maxTime = Math.max.apply(null, times);

  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', (STAT_CLOUD_X + STAT_CLOUD_WIDTH) / 2, STAT_CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', (STAT_CLOUD_X + STAT_CLOUD_WIDTH) / 2 - 2 * GAP, STAT_CLOUD_Y + 3 * GAP);

  ctx.textBaseline = 'alphabetic';
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = COLOR.black;
    ctx.fillText(
        names[i],
        STAT_CLOUD_X + statBlock.gap * (i + 1) + statBlock.width * i,
        STAT_CLOUD_HEIGHT
    );
    if (names[i] === 'Вы') {
      ctx.fillStyle = COLOR.red;
      ctx.fillRect(
          STAT_CLOUD_X + statBlock.gap * (1 + i) + statBlock.width * i,
          STAT_CLOUD_HEIGHT - GAP * 2 - (statBlock.height * times[i]) / maxTime,
          statBlock.width,
          (statBlock.height * times[i]) / maxTime
      );
      ctx.fillStyle = COLOR.black;
      ctx.fillText(
          Math.floor(times[i]),
          STAT_CLOUD_X + statBlock.gap * (i + 1) + statBlock.width * i,
          STAT_CLOUD_HEIGHT - GAP * 3 - (statBlock.height * times[i]) / maxTime
      );
    } else {
      ctx.fillStyle = generateColor();
      ctx.fillRect(
          STAT_CLOUD_X + statBlock.gap * (1 + i) + statBlock.width * i,
          STAT_CLOUD_HEIGHT - GAP * 2 - (statBlock.height * times[i]) / maxTime,
          statBlock.width,
          (statBlock.height * times[i]) / maxTime
      );
      ctx.fillStyle = COLOR.black;
      ctx.fillText(
          Math.floor(times[i]),
          STAT_CLOUD_X + statBlock.gap * (i + 1) + statBlock.width * i,
          STAT_CLOUD_HEIGHT - GAP * 3 - (statBlock.height * times[i]) / maxTime
      );
    }
  }
};
