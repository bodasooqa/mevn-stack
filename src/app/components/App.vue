<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="#">MEVN App</a>
        </nav>
        <div class="container">
            <div class="row mt-3">
                <div class="col-md-8 offset-md-2">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                    <input v-model="task.title"
                                           placeholder="Insert title" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description"
                                              placeholder="Insert description" class="form-control"></textarea>
                                </div>
                                <button class="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div v-for="task in tasks" class="col-md-8 offset-md-2 mt-3">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <div class="info">
                                <h5 class="card-title"
                                    :class="{ 'text-muted': task.isComplete }">{{ task.title }}</h5>
                                <p class="card-text"
                                   :class="{ 'text-muted': task.isComplete }">{{ task.description }}</p>
                            </div>
                            <div class="buttons">
                                <button class="btn btn-warning" v-if="task.isComplete"
                                        @click="changeState(task)">Open</button>
                                <button class="btn btn-success" v-else @click="changeState(task)">Close</button>
                                <button class="btn btn-danger" @click="deleteTask(task._id)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    class Task {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            this.isComplete = false;
        }
    }

    export default {
        name: "App",
        data: function () {
            return {
                task: {
                    title: '',
                    description: ''
                },
                tasks: []
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            addTask() {
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(err => console.error(err));
                this.task = new Task();
                this.getTasks();
            },
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data;
                    })
                    .catch(err => console.error(err));
            },
            deleteTask(id) {
                fetch(`/api/tasks/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(err => console.error(err));
                this.getTasks();
            },
            changeState(task) {
                const state = {isComplete: !task.isComplete};
                fetch(`/api/tasks/${task._id}/`, {
                    method: 'PUT',
                    body: JSON.stringify(state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(err => console.error(err));
                this.getTasks();
            }
        }
    }
</script>

<style lang="scss">
    body {
        background: #f3f5f9;
    }
</style>