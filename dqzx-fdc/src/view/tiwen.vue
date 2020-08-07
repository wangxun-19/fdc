<template>
    <div>
        <div>
            <van-field
                    v-model="wenti"
                    type="textarea"
                    size="large"
                    placeholder="写下你的问题"
                    style="height: 600px"
            ></van-field>
            <div class="jiange"></div>
            <div class="commit">
                <!-- <van-field style="width: 80%;float: left" v-model="wenti" placeholder="评论"></van-field> -->
                <van-button style="float: left;width: 100%" size="normal" type="primary" @click="commit(0)">发表</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin';
    export default {
        // name: "tiwen",
        mixins:[mixin],
        data(){
            return{
                roomid:'',
                wenti:'',
                type:'',
                area:'',
                isnewproblem:true,
                count:0,
            }
        },
        created() {
            let roomid = this.$route.params.id;
            let type = this.$route.params.type;
            if(type == 'new'){
                this.area = this.$route.params.area;
            }
            this.roomid = roomid;
            this.type = type;
        },
        methods:{
            commit(count){
                let self = this;
                let token = localStorage.getItem("token");
                if(self.type == 'new'){
                    self.$axios.post('http://house-api.zjlaishang.com:9001/new/question/'+self.roomid,
                        {
                            content:self.wenti,
                        },{
                            headers:{
                                token:token
                            }
                        }).then(function (res) {
                        if(res.data.code == 201){
                            self.$toast(res.data.msg);
                            self.$router.push({path:'/index/xf/detail/',query:{id:self.roomid,time:''}});
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                        .catch(function (err) {
                            console.log(err);
                            if(count<2){
                                count++;
                                self.commit(count);
                            }else{
                                self.$toast(err);
                            }
                        })
                }else if(self.type == 'old'){
                    self.$axios.post('http://house-api.zjlaishang.com:9001/old/question/'+self.roomid,
                        {
                            content:self.wenti,
                        },{
                            headers:{
                                token:token
                            }
                        }).then(function (res) {
                        if(res.data.code == 201){
                            self.$toast(res.data.msg);
                            self.$router.push({path:"/index/erf/detail",query:{id:self.roomid}});
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                        .catch(function (err) {
                            console.log(err);
                            if(count<2){
                                count++;
                                self.commit(count);
                            }else{
                                self.$toast(err);
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .commit{
        width: 100%;
        height: 50px;
        display: block;
    }
    .jiange{
        width: 100%;
        height: 7px;
        background-color: #F1F3F7;
    }
</style>