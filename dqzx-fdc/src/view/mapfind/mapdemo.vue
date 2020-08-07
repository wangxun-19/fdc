
<template>
  <div id="app0">
    <div id="allmap"></div>
    <!-- <div v-if="show==true"  class="show">我是弹出层</div> -->
  </div>
</template>
 
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
     
    };
  },
  methods: {},
  mounted: function() {
    this.$nextTick(() => {
      var map = new BMap.Map("allmap"); //初始化map, 绑定id=allmap
      var point = new BMap.Point(121.445, 31.213); // 初始化point, 给定一个默认x,y值
      map.centerAndZoom(point, 13); // 将point点放入map中，展示在页面中心展示，10=缩放程度
      map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮
 
      // 如有多个point去展示，可根据后端接口传入为主
      let data = [
        { x: 121.48, y: 31.23, name: "黄浦区<br/>118套房" },
        { x: 121.43, y: 31.18, name: "徐汇区<br/>118套房" },
        { x: 121.45, y: 31.23, name: "静安区<br/>118套房" },
        { x: 121.5, y: 31.27, name: "虹口区<br/>118套房" },
        { x: 121.4, y: 31.25, name: "普陀区<br/>118套房" },
        { x: 121.48, y: 31.4, name: "宝山区<br/>118套房" },
        { x: 121.38, y: 31.12, name: "闵行区<br/>118套房" }
      ];
 
      data.forEach((e, i) => {
        // 创建point, 将x,y值传入
        let pointNumber = new BMap.Point(e.x, e.y);
        // 创建信息窗口对象
        // let detiail=new BMap.Point(e.x, e.y);
        // let infoWindow = new BMap.InfoWindow("World", {
        //   width: 150,     // 信息窗口宽度
        //   height: 100,     // 信息窗口高度
        //   title: e.x+","+e.y  // 信息窗口标题
        // });
        // 将data中的name加入地图中
        var label = new BMap.Label(e.name);
        label.setStyle({
          color: "black", //字体颜色
          fontSize: "13px", //字体大小
          padding: "18px 8px",
          backgroundColor: "white", //文本标注背景颜色
          borderRadius: "50px",
          border: "0",
          textAlign: "center",
          fontWeight: "bold" //字体加粗
        });
        markerFun(pointNumber, label);
      });
 
      function markerFun(points, label) {
        // let markers = new BMap.Marker(points);
        var myIcon = new BMap.Icon("/static/one.jpg", new BMap.Size(1, 1));
        var markers = new BMap.Marker(points, { icon: myIcon });
        map.addOverlay(markers); // 将标注添加到地图中
 
        markers.setLabel(label); // 将data中的name添加到地图中
        // 标注的点击事件
        label.addEventListener("click", function(event) {
          map.removeOverlay(markers);
 
          // map.openInfoWindow( points);//参数：窗口、点  根据点击的点出现对应的窗口
          map.centerAndZoom(points, 16);
 
          let ptdata = [
            { x: 121.4, y: 31.2456, name: "普陀一区<br/>102套" },
            { x: 121.4, y: 31.26, name: "普陀二区<br/>103套" },
            { x: 121.4, y: 31.2645, name: "普陀三区<br/>120套" },
            {x: 121.43, y: 31.18, name: "徐汇一区<br/>120套"},
            {x: 121.43, y: 31.19, name: "徐汇二区<br/>120套"},
          ];
          ptdata.forEach((e, i) => {
            // 创建point, 将x,y值传入
            let ptpointNumber = new BMap.Point(e.x, e.y);
 
            // 将data中的name加入地图中
            var ptlabel = new BMap.Label(e.name);
            ptlabel.setStyle({
              color: "black", //字体颜色
              fontSize: "13px", //字体大小
              padding: "15px 8px",
              backgroundColor: "white", //文本标注背景颜色
              borderRadius: "50px",
              border: "0",
              textAlign: "center",
              fontWeight: "bold" //字体加粗
            });
            ptmarkerFun(ptpointNumber, ptlabel);
          });
          function ptmarkerFun(ptpoints, ptlabel) {
            var ptmyIcon = new BMap.Icon(
              "/static/one.jpg",
              new BMap.Size(1, 1)
            );
            var ptmarkers = new BMap.Marker(ptpoints, { icon: ptmyIcon });
            // let ptmarkers = new BMap.Marker(ptpoints);
            map.addOverlay(ptmarkers); // 将标注添加到地图中
            ptmarkers.setLabel(ptlabel); // 将data中的name添加到地图中
           
          }
        });
      }
 
      // 获取当前地理位置
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function (r) {
      //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //     var mk = new BMap.Marker(r.point);
      //     map.addOverlay(mk);
      //     map.panTo(r.point);
      //     // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      //   } else {
      //     // alert('failed' + this.getStatus());
      //   }
      // });
    });
  }
};
</script>
 
<style>
#app0 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#allmap {
  height:800px;
  overflow: hidden;
}
.show{
  border: 1px solid black;
  height: 200px;
  position: absolute;
  bottom: 0;
  background-color: white;
  left: 0;
  width: 100%;
  padding: 10px;
}
