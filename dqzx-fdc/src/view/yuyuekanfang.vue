<template>
  <div>
      <img src="../assets/images/czw/yuyue.png" style="width: 100%;height:100%;position: fixed;top: 0;left:0">
       <div class="menu">
         <label class="yuyue">预约看房</label>
         <label class="quxiao" @click="quxiao">取消</label>
       </div>
<!--       <div class="form"></div>-->
       <van-form class="form" @submit="subimtit">
          <van-cell-group style="margin-top: 0.4rem">
            <van-field label="姓名" v-model="name" placeholder="姓名"></van-field>
            <van-field label="手机号" v-model="phone" type="phone" placeholder="请填电话号码"></van-field>
            <van-field name="checkbox">
              <template #input>
                <van-checkbox v-model="checked" shape="round" icon-size="0.2rem">我已阅读并同意</van-checkbox><a>用户协议</a>
              </template>
            </van-field>
          </van-cell-group>
           <div style="margin-left: 0.6rem;margin-right: 0.6rem;margin-top: 0.3rem; margin-bottom: 0.25rem">
               <van-button round block type="info" native-type="submit">
                   确定
               </van-button>
           </div>
           <div style="margin-top: 0.1rem;margin-left:1.05rem">
               <label>您的私人信息，不会泄露给第三方</label>
           </div>
       </van-form>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mixin from '../mixin/mixin'

export default {
  name: 'app',
  components: {

  },
  mixins:[mixin],
  data(){
    return{
      name:'',
      phone:'',
      checked:false,
    }
  },
  methods:{
      subimtit(){
        console.log('yuyuekanfang');
      },
      quxiao(){
        this.$router.go(-1);
      }
  }
}
</script>

<style>

   .menu{
     position: absolute;
     top: 3.72rem;
     left: 0.46rem;
   }

   .menu .yuyue{
     font-size:0.68rem;
     font-family:PingFang SC;
     font-weight:bold;
     color:rgba(232,255,255,1);
   }

   .menu .quxiao{
     margin-left: 3.23rem;
     font-size:0.31rem;
     font-family:PingFang SC;
     font-weight:bold;
     color:rgba(232,255,255,1);
   }

   .form{
     position: fixed;
     top: 5.31rem;
     left: 0.29rem;
     width: 6.89rem;
     height: 5.75rem;
     border-radius: 0.23rem;
     background-color: #fff;
   }
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>
