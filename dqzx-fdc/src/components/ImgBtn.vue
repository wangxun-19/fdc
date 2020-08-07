<template>
    <div class="middle">
        <van-image
                :src="src"
                :width="width"
                :height="height"
                :fix="fix"
        >
        </van-image>
        <label class="white">{{text}}</label>
    </div>
</template>

<script>
    export default {
        name: "ImgBtn",
        props:["src","text","width","height","fix"]
    }
</script>

<style scoped>
    .middle{
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .white{
        color: #fff;
    }
</style>