
<script setup>
import ChatWindow from "@/components/ChatWindow.vue";
import MessageInput from "@/components/MessageInput.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import {auth} from "@/composables/auth.js";
const {authUser, authHeader,base_url} = auth()

const chats = ref([])
const threads = ref([])
const thread_id = ref(0)
const  getLatestThread = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/v1/thread/active',authHeader)
  if(res){
    thread_id.value = res.data.thread[0].id
  }
}
const  getThreads = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/v1/threads',authHeader)
  if(res){
    threads.value = res.data.threads
  }
}
const  getChats = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/v1/chats',authHeader)
  if(res){
    chats.value = res.data.chats
  }
}
const handleNewResponse = (newChat) => {
  // alert(newChat)
  getLatestThread()
  getChats()
};
function clearThreadId(){
  thread_id.value = 0;
}
  const fetchActiveThread = async (id) => {
    thread_id.value = id;
    try {
      // Make the GET request
      const res = await axios.get('http://127.0.0.1:8000/api/v1/thread/update/'+thread_id.value, authHeader);

      // Log the response to inspect it
      console.log(res);

      // Check the status in the response data
      if (res.data.status === 'success') {
        // alert('Thread updated successfully!');

        // Call functions to update UI
        getLatestThread();
        getThreads();// Ensure you actually need to call this twice
        getChats()
      } else {
        console.error('Unexpected response:', res.data);
      }
    } catch (error) {
      // Handle errors such as network issues or server errors
      console.error('Error updating thread:', error);
    }
}
const extractDate = (datetime) => {
  return datetime.substring(0, 10); // Extracts the first 10 characters, i.e., YYYY-MM-DD
};

onMounted(()=>{
  getLatestThread()
  getThreads()
  authUser()
  getChats()
})

</script>
<template>
  {{thread_id}}
  <div class="body">
    <Header />
    <hr>
    <!--  {{chats}}-->
    <div class="container">
      <div class="row">
        <div class="col border-end col-3">
          <div class="thread">
            <h3>Threads <button class="btn btn-primary" @click="clearThreadId">New</button></h3>
            <div @click="fetchActiveThread(thread.id)" class="" v-for="thread in threads" :key="thread">
              <p>{{thread.name}}</p>
              <p> {{extractDate(thread.created_at)}}</p>
            </div>
          </div>
        </div>
        <div class="col col-9">
          <div class="chat">
            <ChatWindow :chats="chats" />
          </div>
          <div style="position: relative;">
            <MessageInput :thread="thread_id" @response="handleNewResponse"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.body{
  background-color: #f7f7f7;
}
.chat{

  min-height: 76vh;
  max-height: 76vh;
  overflow: scroll;
}
.thread {
  //background-color: #f7f7f7;
  height: 76vh;
}
</style>

