<template>
    <div>
      <div class="title-nav">
        <h1>CMS</h1>
      </div>
        <div class="nav">
            <router-link :to="{name: 'Product'}">Product</router-link>
            <button class="btn-logout" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

.title-nav {
  text-align: center;
  color: white;
  padding: 10px;
}

.nav {
  display: flex;
  flex-direction: column;
}

.nav a {
  padding: 10px 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: .3s;
}

.nav a:hover {
  background: rgb(43, 41, 135);
}

.nav a.router-link-exact-active {
  background: rgb(43, 41, 135);
}

.btn-logout {
  padding: 9px 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: .3s;
  background: rgb(223, 68, 68);
  border: none;
  text-align: start;
}

.btn-logout:hover {
  background: rgb(194, 36, 36);
}
</style>
