<template>
  <div class="bg">
       <div style="text-align: center">
           <van-icon name="checked" class="green" />
       </div>
       <div class="commit">
           <label>信息提交成功，稍后工作人员</label>
           <label>会与您联系，可先添加微信效率更快</label>
       </div>
       <div class="qrcode"></div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mixin from './mixin/mixin'

export default {
  name: 'app',
  mixins:[mixin],
  components: {

  },
  data(){
      return{

      }
  }
}
</script>

<style>

    .bg{
        width: 100%;
        height: 100%;
        background:rgba(59,135,246,1);
    }
    .green{
        background-color: #6CF496;
        width: 0.78rem;
    }

    .commit{
        text-align: center;
        margin-top: 0.34rem;
        font-size:0.30rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
    }

    .qrcode{
        /* display: ; */
        margin-top: 0.46rem;
        margin-left: 0.99rem;
        margin-right: 0.98rem;
        width: 100%;
    }
</style>
