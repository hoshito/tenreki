<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo"><img src="../assets/tenreki_logo.png"></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <!--
          <li><a href="sass.html"></a></li>
          <li><a href="badges.html"></a></li>
          <li><a href="collapsible.html"></a></li>
          -->
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

nav {
  margin-bottom: 20px;
  background-color: #e9ddc6;
}
.brand-logo img {
  width: 85px;
}
</style>
