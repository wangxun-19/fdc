<template>
    <div class="dongtais">
        <div class="img0">
            <MyImage :src="img" fit="cover" width="112px" height="78px"/>
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
        padding: 1px;
        max-width: 100%;
        margin-top: 0.34rem;
        margin-left: 0.34rem;
        margin-right: 0.49rem;
        margin-bottom: 0.34rem;
        background-color: #FFFFFF;
        border: none;
        border-bottom: 1px solid #F4F4F4;
        flex-direction: row;
        display: flex;
        .content{
            display: inline-block;
            flex-direction: column;
            width: 58%;
            margin: 0 auto;
            margin-left: 15px;
            vertical-align: top;
            line-height: 1.25;
            .title{
                font-size: 18px;
                color: #333333;
            }
            .desc{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }

    .img0{
        display: inline-block;
    }
</style>