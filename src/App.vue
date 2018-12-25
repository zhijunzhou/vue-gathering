<template>
  <div id="app" :style="{'background-image': 'url(' + backgroundImage +')', 'background-size': '100% 100%'}">
    <div class="preloader-wrap">
      <div class="percentage" id="precent"></div>
      <div class="loader">
        <div class="trackbar">
          <div class="loadbar"></div>
        </div>
        <div class="glow"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import bj1 from "./asset/letter/bj1.png";
import bj2 from "./asset/letter/bj2.png";
import $ from "jquery";

export default {
  name: "app",
  data() {
    return {
      backgroundImage: bj1,
      nopadding: false
    };
  },
  created() {
    $(function() {
      var width = 100,
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime / 1000) % 60) * 100;

      // Loadbar Animation
      $(".loadbar").animate(
        {
          width: width + "%"
        },
        time
      );

      // Loadbar Glow Animation
      $(".glow").animate(
        {
          width: width + "%"
        },
        time
      );

      // Percentage Increment Animation
      var PercentageID = $("#precent"),
        start = 0,
        end = 100,
        durataion = time;
      animateValue(PercentageID, start, end, durataion);

      function animateValue(id, start, end, duration) {
        var range = end - start,
          current = start,
          increment = end > start ? 1 : -1,
          stepTime = Math.abs(Math.floor(duration / range)),
          obj = $(id);

        var timer = setInterval(function() {
          current += increment;
          $(obj).text(current + "%");
          //obj.innerHTML = current;
          if (current == end) {
            $('.preloader-wrap').css('z-index', '0');
            clearInterval(timer);
          }
        }, stepTime);
      }

      // Fading Out Loadbar on Finised
      setTimeout(function() {
        $(".preloader-wrap").fadeOut(300);
      }, time);
    });
  }
};
</script>

<style>
.preloader-wrap {
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  z-index: 10000;
}

.percentage {
  z-index: 100;
  border: 1px solid #ccc;
  text-align: center;
  color: #fff;
  line-height: 30px;
  font-size: 15px;
}

.loader,
.percentage {
  height: 30px;
  max-width: 500px;
  border: 2px solid #69af23;
  border-radius: 20px;
  font-weight: 300;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loader:after,
.percentage:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.trackbar {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  overflow: hidden;
  position: relative;
  opacity: 0.99;
}

.loadbar {
  width: 0%;
  height: 100%;
  /* background: repeating-linear-gradient(
    45deg,
    #008737,
    #008737 10px,
    #69af23 10px,
    #69af23 20px
  ); */
  background: #008737;
  box-shadow: 0px 0px 14px 1px #008737;
  position: absolute;
  top: 0;
  left: 0;
  animation: flicker 5s infinite;
  overflow: hidden;
}
.glow {
  width: 0%;
  height: 0%;
  border-radius: 20px;

  box-shadow: 0px 0px 60px 10px #008737;
  position: absolute;
  bottom: -5px;
  animation: animation 5s infinite;
}
@keyframes animation {
  10% {
    opacity: 0.9;
  }
  30% {
    opacity: 0.86;
  }
  60% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.75;
  }
}
</style>

