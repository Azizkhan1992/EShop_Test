<template>
    <div class="login-page">
        <div class="shop-logo" @click="goToHome">
				<img class="logoImg" src="@/assets/Images/Letter.png" alt="">
				<h1>Shopka</h1>
			</div>
        <div class="auth-wr">
            <h1>Sign in</h1>
            <div class="login-form">
            <auth-form @auth="login"></auth-form>
        </div>
        <div class="login-footer">
            <a href="/register">Register?</a>
        </div>
        </div>
    </div>
</template>
<script>
import Services from '@/services/api-services';
import TokenService from '@/services/token-service';
import AuthForm from '@/components/AuthForm';

export default {
    name: 'AppLogin',
    components: {AuthForm},
    data() {
        return {
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login(form) {
            Services.login(form)
            .then(res => {
                if (res.data.status == 'success') {
                    TokenService.saveToken(res.data.authorisation.token);
                    this.$router.push({name: 'home'});
                    this.$notify.success('Tizimga kirildi!');
                    this.$store.commit('changeAuth', !!TokenService.getToken());
                } else {
                    this.$notify.error('Tizimga kirishda xatolik!');
                }
            }, error => console.log(error));
        },
        goToHome(){
			if(this.$route.path !== '/'){
				this.$router.push({path: '/'})
			}
		},
    }
}
</script>