function swap_music() {
  var oAudio = document.getElementById("myaudio");
  if (oAudio.paused) {
    oAudio.play();
    $(".open").css("display", "block");
    $(".close").css("display", "none");
  } else {
    oAudio.pause();
    $(".close").css("display", "block");
    $(".open").css("display", "none");
  }
}

function qifeng() {
  $(".sk_bottom").addClass("sikai");
  $(".sk_top").addClass("sikai_top");
  $(".qifeng").css("display", "none");
  $(".top_img_box0 img").addClass("tptx fangda");
  // $(".page0 img").addClass("");
  $(".foot0 p").addClass("wztx");
  $(".foot0 h2").addClass("bttx");
  setTimeout(function() {
    $(".box_nr1").css("display", "none");
    $(".jiantou").css("display", "block");

    // $(".container").css("display","block");
  }, 1000);
  // $(".box_nr1").css("display","none");
}

$(document).ready(function() {
  var nowpage = 0;
  //给最大的盒子增加事件监听
  $(".container").swipe({
    swipe: function(event, direction, distance, duration, fingerCount) {
      if (direction == "up") {
        nowpage = nowpage + 1;
      } else if (direction == "down") {
        nowpage = nowpage - 1;
      }
      if (nowpage == 0) {
        $(".top_img_box img").removeClass("fangda");
        $(".foot p").removeClass("wztx");
        $(".foot h2").removeClass("bttx");
        $(".top_img_box0 img").addClass("tptx fangda");
        // $(".page0 img").addClass("");
        $(".foot0 p").addClass("wztx");
        $(".foot0 h2").addClass("bttx");
      } else if (nowpage == 1) {
        $(".top_img_box img").removeClass("fangda");
        $(".foot p").removeClass("wztx");
        $(".foot h2").removeClass("bttx");
        $(".top_img_box1 img").addClass("fangda");
        $(".foot1 p").addClass("wztx");
        $(".foot1 h2").addClass("bttx");
      } else if (nowpage == 2) {
        $(".top_img_box img").removeClass("fangda");
        $(".foot p").removeClass("wztx");
        $(".foot h2").removeClass("bttx");
        $(".top_img_box2 img").addClass("fangda");
        $(".foot2 p").addClass("wztx");
        $(".foot2 h2").addClass("bttx");
        $(".jiantou").css("display", "block");
      } else if (nowpage == 7) {
        $(".top_img_box img").removeClass("fangda");
        $(".foot p").removeClass("wztx");
        $(".foot h2").removeClass("bttx");
        $(".foot3 p").addClass("wztx");
        $(".jiyi").addClass("wztx");
        $(".logo").addClass("logo_yd");
        $(".jiantou").css("display", "none");
      }

      if (nowpage > 7) {
        nowpage = 7;
      }

      if (nowpage < 0) {
        nowpage = 0;
      }

      $(".container").animate({ top: nowpage * -100 + "%" }, 400);

      $(".page")
        .eq(nowpage)
        .addClass("cur")
        .siblings()
        .removeClass("cur");
    }
  });
});
