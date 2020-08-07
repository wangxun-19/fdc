<template>
    <div class="background">
        <label style="font-weight: bold;color: #333333;text-align: center;font-size: 30px;margin-left: 0.38rem">动态更多</label>
        <div class="dongtai">
            <ul 
               v-infinite-scroll="onload"
               infinite-scroll-distance="10">
                <div v-for="(item,index) in dongtailist" :key="index">
                    <DongTai  :img="item.img" :title="item.title" :desc="item.introduction"/>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
    export default {
        name: "Dongtai",
        mixins:[mixin],
        data(){
            return{
                page:0,
                dongtailist:[],
                type:''
            }
        },
        created() {
            let type = this.$route.query.type;
            console.log(type);
            this.type = type;
            this.getdongtai(type);
        },
        methods:{
            onload(){
                this.page++;
                this.getdongtai(this.type);
            },
            getdongtai(type){
                let self = this;
                if(type == 'new'){
                    this.$axios.get("http://house-api.zjlaishang.com:9001/new/msg/"+this.page,{
                    }).then(function (res) {
                        console.log(res);
                        if(res.data.code == 200){
                            res.data.data.forEach(item=>{
                                self.dongtailist.push(item);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(type == 'old'){
                    this.$axios.get("http://house-api.zjlaishang.com:9001/old/msg/"+this.page,{
                    }).then(function (res) {
                        console.log(res);
                        if(res.data.code == 200){
                            res.data.data.forEach(item=>{
                                self.dongtailist.push(item);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .background{
        background-color: #FFF;
        width: 100%;
    }
    .dongtai{
        height: 7.5rem;
        overflow-y: auto;
    }
</style>