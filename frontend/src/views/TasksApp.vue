<template>
      <main>
    <header>
      <img src="../../public/img/logo.png" alt="pinia logo">
      <h1><span class="text-danger">{{TaskStore.name}}</span>'s Tasks</h1>
    </header>
    <!-- new task form -->
     <div class="new-task-form">
      <TaskForm />
     </div>
    <!-- filter -->
     <nav class="filter">
        <button class='shadow-lg bg-primary-subtle' @click="filter = 'all'">All tasks</button>
			<!--   <button class='shadow-lg bg-info-subtle' @click="filter = 'favs'">Fav tasks </button> -->
     </nav>
    <!-- tasks list -->
     <div class="task-list" v-if="filter === 'all'">
      <p class="badge rounded-pill badge-info">All tasks: {{ TaskStore.totalCounter }}</p>
      <h1 v-if="!TaskStore.tasks.length" class="text-center m-5">Today is all yours! 😄</h1>
      <div v-else v-for="task in TaskStore.tasks">
        <TaskDetails :task="task" />
      </div>
     </div>

     <div class="task-list" v-if="filter === 'favs'">
      <p class="badge rounded-pill badge-danger">Fav tasks '<i class="fa fa-heart" style="color:red"></i>': {{ TaskStore.isFavCounter }}</p>
      <div v-for="task in TaskStore.favs">
        <TaskDetails :task="task" />
      </div>
     </div>
  </main>
</template>
<script setup>
import TaskDetails from "../components/TaskDetails.vue";
import TaskForm from "../components/TaskForm.vue";
import { useTaskStore } from '../stores/TaskStore';
import { ref, onMounted } from "vue";

// Use the TaskStore Pinia store
const TaskStore = useTaskStore();
const filter = ref('all');
onMounted(async () => {
  await TaskStore.fetchTasks();
});

</script>
