<template>
  <div class="container">
        <div class="row">
            <div style="position: relative; margin: 0 auto; width: 500px; top: 200px;
            color:black; text-shadow: black 0px 0px 1px ">
                <form @submit.prevent="login">
                    <h1>WELCOME TO CMS ADMIN</h1>
                    <h1>LOGIN PAGE</h1>
                    <div class="form-group">
                        <label for="email">email: </label>
                        <input type="email" v-model="email" 
                        class="form-control" id="email">

                    </div>
                    <div class="form-group">
                        <label for="password">Password: </label>
                        <input type="password" v-model="password"  
                        class="form-control" id="password">
                    </div>
                    <div style="align-items: center; justify-content: center;">
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>

                    <button type="submit" class="btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router'
export default {
    name: "Login",
    data(){
        return{
            email: "",
            password: ""
        }
    },
    methods: {
        login(){
            this.$store.dispatch("login", {email: this.email, password: this.password, cb: () => {
                this.$router.push({path: "/dashboard"})
            }})
        }
    },

    beforeRouteEnter(to,form,next){
        console.log("before Route di login")
        if(localStorage.token){
            router.push({path: "/dashboard"})
        } else {
            next()
        }
    }

}
</script>

<style scoped>
    form{
        color: white;
    }
</style>>

