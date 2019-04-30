<template>
  <section class="container">
    <h1>{{title}}</h1>
    <button @click="get">buttons</button>
  </section>
</template>

<script>
  const axios = require('axios');
  export default {
    data: function () {
      return {
        title: 'Axios',
      }
    },
    methods: {
      get() {
        axios.post("/api/", {"hoge":"fuga"}).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

