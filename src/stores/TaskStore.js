import { defineStore } from 'pinia';
import axios from 'axios';  // Import axios to make API calls

export const useTaskStore = defineStore('TaskStore', {
    state: () => ({
        tasks: [],
        name: 'user'
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav)
        },
        totalCounter: (state) => {
            return state.tasks.length
        },
        isFavCounter: (state) => {
            return state.tasks.filter(t => t.isFav).length
        }
    },
    actions: {
        async fetchTasks() {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                this.tasks = response.data;
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        },

        async addTask(task) {
            try {
                const response = await axios.post('http://localhost:3000/tasks', task);
                this.tasks = response.data; 
            } catch (err) {
                console.error('Error adding task:', err);
            }
        },

        // deleteTask(id) {
        //     this.tasks = this.tasks.filter(t => t.id !== id);
        // },
        async deleteTask(id) {
            try {
              // Send the request to delete the task from the backend
              await axios.delete(`http://localhost:3000/tasks/${id}`);
              
              // Remove the task from the store
              this.tasks = this.tasks.filter((task) => task.id !== id);
            } catch (error) {
              console.error('Error deleting task:', error);
            }
          },

        toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;
        }
    }
});
