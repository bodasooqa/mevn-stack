<template>
    <div>
        <div class="container">
            <div class="row mt-3">
                <div class="col-md-4 offset-md-4">

                    <div class="card login-block">
                        <div class="card-body">
                            <h5 class="card-title">Log In</h5>
                            <form @submit.prevent="logIn">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter email"
                                    v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" placeholder="Password"
                                    v-model="password">
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        created() {

        },
        methods: {
            logIn() {

            }
        }
    }
</script>

<style lang="scss">
    body {
        background: #f3f5f9;
    }
    .login-block {
        margin-top: 60%;
    }
</style>