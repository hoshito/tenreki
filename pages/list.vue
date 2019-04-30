<template>
  <section class="container">
    <h1>{{title}}</h1>
    <button @click="login">buttons</button>
      <div class="row valign-wrapper" v-for="data in json_data" style="max-width:800px; border-bottom:solid 1px #eee">
        <div class="col s2">
          <div class="switch">
            <label>
              <input type="checkbox">
              <span class="lever"></span>
            </label>
          </div>
        </div>
        <div class="col s2"><img :src="data.profile_image_url"></div>
        <div class="col s6">{{data.name}}</div>
        <div class="col s2">{{data.followers_count.toLocaleString() }}</div>
      </div>
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
        secret: '',
        json_data: {},
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
        var self = this;
        axios.post("/api/", {token: this.token, secret: this.secret}).then(res => {
          var users = res.data.users;
          users.sort(function(a, b){ return b.followers_count - a.followers_count });
          self.json_data = users;
        }).catch(err => {
          console.log(err);
        });
      },
    }
  }
</script>

