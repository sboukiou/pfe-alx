<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="I have to do..." v-model="newTask">
        <div class="d-flex gap-2">
            <button class="btn btn-primary" type="submit" @click="add">
                <i class="material-icons text-white">add</i>
            </button>
            <button class="btn btn-primary" type="button" @click="fetchTasks">
                <i class="material-icons text-white">upload</i>
            </button>
            <button class="btn btn-danger" @click="deleteAllTasks" type="button">
                <i class="material-icons text-white">delete</i>
            </button>
        </div>
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
                    const response = await axios.post("http://localhost:3000/tasks", {
                        title: newTask.value,
                        isFav: false,
                        date: new Date().toISOString()
                    });
                    taskStore.addTask({
                        title: newTask.value,
                        isFav: false,
                        id: response.data.id,
                    });
                    await taskStore.fetchTasks();
                    newTask.value = '';
                } catch (error) {
                    console.error("There was an error adding the task: ", error);
                }
            }
        };
        const fetchTasks = async () => {
            await taskStore.fetchTasks();
        };
        const deleteAllTasks = async () => {
            try {
                await taskStore.deleteAllTasks();
            } catch (error) {
                console.error("Error deleting tasks: ", error);
            }
        };
        return { handleSubmit,fetchTasks,deleteAllTasks, newTask };
    },
};
</script>
