<template>
    <div class="card">
        <div class="card-header text-white bg-dark">
            Tasks
        </div>
        <div class="card-body">
            <button class="btn btn-success mb-4">Add task</button>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">_id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Complete</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(task, i) in tasks">
                    <th scope="row">{{i + 1}}</th>
                    <td>{{task._id}}</td>
                    <td>{{task.title}}</td>
                    <td><input v-model="task.isComplete" @input="changeState(task)" type="checkbox"></td>
                    <td><button @click="deleteTask(task._id)" class="btn btn-danger"><fa-icon icon="trash-alt"></fa-icon></button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Home",
        data: function () {
            return {
                tasks: []
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            getTasks() {
                axios.get('/api/tasks')
                    .then(res => {
                        this.tasks = res.data;
                    })
                    .catch(err => console.error(err));
            },
            deleteTask(id) {
                axios.delete(`/api/tasks/${id}/`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).catch(err => console.error(err));
                this.getTasks();
            },
            changeState(task) {
                const state = !task.isComplete;
                axios.put(`/api/tasks/${task._id}/`, {
                    isComplete: state,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).catch(err => console.error(err));
                this.getTasks();
            }
        }
    }
</script>

<style scoped>

</style>