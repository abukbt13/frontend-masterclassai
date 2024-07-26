
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {auth} from "@/composables/auth.js";

const {authUser, authHeader,base_url} = auth()

const question = ref('')
const props = defineProps({
  thread: {
    type: Number,
    required:true
  },
})

const emit = defineEmits(["response"]);
const thread_id=ref(props.thread)

const askQuiz = async () =>{
  const formdata = new FormData()
  formdata.append('question',question.value)
  formdata.append('thread_id',props.thread)

  const res =await axios.post('http://127.0.0.1:8000/api/v1/chats',formdata,authHeader)
  if(res.data.status === 'success'){
    question.value =""
    // question.value = ""; // Clear input field after sending
    emit("response", res.data.message);
  }
}
onMounted(()=>{
  authUser()
})

</script>

<template>
<!--{{thread}}-->
  <div class="message-input position-relative">
    <form @submit.prevent="askQuiz">
      <input style="width:55vw;"
          type="text"
          v-model="question"
          placeholder="Type a message..."
      />
      <button class="" type="submit">Send</button>
    </form>
  </div>
</template>

<style scoped>
.message-input {
  //width: 100vw;
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #f5f5f5;
}

.message-input input {
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.message-input button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.message-input button:hover {
  background-color: #0056b3;
}
</style>
