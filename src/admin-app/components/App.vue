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
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Enter username"
                                    v-model="username">
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
    import AuthenticationService from '../service/auth';
    const authService = new AuthenticationService;

    export default {
        name: "App",
        data: function () {
            return {
                username: '',
                password: '',
                error: null
            }
        },
        created() {

        },
        methods: {
            logIn() {
                try {
                    authService.login({
                        username: this.username,
                        password: this.password
                    })
                } catch (err) {
                    this.error = err.response.data.error;
                }

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