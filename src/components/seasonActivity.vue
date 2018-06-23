<template>
  <div class="season-activity">
    <div class="common-title">当季活动</div>
    <div class="activity-swipe">
      <mt-swipe :auto="3000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
        <mt-swipe-item>4</mt-swipe-item>
        <mt-swipe-item>5</mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<style>
.season-activity {
  padding: 20px 0;
}
.activity-swipe {
  background: #fff;
  height: 140px;
  border-radius: 8px;
}
</style>
