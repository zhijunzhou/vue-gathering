<template>
  <div :style="{'width': '100%', 'height': breakHeight + 'px'}"></div>
</template>

<script>
export default {
  props: {
    breakHeight: {
      default: 10
    }
  }
}
</script>
