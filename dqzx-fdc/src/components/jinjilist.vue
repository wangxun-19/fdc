<template>
  <div class="maplist0">
       <div class="img">
           <img :src="avatar" class="avatar">
       </div>
       <div class="container">
           <label class="name0">{{bname}}</label>
           <!-- <van-icon size="0.8rem" style="float:right" color="green" name="phone-circle" @click="gettel" /> -->
           <van-image width="0.8rem" height="0.8rem" :src="callpic" style="float:right" @click="gettel" />
           <div style="color:grey">
               <label>某某房地产公司经济人</label>
           </div>
       </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  props:["bname","bid","id","nid","avatar","phone"],
  data(){
      return{
          callpic:require('../../src/assets/images/icon/call.png')
      }
  },
  components: {

  },
  methods:{
      gettel(){
          console.log(this.phone);
          location.href = 'tel:'+this.phone;
      }
  }
}
</script>

<style>

    .maplist0{
        width: 100%;
        display: inline-block;
        padding-left: 0.34rem;
        padding-right: 0.34rem;
        padding-bottom: 0.21rem;
    }

    .avatar{
        width: 1.0rem;
        height: 1.0rem;
        border-radius: 50%;
    }

    .container{
        margin-left: 0.43rem;
        float: left;
        height: 0.8rem;
        width: 80%;
        display: inline-block;
    }

    .name0{
        font-size: 0.40rem;
        font-weight: bold;
        color: #000;
    }
    .img{
        float: left;
        width: 0.8rem;
    }
</style>
