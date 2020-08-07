<template>
  <div>
      <div id="container"></div>
      <div id="panel"></div>
      <div>
          <label>请输入关键字：</label>
      </div>
      <div>
          <input v-model="input" id="tipinput"/><button @click="searchAddress">搜索</button>
      </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
var map, placeSearch;
export default {
  name: 'app',
  components: {

  },
  data(){
      return{
          input:''
      }
  },
  mounted(){
    map = new AMap.Map("container", {
        resizeEnable: true
    });
    AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        placeSearch = new AMap.PlaceSearch({ 
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "0572", // 兴趣点城市
            citylimit: true,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
    });
    AMap.event.addListener(placeSearch, "selectChanged", this.selectAddress);
  },
  methods:{
      searchAddress() {
          placeSearch.search(this.input);
 
      },
      selectAddress(e) {
        //这里获得点选地点的经纬度
        let location = e.selected.data.location;
        console.log('lng',location.lng);
        console.log('lat',location.lat);
        // Do Something
      }
  }
}
</script>

<style>
    #container{
        width: 500px;
        height: 500px;
    }
    #panel{
            position: absolute;
            background-color: white;
            max-height: 90%;
            /* height: 100px; */
            overflow-y: auto;
            top: 10px;
            right: 10px;
            width: 280px;
    }
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>
