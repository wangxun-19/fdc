<template>
    <div class="index">
        <div class="searchBox">
            <div class="searchBtn">
                <input
                        type="search"
                        placeholder="请输入楼盘信息或关键字"
                        v-model="keyword"
                        autofocus
                        ref="inputs"
                />
                <van-icon  name="search" class="searchicon" @click="onSearch" />
            </div>
        </div>
        <div class="flexContainer">
            <van-swipe :autoplay="autotime">
                <van-swipe-item v-for="(item,index) in swiper_list" :key="index" @click="gotolink(item.link)">
                    <my-image :src="item.img" :radius="7" ></my-image>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="menulist" style="">
            <div class="item"
                 v-for="(item,index) in menu_icon"
                 :key="index"
                 @click="toTheirLink(item)"
            >
                <img :src="item.pic" class="ic">
                <label>{{item.name}}</label>
            </div>
        </div>
        <div class="middle">
            <img :src="img" class="picture">
            <div class="gonggao">
                <van-swipe 
                    style="height: 1.20rem" 
                    :autoplay="autotime"
                    vertical
                    :show-indicators="false"
                 >
                    <van-swipe-item v-for="(item,index) in newarr" :key="index">
                         <van-row>
                             <div class="circle" style="margin-top: 0.25rem;margin-right: 0.21rem;float:left"></div>
                             <label class="gonggaolabel">{{item[0].content}}</label>
                         </van-row>
                         <van-row v-if="item[1].content != undefined&&item[1].content != ''">
                             <div class="circle" style="margin-top: 0.25rem;margin-right: 0.21rem;float:left"></div>
                             <label class="gonggaolabel">{{item[1].content}}</label>
                         </van-row>
                    </van-swipe-item>
                </van-swipe>
                <!-- <swiper ref="mySwiper" :options="swiperOptions">
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide>
                    <swiper-slide>Slide 5</swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
              </swiper> -->
            </div>
        </div>
        <div>
            <div class="xin" >
                <div>
                    <label class="new" style="">新上房源<label class="text" @click="addmore">更多</label></label>
                </div>
                <div>
                    <label style="" class="goodroom">优质好房推荐</label>
                </div>

            </div>
        </div>
        <div class="mess">
            <div v-if="nodata">
                <label>暂无房子数据</label>
            </div>
            <div v-if="!nodata">
                <div v-for="(item,index) in newroom" :key=index>
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
            </div>
        </div>
        <MainMenu></MainMenu>
    </div>
<!--    <MainMenu></MainMenu>-->
</template>

<script>
    // import 'swiper/swiper-bundle.css'
    import mixin from "../mixin/mixin";

    export default {
        name: "index",
        components:{
            
        },
        mixins:[mixin],
        data(){
            return{
                autotime:3000,
                indicator:'white',
                keyword:'',
                swiper_list:[
                    {
                        img:require("../assets/images/swiper/swiper_1.png"),
                        link:''
                    },
                    {
                        img:require("../assets/images/swiper/swiper_2.png"),
                        link:''
                    },
                    {
                        img:require("../assets/images/swiper/swiper_3.png"),
                        link:''
                    }
                ],
                img:require("../assets/images/组39@3x.png"),
                messdata:[],
                nodata:true,
                newroom:[],
                newarr:[],
                menu_icon:[
                    {
                        name:'新房',
                        pic:require('../assets/images/icon/newroom.png'),
                        path:'/index/xf',
                        isRoute:true,
                    },
                    {
                        name:'二手房',
                        pic:require('../assets/images/icon/ershou.png'),
                        path:'/index/esf',
                        isRoute:true,
                    },
                    {
                        name:'租房',
                        pic:require('../assets/images/icon/zuroom.png'),
                        path:'/index/rent',
                        isRoute:true,
                    },
                    {
                        name:'地图找房',
                        pic:require('../assets/images/icon/mapfind.png'),
                        path:'/index/mapfind',
                        isRoute:true,
                    }
                ],
                newlist:[
                    
                ],
            }
        },
        mounted(){
            
        },
        created() {
            let self = this;
            self.newRoomlist();
            self.getSwiper();
            self.getIcon();
            self.getnew();
            this.getlocation();
            // this.updateBaseFontSize();
        },
        methods:{
            getlocation(){
                this.$wxMethod.getLocation((res)=>{
                    alert(res)
                })
            }
,            toTheirLink(item){
                if(item.isRoute){
                    // this.$router.push({
                    //     path:item.path
                    // })
                    window.location.href = item.path;
                }
            },
            getIcon(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/bar",{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        console.log(res.data);
                        self.menu_icon.length = 0;
                        res.data.data.forEach(item=>{
                            let icon = {name:item.title,pic:item.image,isRoute:true,path:''};
                            if(item.link == ''){
                                icon.isRoute = false;
                            }
                            let patharr = item.link.split('/');
                            let path = item.link
                            icon.path = path;
                            self.menu_icon.push(icon);
                        })
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            getSwiper(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/banner",{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        self.swiper_list.length = 0;
                        res.data.data.forEach(item=>{
                            let picpath = {img:item.image,link:item.link};
                            self.swiper_list.push(picpath);
                        })
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            getnew(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/announcement",{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    console.log(res.data);
                    if(res.data.code == 200){
                        self.newlist.length = 0;
                        res.data.data.forEach(item=>{
                            self.newlist.push(item);
                        })
                        // self.newarr = self.newlist;
                        self.newarr = self.formatArray(self.newlist,2);
                        console.log(self.newarr);
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            gotolink(link){
                if(link == null||link == ''){
                    window.location.href = link;
                }
            },
            formatArray(arr,num){
                var newArray = new Array(Math.ceil(arr.length / num));
	            for(let i =0; i<newArray.length; i++){
	                newArray[i] = [];
	                for(var j=0;j<num; j++){
	                   newArray[i][j] = {};
		            }
	            }
	            for(var i =0; i<arr.length; i++)
	            {
		            newArray[parseInt(i/num)][i%num]= arr[i];
                }
                console.log(newArray);
	            return newArray;
            },
            onSearch(){
                let self = this;
                self.newroom = [];
                self.newRoomlist();
                // console.log(self.keyword);
                // self.$axios.get()
            },
            addmore(){
                let self = this;
                self.$router.push('/index/xf');
            },
            updateBaseFontSize(){
                var dWidth = document.documentElement.clientWidth;
                var baseFontSize = dWidth * 100 / 750;
                console.log(123);
                document.documentElement.style.fontSize = baseFontSize + 'px';
            },
            newRoomlist(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/new/0/"+self.keyword,{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    // self.$toast(res.data.code);
                    if(res.data.code == 200){
                        self.nodata = false;
                        res.data.data.forEach(element => {
                            self.newroom.push(element);
                        });
                    }else{
                        self.nodata = true;
                    }
                })
                .catch(function(err){
                    // self.$toast(err);
                    self.nodata = true;
                })
            },
        }
    }
</script>

<style scoped>
    .swiper-container {
      width: 100%;
      height: 1.29rem;
    }

    .xin{
        margin-top: 0.23rem;
    }

    .searchicon{
        float:right;
        margin-right: 0.3rem;
        font-size: 0.26rem;
    }
    .swiper-slide {
      text-align: center;
      font-size: 0.18rem;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      width: 100%;
    }
    .swiper-slide:nth-child(2n) {
      width: 100%;
    }
    .swiper-slide:nth-child(3n) {
      width: 100%;
    }
    .gonggaolabel{
        font-size:0.40rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(254,254,254,1);
    }
    input {
        border: none;
        outline: none;
        /* width:140px; */
        margin-left: 0.09rem;
        /* padding-top: 10px;
        padding-bottom: 9px; */
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(182,182,197,1);
        width: 100%;
    }

    .flexContainer{
        text-align: center;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        /* margin-left: 20px;
        margin-right: 20px;
        border-radius:7px; */
    }
    .searchBox{
        /* padding-top: 9px; */
        padding-top: 0.2rem;
        /* padding-bottom: 12px; */
        padding-bottom: 0.24rem;
        display: flex;
        align-items: center;
    }
    .menulist{
           margin-top: 0.15rem;
           width: 100%;
           display: flex;
           justify-content: space-between;
           font-size: 0.1rem;
        }

        .menulist .item{
           flex: 1;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           color: #444;
           font-weight: 500;
           font-size: 0.23rem;
        }

        .ic{
            width: 0.73rem;
            height: 0.73rem;
            margin-bottom: 0.09rem;
        }
        .xin{
           margin-top: 0.33rem;
           width: 100%;
        }

        .xin div{
          margin: 0;
          padding: 0;
        }

        .xin .new{
           font-size:0.41rem;
           margin-left: 0.46rem;
           font-family:PingFang SC;
           font-weight:bold;
           color:rgba(24,25,52,1);
        }

        .mess{
            margin-top: 0.2rem;
            width: 100%;
            margin-bottom: 2rem;
        }

        .middle{
           position: relative;
           margin-top: 0.44rem;
           margin-left: 0.46rem;
           margin-right: 0.46rem;
        }

        .middle .gonggao{
            position: absolute;
            left: 0.60rem;
            top: 0.25rem;
            z-index: 199;
        }

        .gonggao .circle{
            width:0.10rem;
            height:0.10rem;
            background:rgba(255,255,255,1);
            border-radius:50%; 
        }

        .gonggao .gaonggaolabel{
            font-size:0.28rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(254,254,254,1);
        }

        .xin .goodroom{
            font-size:0.23rem;
            font-family:PingFang SC;
            font-weight:500;
            margin-top: 0.11rem;
            margin-left: 0.46rem;
            color:rgba(145,146,157,1);
            
        }
        .xin .text{
            float: right;
            font-size:0.26rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(83,109,174,1);
            margin-right: 0.46rem;
            margin-top: 14px;
            margin-top: 0.14rem;
            /* margin-right: 19px;
            margin-top: 14px;
            margin-bottom: 1px; */
        }
    .searchBox .searchBtn{
        display: flex;
        flex: 1;
        margin-right: 0.435rem;
        margin-left: 0.44rem;
        height:0.69rem;
        width:100%;
        background:rgba(255,255,255,1);
        border:1px solid rgba(240, 240, 240, 1);
        border-radius:0.04rem;
        align-items: center;
    }
    

    .picture{
        width: 100%;
    }

    .swiper-slide[data-v-4f795181] {
       text-align: center;
       font-size: 0.18rem;
       display: flex;
       background: none;
       justify-content: center;
       align-items: center;
       width: 100%;
    }
</style>