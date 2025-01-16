<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="add new tasks ..." v-model="newTask">
        <button type="submit"><i class="material-icons text-white">add</i></button>
    </form>
</template>

<script>
import { useTaskStore } from "../stores/TaskStore";
import { ref } from "vue";
import axios from "axios";

export default {
    setup() {
        const taskStore = useTaskStore();
        const newTask = ref("");  

        const handleSubmit = async () => {
            if (newTask.value.length > 0) {
                try {
                    // Send the new task to the server using axios
                    const response = await axios.post("http://localhost:3000/tasks", {
                        title: newTask.value,
                        isFav: false,
                        date: new Date().toISOString()  // Example date, adjust according to your schema
                    });

                    // If the task is successfully added, update your store
                    taskStore.addTask({
                        title: newTask.value,
                        isFav: false,
                        id: response.data.id,  // Use the ID from the server's response
                    });

                    // Fetch all tasks again to ensure the task list is up-to-date
                    await taskStore.fetchTasks();

                    // Clear the input field after submission
                    newTask.value = '';
                } catch (error) {
                    console.error("There was an error adding the task: ", error);
                }
            }
        };

        return { handleSubmit, newTask };
    },
};
</script>
