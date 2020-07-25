<template>
    <div class="container">

        <div class="title">
            <h1>StoreStor Admin</h1>
        </div>
        <div class="mother">
            

            <form> 
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group mt-4">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
                <div class="buttoncontainer mt-4">
                    <button type="submit" @click.prevent="login()" class="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data(){
        return {
            email: '', 
            password: ''
        }
    },
    methods: {
        login(){
            this.$store.dispatch(`login`, { email: this.email, password: this.password})          
        },
    },
    
}
</script>

<style scoped>

    .title {
        margin-top: 120px;
        text-align: center;
    }
    .mother{
        border: solid 1px black;
        /* border-radius: 10px; */
        margin: 0px auto;
        width: 600px;
        padding: 50px;
        background: grey;
    }
    
    .btn {
        margin:0 100px;
        width: 300px;
    }

    /* .form-group {} */

    .buttoncontainer {
        /* background-color: red; */
        /* margin-top: 30px; */
    }


</style>