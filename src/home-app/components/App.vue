<template>
    <div>
        <Header></Header>

        <div class="container">
            <div class="row mt-3">

                <TaskForm @add-task="addTask" :task="task"></TaskForm>

                <TaskList v-for="task in tasks" :task="task" :key="task._id"
                @change-task="changeState(task)" @delete-task="deleteTask(task._id)"></TaskList>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import Header from "./Header.vue";
    import TaskForm from "./TaskForm.vue";
    import TaskList from "./TaskList.vue";

    class Task {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            this.isComplete = false;
        }
    }

    export default {
        name: "App",
        components: {Header, TaskForm, TaskList},
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
                if (task.title && task.description) {
                    axios.post('/api/tasks', {
                        title: this.task.title,
                        description: this.task.description,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).catch(err => console.error(err));
                    this.task = new Task();
                    this.getTasks();
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
            }
        }
    }
</script>

<style lang="scss">
    body {
        background: #f3f5f9;
    }
    .card {
        -webkit-box-shadow: 0 0 6px 0 #b1b5bd;
        -moz-box-shadow: 0 0 6px 0 #b1b5bd;
        box-shadow: 0 0 6px 0 #b1b5bd;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        &:hover {
            -webkit-box-shadow: 0 0 12px 1px #b1b5bd;
            -moz-box-shadow: 0 0 12px 1px #b1b5bd;
            box-shadow: 0 0 12px 1px #b1b5bd;
        }
    }
</style>