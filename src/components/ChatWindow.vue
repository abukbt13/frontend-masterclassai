<script setup>
import { defineProps } from "vue";

const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="chat-container mt-2"  v-for="chat in chats" :key="chat">

      <div class="message  question">
        {{ chat.question }}
      </div>
      <div class="message  response">
        {{ chat.response }}
      </div>
    </div>
</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column; /* Arrange messages vertically */
  gap: 10px;
}

.message {
  min-width: 70%;
  max-width: 80%; /* Set a maximum width for messages */
  padding: 10px;
  border-radius: 5px;
}

.question {
  align-self: flex-start;
  background-color: #f0f0f0;
}

.response {
  align-self: flex-end;
  background-color: #e0f7fa;
}
</style>
