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
                type:'',
                roomid:0
            }
        },
        created() {
            let type = this.$route.params.type;
            let roomid = parseInt(this.$route.params.id);
            console.log(type);
            this.type = type;
            this.roomid = roomid;
            this.getdongtai(type,roomid);
        },
        methods:{
            onload(){
                this.page++;
                this.getdongtai(this.type,this.roomid);
            },
            getdongtai(type,roomid){
                let self = this;
                if(type == 'new'){
                    this.$axios.get("http://house-api.zjlaishang.com:9001/new/msg/"+roomid+'/'+this.page,{
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
                    this.$axios.get("http://house-api.zjlaishang.com:9001/old/msg/"+roomid+'/'+this.page,{
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
        height: 12rem;
        overflow-y: auto;
    }
</style>