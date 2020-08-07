<template>
  <div>
       <ul class="tab-tilte" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC;justify-content: space-around;">
           <!-- <li @click="selectarea(0)" :class="{active:cur==0}" >新房</li> -->
           <li @click="selectarea(0)" :class="{active:cur==0}" >二手房</li>
           <li @click="selectarea(1)" :class="{active:cur==1}">租房</li>
       </ul>
       <div v-show="cur == 0" style="height: 7.5rem">
           <ul v-infinite-scroll="handleReachBottom"
               infinite-scroll-distance="10">
               <div v-for="(item,index) in fabuinfo" :key="index">
                   <RoomBox
                      :title="item.title"
                      :room_id="item.id"
                      :img="item.img"
                      :price="item.unitPrice"
                      :status="item.status"
                      :localName="item.localName"
                      min=""
                      max=""
                      :nature="item.nature"
                      danwei="元/m²起"
                    ></RoomBox>
                </div>
           </ul>
       </div>
       <div v-show="cur == 1" style="height: 7.5rem">
           <ul v-infinite-scroll="handleReachBottom"
               infinite-scroll-distance="10">
               <div v-for="(item,index) in fabuinfo" :key="index">
                   <secRoomBox
                      :title="item.name"
                      :price="item.totalPrice"
                      :se_room_id="item.id"
                      :address="item.localName"
                      :img="item.img"
                    ></secRoomBox>
               </div>
           </ul>
       </div>
       <div v-show="cur == 2" style="height: 7.5rem">
           <ul v-infinite-scroll="handleReachBottom"
               infinite-scroll-distance="10">
               <div v-for="(item,index) in fabuinfo" :key="index">
                    <RentRoomBox
                      :title="item.title"
                      :zujin="item.unitPrice"
                      :imglist="item.imgList"
                      :time="item.updateTime"
                      :room_id="item.id"
                      :localName="item.localName"
                      :area="item.localName"
                    ></RentRoomBox>
                </div>
           </ul>
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
          fabuinfo:[],
          cur:0,
          page:0
      }
  },
  created(){
      this.getKaifalist();
  },
  methods:{
      getKaifalist(){
          let token = localStorage.getItem("token");
          let self = this;
          if(self.cur == 0){
              self.$axios.get("http://house-api.zjlaishang.com:9001/old/release/"+self.page,{
                  headers:{
                      token:token
                  }
              }).then(function(res){
                  console.log(res);
                  if(res.data.code == 200){
                      res.data.data.forEach(item=>{
                          self.fabuinfo.push(item)
                      })
                      console.log(self.fabuinfo);
                    //   self.fabuinfo = res.data.data;
                  }else{
                      self.$toast(res.data.msg);
                  }
              })
          }else if(self.cur == 1){
              self.$axios.get("http://house-api.zjlaishang.com:9001/rent/release/"+self.page,{
                  headers:{
                      token:token
                  }
              }).then(function(res){
                  console.log(res);
                  if(res.data.code == 200){
                      res.data.data.forEach(item=>{
                          self.fabuinfo.push(item)
                      })
                      console.log(self.fabuinfo);
                    //   self.fabuinfo = res.data.data;
                  }else{
                      self.$toast(res.data.msg);
                  }
              })
          }
      },
      selectarea(index){
          this.cur = index;
          this.fabuinfo = [];
          this.page = 0;
          this.getKaifalist();
      },
      handleReachBottom(){
          let self = this;
          return new Promise(resolve => {
                setTimeout(() => {
                    self.page++;
                    self.getKaifalist();
                }, 2000);
            });
      }
  }
}
</script>

<style>
    .tab-tilte{
        width: 90%;
    }
    .tab-tilte li{
        float: left;
        text-align: center;
        line-height: 32.75px;
        cursor: pointer;
        min-width: 92.75px;
        min-height: 32.75px;
        background-color: #E1E6F0;
        font-size: 14px;
        border-radius: 5px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }
    .tab-tilte .active{
        background-color: #FCF5EF;
        color: #EB613D;
    }
</style>
