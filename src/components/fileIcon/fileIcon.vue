<template>
  <span>
    <i v-if="icon === 'file-excel'" class="fa fa-file-excel fa-5x text-success"></i>
    <i v-else-if="icon === 'file-word'" class="fa fa-file-word fa-5x text-primary"></i>
    <i v-else-if="icon === 'file-powerpoint'" class="fa fa-file-powerpoint fa-5x text-warning"></i>
    <i v-else-if="icon === 'file-pdf'" class="fa fa-file-pdf fa-5x text-danger"></i>
    <i v-else-if="icon === 'plus'" class="fa fa-file fa-5x text-default"></i>
    <i v-else class="fa fa-file fa-5x text-info"></i>
  </span>
</template>

<script>
export default {
  props: ['icon']
}
</script>
