<template>
	<div class="product-details-container">
		<div class="product-item-details">
			<div class="product-img">
				<img :src="data.img" :alt="data.title">
			</div>
			<div class="product-details">
				<h3>Nomi: {{ data.title | firstUC }}</h3>
				<p>Batafsil ma'lumot: {{ data.description }}</p>
			</div>
		</div>
		<app-comments v-if="data.id" :product-id="data.id"></app-comments>
	</div>
</template>
<script>
import Service from '@/services/api-services';
import AppComments from '@/components/commets/AppComments';

export default {
	name: "ProductDetails",
	components: {AppComments},
	data() {
		return {
			data: {}
		}
	},
	created() {
		this.getProduct();
	},
	methods: {
		getProduct() {
			const slug = this.$route.params.slug;

			if (!slug) {
				this.$notify.error('Mahsulot topilmadi!');
				this.$router.push({name: 'home'});
				return;
			}

			Service.getProduct(slug)
			.then(res => {console.log(res.data.data)
				this.data = res.data.data;
			}, error => console.log(error));
		}
	}
}
</script>
