<template>
	<div class="main-layout">
		<nav>
			<div class="shop-logo" @click="goToHome">
				<img class="logoImg" src="@/assets/Images/Letter.png" alt="">
				<h1>Shopka</h1>
			</div>
			<div class="header-items">
				<a v-show="routeChecker" href="/">Products</a>
			<button v-if="$store.state.isAuth" @click="logout">Log out</button>
			<button v-else @click="$router.push({name: 'login'})">Log in</button>
			</div>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
import TokenService from '@/services/token-service';
import Services from '@/services/api-services';

export default {
	name: "default.vue",
	data(){
		return{
			routeChecker: false
		}
	},
	created() {
		this.changeIsAuth();
	},
	mounted(){
		this.checkRoute()
	},
	methods: {
		logout() {
			Services.logout()
			.then(res => {
				if (res.data.status == 'success') {
					TokenService.removeAll();
					this.$router.push({name: 'home'});
					this.$notify.success("Tizimdan chiqildi!");
					this.changeIsAuth();
					
				} else {
					this.$notify.error("Chiqishda xatolik!");
				}
			}, err => console.log(err));
		},
		checkRoute(){
			// console.log(this.$route.path)
			if(this.$route.path == '/'){
				this.routeChecker = false
			}else this.routeChecker = true
		},
		goToHome(){
			if(this.$route.path !== '/'){
				this.$router.push({path: '/'})
			}
		},
		changeIsAuth() {
			this.$store.commit('changeAuth', !!TokenService.getToken());
		}
	},
	watch: {
		'$route'(val){
			if(val.path == '/'){
				this.routeChecker = false
			}else this.routeChecker = true
		}
	}
};
</script>
