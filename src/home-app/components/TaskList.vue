<template>
    <div class="col-md-8 offset-md-2 mt-3">
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
                            @click="$emit('change-task')">Open</button>
                    <button class="btn btn-success" v-else @click="$emit('change-task')">Close</button>
                    <button class="btn btn-danger" @click="$emit('delete-task')">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TaskList",
        props: ['task']
    }
</script>

<style lang="scss" scoped>
    h5, p {
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
    }
    .text-muted {
        color: #b8c2cc!important;
        text-decoration: line-through;
    }
</style>