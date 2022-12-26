<template>
	<div class="product-item">
		<img class="product-image" :src="data.img" alt="">
		<div class="title-wr">
			<h3 class="product-name">{{ data.title | firstUC }}</h3>
		<button class="product-visit-btn" @click="goDetails">Batafsil</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "ProductItem",
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	methods: {
		goDetails() {
			this.$router.push({name: 'details', params: {slug: this.data.slug}})
		}
	}
}
</script>
