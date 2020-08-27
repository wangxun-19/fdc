<template>
    <div></div>
</template>

<script>
    import CodeDeal from "../utils/CodeDeal";
    import mixin from "../mixin/mixin";
    export default {
        name: "Auth",
        mixins: [mixin],
        created() {
            document.title = "正在授权";
            let code = this.$route.query.code;
            let self = this;
            console.log(code);
            if(code){
                CodeDeal.getToken(code,()=>{
                    self.auth();
                });
            }else{
                self.toauth();
            }
        },
        methods:{
            auth(){
                let token = localStorage.getItem("token");
                let authBefore = localStorage.getItem("authBefore");
                if(token){
                    console.log(authBefore);
                    if(authBefore != ''&&authBefore != undefined){
                        window.location.href = authBefore;
                    }else{
                        window.location.href = 'http://'+window.location.host+'/index/'+12345;
                    }
                    localStorage.removeItem("authBefore");
                }else{
                    CodeDeal.towxAuth();
                }
            },
            toauth(){
                CodeDeal.towxAuth();
            }
        }
    }
</script>

<style scoped>

</style>