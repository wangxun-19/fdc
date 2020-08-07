<template>
    <div>
        <div>
            <label>{{title}}</label>
        </div>
        <div>
            <van-field
                    v-model="answer"
                    type="textarea"
                    size="large"
                    placeholder="写下你的回答"
            ></van-field>
        </div>
        <div class="commit">
            <!-- <van-field style="width: 80%;float: left" v-model="answer" placeholder="回答"></van-field> -->
            <van-button style="float: left;width: 100%" @click="commit" type="primary">发表</van-button>
        </div>
    </div>
</template>

<script>
    import mixin from '../mixin/mixin';
    export default {
        name: "answer",
        mixins:[mixin],
        created() {
            let query = this.$route.params;
            console.log(query);
            this.ansid = query.id;
            this.roomid = query.roomid;
            this.area = query.area;
            this.title = query.title;
            this.type = query.type;
        },
        data(){
            return{
                ansid:0,
                title:'',
                answer:'',
                type:'',
                roomid:'',
                area:''
            }
        },
        methods:{
            commit(){
                let self = this;
                let token = localStorage.getItem('token');
                let formdata = new FormData();
                let newroomid = this.roomid;
                let area = this.area;
                formdata.append("content",self.answer);
                if(self.type == 'new'){
                    self.$axios.post("http://house-api.zjlaishang.com:9001/new/answer/"+self.ansid,formdata,
                        {
                            headers:{
                                token: token
                            }
                        }
                    ).then(function (res) {
                        if(res.data.code == 200){
                            self.$toast(res.data.message);
                            self.answer = '';
                            self.$toast(res.data.msg);
                            self.$router.push({name:'xfdetail',params:{id:newroomid,time:'123'}});
                        }else if(res.data.code == 500){
                            self.$toast(res.data.msg);
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.type == 'old'){
                    self.$axios.post("http://house-api.zjlaishang.com:9001/old/answer/"+self.ansid,formdata,
                        {
                            headers:{
                                token: token
                            }
                        }
                    ).then(function (res) {
                        if(res.data.code == 200){
                            self.$toast(res.data.message);
                            self.answer = '';
                            self.$toast(res.data.msg);
                            self.$router.push({name:"erfdetail",params:{id:newroomid,time:'123'}});
                        }else if(res.data.code == 500){
                            self.$toast(res.data.msg);
                        }else{
                            self.$toast(res.data.msg);
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
</style>