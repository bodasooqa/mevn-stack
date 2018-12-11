<template>
    <div>
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <router-link class="navbar-brand" to="/">MEVN App Admin</router-link>

                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="profile">Profile</router-link>
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
                                <router-link to="/" class="nav-link"><fa-icon icon="tasks"></fa-icon> Tasks</router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main" class="col-md-10 ml-sm-auto col-lg-10">
                    <div class="mt-3">

                        <router-view/>

                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import Home from "./Home.vue";

    export default {
        name: "App",
        components: {
            Home
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