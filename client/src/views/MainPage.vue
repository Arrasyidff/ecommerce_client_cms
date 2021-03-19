<template>
<div>
  <div class="wrapper">
        <div class="side-nav">
          <NavBar></NavBar>
        </div>
        <div class="content">
          <router-view/>
        </div>
    </div>
</div>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  name: 'MainPage',
  components: {
    NavBar
  }
}
</script>

<style>
.wrapper {
  display: flex;
  position: relative;
}

.side-nav {
  width: 15%;
  background: rgb(8, 7, 49);
  color: white;
  height: 100vh;
  position: fixed;
}

.content {
  margin-left: 15%;
  min-height: 100vh;
  width: 100%;
}
</style>
