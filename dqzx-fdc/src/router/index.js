import Vue from "vue";
import MainMenu from '../components/footmenu/mainmenu'
import Mypic from '../components/Mypic'
import ImgBtn from '../components/ImgBtn'
import RoomBox from "../components/RoomBox";
import secRoomBox from "../components/SecondRoomBox";
import Tabbar from "../components/Tabbar";
import DongTai from '../components/dongtailist'
import WentiList from '../components/tiwenlist'
import RentRoomBox from "../components/RentRoomBox";
import huxinBox from "../components/huxinBox";
import myfabu from '../view/myfabu'
import mycollect from '../view/mycollect'
import myhistory from '../view/myhistory'
import mymessage from '../view/mymessage'
import messagebox from '../components/messagebox'
import maplist from '../components/maplist'
import activitylist from '../components/activitylist'
import JinjiList from '../components/jinjilist'

// Vue.use(VueRouter);

Vue.component("MainMenu", MainMenu);
Vue.component("MyImage",Mypic);
Vue.component("ImgBtn",ImgBtn);
Vue.component("RoomBox",RoomBox)
Vue.component("secRoomBox",secRoomBox)
Vue.component("RentRoomBox",RentRoomBox)
Vue.component("Tabbar",Tabbar)
Vue.component("DongTai",DongTai)
Vue.component("WentiList",WentiList)
Vue.component("huxinBox",huxinBox)
Vue.component("Messbox",messagebox)
Vue.component("MapList",maplist)
Vue.component("Activity",activitylist)
Vue.component("JinjiList",JinjiList)

export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:'/',
            name:'Auth',
            meta: {
                title: "授权中",
                notShare: true
            },
            component:resolve =>require(['@/components/Auth'],resolve)
        },
        {
            path:'/index/:time',
            name:'index',
            meta: {
                title: "房产"
            },
            component:resolve =>require(['@/view/index'],resolve)
        },
        {
            path:'/search',
            name:'search',
            meta: {
                title: "搜索"
            },
            component:resolve =>require(['@/view/search'],resolve)
        },
        {
            path:'/index/xf/:time',
            name:'xf',
            meta:{
                title: "新房"
            },
            component: resolve =>require(['@/view/NewRoom/NewRoom'],resolve)
        },
        {
            path:'/index/esf/:time',
            name:'esf',
            meta:{
                title: "二手房"
            },
            component: resolve =>require(['@/view/Ershouroom/secondhand'],resolve)
        },
        {
            path:'/index/rent/:time',
            name:'rent',
            meta: {
                title: "租房"
            },
            component: resolve =>require(['@/view/rentRoom/Rentroom'],resolve)
        },
        {
            path: '/index/xf/detail/:id/:time',
            name: 'xfdetail',
            meta: {
                title: "新房详情"
            },
            
            component: resolve =>require(['@/view/NewRoom/NewRoomDetail'],resolve)
        },
        {
            path: '/index/erf/detail/:id/:time',
            name: 'erfdetail',
            meta: {
                title: "二手房详情"
            },
            component: resolve =>require(['@/view/Ershouroom/secondhandDetail'],resolve)
        },
        {
            path: '/index/rent/detail/:id/:time',
            name: 'rentdetail',
            meta: {
                title: "租房详情"
            },
            component: resolve =>require(['@/view/rentRoom/Rentroomdetail'],resolve)
        },
        {
            path: '/my/:time',
            name: 'my',
            meta: {
                title: "我的"
            },
            component: resolve =>require(['@/view/My/My'],resolve)
        },
        {
            path: '/tiwen/:id/:type',
            name: 'tiwen',
            meta: {
                title: "提问"
            },
            component: resolve =>require(['@/view/tiwen'],resolve)
        },
        {
            path: '/answer/:id/:title/:type/:roomid',
            name: 'answer',
            meta: {
                title: "回答"
            },
            // query:{
            //     id:'',
            //     title:'',
            //     type:'',
            //     roomid:'',
            //     area:''
            // },
            component: resolve =>require(['@/view/answer'],resolve)
        },
        {
            path: '/dongtaigengduo/:type/:id',
            name: 'dongtaigengduo',
            meta: {
                title: "更多动态"
            },
            query: {
                type:''
            },
            component: resolve =>require(['@/view/Dongtai'],resolve)
        },
        {
            path: '/wentigengduo/:id/:type',
            name: 'wentigengduo',
            meta: {
                title: "更多问题"
            },
            query:{
                id:'',
                type:''
            },
            component: resolve =>require(['@/view/Wentidengluo'],resolve)
        },
        {
            path: '/fabuerf/:time',
            name: 'fabuerf',
            meta: {
                title: "发布二手房"
            },
            component: resolve =>require(['@/view/FabuErshou'],resolve)
        },
        {
            path: '/faburent/:time',
            name: 'faburent',
            meta: {
                title: "发布租房"
            },
            component: resolve =>require(['@/view/Faburent'],resolve)
        },
        {
            path:'/applyjjr/:status0/:time',
            name:'applyjjr',
            meta:{
                title: "申请成为中介"
            },
            query:{
                status0:0,
                phone:''
            },
            component: resolve =>require(['@/view/applyjjr'],resolve)
        },
        {
            path:'/my/fabu/:time',
            name:'myfabu',
            meta:{
                title: "我的发布"
            },
            component: myfabu
        },
        {
            path:'/my/sc/:time',
            name:'mysc',
            meta:{
                title: "我的收藏"
            },
            component: mycollect
        },
        {
            path:'/my/his/:time',
            name:'myhis',
            meta:{
                title: "我的历史"
            },
            component: myhistory
        },
        {
            path:'/my/message/:time',
            name:'mymessage',
            meta:{
                title: "我的消息"
            },
            component: mymessage
        },
        {
            path:'/yuyue/:type/:roomid/:time',
            name:'yuyuekanafng',
            meta:{
                title: "预约看房"
            },
            component: resolve =>require(['@/view/yuyuekanfang'],resolve)
        },
        {
            path:'/activity/:time',
            name:'activity',
            meta:{
                title: "活动"
            },
            component: resolve =>require(['@/view/activity/activity'],resolve)
        },
        {
            path:'/index/mapfind/:time',
            name:'mapfind',
            meta:{
                title: "地图找房"
            },
            component: resolve =>require(['@/view/mapfind/mapfind'],resolve)
        },
        {
            path:'/editinfo/:time',
            name:'mapfind',
            meta:{
                title: "编辑信息"
            },
            component: resolve =>require(['@/view/editInfo'],resolve)
        },
        { 
            path: '*', 
            redirect: '/index'
        }
    ],
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    base: process.env.BASE_URL,
})