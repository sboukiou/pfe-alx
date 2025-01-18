<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <div class="d-flex justify-content-between w-100">
            <!-- Navbar Brand -->
            <a class="navbar-brand" href="#">
                <h4 class="title-nav">Todo <span class="title-span">List</span></h4>
            </a>

            <!-- Try it Now Button -->
            <div class="ms-auto">
                <router-link to="/tasks" @click="fetchTasks" class="btn btn-primary" type="button">Try it Now!!</router-link>
            </div>
        </div>
    </div>
</nav>
</template>
<script setup>
import { useTaskStore } from '../stores/TaskStore';

const taskStore = useTaskStore();

// Call fetchTasks from the store when the button is clicked
const fetchTasks = async () => {
  await taskStore.fetchTasks();
};
</script>