import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('TaskStore', {
    state: () => ({
        tasks: [],
        name: 'User'
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
        // Fetch all tasks from the backend
        async fetchTasks() {
          try {
            const response = await axios.get('http://localhost:3000/tasks');
            this.tasks = response.data;
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        },
    
        // Add a new task to the store and send it to the backend
        async addTask(task) {
          try {
            const response = await axios.post('http://localhost:3000/tasks', task);
            this.tasks.push(response.data);
          } catch (error) {
            console.error('Error adding task:', error);
          }
        },
    
        // Delete a specific task by id
        async deleteTask(id) {
          try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            this.tasks = this.tasks.filter((task) => task.id !== id);
          } catch (error) {
            console.error('Error deleting task:', error);
          }
        },
    
        // Toggle favorite status of a task
        async toggleFav(id) {
          const task = this.tasks.find((task) => task.id === id);
          if (task) {
            task.isFav = !task.isFav;
            try {
              await axios.put(`http://localhost:3000/tasks/${id}`, task);
            } catch (error) {
              console.error('Error updating favorite status:', error);
            }
          }
        },
    
        // Delete all tasks from the store and backend
        async deleteAllTasks() {
          try {
              const response = await axios.delete('http://localhost:3000/tasks');
              if (response.status === 204) {
                  this.tasks = [];
                  console.log('All tasks deleted');
              }
          } catch (error) {
              console.error("Error deleting all tasks:", error);
          }
      }      
    }
});
