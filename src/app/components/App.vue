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
                                    <input v-model="task.title" placeholder="Insert title" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description" placeholder="Insert description" class="form-control"></textarea>
                                </div>
                                <button class="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="task in tasks" class="col-md-8 offset-md-2 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <div>
                                <h5 class="card-title">{{ task.title }}</h5>
                                <p class="card-text">{{ task.description }}</p>
                            </div>
                            <button class="btn btn-danger" @click="deleteTask(task._id)">Delete</button>
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
                console.log(id)
            }
        }
    }
</script>

<style lang="scss">
</style>