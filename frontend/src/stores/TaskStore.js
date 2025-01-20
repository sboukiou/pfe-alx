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
            console.log('added')
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
        // update task
        async updateTask(updatedTask) {
          try {
              const response = await fetch(`/tasks/${updatedTask.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      title: updatedTask.title,
                      isFav: updatedTask.isFav,
                      date: updatedTask.date,
                  }),
              });

              if (!response.ok) {
                  throw new Error('Failed to update task');
              }

              const updated = await response.json();
              // Update the local state
              this.tasks = this.tasks.map((task) =>
                  task.id === updated.id ? updated : task
              );
          } catch (error) {
              console.error('Error updating task:', error);
          }
      },
        toggleFav(id) {
          const task = this.tasks.find((t) => t.id === id);
          if (task) {
              task.isFav = !task.isFav;
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
