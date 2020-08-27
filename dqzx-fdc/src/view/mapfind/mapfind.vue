<template>
  <div>
      <ul class="tab-tilte" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC;justify-content: space-around; z-index:199">
           <li @click="selectarea(1)" :class="{active:area==1}" >新房</li>
           <li @click="selectarea(2)" :class="{active:area==2}" >二手房</li>
           <li @click="selectarea(3)" :class="{active:area==3}">租房</li>
       </ul>
      <div id="allmap"></div>
      <van-popup 
          closeable
          position="bottom"
          :style="{ height: '50%' }"
          v-model="show0"
          @close="closed"
       >
           <van-row style="margin-top:0.2rem">
               <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC;border-bottom: 1px solid #F3F4FA">
                    <li v-if="nature==1" :class="{active:nature==1}" style="margin-left: 21px;margin-bottom: 6.6px">新房</li>
                    <li v-if="nature == 2" :class="{active:nature==2}" style="margin-left: 21px;margin-bottom: 6.6px">二手房</li>
                    <li v-if="nature == 3" :class="{active:nature==3}" style="margin-left: 21px;margin-bottom: 6.6px">租房</li>
                </ul>
               <!-- <label style="text-align:center">楼盘名：<span>{{buildingname}}</span></label> -->
           </van-row>
           <van-row>
               <div class="line"></div>
           </van-row>
           <van-row style="margin-left: 0.5rem">
               <label style="font-weight: bold;font-size: 0.5rem;color:#000">{{buildingname}}</label>
           </van-row>
           <van-row style="margin-left: 0.5rem">
               <label v-if="selectedpoint != null&&selectedpoint.type == 'xf'">均价：<span>{{selectedpoint.unitPrice}}元/㎡</span></label>
               <label v-if="selectedpoint != null&&selectedpoint.type == 'erf'">二手房源<span>有{{selectedpoint.total}}套</span></label>
               <label v-if="selectedpoint != null&&selectedpoint.type == 'rent'">租房房源<span>有{{selectedpoint.total}}套</span></label>
           </van-row>
           <van-row style="height: 3rem;overflow-y:auto">
               <ul
                 v-infinite-scroll="onLoad"
                 v-if="selectedpoint != null&&selectedpoint.type == 'xf'"
                infinite-scroll-distance="1">
                  <div v-for="(item,index) in newroomlist" :key="index" >
                      <RoomBox
                            :title="item.title"
                            :room_id="item.id"
                            :img="item.img[0]"
                            :price="item.unitPrice"
                            :status="item.status"
                            :localName="item.localName"
                            :min="item.minArea"
                            :max="item.maxArea"
                            :nature="item.nature"
                            danwei="元/m²起"
                       ></RoomBox>
                  </div>
               </ul>
               <ul
                 v-infinite-scroll="onLoad"
                 v-if="selectedpoint != null&&selectedpoint.type == 'erf'"
                infinite-scroll-distance="1">
                  <div v-for="(item,index) in newroomlist" :key="index" >
                      <secRoomBox
                            :title="item.name"
                            :price="item.totalPrice"
                            :se_room_id="item.id"
                            :address="item.localName"
                            :img="item.img"
                        ></secRoomBox>
                  </div>
               </ul>
               <ul
                 v-infinite-scroll="onLoad"
                 v-if="selectedpoint != null&&selectedpoint.type == 'rent'"
                infinite-scroll-distance="1">
                  <div v-for="(item,index) in newroomlist" :key="index" >
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
           </van-row>
       </van-popup>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mixin from '../../mixin/mixin'
var map,options;
export default {
  name: 'app',
  mixins:[mixin],
  components: {

  },
  mounted(){
      this.getLocation();
  },
  data(){
      return{
          mappoints:[],
          location:[],
          Bmappoint:[],
          myLatitude:'',
          buildingname:'',
          nature:'',
          myLongitude:'',
          show0:false,
          clickedpoint:null,
          selectedpoint:null,
          page:0,
          area:1,
          mk:'',
          locations:'',
          cur:1,
          areaId:0,
          newroomlist:[]
      }
  },
  methods:{
      getLocation(){
          let self = this;
          map = new BMap.Map('allmap');
          map.centerAndZoom(new BMap.Point(120.107234,30.881096),13);  //初始化时，即可设置中心点和地图缩放级别。
          map.enableDragging(true); 
          map.enableScrollWheelZoom(true);
          map.addEventListener('dragend',this.showinfo);
          map.addEventListener('zoomend',this.zoomend);
        //   this.$wxMethods.getLocation((res)=>{
        //       self.mk = new BMap.Marker(new BMap.Point(res.longitude, res.latitude))
        //       map.addOverlay(self.mk);
        //       self.location = new BMap.Point(res.longitude, res.latitude);
        //       map.panTo(self.location);
        //       self.myLatitude = res.longitude
        //       self.myLatitude = res.latitude;
        //       if(self.area == 1){
        //           self.getMappoint();
        //       }else if(self.area == 2){
        //           self.Mapershou();
        //       }else{
        //           self.Maprent();
        //       }
        //   })
//           var geolocation = new BMap.Geolocation();
// // 开启SDK辅助定位
//       geolocation.enableSDKLocation();
//       geolocation.getCurrentPosition(function(r){
// 	      if(this.getStatus() == BMAP_STATUS_SUCCESS){
// 	      	  self.mk = new BMap.Marker(r.point);
//                 map.addOverlay(self.mk);
//                 self.location = r.point;
//               map.panTo(r.point);
//               if(self.area == 1){
//                   self.getMappoint();
//               }else if(self.area == 2){
//                   self.Mapershou();
//               }else{
//                   self.Maprent();
//               }
// 	      	// alert('您的位置：'+r.point.lng+','+r.point.lat);
// 	      }
// 	      else {
// 	      	alert('failed'+this.getStatus());
// 	      }        
//        });
          if(self.area == 1){
              self.$axios.get('http://house-api.zjlaishang.com:9001/new/areaCount',{
                  headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
            }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                    let x = {x:0,y:0,name:''};
                    x.name = item.title+'<br />'+item.total+'套房';
                    if(item.local != null){
                        let localarr = item.local.split(',');
                        x.x = Number(localarr[0]);
                        x.y = Number(localarr[1]);
                    }else{
                        x.x = 119.917731;
                        x.y = 31.033022;
                    }
                    x.areaid = item.id;
                   self.location.push(x);
                 })
                  self.getarea()
              }else{
                  self.$toast(res.data.msg)
              }
            })
          }else if(self.aera == 2){
               self.$axios.get('http://house-api.zjlaishang.com:9001/old/areaCount',{
                   headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
            }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                    let x = {x:0,y:0,name:''};
                    x.name = item.title+'<br />'+item.total+'套房';
                    if(item.local != null){
                        let localarr = item.local.split(',');
                        x.x = Number(localarr[0]);
                        x.y = Number(localarr[1]);
                    }else{
                        x.x = 119.917731;
                        x.y = 31.033022;
                    }
                    x.areaid = item.id;
                   self.location.push(x);
                 })
                  self.getarea()
              }else{
                  self.$toast(res.data.msg)
              }
            })
          }else {
              self.$axios.get('http://house-api.zjlaishang.com:9001/rent/areaCount',{
                  headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
            }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                    let x = {x:0,y:0,name:''};
                    x.name = item.title+'<br />'+item.total+'套房';
                    if(item.local != null){
                        let localarr = item.local.split(',');
                        x.x = Number(localarr[0]);
                        x.y = Number(localarr[1]);
                    }else{
                        x.x = 119.917731;
                        x.y = 31.033022;
                    }
                    x.areaid = item.id;
                   self.location.push(x);
                 })
                  self.getarea()
              }else{
                  self.$toast(res.data.msg)
              }
            })
          }
      },
      selectarea(index){
          let self = this;
          this.area = index;
          map.clearOverlays();
            self.Bmappoint.length = 0;
          self.mappoints.length = 0;
          self.location.length = 0;
          let center = map.getCenter();
          map.centerAndZoom(new BMap.Point(120.107234,30.881096),13)
          let zoom = map.getZoom();
          if(zoom <=13){
              self.getLocation();
          }else{
              if(self.area == 1){
                  self.getMappoint(self.areaId)
              }else if(self.area == 2){
                  self.Mapershou(self.areaId)
              }else{
                  self.Maprent(self.areaId)
              }
          }
        //   self.Bmappoint.length = 0;
        //   self.mappoints.length = 0;
        //   map.addOverlay(self.mk)
      },
      getarea(){
          let self = this;
            self.location.forEach((e,index)=>{
                let point = new BMap.Point(e.x, e.y);
                var label = new BMap.Label(e.name);
                var id = e.areaid;
                label.setStyle({
                   color: "white", //字体颜色
                   fontSize: "13px", //字体大小
                   padding: "0.5rem 8px",
                   width:'1.6rem',
                   height:'1.6rem',
                   backgroundColor: "green", //文本标注背景颜色
                   borderRadius: "50%",
                   border: "0",
                   textAlign: "center",
                   fontWeight: "bold" //字体加粗
                 });
                 self.makefun(point,label,id)
            })
      },
      makefun(points,label,id){
          let self = this;
          var myIcon = new BMap.Icon("/static/one.jpg", new BMap.Size(1, 1));
          var markers = new BMap.Marker(points, { icon: myIcon });
          map.addOverlay(markers); // 将标注添加到地图中
          markers.setLabel(label); // 将data中的name添加到地图中
          label.addEventListener('click',function(event){
              event.currentTarget.setStyle({
                 color: "green", //字体颜色
                 fontSize: "13px", //字体大小
                 padding: "0.5rem 8px",
                 width:'1.6rem',
                 height:'1.6rem',
                 backgroundColor: "yellow", //文本标注背景颜色
                 borderRadius: "50%",
                 border: "0",
                 textAlign: "center",
                 fontWeight: "bold" //字体加粗
             })
             map.clearOverlays();
             map.centerAndZoom(points,16);
             let contentarr = event.target.content.split('<br />')
             let content = contentarr[0];
             let content0 = '';
             self.myLatitude = points.lat;
             self.myLongitude = points.lng;
             self.areaId = id;
             if(self.area == 1){
                 self.getMappoint(id)
             }else if(this.area == 2){
                 self.Mapershou(id)
             }else{
                 self.Maprent(id)
             }
          })
      },
      showPosition(position){
          console.log(position);
      },
      showError(error){
          console.log(error);
      },
      onLoad(){
          this.page++;
          this.getroomlist(this.selectedpoint);
      },
      getMappoint(id){
          let self = this;
          let token = localStorage.getItem("token");
          let formdata = new FormData();
          formdata.append("areaId",id);
        //   formdata.append("latitude",self.myLatitude);
          self.$axios.post("http://house-api.zjlaishang.com:9001/new/mapHouse",formdata,{
              
          },{
              headers:{
                        // token:token,
                    'Content-Type': 'application/x-www-form-urlencoded',
              }
          }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                      item.type = 'xf';
                      self.mappoints.push(item);
                  })
                  self.Mapinit();
                //   self.Mapershou();
              }else{
                  self.$toast(res.data.msg);
                  self.Mapinit();
                //   self.Mapershou();
              }
          })
          .catch(function(err){
            //   self.Mapershou();
          })
      },
      Mapershou(id){
          let self = this;
          let token = localStorage.getItem("token");
          let formdata = new FormData();
        //   map.clearOverlays();
        //   self.myLatitude = '39.905409'
        //   self.myLongitude = '116.514202'
          formdata.append("areaId",id);
          self.$axios.post("http://house-api.zjlaishang.com:9001/old/mapHouse",formdata,{
              headers:{
                        // token:token,
                    'Content-Type': 'application/x-www-form-urlencoded',
              }
          }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                      item.type = 'erf';
                      self.mappoints.push(item);
                  })
                  self.Mapinit();
                //   self.Maprent();
                //   self.mappoints = res.data.data;
                //   self.Mapinit();
              }else{
                  self.$toast(res.data.msg);
                  self.Mapinit();
                //   self.Maprent();
              }
          })
          .catch(function(err){
              self.Maprent();
          })
      },
      Maprent(id){
          let self = this;
          let token = localStorage.getItem("token");
          let formdata = new FormData();
        //   map.clearOverlays();
        //   self.myLatitude = '39.905409'
        //   self.myLongitude = '116.514202'
          formdata.append("areaId",id);
        //   formdata.append("latitude",self.myLatitude);
          self.$axios.post("http://house-api.zjlaishang.com:9001/rent/mapHouse",formdata,{
              headers:{
                        // token:token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
          }).then(function(res){
              if(res.data.code == 200){
                  res.data.data.forEach(item=>{
                      item.type = 'rent';
                      self.mappoints.push(item);
                  })
                //   self.Maprent();
                //   self.mappoints = res.data.data;
                  self.Mapinit();
              }else{
                  self.$toast(res.data.msg);
                  self.Mapinit();
              }
          })
          .catch(function(err){
              self.Mapinit();
          })
      },
      Mapinit(){
          console.log(this.mappoints)
          this.getPoint(this.mappoints);
      },
      showinfo(evt){
          let self = this;
          var cp = map.getCenter();
          console.log(cp.lng + "," + cp.lat);
          self.myLatitude = cp.lat;
          self.myLongitude = cp.lng;
          map.clearOverlays();
          self.Bmappoint.length = 0;
          self.mappoints.length = 0;
        //   map.addOverlay(self.mk);
          let zoom = evt.target.getZoom();
          if(zoom <= 13){
              self.myLatitude = cp.lat;
              self.myLongitude = cp.lng;
              self.getarea();
          }else if(zoom>13&&zoom<=16){
              self.myLatitude = cp.lat;
              self.myLongitude = cp.lng;
              if(self.area == 1){
                  self.getMappoint(self.areaId);
              }else if(self.area == 2){
                  self.Mapershou(self.areaId);
              }else{
                  self.Maprent(self.areaId);
              }
          }else{
              self.myLatitude = cp.lat;
              self.myLongitude = cp.lng;
              if(self.area == 1){
                  self.getMappoint(self.areaId);
              }else if(self.area == 2){
                  self.Mapershou(self.areaId);
              }else{
                  self.Maprent(self.areaId);
              }
          }
        //   self.getMappoint();
      },
      zoomend(evt){
          let self = this;
          console.log(evt);
          let zoom = evt.target.getZoom();
        //   map.clearOverlays();
          self.Bmappoint.length = 0;
          self.mappoints.length = 0;
          console.log('zoom: '+zoom);
          var cp = map.getCenter();
          map.addOverlay(self.mk);
          console.log(cp.lng + "," + cp.lat);
          if(zoom <= 13){
              self.myLatitude = cp.lat;
              self.myLongitude = cp.lng;
              self.getarea();
          }else if(zoom>13&&zoom<=16){
              self.myLatitude = cp.lat;
              self.myLongitude = cp.lng;
              if(self.area == 1){
                  self.getMappoint(self.areaId);
              }else if(self.area == 2){
                  self.Mapershou(self.areaId);
              }else{
                  self.Maprent(self.areaId);
              }
          }else{
              self.myLatitude = cp.lat;
              self.myLongitude = cp.lng;
              if(self.area == 1){
                  self.getMappoint();
              }else if(self.area == 2){
                  self.Mapershou();
              }else{
                  self.Maprent();
              }
          }
      },
      getPoint(points){
          let self = this;
          points.forEach((e,i) => {
            //   let ptpointNumber = new BMap.Point(e.x, e.y);
            let localarr = e.local.split(',');
            let longitude = Number(localarr[0])
            let latitude = Number(localarr[1])
            let Bmappoint = new BMap.Point(longitude,latitude);
            let ptlabel0;
            if(e.type == 'xf'){
                ptlabel0 = e.name+'<br />'+e.unitPrice+'元/㎡'
            }else{
                ptlabel0 = e.name+'<br />'+e.total+'套房'
            }
            let ptlabel = new BMap.Label(ptlabel0);
            ptlabel.setStyle({
              color: "white", //字体颜色
              fontSize: "13px", //字体大小
              backgroundColor: "green", //文本标注背景颜色
              opacity: "0.8", //文本标注背景颜色
              borderRadius: "50px",
              border: "0",
              textAlign: "center",
              fontWeight: "bold" //字体加粗
            });
            self.ptmarkerFun(Bmappoint, ptlabel,e);
          });
      },
      ptmarkerFun(ptpoints, ptlabel,info){
          var ptmyIcon = new BMap.Icon(
              "/static/one.jpg",
              new BMap.Size(1, 1)
            );
            var ptmarkers = new BMap.Marker(ptpoints,{ icon: ptmyIcon });
            map.addOverlay(ptmarkers); // 将标注添加到地图中
            ptmarkers.setLabel(ptlabel); // 将data中的name添加到地图中
            this.Bmappoint.push(ptmarkers)
            ptlabel.addEventListener('click',this.getitem)
      },
      clicknature(index){
          this.newroomlist.length = 0;
          if(this.nature != index){
              this.nature = index;
          }else{
              this.nature = '';
          }
          this.getroomlist(this.selectedpoint)
      },
      getitem(e){
          let self = this;
          console.log(e);
          e.currentTarget.setStyle({
              color: "white", //字体颜色
              fontSize: "13px", //字体大小
              backgroundColor: "blue", //文本标注背景颜色
              opacity: "0.8", //文本标注背景颜色
              borderRadius: "50px",
              border: "0",
              textAlign: "center",
              fontWeight: "bold" //字体加粗
          })
          this.clickedpoint = e.currentTarget;
          let local = e.currentTarget.point.lng + ','+e.currentTarget.point.lat;
          this.selectedpoint = null;
          this.mappoints.forEach(item=>{
              if(item.local == local){
                  self.selectedpoint = item;
              }
          })
          if(self.selectedpoint.type == 'xf'){
              self.nature = 1;
          }else if(self.selectedpoint.type == 'erf'){
              self.nature = 2;
          }else{
              self.nature = 3;
          }
          let labelarr = e.currentTarget.content.split('<br />');
          console.log(labelarr);
          self.show0 = true;
          self.buildingname = labelarr[0];
          self.getroomlist(self.selectedpoint);
      },
      getroomlist(selectedpoint){
          let self = this;
          let id = selectedpoint.id;
          let token = localStorage.getItem("token");
          if(self.nature == 1){
              self.$axios.get("http://house-api.zjlaishang.com:9001/new/"+self.page,{
                    headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
              }).then(function(res){
                  if(res.data.code == 200){
                      res.data.data.forEach(item=>{
                          if(item.id == id){
                              self.newroomlist.push(item);
                          }
                      })
                  }else{}
              })
          }else if(self.nature == 2){
              self.$axios.get("http://house-api.zjlaishang.com:9001/old/"+self.page,{
                    headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
              }).then(function(res){
                  if(res.data.code == 200){
                      res.data.data.forEach(item=>{
                          if(item.id == id){
                              self.newroomlist.push(item);
                          }
                      })
                  }else{}
              })
          }else if(self.nature == 3){
              self.$axios.get("http://house-api.zjlaishang.com:9001/rent/"+self.page,{
                    headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
              }).then(function(res){
                  if(res.data.code == 200){
                      res.data.data.forEach(item=>{
                          if(item.id == id){
                              self.newroomlist.push(item);
                          }
                      })
                  }else{}
              })
          }else{
              self.newroomlist.length =0;
          }
      },
      closed(){
          this.clickedpoint.setStyle({
              color: "white", //字体颜色
              fontSize: "13px", //字体大小
              backgroundColor: "green", //文本标注背景颜色
              opacity: "0.8", //文本标注背景颜色
              borderRadius: "50px",
              border: "0",
              textAlign: "center",
              fontWeight: "bold" //字体加粗
          })
          this.show0 = false;
          this.selectedpoint = null;
          this.clickedpoint = null;
          this.page = 0;
          this.newroomlist.length = 0;
          this.buildingname = '';
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
       #allmap{
           position: absolute;
           height:91%;
           width: 100%;
           z-index:0
       } 
       .bt {
			    position: absolute;
			    right: 0;
			    top: 10px;
			    width: 14px;
			    height: 14px;
			    border-right: 1px solid #999;
			    border-bottom: 1px solid #999;
			    -webkit-transform: rotate(45deg);
		}
        .zhuangxiu{
        width: 90%;
    }

    .zhuangxiu li{
        float: left;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width: 70px;
        height: 36px;
        background-color: #D8D8D8;
        font-size: 14px;
        color: #000;
        border-radius: 4px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }

    .zhuangxiu .active{
        background-color: #fcf6ef;
        color: #EC613E;
    }
    .line{
        width: 100%;
        height: 1px;
        background-color: #F3F4FA;
    }
    /*#app{*/
    /*    background: #F7F9FE;*/
    /*}*/
</style>
