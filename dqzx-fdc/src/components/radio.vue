<template>
    <div class="btnBox" >
        <span class="btn" v-for="(item,index) in list" :class="{ isActive:isChange == index}" @click="clickBtn(index)">{{item.name}}</span>
    </div>
</template>

<script>
    export default {
        name: "radio",
        props:["list"],
        data(){
            return{
                list:[
                    {name:'title1', id:1},
                    {name:'title2', id:2},
                    {name:'title3', id:3},
                ],
                isChange:-1,
            }
        },
        methods:{
            clickBtn(index){
                if(index!=this.isChange){
                    this.isChange = index;

                }else{
                    this.isChange = -1;
                }
            }
        }
    }
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .btnBox{
        margin-top: 100px;
    }
    .btn{
        padding: 10px;
        width: 80px;
        height: 40px;
        background: #a8d7e6;
        border-radius: 5px;
        margin-left: 10px;
        cursor: pointer;
        border: 1px solid #ccc;
    }
    .isActive{
        background: pink;
    }
</style>