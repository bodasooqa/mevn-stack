<template>
    <div class="main">
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
                        <button @click="showPass" class="btn btn-primary">Edit password</button>
                    </div>

                    <transition name="slide-fade">
                        <div v-if="passEditState" class="col-md-4 mt-3">
                            <label for="pass">Put your current password:</label>
                            <div class="input-group">
                                <input v-model="pass" :class="{'is-valid': isValid}" :disabled="isValid"
                                       id="pass" type="password" class="form-control" placeholder="Password">
                                <div class="input-group-append">
                                    <button @click="checkPass" :class="{'btn-success': isValid}" :disabled="isValid"
                                            class="btn btn-primary" type="button">Send</button>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <transition name="slide-fade">
                        <div v-if="isValid" class="col-md-4 mt-3">
                            <label for="newPass">Put your new password:</label>
                            <div class="input-group">
                                <input v-model="newPass" id="newPass" type="password" class="form-control" placeholder="Password">
                                <div class="input-group-append">
                                    <button @click="updatePass" :class="{'btn-success': regExpCheck}"
                                            class="btn btn-primary" type="button">Send</button>
                                </div>
                            </div>
                            <small class="form-text text-muted">Min 8 characters: 1 lowercase, 1 uppercase letter, 1 numeral</small>
                        </div>
                    </transition>

                </div>
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

    export default {
        name: "Profile",
        data: function() {
            return {
                user: {},
                isValid: false,
                passEditState: false,
                pass: '',
                newPass: '',
                regExpCheck: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                dismissCount: 3,
                dismissCountDown: 0,
                alertMessage: '',
                alertType: ''
            }
        },
        created() {
            axios.get('/api/user')
                .then(res => {
                    this.user = res.data[0];
                    console.log(this.user);
                })
                .catch(err => console.error(err));
        },
        methods: {
            showPass() {
                this.passEditState = !this.passEditState;
            },
            checkPass() {
                if (this.pass === this.user.password) {
                    this.isValid = true;
                } else {
                    this.pass = '';
                    this.showAlert('Invalid current password', 'danger');
                }
            },
            updatePass() {
                if (this.regExpCheck.test(this.newPass) === true) {
                    axios.put(`/api/user/${this.user._id}/`, {
                        password: this.newPass,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).catch(err => console.error(err));
                    [this.pass, this.newPass, this.isValid, this.passEditState] = ['', '', false, false];
                    this.showAlert('Password successfully changed', 'success');
                } else {
                    this.newPass = '';
                    this.showAlert('Incorrect new password', 'danger');
                }

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
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>