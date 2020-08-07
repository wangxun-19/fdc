<template>
  <div>
      <div v-if="messagelist.length>0">
          <div v-for="(item,index) in messagelist" :key="index">
              <Messbox
                :id="item.id"
                :header="item.header"
                :content="item.content"
                :sname="item.sname"
                :answer="item.content"
                :type="item.type"
                :status="item.status"
                :hid="item.hid"
               />
          </div>
      </div>
      <div class="title0" v-if="readmessage.length >=0">
          <label>以下为已读消息</label>
      </div>
      <div v-if="readmessage.length>0">
          <div v-for="(item,index0) in readmessage" :key="index0">
              <Messbox
                :id="item.id"
                :header="item.header"
                :content="item.content"
                :sname="item.sname"
                :answer="item.content"
                :type="item.type"
                :status="item.status"
                :hid="item.hid"
               />
          </div>
      </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mixin from '../mixin/mixin';

export default {
  name: 'app',
//   mixins:[mixin],
  data(){
      return{
          messagelist:[],
          readmessage:[],
          page:0
      }
  },
  created(){
      this.getMessage();
  },
  methods:{
      getMessage(){
          let self = this;
          let token = localStorage.getItem("token");
        //   token="6f8344fc7f4bc0f080fcd1cd465aaae0";
          self.$axios.get("http://house-api.zjlaishang.com:9001/message",{
              headers:{
                  token:token
              }
          }).then(function(res){
              if(res.data.code == 200){
                  self.messagelist.length = 0;
                  self.readmessage.length = 0;
                  res.data.data.forEach(element => {
                      if(element.status == 1){
                          self.messagelist.push(element);
                      }else if(element.status == 2){
                          self.messagelist.push(element);
                      }
                  });
                //   self.messagelist = res.data.data;
              }else{
                  self.$toast(res.data.msg);
              }
          })

        //   self.$axios.put("http://house-api.zjlaishang.com:9001/message",{
        //       headers:{
        //           token:token
        //       }
        //   }).then(function(res){
        //       if(res.data.code == 200){
        //           self.readmessage = res.data.data;
        //       }else{
        //           self.$toast(res.data.msg);
        //       }
        //   })
      }
  }
}
</script>

<style>
  .fenjie{
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:20px;
  }

  .title0{color: rgba(153,153,153,1);text-align: center;font-size: 14px;}
  .title0:before,.title0:after{content: "";width: 100px;border-top: 1px rgba(153,153,153,1) solid; display: inline-block;
  vertical-align: middle;}
  .title0:before{margin-right: 10px;}
  .title0:after{margin-left: 10px;}
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>
