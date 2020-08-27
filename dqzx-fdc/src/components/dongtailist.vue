<template>
    <div class="dongtais">
        <div class="img0">
            <MyImage :src="img" fit="cover" width="2.1rem" height="1.3rem"/>
        </div>
        <div class="content">
            <label class="title">{{title}}</label>
            <label class="desc">{{desc}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dongtailist",
        props:["img","title","desc"]
    }
</script>

<style lang="less" scoped>
    .dongtais{
        padding: 0.01rem;
        max-width: 100%;
        margin-top: 0.34rem;
        margin-left: 0.34rem;
        margin-right: 0.49rem;
        margin-bottom: 0.34rem;
        background-color: #FFFFFF;
        border: none;
        border-bottom: 0.01rem solid #F4F4F4;
        flex-direction: row;
        display: flex;
        .content{
            display: inline-block;
            flex-direction: column;
            width: 58%;
            margin: 0 auto;
            margin-left: 0.1rem;
            vertical-align: top;
            line-height: 1.25;
            .title{
                font-size: 0.35rem;
                color: #333333;
            }
            .desc{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-top: 0.15rem;
                color: rgba(153,153,153,1);
                font-size: 0.25rem;
            }
        }
    }

    .img0{
        display: inline-block;
    }
</style>