<template>
    <div>
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">MEVN App Admin</a>

                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item" href="#">Edit password</a>
                            <a class="dropdown-item" href="/logout">Exit</a>
                        </div>
                    </li>
                </ul>
        </nav>

        <div class="container-fluid">
            <div class="row">
                <nav class="col-md-2 d-md-block d-none sidebar navbar-light bg-light">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a href="#" class="nav-link"><fa-icon icon="tasks"></fa-icon> Tasks</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main" class="col-md-10 ml-sm-auto col-lg-10">
                    <div class="mt-3">
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
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "App",
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

<style lang="scss">
    body {
        background: #f3f5f9;
    }
    .navbar-nav .dropdown-menu {
        position: absolute;
    }
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        padding: 48px 0 0;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
        .sidebar-sticky {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            height: calc(100vh - 48px);
            padding-top: 1rem;
            overflow-x: hidden;
            overflow-y: auto;
            .nav-link {
                color: #444444;
                font-weight: 500;
                &:hover {
                    color: #000000;
                }
            }
        }
    }
    main[role="main"] {
        padding-top: 56px;
    }
</style>