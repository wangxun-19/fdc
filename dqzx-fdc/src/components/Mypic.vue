<template>
    <van-image
            :height="height?height:''"
            :width="width?width:'100%'"
            :round="round"
            :radius="radius"
            :fit="fit"
            alt="image"
            :src="src"
            @load="loadImg"
            @click="toUrl"
    >
        <template v-slot:loading>
            <van-loading type="spinner" size="20"></van-loading>
        </template>
        <template v-slot:error>
            <img :src="defaultImg" class="defaultImg" />
        </template>
    </van-image>
</template>

<script>
    export default {
        name: "Mypic",
        props: ["src", "round", "fit", "width", "height","radius"],
        data(){
            return{
                defaultImg:require('../assets/logo.png')
            }
        },
        methods:{
            loadImg(){
                this.$emit("loading");
            },
            toUrl(){
                this.$emit("error");
            }
        }
    }
</script>

<style scoped>
    .defaultImg{
        width: 50px;
        height: 50px;
    }
</style>