<template>
  <main>
    <header>
      <img src="../public/img/logo.png" alt="pinia logo">
      <h1>{{TaskStore.name}} Tasks</h1>
    </header>
    <!-- new task form -->
     <div class="new-task-form">
      <TaskForm />
     </div>
    <!-- filter -->
     <nav class="filter">
        <button @click="filter = 'all'">All tasks</button>
        <button @click="filter = 'favs'">Fav tasks</button>
     </nav>
    <!-- tasks list -->
     <div class="task-list" v-if="filter === 'all'">
      <p>All tasks: {{ TaskStore.totalCounter }}</p>
      <div v-for="task in TaskStore.tasks">
        <TaskDetails :task="task" />
      </div>
     </div>

     <div class="task-list" v-if="filter === 'favs'">
      <p>Fav Tasks: {{ TaskStore.isFavCounter }}</p>
      <div v-for="task in TaskStore.favs">
        <TaskDetails :task="task" />
      </div>
     </div>
  </main>
</template>
<script>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from './stores/TaskStore';
import { ref } from "vue";
  export default {
    components: {TaskDetails, TaskForm},
    setup (){
      const TaskStore = useTaskStore()
      const filter = ref('all')
      return { TaskStore,filter }
      }
  }
</script>
