<template>
  <section class="container">
    <h1>{{title}}</h1>
    <button @click="login">buttons</button>
  </section>
</template>

<script>
  import firebase from '~/plugins/firebase'

  const axios = require('axios');
  export default {
    data: function () {
      return {
        title: 'Axios',
        token: '',
        secret: ''
      }
    },
    created: function () {
    },
    methods: {
      login() {
        var self = this;
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
          self.token = result.credential.accessToken;
          self.secret = result.credential.secret;
          self.get();
        });
      },
      get() {
        axios.post("/api/", {token: this.token, secret: this.secret}).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

