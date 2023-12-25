<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useSessionStore } from './stores/session';
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore()
const { name } = storeToRefs(sessionStore)

</script>

<template>
    <div id="topmenu" class="menu">
        <div class="links">
            <RouterLink to="/">Hemma</RouterLink>
            <RouterLink to="comp">Comp</RouterLink>
        </div>
        <div class="user">
            <span>{{ name }}</span>
            <RouterLink to="logout">Logout</RouterLink>
        </div>
    </div>
    <div id="content">
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
#content {
    padding: 1em;
}

#topmenu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.menu {
    background-color: #006699;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

a,
span {
    background-color: #006699;
    display: inline-block;
    padding: 1em 0.5em 1em 0.5em;
    color: #e3f7fc;
    text-decoration: none;
}

a {
    font-family: Verdana, Geneva, Tahoma, sans-serif
}

a:hover {
    background-color: #0e86ba;
}
</style>
