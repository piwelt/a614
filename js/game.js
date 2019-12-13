const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $('.target').removeClass('target'); ❶
  $('.miss').removeClass('miss'); ❶

  let divSelector = randomDivId();
  $(divSelector).addClass('target')
  $(divSelector).text(hits + 1)
  // console.log(divSelector);

  if (hits === 1) { firstHitTime = getTimestamp(); } ❷
  if (hits === maxHits) { endGame(); } ❷
}

function endGame() {
  $('.game-field').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('#total-time-played').text(totalPlayedSeconds);

  $('#win-message').removeClass("d-none");
}

function handleClick(event) {
  let target = $(event.target)
  if (target.hasClass('target')) {
    hits = hits + 1;
    target.text('');
    round();
  } else { $(event.target).addClass('miss'); } ❷
}

function init() {
    round();

    $('.game-field').click(handleClick);
    $('#button-reload').click(function() {
      location.reload();
  });
}

$(document).ready(init);