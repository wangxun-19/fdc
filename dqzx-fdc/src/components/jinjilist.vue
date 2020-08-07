<template>
  <div class="maplist0">
       <div class="img">
           <img :src="avatar" class="avatar">
       </div>
       <div class="container">
           <label class="name0">{{bname}}</label>
           <van-icon size="0.5rem" style="float:right" color="green" name="phone-circle" @click="gettel" />
       </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  props:["bname","bid","id","nid","avatar","phone"],
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
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
    }

    .container{
        margin-left: 0.15rem;
        float: left;
        height: 0.8rem;
        width: 80%;
        display: inline-block;
        border-bottom: 1px solid rgba(153,153,153,1);
    }

    .name0{
        font-size: 0.25rem;
        color: #000;
    }
    .img{
        float: left;
        width: 0.8rem;
    }
</style>
