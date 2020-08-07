import Vue from "vue";
import VueRouter from "vue-router";
import Index from '@/view/index'
import Auth from '../components/Auth'
import MainMenu from '../components/footmenu/mainmenu'
import Mypic from '../components/Mypic'
import NewRoom from '../view/NewRoom/NewRoom'
import ImgBtn from '../components/ImgBtn'
import RoomBox from "../components/RoomBox";
import secondhand from "../view/Ershouroom/secondhand";
import secRoomBox from "../components/SecondRoomBox";
import Rentroom from "../view/rentRoom/Rentroom";
import Rentroomdetail from "../view/rentRoom/Rentroomdetail";
import NewRoomDetail from "../view/NewRoom/NewRoomDetail";
import secondhandDetail from "../view/Ershouroom/secondhandDetail";
import Tabbar from "../components/Tabbar";
import My from "../view/My/My";
import DongTai from '../components/dongtailist'
import WentiList from '../components/tiwenlist'
import tiwen from "../view/tiwen";
import answer from "../view/answer";
import Dongtai from "../view/Dongtai";
import Wentidengluo from "../view/Wentidengluo";
import RentRoomBox from "../components/RentRoomBox";
import radio from "../components/radio";
import FabuErshou from "../view/FabuErshou";
import Faburent from "../view/Faburent";
import {Dialog} from 'element-ui'
import map from '../view/map'
import applyjjr from '../view/applyjjr'
import huxinBox from "../components/huxinBox";
import myfabu from '../view/myfabu'
import mycollect from '../view/mycollect'
import myhistory from '../view/myhistory'
import mymessage from '../view/mymessage'
import messagebox from '../components/messagebox'
import maplist from '../components/maplist'
import yuyuekanfang from '../view/yuyuekanfang'
import mapview from '../view/mapview'
import activity from '../view/activity/activity'
import activitylist from '../components/activitylist'
import mapfind from '../view/mapfind/mapfind'
import mapdemo from '../view/mapfind/mapdemo'
import editinfo from '../view/editInfo'
import JinjiList from '../components/jinjilist'

Vue.use(VueRouter);

Vue.component("MainMenu", MainMenu);
Vue.component("MyImage",Mypic);
Vue.component("ImgBtn",ImgBtn);
Vue.component("RoomBox",RoomBox)
Vue.component("secRoomBox",secRoomBox)
Vue.component("RentRoomBox",RentRoomBox)
Vue.component("Tabbar",Tabbar)
Vue.component("DongTai",DongTai)
Vue.component("WentiList",WentiList)
Vue.component("tradio",radio)
Vue.component("huxinBox",huxinBox)
Vue.component("Messbox",messagebox)
Vue.component("MapList",maplist)
Vue.component("Activity",activitylist)
Vue.component("JinjiList",JinjiList)
Vue.component(Dialog.name,Dialog)

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
            component:Auth
        },
        {
            path:'/index',
            name:'index',
            meta: {
                title: "房产"
            },
            component:Index
        },
        {
            path:'/index/xf',
            name:'xf',
            meta:{
                title: "新房"
            },
            component: NewRoom
        },
        {
            path:'/index/esf',
            name:'esf',
            meta:{
                title: "二手房"
            },
            component: secondhand
        },
        {
            path:'/index/rent',
            name:'rent',
            meta: {
                title: "租房"
            },
            component: Rentroom
        },
        {
            path:'/map',
            name:'map',
            meta: {
                title: "租房"
            },
            component: map
        },
        {
            path: '/index/xf/detail/',
            name: 'xfdetail',
            meta: {
                title: "新房详情"
            },
            query:{
                id:'',
                time:''
            },
            component: NewRoomDetail
        },
        {
            path: '/index/erf/detail',
            name: 'erfdetail',
            meta: {
                title: "二手房详情"
            },
            query:{
                id:'',
                time:''
            },
            component: secondhandDetail
        },
        {
            path: '/index/rent/detail',
            name: 'rentdetail',
            meta: {
                title: "租房详情"
            },
            query:{
                id:'',
                time:''
            },
            component: Rentroomdetail
        },
        {
            path: '/my',
            name: 'my',
            meta: {
                title: "我的"
            },
            component: My
        },
        {
            path: '/tiwen',
            name: 'tiwen',
            meta: {
                title: "提问"
            },
            query:{
                id:'',
                type:'',
                area:''
            },
            component: tiwen
        },
        {
            path: '/answer',
            name: 'answer',
            meta: {
                title: "回答"
            },
            query:{
                id:'',
                title:'',
                type:'',
                roomid:'',
                area:''
            },
            component: answer
        },
        {
            path: '/dongtaigengduo',
            name: 'dongtaigengduo',
            meta: {
                title: "更多动态"
            },
            query: {
                type:''
            },
            component: Dongtai
        },
        {
            path: '/mapview',
            name: 'mapview',
            meta: {
                title: "地图"
            },
            query: {
                type:''
            },
            component: mapdemo
        },
        {
            path: '/wentigengduo',
            name: 'wentigengduo',
            meta: {
                title: "更多问题"
            },
            query:{
                id:'',
                type:''
            },
            component: Wentidengluo
        },
        {
            path: '/fabuerf',
            name: 'fabuerf',
            meta: {
                title: "发布二手房"
            },
            component: FabuErshou
        },
        {
            path: '/faburent',
            name: 'faburent',
            meta: {
                title: "发布租房"
            },
            component: Faburent
        },
        {
            path:'/applyjjr',
            name:'applyjjr',
            meta:{
                title: "申请成为中介"
            },
            query:{
                status0:0,
                phone:''
            },
            component: applyjjr
        },
        {
            path:'/my/fabu',
            name:'myfabu',
            meta:{
                title: "我的发布"
            },
            component: myfabu
        },
        {
            path:'/my/sc',
            name:'mysc',
            meta:{
                title: "我的收藏"
            },
            component: mycollect
        },
        {
            path:'/my/his',
            name:'myhis',
            meta:{
                title: "我的历史"
            },
            component: myhistory
        },
        {
            path:'/my/message',
            name:'mymessage',
            meta:{
                title: "我的消息"
            },
            component: mymessage
        },
        {
            path:'/yuyue',
            name:'yuyuekanafng',
            query:{
                roomid:'',
                type:''
            },
            meta:{
                title: "预约看房"
            },
            component: yuyuekanfang
        },
        {
            path:'/activity',
            name:'activity',
            meta:{
                title: "活动"
            },
            component: activity
        },
        {
            path:'/index/mapfind',
            name:'mapfind',
            meta:{
                title: "地图找房"
            },
            component: mapfind
        },
        {
            path:'/editinfo',
            name:'mapfind',
            meta:{
                title: "编辑信息"
            },
            component: editinfo
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