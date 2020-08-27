<template>
    <div class="MenuBox">
        <div class="menu" ref="menuPlaceholder"></div>
        <div class="wrap" ref="bar">
            <div class="menuList">
                <div
                        class="item"
                        v-for="(item,index) in menu_list"
                        :key="index"
                        @click="toTheirRouter(item)"
                >
                    <img
                            :src="item.on == true?item.selepicpath:item.picpath"
                            v-if="index != 2"
                            style="width: 29px;height: 29px"
                    >
                    <div v-if="index == 2" style="display: flex">
                        <img :src="item.picpath" style="width: 46px">
                    </div>
                    <label :class="item.on == true?'on':'span'">{{item.name}}</label>
                </div>
            </div>
        </div>
    </div>
<!--    <div class="wrap" ref="bar">-->
<!--        <div class="menuList">-->
<!--            <div-->
<!--                    class="item"-->
<!--                    v-for="(item,index) in menu_list"-->
<!--                    :key="index"-->
<!--                    @click="toTheirRouter(item)"-->
<!--            >-->
<!--                <div v-if="index !== 2">-->
<!--                    <img :src="item.on == true?item.selepicpath:item.picpath" style="width: 18.2px;height: 19.3px"/>-->
<!--                </div>-->
<!--                <div v-if="index === 2">-->
<!--                    <img :src="item.picpath" style="width: 41.5px;height: 41.5px"/>-->
<!--                </div>-->
<!--                <div v-if="item.on">-->
<!--                    <label class="on">{{item.name}}</label>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                    <label class="span">{{item.name}}</label>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
    export default {
        name: "mainmenu",
        data(){
            return{
                menu_list:[
                    {
                        name: '房源',
                        pathname:'/index',
                        picpath:require("../../assets/images/menu/房源a.png"),
                        selepicpath:require("../../assets/images/menu/房源b.png"),
                        link:'',
                        isRoute: true,
                        on: true
                    },
                    {
                        name:'装修',
                        pathname:'/zx',
                        picpath:require("../../assets/images/menu/装修a.png"),
                        selepicpath:require("../../assets/images/menu/装修b.png"),
                        link:'',
                        isRoute: false,
                        on: false
                    },
                    {
                        name:'',
                        pathname:'',
                        picpath:require("../../assets/images/menu/组1@3x.png"),
                        selepicpath:'',
                        link:'',
                        isRoute: false,
                        on: false
                    },
                    {
                        name:'活动',
                        pathname:'/activity',
                        picpath:require("../../assets/images/menu/活动a.png"),
                        selepicpath:require("../../assets/images/menu/活动b.png"),
                        link:'',
                        isRoute: true,
                        on: false
                    },
                    {
                        name:'我的',
                        pathname:'/my',
                        picpath:require("../../assets/images/menu/我的a.png"),
                        selepicpath:require("../../assets/images/menu/我的b.png"),
                        link:'',
                        isRoute: true,
                        on: false
                    }
                ]
            }
        },
        created() {
            this.$nextTick(()=>{
                let height = this.$refs.bar.clientHeight;
                // this.$refs.menuPlaceholder.style.height = height + "px";
            })
        },
        mounted() {
            let self = this;
            self.menu_list.forEach(element=>{
                element.on = false;
            })
            switch (this.$route.name) {
                case "index":
                    self.menu_list[0].on = true;
                    console.log('123');
                    break;
                case "zx":
                    self.menu_list[1].on = true;
                    break;
                case "activity":
                    self.menu_list[3].on = true;
                    break;
                case "my":
                    self.menu_list[4].on = true;
                    break;
            }
        },
        methods:{
            toTheirRouter(item){
                if(item.isRoute == true){
                    if(item.pathname != '/index'){
                        window.location.href = 'http://'+window.location.host+item.pathname+'/'+new Date().toString();
                    }else{
                        window.location.href = 'http://'+window.location.host+item.pathname+'/'+parseInt(Math.random()*100000);
                    }
                    
                    // this.$router.push({
                    //     name:item.pathname
                    // });
                }else{
                    this.$toast('尽请期待')
                    // window.location.href = item.link;
                }
            }
        }
    }
</script>

<style scoped>
    .MenuBox{
        position: relative;
    }

    .wrap{
        position: fixed;
        z-index:199;
        width: 100%;
        height: 55px;
        bottom: 0;
        left: 0;
        border-top: 1px solid #F4F4F4;
    }

    .menuList{
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        height: 55px;
        font-size: 13px;
    }

    .menuList .item{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        color: #444;
        padding: 4px 0;
        height: 55px;
    }

    .menuList .item .span{
        margin-top: 3px;
        color: #444;
    }

    .menuList .item .on{
        margin-top: 3px;
        color: #17a6dc;
    }

</style>