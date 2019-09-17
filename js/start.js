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

var statBlock = {
  height: 150,
  width: 40,
  gap: 50
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, STAT_CLOUD_WIDTH, STAT_CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, STAT_CLOUD_X + GAP, STAT_CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, STAT_CLOUD_X, STAT_CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', (STAT_CLOUD_X + STAT_CLOUD_WIDTH) / 2, STAT_CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', (STAT_CLOUD_X + STAT_CLOUD_WIDTH) / 2 - 2 * GAP, STAT_CLOUD_Y + 3 * GAP);

  ctx.fillStyle = '#000';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('You', 100 + statBlock.gap, 270);
  ctx.fillRect(100 + statBlock.gap / 2, 250 - statBlock.height, statBlock.width, statBlock.height);

  ctx.fillStyle = '#000';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('You2', 100 + statBlock.gap + statBlock.gap, 270);
  ctx.fillRect(100 + statBlock.gap / 2, 250 - statBlock.height, statBlock.width, statBlock.height);
};
