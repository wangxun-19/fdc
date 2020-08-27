<template>
    <div class="background">
        <div class="local" >
            <ul
               v-infinite-scroll="onLoad"
               infinite-scroll-distance="10"
            >
              <div v-for="(item,index) in activitylist" :key="index">
                  <Activity 
                     :id="item.id" 
                     :hid="item.hid" 
                     :title="item.title"
                     :img="item.img"
                     :assemblyTime="item.assemblyTime"
                     :assemblyAddress="item.assemblyAddress"
                     :like="item.like"
                     :sign="item.sign"
                     :status="item.status"
                     :totalsign="item.totalSign"
                     @event0="event1"
                   />
              </div>
            </ul>
        </div>
        <MainMenu></MainMenu>
    </div>
</template>

<script>
    import mixin from '../../mixin/mixin'
    import Activity from '../../components/activitylist'
    export default {
        name: "activity",
        mixins:[mixin],
        components:{
            Activity
        },
        created() {
            this.getactivitylist();
        },
        data(){
          return{
              activitylist:[],
              page:0
          }
        },
        methods:{
            getactivitylist(){
                let self = this;
                let token = localStorage.getItem("token");
                // token = 'e84e3873bec74410ed1d8a670a2614fe';
                self.$axios.post("http://house-api.zjlaishang.com:9001/activity/"+self.page,{
                },{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token':token,
                    },
                }).then(function(res){
                    if(res.data.code == 200){
                        res.data.data.forEach(element => {
                            self.activitylist.push(element);
                        });
                    }
                })
            },
            onLoad(){
                let self = this;
                self.page++;
                console.log('123');
                self.getactivitylist();
            },
            event1(data){
                let self = this;
                self.page = 0;
                self.activitylist.length = 0;
                self.getactivitylist();
            }
        }
    }
</script>

<style scoped>
    .background{
        width:100%;
        height:100%;
        position: absolute;
        background:rgba(245,245,245,1);
    }

    .local{
        width: 100%;
        height: 11rem;
        overflow-y:auto;
        margin-bottom: 1.3rem;
    }
</style>