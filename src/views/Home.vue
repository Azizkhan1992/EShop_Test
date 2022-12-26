<template>
<div class="container">
    <!-- <div class="product-filter">
        <input v-model="filter.brand" type="text" class="product-brand" />
        <button @click="loadProducts(1)">
            Filter
        </button>
        <button @click="loadProducts(1, true)">
            Reset
        </button>
    </div> -->
    <!-- <div class="product-header">
        <h3>Topilgan mahsulotlar:</h3>
        <span>{{ total }} ta</span>
    </div> -->
    <div class="products">
        <product-item v-for="(product, id) in products" :key="id" :data="product"></product-item>
    </div>
    <div class="product-pagination">
        <pagination :total="total" :perPage="filter.perPage" :page="filter.page" @goPage="loadProducts"></pagination>
    </div>
</div>
</template>

<script>
import Services from '../services/api-services';
import ProductItem from '@/components/ProductItem';
import Pagination from '@/components/Pagination';

export default {
    name: 'home',
    components: {
        ProductItem,
        Pagination
    },
    data() {
        return {
            filter: {
                brand: null,
                page: 1,
                perPage: 9
            },
            total: 0,
            products: []
        }
    },
    created() {
        // this.loadProducts();
    },
    methods: {
        loadProducts(page = null, reset = false) {
            const query = this.getQueryParams(page, reset);

            Services.getProducts(query)
                .then(res => {
                    const data = res.data;
                    if (data.success) {
                        this.products = data.data.list;
                        this.total = data.data.total;
                    }
                }, error => console.log(error))
        },
        getQueryParams(page, reset) {
            console.log('query', page, reset)
            if (page) {
                this.filter.page = page;
            }

            if (reset) {
                this.filter.brand = null;
            }

            let params = {
                page: this.filter.page,
                limit: this.filter.perPage
            }

            if (this.filter.brand) {
                params.brand_like = this.filter.brand;
                // params._page = 1;
            }

            return '?' + new URLSearchParams(params).toString();
        }
    }
}
</script>
