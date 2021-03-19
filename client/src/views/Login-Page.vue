<template>
    <div class="login-section">
      <div class="cover-login">
        <div class="login-overlay-content">
        </div>
        <div class="login-cover-content">
            <h1 class="title-login">Hey ADMIN !</h1>
            <p class="p-login">Welcome Back</p>
            <p>You are just one step away to your feed</p>
        </div>
      </div>
      <div class="form-login">
        <div class="form-login-title">
            <h1>SIGN IN</h1>
        </div>
        <div class="login-form">
          <form @submit.prevent="login">
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div v-if="errorLogin === true" class="error-login-display">
                <div class="alert alert-danger alert-login" role="alert">
                  form cannot be empty
                </div>
              </div>
              <button type="submit" class="login-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errorLogin: false
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }

      if (!this.email || !this.password) {
        this.errorLogin = true
        setTimeout(() => {
          this.errorLogin = false
        }, 3000)
      } else {
        this.$store.dispatch('login', payload)
      }
    }
  }
}
</script>

<style>
.login-section {
  width: 100%;
  height: 100vh;
  /* background: black; */
  display: flex;
  /* color: white; */
}

.cover-login {
  width: 50%;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80");
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  text-align: center;
  position: relative;
}

.login-overlay-content {
  width: 100%;
  height: 100%;
  background: rgb(8, 7, 49);
  opacity: 0.4;
}

.login-cover-content {
  width: 70%;
  height: 70%;
  position: absolute;
  top: 150px;
}

.title-login {
  font-weight: bold;
  font-size: 60px;
  margin-bottom: 20px;
}

.p-login {
  margin-bottom: 5px;
}

.login-cover-content p {
  font-size: 20px;
}

.form-login {
  width: 50%;
  height: 100vh;
  color: rgb(8, 7, 49);
}

.form-login-title {
  margin-top: 10vh;
  padding: 10px 50px;
  padding-top: 30px;
  font-size: 10px;
}

.form-login-title h1 {
  font-size: 30px;
  font-weight: bold;
}

.login-form {
  padding: 20px 50px;
}

.login-btn {
  width: 100%;
  background: rgb(63, 61, 192);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  transition: .3s;
}

.login-btn:hover {
  background: rgb(8, 7, 49);
}

.error-login-display {
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
}

.alert-login {
  width: 100% !important;
}

</style>
