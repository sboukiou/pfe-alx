import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import { createPinia } from 'pinia';

// Import global styles and dependencies
import './assets/main.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Create the Vue app instance
const app = createApp(App);

// Use the router and Pinia
app.use(router);
app.use(createPinia());

// Mount the app to the DOM
app.mount('#app');
