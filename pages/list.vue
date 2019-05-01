<template>
  <section class="container">
    <FullCalendar @eventRender="handleEventRender" defaultView="dayGridMonth" :plugins="calendarPlugins"
                  :events="events"></FullCalendar>
    <button @click="tweets">t_button</button>
    <button @click="login">button</button>
    <div class="row valign-wrapper" v-for="data in json_data" style="max-width:800px; border-bottom:solid 1px #eee">
      <div class="col s2">
        <div class="switch">
          <label>
            <input type="checkbox" :val="data.id">
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
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'

  const axios = require('axios');
  export default {
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data: function () {
      return {
        title: 'Axios',
        token: sessionStorage.getItem("token"),
        secret: sessionStorage.getItem("secret"),
        json_data: {},
        calendarPlugins: [dayGridPlugin],
        events: [
          {title: 'event 1', date: '2019-05-01'},
          {title: 'event 2', date: '2019-05-02'}
        ]
      }
    },
    created: function () {
      if (this.token && this.secret) {
        //this.get();
      }
    },
    methods: {
      login() {
//        if (this.token && this.secret) {
//          return false;
//        } else {
        var self = this;
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
          self.token = result.credential.accessToken;
          self.secret = result.credential.secret;
          sessionStorage.token = self.token;
          sessionStorage.secret = self.secret;
          self.tweets();
        });
//        }
      },
      get() {
        var self = this;
        axios.post("/api/", {token: this.token, secret: this.secret}).then(res => {
          var users = res.data.users;
          users.sort(function (a, b) {
            return b.followers_count - a.followers_count
          });
          self.json_data = users;
        }).catch(err => {
          console.log(err);
        });
      },
      tweets() {
        var self = this;
        axios.post("/api/tweets", {token: this.token, secret: this.secret}).then(res => {
          self.events = res.data;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      },
      handleEventRender(info) {
        if (info.el) {
          info.el.children[0].children[0].innerHTML = "<img src='" + info.event.extendedProps.image_url + "'>";
          var tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.text,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
          });
        }
      }
    }
  }
</script>

<style>

  @import '../node_modules/@fullcalendar/core/main.css';
  @import '../node_modules/@fullcalendar/daygrid/main.css';


  .popper,
  .tooltip {
    position: absolute;
    z-index: 9999;
    background: #FFC107;
    color: black;
    width: 150px;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    padding: 10px;
    text-align: center;
  }
  .style5 .tooltip {
    background: #1E252B;
    color: #FFFFFF;
    max-width: 200px;
    width: auto;
    font-size: .8rem;
    padding: .5em 1em;
  }
  .popper .popper__arrow,
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .tooltip .tooltip-arrow,
  .popper .popper__arrow {
    border-color: #FFC107;
  }
  .style5 .tooltip .tooltip-arrow {
    border-color: #1E252B;
  }
  .popper[x-placement^="top"],
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .popper[x-placement^="top"] .popper__arrow,
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement^="bottom"],
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .tooltip[x-placement^="bottom"] .tooltip-arrow,
  .popper[x-placement^="bottom"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="right"],
  .popper[x-placement^="right"] {
    margin-left: 5px;
  }
  .popper[x-placement^="right"] .popper__arrow,
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement^="left"],
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  .popper[x-placement^="left"] .popper__arrow,
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
</style>

