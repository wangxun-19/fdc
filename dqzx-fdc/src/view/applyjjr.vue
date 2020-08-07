<template>
  <div >
       <div class="header">
           <label class="title" v-if="status == 0">申请成为中介</label>
           <label class="desc" v-if="status == 0">成为中介增加上传新楼盘功能，以及二手房 和出租屋发布次数不限</label>
       </div>
       <div class="jiange"></div>
       <van-field
          v-model="tel"
          label="手机号"
          type="tel"
          placeholder="手机号"
          input-align="right"
          v-if="status != -1"
       ></van-field>
       <van-row v-if="status != -1">
           <van-col span="18">
               <van-field
                 v-model="captcha"
                 label="验证码"
                 type="text"
                 placeholder="验证码"
                 input-align="right"
               ></van-field>
               
           </van-col>
           <van-col span="2">
               <van-button class="newbtn" @click="getCaptcha" :disabled="disabled">{{btnTxt}}{{disabled && time>0?time:''}}</van-button>
           </van-col>
       </van-row>
       <van-field
          v-model="name"
          label="真实姓名"
          type="text"
          required
          placeholder="真实姓名"
          input-align="right"
          :formatter="formatter"
          v-if="status != -1"
       ></van-field>
       <van-field
          v-model="fanwei"
          label="业务范围"
          type="text"
          required
          placeholder="业务范围"
          input-align="right"
          readonly
          clickable
          v-if="status != -1"
          @click="fanweiselect"
       ></van-field>
       <el-dialog :visible.sync="showdialog" title="业务范围" fullscreen>
           <van-row>
              <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
                    <div v-for="(item,index) in options1" :key="index">
                        <van-checkbox :name="item" shape="square" style="margin-top: 0.5rem;">{{item.title}}</van-checkbox>
                    </div>
              </van-checkbox-group>
               <!-- <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                   <ul v-for="(item,index) in options1" :key="index" @click="clickarea(index)">
                       <li  v-if="index == 0" :class="{active:checkboxGroup[index] == item.id}">{{item.title}}</li>
                       <li  v-if="index != 0" :class="{active:checkboxGroup[index] == item.id}" style="margin-left: 0.2rem">{{item.title}}</li>
                   </ul>
               </ul> -->
           </van-row>
           <van-row style="margin-top: 20px">
                <van-col :span="6">
                    <van-button type="primary" size="small" :disabled="(checkboxGroup.length !== 0)?false:true" @click="queding">确定</van-button>
                </van-col>
                <van-col :offset="12" :span="6">
                    <van-button type="warning" size="small" @click="areaidguanbi">取消选择</van-button>
                </van-col>
            </van-row>
       </el-dialog>
       <div class="jiange"></div>
       <van-field
          v-model="companyName"
          label="公司名称"
          type="text"
          placeholder="公司名称"
          v-if="status != -1"
          input-align="right"
       ></van-field>
       <van-field name="uploader" label="公司营业执照" v-if="status != -1">
        </van-field>
        <van-row v-if="status != -1">
            <van-uploader v-model="uploader" max-count="1" accept="image/*" result-type="dataUrl"/>
        </van-row>
        <button class="sub" v-if="status != -1" @click="submit">提交信息</button>
        <button class="sub" v-if="status == -1" @click="submit">认证手机号</button>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import mixin from '../mixin/mixin';
export default {
  name: 'app',
//   mixins:[mixin],
  components: {

  },
  data(){
      return{
          tel:'',
          captcha:'',
          name:'',
          fanwei:'',
          showdialog:false,
          options1:[],
          area:'',
          companyName:'',
          uploader:[],
          filess:'',
          disabled:false,
          time:0,
          times:null,
          btnTxt:'验证码',
          checkboxGroup:[],
          status:null
      }
  },
  created(){
      let self = this;
      let query = this.$route.params;
      this.status = query.status0;
      this.tel = query.tel;
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
      this.getOptions();
  },
  methods:{
      getOptions(){
          let self = this;
          let token = localStorage.getItem("token");
          this.$axios.get("http://house-api.zjlaishang.com:9001/type/area",{
              headers:{
                  token:token
              }
          }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                      self.options1.push(item);
                  })
                // self.options1 = res.data.data;
                  console.log(self.options1);
                //   self.checkboxGroup.length = self.options1.length;
              }else{
                  self.$toast(res.data.msg);
              }
          })
      },
      queding(){
          let self = this;
          console.log(self.checkboxGroup);
          self.checkboxGroup.forEach((item,index)=>{
              if(index == 0){
                  self.area += ''+item.id;
                  self.fanwei += ''+item.title;
              }else{
                  self.area += ','+item.id;
                  self.fanwei += ','+item.title;
              }
          })
          console.log(self.area)
          console.log(self.fanwei)
          self.showdialog = false;
      },
      areaidguanbi(){
          this.showdialog = false;
          this.checkboxGroup.length = 0;
          this.area = '';
      },
      getCaptcha(){
          let self = this;
          let token = localStorage.getItem("token");
          console.log("captcha");
          let formdata = new FormData();
          formdata.append("phone",self.tel);
          self.$axios.post("http://house-api.zjlaishang.com:9001/sendSms/ali",formdata,{
              
          }).then(function(res){
              if(res.data.code == 200){
                  self.btnTxt = "已发送";
                  self.disabled = true;
                  self.$store.commit("setTime",60);
                  self.time = 60;
                  self.timeOver();
                  self.$toast(res.data.msg);
              }else{
                  self.$toast(res.data.msg);
              }
          })
      },
      timeOver(){
            let self = this;
            this.times = setInterval(()=>{
                self.time--;
                self.$store.commit("setTime",self.time);
                if(self.$store.state.time<=0){
                    self.disabled = false;
                    self.btnTxt = "验证码";
                    self.$store.commit("setTime",0);
                    clearInterval(self.times);
                }
            },1000)
        },
      submit(){
          if(this.status != -1){
              let phone = this.tel;
              let captcha = this.captcha;
              this.trans(this.uploader);
              let fanwei = this.fanwei;
              let area = parseInt(this.area);
              let companyName = this.companyName;
              let name = this.name;
             if(phone == ''||area == 0||companyName == ''||name == ''){
                 this.$toast("有元素未填");
                  return;
                }
               let formdata = new FormData();
               formdata.append("areaId",area);
               formdata.append("name",name);
               formdata.append("phone",Number(phone));
               formdata.append("company",companyName);
               formdata.append("img",this.filess);
               let token = localStorage.getItem("token");
               let self = this;
               self.$axios.post("http://house-api.zjlaishang.com:9001/broker",formdata,{
                   headers:{
                       token:token
                   }
               }).then(function(res){
                   if(res.data.code == 200){
                       self.$toast(res.data.msg);
                       self.$router.push({path:'/my'})
                   }else{
                       self.$toast(res.data.msg);
                   }
               })
          }else if(this.status == -1){
              let self = this;
              let formdata = new FormData();
              formdata.append('phone',Number(this.tel));
              formdata.append('smsCode',this.captcha);
          }
      },
      clickarea(index,item){
          if(this.checkboxGroup[index] != item){
              area = item.id;
          }else{
              area = '';
          }
      },
      trans(uploader){
          this.filess = this.uploader[0].content;
          console.log(this.filess);
      },
      formatter(value){
          return value.replace(/[^\u4E00-\u9FA5]/g,'')
      },
      fanweiselect(){
          let self = this;
          this.showdialog = true;
          this.area = '';
          this.fanwei = '';
        //   for(let i=0;i<self.options1.length;i++){
        //       self.checkboxGroup[i] = '';
        //   }
      }
  }
}
</script>

<style>
    .van-field__label{
        -webkit-box-flex: 0;
        -webkit-flex: none;
        flex: none;
        box-sizing: border-box;
        width: 6.2em;
        margin-right: 12px;
        color: #2A333C;
        font-size: 19px;
        font-weight:bold;
        text-align: left;
        word-wrap: break-word;
    }
    .header{
        width: 100%;
        display: inline-flex;
        flex-direction: column;
    }
    .header .title{
        margin-left: 23px;
        margin-top: 47px;
        font-size: 23px;
        color: #000;
    }
    .header .desc{
        margin-left: 23px;
        margin-top: 21px;
        margin-bottom: 18px;
        font-size: 14px;
        color: #8D8D8D;
        width: 272px;
    }

    .jiange{
        background: #F1F3F7;
        height: 17px;
        width: 100%;
    }

    .newbtn{
        width: 79px;
        height: 34px;
        border-radius: 6px;
        border: 1px solid rgba(86, 124, 243, 1);
        background-color: rgba(247,249,249,1);
        font-size:11px;
        color:rgba(78,117,238,1);
        line-height: 8px;
    }

    .zhuangxiu{
        width: 90%;
    }

    .zhuangxiu li{
        float: left;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width: 70px;
        height: 36px;
        background-color: #D8D8D8;
        font-size: 14px;
        color: #000;
        border-radius: 4px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }

    .zhuangxiu .active{
        background-color: #FCF6EF;
        color: #EC613E;
    }
    .sub{
        width: 100%;
        height:50px;
        background:rgba(59,135,246,1);
        border:1px solid rgba(54, 122, 221);
        font-size:20px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>