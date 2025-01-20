<template>
    <div class="task border border-primary bg-info-subtle shadow-lg">
        <h3> {{ task.description }} </h3>
        <div class="icons">
            <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
            <i class="material-icons" :class="{active: task.isFav}" @click="taskStore.toggleFav(task.id)">favorite</i>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore';

export default {
    props: ['task'],
    setup(){
        const taskStore = useTaskStore()
        const deleteTask = async (id) => {
            await taskStore.deleteTask(id);
        };
        const toggleFavorite = async (id) => {
            try {
                const task = taskStore.tasks.find((t) => t.id === id);
                if (task) {
                    // Send the updated task details to the store
                    await taskStore.updateTask({
                        id,
                        title: task.description,
                        isFav: !task.isFav, // Toggle the favorite status
                        date: task.date,
                    });
                }
            } catch (error) {
                console.error('Error toggling favorite:', error);
            }
        };

        return { taskStore,deleteTask,toggleFavorite }
    }
}
</script>
