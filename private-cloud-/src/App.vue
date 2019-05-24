<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    console.log(this.$utils.api.monitor.add)
    console.log(this.$utils.api.company.edit)
    console.log('set-storage-aaa:', this.$utils.sessionStorage.setItem('aaa', '1234'))
    console.log('get-storage-aaa:', this.$utils.sessionStorage.getItem('aaa'))
    console.log(this.$utils)
    if (localStorage.token) {
      // const decodeToken = localStorage.token;
      // this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decodeToken));
      // this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
