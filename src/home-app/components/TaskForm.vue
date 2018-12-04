<template>
    <div class="col-md-8 offset-md-2">
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="$emit('add-task')">
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
</template>

<script>
    export default {
        name: "TaskForm",
        props: ['task']
    }
</script>

<style scoped>

</style>