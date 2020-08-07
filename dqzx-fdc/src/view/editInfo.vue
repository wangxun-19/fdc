<template>
    <div class="editInfo">
        <div class="top">
            <div class="img">
                <img :src="avatar" alt="headPic" width="100%" v-if="avatar">
                <!-- <img src="../assets/images/headpic.png" alt="headPic" v-else> -->
            </div>
            <div class="name" v-text="nickName?nickName:'请填写'"></div>
        </div>
        <div class="detail">
            <!-- <div class="item">
                <span class="txt">昵称</span>
                <van-field
                    v-model="nickName"
                    clearable
                    placeholder="请输入昵称"
                />
            </div> -->
            <div class="item">
                <span class="txt">手机</span>
                <van-field
                    v-model="phoneNum"
                    placeholder="请绑定手机"
                />
            </div>
            <div class="item">
                <span class="txt">验证码</span>
                <van-field
                    v-model="smscode"
                    placeholder="请填写验证码"
                />
                <van-button slot="button" size="small" type="default" @click="sendVerification" :disabled="disabled">{{btnTxt}}{{disabled && time>0?time:''}}</van-button>
            </div>
            <div class="saveInfo">
                <div class="btn" @click="saveInfo">
                    保存信息
                </div>
            </div>
        </div>
        <!-- <div class="bind" v-show="showBind">
            <div class="center">
                <div class="tit">
                    <h3>温馨提示</h3>
                    <p>为了您的正常使用，请绑定手机号</p>
                </div>
                <div class="form">
                    <van-field v-model="bindPhoneNum" type="tel" placeholder="请填写有效手机号" />
                </div>
                <div class="form">
                    <van-field v-model="verification" type="number" placeholder="请填写验证码" />
                    <van-button slot="button" size="small" type="default" @click="sendVerification" :disabled="disabled">{{btnTxt}}{{disabled && time>0?time:''}}</van-button>
                </div>
                <div class="submit">
                    <div class="btn" @click.stop="bindPhone">
                        绑定
                    </div>
                </div>
                <div class="close" @click.stop="showBox">X</div>
            </div>
        </div> -->
    </div>
</template>

<script>
    //import { userInfoApi,saveInfoApi,sendSMSApi,bindPhoneApi } from '../request/api';
    import 'element-ui/lib/theme-chalk/index.css';
    import mixin from '../mixin/mixin'; // 引入mixin文件
    export default {
        name: "editInfo",
        mixins:[mixin],
        data(){
            return{
                nickName:'',
                avatar:'',
                sex:'',
                birthday:'',
                phoneNum:'',
                bindPhoneNum:'',
                smscode:'',
                verification:'',
                showBind: false,
                disabled:false,
                time:0,
                times:null,
                btnTxt:'获取验证码',
                showDateChoose:false,
                minDate:new Date(1950,1,1),
                maxDate:new Date(),
                currentDate:"",
                alertTips:false,
                loading:null
            }
        },
        created(){
            // this.loading = this.$toast.loading({
            //     duration: 0,
            //     message: '加载中...',
            //     forbidClick: true
            // });
            // this.alertTips = this.$route.query.guide === "true";
        },
        mounted(){
            //如果个人信息存在vuex中直接拿取，否则请求
            this.getUserInfo();
        },
        methods:{
            //获取用户信息
            getUserInfo(){
                let self = this;
                let token = localStorage.getItem("token");
                this.$axios.get("http://house-api.zjlaishang.com:9001/my",{
                    headers:{
                        token:token
                    }
                })
                .then(res=>{
                    if(res.data.code==200){
                        console.log(res.data);
                        this.phoneNum = res.data.data.phone;
                        this.avatar = res.data.data.avatar;
                        this.nickName = res.data.data.nickname;
                        if(self.$store.state.time >= 0){
                           if(self.$store.state.time == 0){
                               self.$store.state.time = parseInt(localStorage.getItem("time"));
                           }
                           if(self.$store.state.time>0){
                               self.disabled = true;
                               self.time = self.$store.state.time;
                               self.timeOver();
                               self.btnTxt = "已发送";
                           }
                        }

                    }else if(res.code==400){
                        this.$toast.fail({
                            message: res.msg,
                            duration: 1200,
                            forbidClick: true
                        });
                    }
                }).catch(()=>{
                    this.loading.clear();
                })
            },
            //格式化
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }else if (type === 'day') {
                    return `${value}日`
                }
                return value;
            },
            //选择日期
            chooseDate(value){
                //console.log(value);
                let year = value.getFullYear();
                let month = value.getMonth()+1;
                let date = value.getDate();
                if(month<10){
                    month = "0"+month;
                }
                if(date<10){
                    date = "0"+date;
                }
                this.birthday = year+'-'+month+'-'+date;
                this.showDateChoose = false;
            },
            //显示绑定手机框
            showBox(){
                this.showBind = !this.showBind;
                if(!this.showBind){
                    this.btnTxt = "获取验证码";
                    this.disabled = false;
                }
            },
            //发送验证码
            sendVerification(){
                let self = this;
                let formdata = new FormData();
                formdata.append('phone',self.phoneNum);
                let token = localStorage.getItem("token");
                self.$axios.post("http://house-api.zjlaishang.com:9001/sendSms/ali",formdata,{
                        headers:{
                            token:token
                        }
                    }).then(res=>{
                        //console.log(res);
                        if(res.data.code===200){
                            self.btnTxt = "已发送";
                            self.disabled = true;
                            self.$store.commit("setTime",60);
                            self.time = 60;
                            self.timeOver();
                            self.$toast.success({
                                message: res.data.msg,
                                duration: 1200
                            });

                        }else{
                            self.$toast.fail({
                                message: res.data.msg,
                                duration: 1200,
                                forbidClick: true
                            });
                        }
                    })
            },
            //倒计时一分钟后可以再次发送
            timeOver(){
                let self = this;
                this.times = setInterval(()=>{
                    self.time--;
                    self.$store.commit("setTime",self.time);
                    if(self.$store.state.time<=0){
                        self.disabled = false;
                        self.btnTxt = "获取验证码";
                        self.$store.commit("setTime",0);
                        clearInterval(self.times);
                    }
                },1000)
            },
            //确认绑定手机
            bindPhone(){
                if(this.verification){
                    this.$apis.bindPhoneApi({
                        phone_number: this.bindPhoneNum,
                        phone_code: this.verification
                    }).then(res=>{
                        if(res.code===200){
                            //console.log(res)
                            this.showBind = false;
                            this.$toast.success(res.msg);
                            this.phoneNum = this.bindPhoneNum;

                        }else if(res.code===400){
                            this.$toast.fail({
                                message: res.msg,
                                duration: 1200,
                                forbidClick: true
                            });
                        }
                    })
                }else{
                    this.$toast.fail({
                        duration: 1200,
                        message:"请先完善信息"
                    });
                }

            },
            //保存信息
            saveInfo(){
                let self = this;
                let formdata = new FormData();
                let token = localStorage.getItem("token");
                formdata.append("phone",self.phoneNum);
                formdata.append("smsCode",this.smscode);
                self.$axios.post('http://house-api.zjlaishang.com:9001/bindPhone/',formdata,{
                    headers:{
                        token:token
                    }
                },
                ).then(function(res){
                    if(res.data.code == 201){
                        self.$toast.success({
                            message: res.data.msg,
                            duration: 1200
                        });
                        self.$store.commit("setTime",0);
                        self.$router.push('/my');
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .editInfo{
        padding-bottom: 70px;
    }
    .top{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        background-color: #fff;
    }
    .top .img{
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 100%;
        margin-bottom: 20px;
    }
    .detail{
        margin-top: 10px;
        background-color: #fff;
        padding: 0 15px 50px;
    }
    .detail .item{
        padding: 15px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        color: #222;
    }
    .detail .item button{
        flex-shrink: 0;
        font-size: 12px;
        margin-right: 10px;
    }
    .detail .item .txt{
        margin-right: 30px;
        flex-shrink: 0;
    }
    .detail .item .sex{
        display: flex;
    }
    .detail .item .sex .box{
        margin-right: 20px;
    }
    .bind{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1999;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
    }
    .bind .center{
        position: relative;
        width: 80%;
        margin: 100px auto 0;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
    }
    .bind .center .tit{
        text-align: center;
        margin-bottom: 30px;
    }
    .bind .center .tit p{
        margin-top: 10px;
    }
    .bind .center .form{
        padding: 5px 0;
        margin-bottom: 15px;
        display: flex;
        border-bottom: 1px solid #f9f9f9;
    }
    .bind .center .form button{
        flex-shrink: 0;
        border: none;
    }
    .saveInfo{
        margin-top: 50px;
        text-align: center;
    }
    .saveInfo .btn{
        width: 90%;
        padding: 12px;
        background-color: #dab076;
        color: #fff;
        border-radius: 5px;
    }
    .submit .btn{
        text-align: center;
        letter-spacing: 10px;
        width: 90%;
        padding: 12px;
        background-color: #dab076;
        color: #fff;
        border-radius: 5px;
    }
    .bind .center .close{
        position: absolute;
        right: 15px;
        top: 15px;
        width: 15px;
        height: 15px;
        line-height: 15px;
    }
    .van-radio{
        display: inline-flex;
        margin-right: 40px;
        align-items: center;
    }
    .van-cell{
        padding: 0;
    }
    .van-cell:not(:last-child)::after{
        border: none;
    }

</style>
