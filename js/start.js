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
// для центровки текста в облаке статистики
var STAT_TEXT_GAP = STAT_CLOUD_X + 3 * GAP;

var STAT_BLOCK = {
  height: 150,
  width: 40,
  gap: 50
};

// Генерирует цвет отдельного блока статистики
var generateColor = function (hue, minSaturation, maxSaturation, lightness) {
  var saturation = Math.floor(Math.random() * (maxSaturation - minSaturation) + minSaturation) + '%';

  return ('hsl(' + hue + ', ' + saturation + ', ' + lightness + ')');
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
  ctx.fillText('Ура вы победили!', STAT_TEXT_GAP, STAT_CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', STAT_TEXT_GAP, STAT_CLOUD_Y + 4 * GAP);

  ctx.textBaseline = 'alphabetic';
  for (var i = 0; i < names.length; i++) {
    var statBlockHeight = (STAT_BLOCK.height * times[i]) / maxTime;
    var statBlockGap = STAT_CLOUD_X + STAT_BLOCK.gap * (1 + i) + STAT_BLOCK.width * i;

    ctx.fillStyle = COLOR.black;
    ctx.fillText(
        names[i],
        statBlockGap,
        STAT_CLOUD_HEIGHT
    );

    ctx.fillStyle = (names[i] === 'Вы') ? COLOR.red : generateColor(HUE, MIN_SATURATION, MAX_SATURATION, LIGHTNESS);

    ctx.fillRect(
        statBlockGap,
        STAT_CLOUD_HEIGHT - GAP * 2 - statBlockHeight,
        STAT_BLOCK.width,
        statBlockHeight
    );
    ctx.fillStyle = COLOR.black;
    ctx.fillText(
        Math.floor(times[i]),
        statBlockGap,
        STAT_CLOUD_HEIGHT - GAP * 3 - statBlockHeight
    );
  }
};
