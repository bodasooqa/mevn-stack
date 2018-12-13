<template>
    <div class="main">
        <div class="card">
            <div class="card-header text-white bg-dark">
                Tasks
            </div>
            <div class="card-body">
                <button @click="changeFormState" class="btn btn-success mb-4">Add task</button>
                <div class="row">
                    <div v-if="addTaskState" class="col-md-6">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input v-model="newTask.title" id="title" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="desc">Description</label>
                            <textarea v-model="newTask.description" class="form-control" id="desc"></textarea>
                        </div>
                        <button @click="addTask" class="btn btn-primary mt-3 mb-3">Send</button>
                    </div>
                </div>
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
        <b-alert :show="dismissCountDown" dismissible :variant="alertType" @dismissed="dismissCountDown=0" class="mt-3"
                 @dismiss-count-down="countDownChanged">
            <p>{{alertMessage}}</p>
        </b-alert>
    </div>
</template>

<script>
    import axios from 'axios';

    class Task {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            this.isComplete = false;
        }
    }

    export default {
        name: "Home",
        data: function () {
            return {
                tasks: [],
                addTaskState: false,
                newTask: {
                    title: '',
                    description: ''
                },
                dismissCount: 3,
                dismissCountDown: 0,
                alertMessage: '',
                alertType: ''
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            addTask() {
                if (this.newTask.title && this.newTask.description) {
                    axios.post('/api/tasks', {
                        title: this.newTask.title,
                        description: this.newTask.description,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).catch(err => console.error(err));
                    this.newTask = new Task();
                    this.showAlert('Task successfully added', 'success');
                    this.getTasks();
                } else {
                    this.showAlert('Incorrect Title or Description', 'danger')
                }
            },
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
            },
            changeFormState() {
                this.addTaskState = !this.addTaskState;
            },
            countDownChanged (dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert (message, type) {
                this.dismissCountDown = this.dismissCount;
                this.alertMessage = message;
                this.alertType = type;
            }
        }
    }
</script>

<style lang="scss">
    .main {
        position: relative;
    }
    .alert {
        position: absolute;
        width: 600px;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        opacity: 0.9;
    }
</style>