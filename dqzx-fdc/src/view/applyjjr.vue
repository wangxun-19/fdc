<template>
  <div >
       <div class="header">
           <label class="title">申请成为中介</label>
           <label class="desc">成为中介增加上传新楼盘功能，以及二手房 和出租屋发布次数不限</label>
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
       <van-field
          v-model="captcha"
          label="验证码"
          type="text"
          placeholder="验证码"
          input-align="right"  
          v-if="status != -1"
       >
       <template #button>
          <van-button class="newbtn" @click="getCaptcha" :disabled="disabled">{{btnTxt}}{{disabled && time>0?time:''}}</van-button>
       </template>
       </van-field>
       <!-- <van-row v-if="status != -1">
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
       </van-row> -->
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
              <van-checkbox-group v-model="checkboxGroup" direction="horizontal" ref="checkboxGroup">
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
        <van-row>
            <van-button icon="plus" type="primary" style="margin-left:0.35rem;margin-bottom:0.35rem" @click="chooseimg">上传图片</van-button>
            <van-row>
                <div class="image-view">
                   <div class="view" v-if="appSource() == 'android'">
                      <div class="item" v-for="(item, index) in uploader" :key="index">
                         <span class="cancel-btn" @click="delImg(index)">x</span>
                         <img :src="item.localIds">
                         <!-- <img :src="item.localData"> -->
                      </div>
                   </div>
                   <div class="view" v-else>
                       <div class="item" v-for="(item, index) in uploader" :key="index">
                          <span class="cancel-btn" @click="delImg(index)">x</span>
                          <img :src="item.localData">
                       </div>
                   </div>
                </div>
            </van-row>
            <!-- <van-button icon="plus" type="primary" style="margin-left:0.35rem;margin-bottom:0.35rem" @click="chooseimg">上传图片</van-button> -->
        </van-row>
        <button class="sub" v-if="status != -1" @click="submit">提交信息</button>
        <button class="sub" v-if="status == -1" @click="submit">认证手机号</button>
  </div>
</template>

<script>
// import 'element-ui/lib/theme-chalk/index.css';
import mixin from '../mixin/mixin';
export default {
  name: 'app',
  mixins:[mixin],
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
          filess1:[],
          area:'',
          companyName:'',
          uploader:[],
          filess:'',
          disabled:false,
          time:0,
          times:null,
          btnTxt:'验证码',
          checkboxGroup:[],
          status:null,
          dialogVisible:false,
          datas:{text:''},
      }
  },
  created(){
      let self = this;
      let query = this.$route.params;
      this.status = query.status0;
    //   this.tel = query.tel;
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
      delImg(index){
          this.uploader.splice(index,1);
      },
      chooseimg(){
          let self = this;
          this.$wxsdk.init(["chooseImage"]).then(
            wx=>{
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], 
                    sourceType: ['album', 'camera'],
                    success(res){
                            self.filess1 = res.localIds;
                            for(let i=0;i<res.localIds.length;i++){
                                self.uploader[i] = {localIds:'',localData:'',serverId:''};
                                self.uploader[i].localIds = res.localIds[i]
                                self.uploader[i].localData = '';
                                self.uploader[i].serverId = '';
                            }
                            self.uploader = self.unquine(self.uploader);
                            if(self.appSource() == 'android'){
                                console.log(self.uploader)
                                self.uploadImg(self.uploader,0);
                            }else{
                                alert('000');
                                self.previewImg(self.uploader,0);
                                self.uploadImg(self.uploader,0);
                            }
                    },
                    cancel(err){
                        alert(JSON.stringify(err))
                    }
                })
            }
        )
        // this.$wxMethod.chooseImage(1,(res)=>{
            // self.filess1 = res.localIds;
            // for(let i=0;i<res.localIds.length;i++){
            //     self.uploader[i] = {localIds:'',localData:'',serverId:''};
            //     self.uploader[i].localIds = res.localIds[i]
            //     self.uploader[i].localData = '';
            //     self.uploader[i].serverId = '';
            // }
            // self.uploader = self.unquine(self.uploader);
            // if(self.appSource() == 'android'){
            //     console.log(self.uploader)
            //     self.uploadImg(self.uploader,0);
            // }else{
            //     alert('000');
            //     self.previewImg(self.uploader,0);
            //     self.uploadImg(self.uploader,0);
            // }
        // },(err)=>{
        //     console.log(err);
        // })
      },
      unquine(filearray){
          var result = [], isRepeated;
          for (let i = 0; i < filearray.length; i++) {
             isRepeated = false;
             for (let j = 0; j < result.length; j++) {
                if (filearray[i].localIds == result[j].localIds) {
                     isRepeated = true;
                     console.log('repeat');
                     break;
                  }
              }
             if (!isRepeated) {
                result.push(filearray[i]);
              }
          }
          return result;
      },
      appSource() {
          if (navigator.userAgent.indexOf('iPhone') !== -1) {
            return "ios";
          } else if(navigator.userAgent.indexOf('android') !== -1) {
            return "android";
          }
          return '0';
      },
      previewImg(filelist,i){
          let context = this;
          this.$wxsdk.init(['getLocalImgData']).then(wx=>{
              wx.getLocalImgData({
                  localId: filelist[i].localIds, // 图片的localID
                  success: function (res) {
                        var localData = res.localData;
                        if (localData.indexOf('data:image') != 0) {                       
                            //判断是否有这样的头部                                               
                            localData = 'data:image/jpeg;base64,' +  localData                    
                        }                    
                        localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg'); // 此处的localData 就是你所需要的base64位
                        filelist[i].localData = localData;
                        i++;
                        if(i<filelist.length){
                            context.previewImg(filelist,i);
                        }
                  },
                  fail: function (res) {
                        alert('选择图片失败:' + res.errMsg);
                   },
             })
          })
      },
      uploadImg(filearray,i){
        let self = this;
        console.log(770);
        // this.$wxMethod.upLoadImage(filearray[i].localIds,(res)=>{
        //        filearray[i].serverId = res.serverId;
        //         i++;
        //         console.log(filearray);
        //         if(i<filearray.length ){
        //             self.uploadImg(i);
        //         }
        // },(err)=>{
        //     console.log(err);
        // })
        this.$wxsdk.init(['uploadImage']).then(
            wx=>{
                wx.uploadImage({
                    localId: filearray[i].localIds,
                    isShowProgressTips: 1,
                    success(res){
                        filearray[i].serverId = res.serverId;
                        filearray[i].serverId = res.serverId;
                        i++;
                        console.log(filearray);
                        if(i<filearray.length ){
                           self.uploadImg(i);
                        }
                    },
                    cancel(err){
                        alert(JSON.stringify(err));
                    },
                    fail(errs){
                        alert(JSON.stringify(errs))
                    }
                })
            }
        )
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
          this.$refs.checkboxGroup.toggleAll(false);
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
            //   alert(2);
              let captcha = this.captcha;
              this.trans(this.uploader);
              let fanwei = this.fanwei;
              let area = this.area
              let companyName = this.companyName;
              let name = this.name;
            //    if(phone == ''||area == ''||companyName == ''||name == ''){
            //      this.$toast("有元素未填");
            //       return;
            //     }
            if(phone == ''){
                this.$toast("电话未填");
                return;
            }
            if(area == ''){
                this.$toast("区域未填");
                return;
            }
            if(companyName == ''){
                this.$toast("公司名未填");
                return;
            }
            if(this.filess == ''){
                this.$toast("图片未传");
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
                       alert(JSON.stringify(res))
                   }
               }).catch(function(err){
                   if(err.response){
                       alert(JSON.stringify(err.response))
                   }else if(err.request){
                       alert(JSON.stringify(err.request))
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
          if(this.uploader.length > 0){
              this.filess = this.uploader[0].serverId;
          }
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

    .image-view{
        /* width:7.5rem; */
        height:100px;
        margin-bottom: 0.2rem;
        margin-left: 0.1rem;
        /* margin:50px auto; */
    }
    .image-view .item {
        position:relative;
        float:left;
        height:100px;
        width:100px;
        margin:10px 10px 10px 0;
    }
    .image-view .item .cancel-btn{
        position:absolute;
        right:0;
        top:0;
        display:block;
        width:20px;
        height:20px;
        color:#fff;
        line-height:20px;
        text-align:center;
        background:red;
        border-radius:10px;
        cursor:pointer;
    }
    .image-view .item img{
        width:100%;
        height:100%;
    }
    .image-view .view{
        clear:both;
    }
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>