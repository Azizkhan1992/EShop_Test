<template>
<ul class="pagination" v-if="pageCount > 0">
    <li class="pagination-item" @click="prev">
        <!-- <a href="javascript:void(0)">
            &#8592;</a>  -->
            <button class="prev">
				<a href="javascript:void(0)">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.92 8.94995L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07996 8.94995"
							stroke="currentcolor"
							stroke-width="1.5"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</button>
        </li>
            
            <!-- <li class="pagination-item" v-if="currentPage >= 3 + buttonLimit" @click="goPage(1)">
                <a href="javascript:void(0)">
                    {{ 1 }}
                </a>

                <button class="prev">
				<a href="javascript:void(0)">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.92 8.94995L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07996 8.94995"
							stroke="currentcolor"
							stroke-width="1.5"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</button>
    </li> -->

    <li class="pagination-item" v-if="currentPage >= 4 + buttonLimit">
        <span>...</span>
    </li>

    <template v-for="(perPage, idx) in buttonLimit">
        <li class="pagination-item" :key="`last${idx}`"  v-if="currentPage >= 1 + (buttonLimit - perPage) + 1" @click="goPage(currentPage - (buttonLimit - perPage + 1))">
            <a class="perItem" href="javascript:void(0)">
                {{ currentPage - (buttonLimit - perPage + 1) }}
            </a>
        </li>
    </template>

    <li class="pagination-item active">
        <a class="perItem" href="javascript:void(0)">
            {{ currentPage }}
        </a>
    </li>

    <template v-for="(perPage, idy) in buttonLimit">
        <li class="pagination-item" @click="goPage(currentPage + perPage)" :key="`after${idy}`" v-if="pageCount + currentPage >= perPage+5">
            <a class="perItem" href="javascript:void(0)">
                {{ currentPage + perPage }}
            </a>
        </li>
    </template>

    <li class="pagination-item" v-if="pageCount - currentPage >= buttonLimit + 3">
        <span>...</span>
    </li>

    <!-- <li class="pagination-item" @click="goPage(pageCount)" v-if="pageCount - currentPage >= buttonLimit + 1">
        <a class="perItem" href="javascript:void(0)">
            {{ pageCount }}
        </a>
    </li> -->
    <li class="pagination-item">
        <button class="next">
				<a href="javascript:void(0)" @click.prevent="next">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.92 8.94995L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07996 8.94995"
							stroke="currentcolor"
							stroke-width="1.5"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</button>
        <!-- <a href="javascript:void(0)" @click.prevent="next">></a> -->
    </li>
</ul>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 10
        },
    },
    data() {
        return {
            buttonLimit: 3,
            currentPage: 1
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const queryPage = +this.$route.query.page;

            if (queryPage) {
                this.currentPage = queryPage;
            }

            this.goPage(this.currentPage)
        },
        prev() {
            if (this.canMovePrev) this.goPage(this.currentPage - 1);
        },
        next() {
            if (this.canMoveNext) this.goPage(this.currentPage + 1);
        },
        goPage(pageItem) {
            if(pageItem<6){
                this.setQueryPage(pageItem);
            this.$emit('goPage', pageItem);
            }else{
                this.setQueryPage(1)
                this.$emit('goPage', 1)
            }
        },
        setQueryPage(pageItem) {
            this.$router.push({
                query: {
                    page: +pageItem
                }
            }).catch(() => {});
        }
    },
    computed: {
        canMovePrev() {
            return this.currentPage > 1;
        },
        canMoveNext() {
            // console.log(this.currentPage, this.pageCount)
            return this.currentPage < this.pageCount+4;
        },
        pageCount() {
            // console.log(this.total)
            return Math.ceil(this.total / this.perPage);
        }
    },
    watch: {
        "page": function (val) {
            this.currentPage = val;
            this.setQueryPage(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    list-style: none;

    .pagination-item {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        margin-right: 10px;

        a {
            display: block;
            flex-grow: 1;
        }
    }

    .active {
        a {
            text-decoration: none;
            color: #000;
        }
    }
}
</style>
