<template>
    <div class="product-comments">
        <div class="comment-list">
            <comment-item
                v-for="(comment, idx) in comments"
                :key="idx"
                :data="comment"
            ></comment-item>
        </div>
        <write-comment v-if="$store.state.isAuth" :product-id="productId" @addComment="getComments"></write-comment>
    </div>
</template>
<script>
import CommentItem from '@/components/commets/CommentItem';
import WriteComment from '@/components/commets/WriteComment';
import Services from '@/services/api-services';

export default {
    name: "AppComments",
    props: {
        productId: {
            type: [Number, String],
            required: true
        }
    },
    components: {CommentItem, WriteComment},
    data() {
        return {
            filter: {
                page: 1,
                perPage: 5,
                product_id: null
            },
            comments: []
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments(page = null, comment_id = null) {
            const query = this.getQueryParams(page);
            Services.getComments(this.productId, query, comment_id)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    if (comment_id) {
                        this.comments = [...this.comments, ...data.data.list];
                    } else {
                        this.comments = data.data.list;
                    }
                    this.total = data.data.total
                    // console.log(this.comments)
                }
            })
        },
        addComment(comment) {
            this.comments.unshift({
                ...comment.comment,
                user: {name: comment.name}
            });
        },
        getQueryParams(page) {
            if (page) {
                this.filter.page = page;
            }

            let params = {
                page: this.filter.page,
                limit: this.filter.perPage
            }

            return '?' + new URLSearchParams(params).toString();
        }
    }
}
</script>