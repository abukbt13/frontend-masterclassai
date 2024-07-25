
<script setup>


import {ref} from "vue";

const props = defineProps({
  threads: {
    type: Object,
  },
})

const threads = ref(props.threads)
const emit = defineEmits('newchat')
</script>
<template>
<!--  {{threads}}-->

</template>


<style scoped>
.thread {
  //background-color: #f7f7f7;
  height: 76vh;
}

</style>
