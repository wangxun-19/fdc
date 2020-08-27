<template>
  <form action="/" class="showarea55">
     <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
            />
     <!--  -->
      
    <div class="jiange"></div>
    <div class="tiwen">
        <div class="div">
            <label class="douzaiwen">热门搜索</label>
        </div>
        <div style="display: inline-block;width: 100%">
            <div style="display: inline-block;width: 100%;">
                    <ul class="zhuangxiu1" style="width: 100%">
                        <li @click="clickaround(1)" :class="{active:around==1}" style="margin-left: 15px;margin-bottom: 6.6px">南浔</li>
                        <li @click="clickaround(2)" :class="{active:around==2}" style="margin-left: 20px">得利御龙湾</li>
                        <li @click="clickaround(3)" :class="{active:around==3}" style="margin-left: 20px">长兴</li>
                        <li @click="clickaround(4)" :class="{active:around==4}" style="margin-left: 15px">红丰</li>
                    </ul>
                </div>
        </div>
    </div>
    <div ></div>
  </form>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mixin from '../mixin/mixin'
export default {
  name: 'app',
  mixins:[mixin],
  components: {

  },
  data(){
      return{
          value:'',
          around:''
      }
  },
  methods:{
      onSearch(){
          console.log(this.value);
      },
      onCancel(){
          this.$router.push('/index');
      },
      clickaround(index){
          if(this.around != index){
              this.around = index;
          }else{
              this.around = '';
          }
      },
      goBack(){
          this.$router.push('/index');
      }
  }
}
</script>

<style>
    .jiange {
        width: 100%;
        height: 7px;
        background-color: #F1F3F7;
    }

    .tiwen{
        width: 100%;
        display: inline-block;
        background-color: #fff;
    }

    .tiwen .div{
        width: 100%;
        display: inline-block;
    }

    .tiwen .douzaiwen{
        margin-left: 15px;
        font-size: 18px;
        margin-top: 17px;
        color: #333333;
        float: left;
    }

    .zhuangxiu1{
        width: 90%;
    }

    .zhuangxiu1 li{
        float: left;
        text-align: center;
        cursor: pointer;
        width: 2.0rem;
        height: 0.80rem;
        background:rgba(239,239,239,1);
        border-radius:0rem;
        font-size:0.30rem;
        line-height: 0.80rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(158,158,158,1);
        margin-bottom: 6.6px;
    }

    .zhuangxiu1 .active{
        background-color: #fcf6ef;
        color: #EC613E;
    }

    .showarea55{
        background-color: #F1F3F7;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .icon0{
        background-color: #fff;
        margin-top: 0.3rem;
        margin-left: 0.2rem;
    }
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>
