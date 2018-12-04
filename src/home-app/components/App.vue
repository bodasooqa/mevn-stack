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