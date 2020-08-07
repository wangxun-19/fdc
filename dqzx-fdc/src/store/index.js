import Vue from "vue";
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state:{
        token:'',
        refresh_token:'',
        event0:'',
        time:0,
        cancelTokenArr: [], //vue路由跳转后取消请求
        myMsg: {}, //我的信息
        newRoomlist: [],
        ershouRoomList:[],
        rentRoomList:[],
    },
    mutations:{
        saveToken(state,value){
            state.token = value;
            localStorage.setItem('token',value);
        },
        saverefreshtoken(state,value){
            state.refresh_token = value;
            localStorage.setItem('refresh_token',value);
        },
        pushToken(state,value){
            state.cancelTokenArr.push(value.cancelTokenArr);
        },
        addevent0(state,value){
            state.event0 = value;
        },
        clearToken({ cancelTokenArr }){
            // cancelTokenArr.forEach(item => {
            //     item("取消请求");
            // });
            // cancelTokenArr = [];
            // console.log(cancelTokenArr);
        },
        setTime(state,value){
            state.time = value;
            localStorage.setItem("time",state.time);
        },
        saveMsg(state,value){
            state.myMsg = value;
        },
        saveNewRoom(state,value){
            state.newRoomlist = value;
        },
        saveershou(state,value){
            state.ershouRoomList = value;
        },
        saverentRoom(state,value){
            state.rentRoom = value;
        }
    }
})