<template>
    <div class="card">
        <div class="card-header">
            Profile
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-2 col-sm-4"><p><strong>Email:</strong></p></div>
                <div class="col-md-10 col-sm-8"><p>{{user.email}}</p></div>
                <div class="col-md-2 col-sm-4"><p><strong>Username:</strong></p></div>
                <div class="col-md-10 col-sm-8"><p>{{user.username}}</p></div>
                <div class="col-md-12">
                    <button class="btn btn-primary">Edit password</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Profile",
        data: function() {
            return {
                user: []
            }
        },
        created() {
            axios.get('/api/user')
                .then(res => {
                    this.user = res.data[0];
                    console.log(this.user);
                })
                .catch(err => console.error(err));
        }
    }
</script>

<style scoped>

</style>