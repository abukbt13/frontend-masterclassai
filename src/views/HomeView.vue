
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
  const res = await axios.get(base_url.value+'v1/thread/active',authHeader)
  if(res.data.status ==='success'){
    thread_id.value = res.data.thread[0].id
  }
}
const  getThreads = async () => {
  const res = await axios.get(base_url.value+'v1/threads',authHeader)
  if(res.data.status ==='success'){
    threads.value = res.data.threads
  }
}
const  getChats = async () => {
  const res = await axios.get(base_url.value+'v1/chats',authHeader)
  if(res.data.status ==='success'){
    chats.value = res.data.chats
  }
}
const handleNewResponse = (newChat) => {
  // alert(newChat)
  getThreads()
  getLatestThread()
  getChats()
};
function clearThreadId(){
  thread_id.value = 0;
  chats.value = ([]);
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

function isToday(date) {
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate.toDateString() === today.toDateString();
}
function isYesterday(date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const inputDate = new Date(date);
  return inputDate.toDateString() === yesterday.toDateString();
}
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

onMounted(()=>{
  getLatestThread()
  getThreads()
  authUser()
  getChats()
})

</script>
<template>
<!--  {{thread_id}}-->
<!--  {{threads}}-->
<!--  {{isToday('2024-07-03')}}-->
  <div class="body">
    <Header />
    <hr>
    <!--  {{chats}}-->
    <div class="container">
      <div class="row">
        <div class="col border-end col-3">
          <div class="thread">
            <h3>
              Threads <i class="bi bi-plus" @click="clearThreadId"></i>
            </h3>
           <div v-if="Object.keys(threads).length > 0"  class="">
             <div v-for="(threads, date) in threads" :key="date" class="date-section">
               <!-- Display labels based on the date -->
               <h3>
                 <template v-if="isToday(date)">
                   <span class="label today">Today</span>
                 </template>
                 <template v-else-if="isYesterday(date)">
                   <span class="label yesterday">Yesterday</span>
                 </template>
                 <template v-else>
                   <span class="label">{{ formatDate(date) }}</span>
                 </template>
               </h3>
               <!-- Display the list of threads -->
               <ul class="list-unstyled">
                 <li  @click="fetchActiveThread(thread.id)"  v-for="thread in threads" :key="thread.id" class="post-item p-1 fs-5">
                   {{ thread.name }}
                 </li>
               </ul>
             </div>

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

li:hover{
  width: auto;
  padding-right: 2rem;
  background: #d6c5c5;
}
.body{
  background-color: #f7f7f7;
}
.chat{

  min-height: 76vh;
  max-height: 76vh;
  overflow-y: auto;
}
.thread {
  //background-color: #f7f7f7;
  min-height: 76vh;
  max-height: 76vh;
  overflow: scroll;

}
</style>

