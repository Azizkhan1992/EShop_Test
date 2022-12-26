<template>
    <div class="comment-form">
        <textarea v-model="form.comment" cols="50" rows="3" placeholder="Kommentariya qoldiring"></textarea>
        <button class="comment-btn" @click="makeComment">Jo'natish</button>
    </div>
</template>
<script>
import Services from '@/services/api-services';
export default {
    name: 'WriteComment',
    props: {
        productId: {
            type: [Number, String], 
            required: true
        }
    },
    data() {
        const productId = this.productId;
        return {
            form: {
                product_id: productId,
                comment: null
            }
        }
    },
    methods: {
        makeComment() {
            if (!this.form.comment) {
                this.$notify.error('Izoh kiriting!');
                return;
            }
            
            Services.writeComment(this.form)
            .then(res => {
                if (res.data.success) {
                    this.form.comment = null;
                    this.$emit('addComment', res.data.data);
                } else {
                    this.$notify.error('Izoh qoldirib bo\'lmadi!');
                }
            }, error => console.log(error))
        }
    }
}
</script>