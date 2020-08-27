<template>
  <div class="maplist">
       <div style="float:left">
           <label class="name">{{name}}</label>
       </div>
       <div style="float:left;">
           <label class="address">{{address}}</label>
       </div>
       <div style="float:right">
           <label class="distance">{{distance}}米</label>
       </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  props:["name","address","distance"],
  components: {

  },
  methods:{
      
  }
}
</script>

<style>
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/

    .maplist{
        width: 100%;
        display: inline-block;
        /* padding: 0; */
        padding-left: 0.30rem;
        padding-right: 0.15rem;
        /* padding-top: 0.10rem;
        padding-bottom: 0.10rem; */
    }

    .name{
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:bold;
        display: block;
        width: 1.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:rgba(51,51,51,1);
        line-height:0.40rem;
        margin-top: 0.19rem;
    }

    .address{
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.40rem;
        width: 2rem;
        display:block;
        margin-left: 0.09rem;
        margin-top: 0.19rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .distance{
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        display: block;
        color:rgba(153,153,153,1);
        line-height:0.40rem;
        margin-right: 0.29rem;
        margin-top: 0.19rem;
    }
</style>
