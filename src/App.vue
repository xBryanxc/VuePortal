<template>
    <nav class="flex items-center">
      <img class="logo w-36 h-auto mr-2 cursor-pointer" src="./images/Logo PROCOMER FL ES.png" alt="Logo" />
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/auth">Login</router-link>
    </nav>
  <router-view/>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
