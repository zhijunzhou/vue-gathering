$(function() {
  var tc_g = $(window).height();
  $(".box").css("height", tc_g);
  $(".box_nr1").show();
  $("body").on(
    "touchmove",
    function(event) {
      // event.preventDefault;
    },
    false
  );

  var audio = $("#myaudio");
  if (audio && typeof audio.play === 'function') {
    audio.play();
  }

  //   var audio = document.getElementById("myaudio");
  //   audio.play();

    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.play();
      },
      false
    );
});
