<template>
    <div class="comment-item">
        <p>{{ data.user.name }}</p>
        <h3>{{ data.comment }}</h3>
        <app-rating :comment-id="data.id"></app-rating>
    </div>
</template>
<script>
import AppRating from '@/components/commets/AppRating';

export default {
    name: 'CommentItem',
    components: {AppRating},
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    mounted(){
        // this.logProps()
        this.changeRate()
        // console.log('comment', this.data)
    },  
    methods:{
        changeRate(){
            this.$store.commit('changeRate', this.data)
        },
        logProps(){
            console.log(this.data)
        }
    }
}
</script>