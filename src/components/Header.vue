<template>
  <header class="header">
    <router-link to="/"><img class="logo" src="../assets/logo.svg"></router-link>
    <div class="logan">{{ msg }}</div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
      msg: "Technical Challenge"
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1.5rem;
    .logo{
      max-width: 350px;
      margin-bottom: 1rem;
    }
    .logan{
      font-size: 1.5rem;
    }
  }
</style>