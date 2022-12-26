<template>
    <div class="auth-form">
        <div class="name" v-if="isRegister">
            <label for="name">Name: </label>
            <input class="authInp" v-model="form.name" type="text" id="name" placeholder="Ism kiriting"/>
        </div>
        <div class="username">
            <label for="email">Email: </label>
            <input class="authInp" v-model="form.email" type="email" id="email" placeholder="Email manzilni kiriting"/>
        </div>
        <div class="password">
            <label for="pass">Password: </label>
            <input class="authInp" v-model="form.password" type="password" id="pass" placeholder="Paroll kiriting" autocomplete="new new-password"/>
        </div>
        <div class="auth-btn">
            <button @click="$emit('auth', form)">{{ isRegister ? 'Register' : 'Login' }}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AuthForm',
    props: {
        isRegister: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                email: null,
                password: null
            }
        }
    }
}
</script>