import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// main.js

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Import Bootstrap JS (optional, if you need Bootstrap JS components)
import 'bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App)

app.use(router)

app.mount('#app')
