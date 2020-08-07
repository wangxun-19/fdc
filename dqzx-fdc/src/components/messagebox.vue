<template>
  <div class="block" @click="clickit(id,type)">
       <img :src="header" class="img"/>
       <div v-if="status == 1" class="alarm"></div>
       <div class="content0" style="margin-left: 10px">
           <label class="content1">{{sname}}<span style="margin-left: 5px" class="anscontent">{{content}}</span></label>
           <label style="margin-top: 12px" class="anscontent">{{content}}</label>
           <div style="margin-top: 12px" class="answer">
               <label>提问:</label>
               <laben>{{answer}}</laben>
           </div>
           <!-- <label style="margin-top: 12px" class="time">{{time}}</label> -->
       </div>
  </div>
</template>

<script>
import mixin from '../mixin/mixin';
export default {
  name: 'app',
  props:["header","sname","content","answer","type","id","hid","status","area"],
  mixins:[mixin],
  components: {

  },
  methods:{
      clickit(id,type){
          let self = this;
          let token = localStorage.getItem("token");
          self.$axios.put("http://house-api.zjlaishang.com:9001/message/"+id,{
              headers:{
                  token:token
              }
          }).then(function(res){
              if(res.data.code == 200){
                  self.$toast(res.data.msg);
              }else{
                  self.$toast(res.data.msg);
              }
          })
          if(type == 1){
              self.$router.push({path:"/index/xf/detail",query:{id:self.hid,time:''}});
          }else if(type == 2){
              self.$router.push({path:"/index/erf/detail",query:{id:self.hid,time:''}});
          }else if(type == 3){
              self.$router.push({path:"/index/rent/detail",query:{id:self.hid,time:''}});
          }
      }
  }
}
</script>

<style scope>
    .block{
        padding: 5px;
        max-width: 100%;
        position: relative;
        flex-direction: row;
        border: none;
        margin: 7px;
        border-bottom: 1px solid #f4f4f4;
    }

    .block .img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .block .content0{
            display: inline-flex;
            flex-direction: column;
            width: 58%;
            margin: 0 auto;
            vertical-align: top;
            line-height: 1.25;
    }

    .content0 .content1{
        color: #000;
        font-size: 15px;
        font-weight: bold;
    }

    .content0 .anscontent{
        font-size:17px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:24px;
    }

    .content0 .answer{
        background: #999999;
        width: 150px;
        border-radius: 3px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:22px;
    }

    .content0 .time{
        color: gainsboro;
        font-size: 12px;
    }

    .alarm{
        position: absolute;
        background-color: red;
        height: 0.2rem;
        width: 0.2rem;
        line-height: 12px;
        left: 0.1rem;
        top: 0.02rem;
        text-align: center;
        border-radius: 50%;
    }
</style>
