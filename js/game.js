const numDivs = 36;
const maxHits = 11;
let onstart = false;
let hits = 1;
let miss = 0;
let firstHitTime = 0;
function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(".grid-item").text("");
  $(".target").removeClass("target");
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
  // TODO: помечать target текущим номером
  
  // FIXME: тут надо определять при первом клике firstHitTime
 
   if (hits === maxHits) {
    endGame();
  }
   if (hits == 2 && onstart === false) {
    firstHitTime = new Date();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".page-1").hide();
  $(".page-2").show();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#goal").text(10 - miss);
  $("#missed").text(miss);


  //$("#win-message").removeClass("d-none");//
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".miss").removeClass("miss");
    round();
  }
  else {
    hits= hits + 1;
    $(".miss").removeClass("miss");
    $(".target").addClass("miss");
    miss=miss+1;
    $("#missnow").text(miss);

     round();
  }// TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  
 $("#button-start").click(function() {
  //location.reload();
  onstart = true;
  hits = 1;
  miss = 0;
  firstHitTime = new Date();
   $(".miss").removeClass("miss");
    $("#missnow").text(miss);

  round();

   }); 
  round();
  $("#missnow").text(miss);
 

  $(".grid-wrapper").click(handleClick);
  $("#button-reload").click(function() {
   
 
 location.reload();
  });
  $("#button-reload2").click(function() {
   
  $(".page-2").hide();
  $(".page-1").show();
 location.reload();
  });

}



$(document).ready(init);
