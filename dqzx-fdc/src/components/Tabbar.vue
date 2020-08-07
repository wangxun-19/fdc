<template>
    <div>
        <ul class="tab-tilte">
            <li @click="cur = 0" :class="{active:cur==0}" style="margin-left: 65px">单价(元/平方米)</li>
            <li @click="cur = 1" :class="{active:cur==1}" style="margin-left: 40px">总价(万元)</li>
        </ul>
        <div class="tab-content">
            <div v-show="cur == 0">
                <van-row>
                    <van-col span="4">
                        <label>自定义</label>
                    </van-col>
                    <van-col span="5">
                        <van-field placeholder="最小值" type="number" v-model="danjiamin" style="border-radius: 5px;border: 1px solid grey" />
                    </van-col>
                    <van-col span="1">
                        <label>-</label>
                    </van-col>
                    <van-col span="5">
                        <van-field placeholder="最大值" type="number" v-model="danjiamax" style="border-radius: 5px;border: 1px solid grey" />
                    </van-col>
                    <van-col span="4">
                        <label>元/平方米</label>
                    </van-col>
                    <van-col span="2">
                        <van-button size="normal" type="info" @click="danjia">确定</van-button>
                    </van-col>
                </van-row>
            </div>
            <div v-show="cur == 1">
                <van-col span="4">
                    <label>自定义</label>
                </van-col>
                <van-field placeholder="最小值" type="number" v-model="moneymin" style="border-radius: 5px;border: 1px solid grey" />
                <label>-</label>
                <van-field placeholder="最大值" type="number" v-model="moneymax" style="border-radius: 5px;border: 1px solid grey" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tabbar",
        props:["moneymin","moneymax","danjiamin","danjiamax"],
        data(){
            return{
                cur:0
            }
        }
    }
</script>

<style scoped>
    ul li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .tab-tilte{
        width: 90%;
    }
    .tab-tilte li{
        float: left;
        padding: 10px 0;
        text-align: center;
        line-height: 32.75px;
        cursor: pointer;
        min-width: 92.75px;
        min-height: 32.75px;
        font-size: 12px;
        border-radius: 10px;
    }
    .tab-tilte .active{
        background-color: #ee9d9d;
        color: red;
    }
    .tab-content div{
        float: left;
        width: 25%;
        line-height: 100px;
        text-align: center;
    }
</style>