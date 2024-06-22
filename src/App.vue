<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">ERC20 Interface</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Connect Wallet</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/deploy">Deploy Token</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/connect-token">Connect Token</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/token-functions">Token Functions</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: "App"
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

body {
    padding-top: 20px;
}
nav ul {
    list-style-type: none;
    padding: 0;
}
nav ul li {
    display: inline;
    margin-right: 10px;
}
</style>