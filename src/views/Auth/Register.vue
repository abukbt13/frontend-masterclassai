
<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()

import {auth} from "@/composables/auth";
const {base_url} = auth()

const name = ref('')
const email = ref('')
const password = ref('')
const c_password = ref('')
const regerror = ref('')


const createAccount =async () => {
  if (email.value == '' && password.value == '') {
    regerror.value = 'Please fill all fields'
  } else if (password.value === c_password.value) {
    const formData = new FormData();
    formData.append('email', email.value)
    formData.append('name', name.value)
    formData.append('password', password.value)
    const res = await axios.post(base_url.value + 'v1/auth/register', formData)
    localStorage.setItem('token', res.data.token)
    if(res.status=== 200) {
      if (res.data.status === 'success') {
        await router.push('/')
      }
    }
  }
}


</script>

<template>
  <section class="vh-100">
    <div class="row px-3 d-flex justify-content-center align-items-center h-100">

      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="error text-center bg-danger text-white text-uppercase">{{regerror}}</div>
        <h2 class="text-center">Register here</h2>

        <p>Already have an account? <router-link to="/login">LOGIN</router-link></p>
        <form @submit.prevent="createAccount">


          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="John Mark">
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="password">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="c_password" placeholder="confirm password">
          </div>
          <div class="">
            <button type="submit" class="w-100 btn btn-primary btn-block">Register</button>
          </div>
          <br>

        </form>
      </div>

    </div>

  </section>
</template>

<style scoped>

</style>