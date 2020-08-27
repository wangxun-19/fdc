<template>
    <div>
        <div v-if="methods == 0">
            <van-form>
                <van-field
                    v-model="title"
                    label="标题"
                    placeholder="标题"
                    input-align="right"
                    type="label"
                    :required="true"
                    :rules="[{ required: true,message: '标题不能为空' }]"
            ></van-field>
            <div class="greyline">
                <label class="zi">租金详情</label>
            </div>
            <van-field
                    v-model="unitPrice"
                    label="*月租金"
                    placeholder="月租金"
                    input-align="right"
                    type="digit"
                    :rules="[{ required: true,validator: asyncValidator,message: '请输入正确内容' }]"
            ></van-field>
            <van-field
                    readonly
                    clickable
                    label="*月结方式"
                    :value="type"
                    input-align="right"
                    placeholder="请选择"
                    @click="showType"
            >
            </van-field>
            <el-dialog :visible.sync="showPicker0" title="提示" width="100%">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @cancel="showPicker0 = false"
                        @confirm="onConfirm"
                />
            </el-dialog>
            </van-form>
            <div class="greyline">
                <label class="zi">基本信息</label>
            </div>
            <van-form>
                <van-field
                    v-model="localName"
                    readonly
                    clickable
                    label="小区"
                    placeholder="小区"
                    input-align="right"
                    required
                    @click="shouxiaoqu"
            >
            </van-field>
            <el-dialog :visible.sync="showPicker1" title="选择小区" fullscreen>
                <van-row>
                    <van-field
                        label="小区名:"
                        v-model="title0"
                        input-align="right"
                        placeholder="请输入关键字"
                        @input="tiplist"
                    >
                    </van-field>
                    <!-- <van-col :span="8">
                        <label>请输入关键字:</label>
                    </van-col>
                    <van-col :offset="1" :span="15">
                        <van-field
                           v-model="title0"
                           input-align="right"
                           placeholder="请输入关键字"
                           @input="tiplist"
                        >
                        </van-field>
                    </van-col> -->
                </van-row>
                <div class="scroll">
                    <div class="title">
                        <span></span>
                    </div>
                    <ul class="max-height" v-for="(item, index) in addresslist" :key="index">
                        <li  v-on:click="selectInput(index)" class="auto" :class="{active00:addressIndex==index}">
                            <span class='site_big'>{{item.name}}</span>
                            <span class='site_del'>{{item.district}}</span>
                        </li>
                    </ul>
                </div>
                <van-row style="margin-top: 20px">
                     <van-col :span="6">
                         <van-button type="warning" @click="guanbi">关闭</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" @click="showPicker1 = false">确定</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            <van-field
                    v-model="mianji"
                    label="*建筑面积"
                    placeholder="建筑面积"
                    input-align="right"
                    type="number"
                    :rules="[{ required: true,message: '请输入正确内容' }]"
            >
            </van-field>
            <van-field
                    v-model="huxin"
                    label="*户型"
                    placeholder="户型"
                    input-align="right"
                    readonly
                    clickable
                    @click="shouhuxing"
            >
            </van-field>
            <el-dialog :visible.sync="showPicker2" title="提示" width="100%">
                <van-row>
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC;overflow: auto">
                        <li @click="clickhuxin(1)" :class="{active:huxin==1}" style="margin-left: 20px">1居</li>
                        <li @click="clickhuxin(2)" :class="{active:huxin==2}" style="margin-left: 20px">2居</li>
                        <li @click="clickhuxin(3)" :class="{active:huxin==3}" style="margin-left: 20px">3居</li>
                        <li @click="clickhuxin(4)" :class="{active:huxin==4}" style="margin-left: 20px">4居</li>
                        <li @click="clickhuxin(5)" :class="{active:huxin==5}" style="margin-left: 20px">5居</li>
                        <li @click="clickhuxin(6)" :class="{active:huxin==6}" style="margin-left: 20px">5居以上</li>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                       <van-col :span="6">
                           <van-button type="warning" @click="huxinguanbi">取消</van-button>
                           
                       </van-col>
                       <van-col :offset="12" :span="6">
                           <van-button type="primary" :disabled="(huxin != '')?false:true" @click="showPicker2 = false">确定</van-button>
                       </van-col>
                </van-row>
            </el-dialog>
            <van-field
                    v-model="huxinName"
                    label="户型简介"
                    placeholder="一室一厅一卫"
                    input-align="right"
                    required
                    :rules="[{ required: true,message: '户型简介不为空' }]"
            >
            </van-field>
            <van-field
                    v-model="direction"
                    label="*朝向"
                    placeholder="朝向"
                    input-align="right"
                    readonly
                    clickable
                    @click="shoudirection"
            >

            </van-field>
            <el-dialog :visible.sync="showPicker3" title="提示" width="100%">
                <van-row>
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">

                        <li @click="clickarea(1)" :class="{active:direction==1}" style="margin-left: 20px">东</li>
                        <li @click="clickarea(2)" :class="{active:direction==2}" style="margin-left: 20px">南</li>
                        <li @click="clickarea(3)" :class="{active:direction==3}" style="margin-left: 20px">西</li>
                        <li @click="clickarea(4)" :class="{active:direction==4}" style="margin-left: 20px">北</li>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                       <van-col :span="6">
                           <van-button type="warning" @click="directionguanbi">取消</van-button>
                           
                       </van-col>
                       <van-col :offset="12" :span="6">
                           <van-button type="primary" :disabled="(direction != '')?false:true" @click="showPicker3 = false">确定</van-button>
                       </van-col>
                </van-row>
            </el-dialog>
            <van-row>
                <van-col span="4" style="margin-top: 15px;margin-left: 15px;float: left">
                    <label >*方式</label>
                </van-col>
                <van-col style="float: right">
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                        <li @click="clickrenttype(1)" :class="{active:renttype==1}" style="margin-left: 20px">整租</li>
                        <li @click="clickrenttype(2)" :class="{active:renttype==2}" style="margin-left: 20px">单间</li>
                    </ul>
                </van-col>
            </van-row>
            <van-field
                    v-model="floor"
                    label="当前层数"
                    placeholder="当前层数"
                    input-align="right"
                    :required="true"
                    type="digit"
                    :rules="[{ required: true,validator: asyncValidator1,message:'所在楼层不可为0' }]"
            >
            </van-field>
            <van-field
                    v-model="level"
                    label="总层数"
                    placeholder="总层数"
                    input-align="right"
                    :required="true"
                    type="digit"
                    :rules="[{ required: true,validator: asyncValidator2,message:'总楼层数不得小于当前楼层数' }]"
            >

            </van-field>
            
            <van-field
                    label="*装修情况"
                    placeholder="装修情况"
                    input-align="right"
                    readonly
                    clickable
                    v-model="decorate"
                    @click="shoudecorate"
            >
            </van-field>
            <el-dialog :visible.sync="showPicker5" title="装修情况" width="100%">
                <van-row>
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                        <li @click="clickdecor(1)" :class="{active:decorate==1}" style="margin-left: 20px">毛坯</li>
                        <li @click="clickdecor(2)" :class="{active:decorate==2}" style="margin-left: 20px">简装</li>
                        <li @click="clickdecor(3)" :class="{active:decorate==3}" style="margin-left: 20px">精装修</li>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="warning" @click="decorationguanbi">取消</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" :disabled="(decorate !== '')?false:true" @click="showPicker5 = false">确定</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            <van-field
                 label="区域"
                 placeholder="区域"
                 input-align="right"
                 required
                 v-model="areaid"
                 readonly
                 clickable
                 @click="showareaid"
            ></van-field>
            <el-dialog :visible.sync="showPicker7" title="区域选择" width="100%">
                <van-row style="overflow: auto">
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC;">
                        <div v-for="(item,index) in option2" :key="index">
                            <li @click="clickareaid(item.value)" :class="{active:areaid==item.value}" style="margin-left: 10px;margin-bottom: 6.6px;width: 99px">{{item.text}}</li>
                        </div>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="warning" @click="areaidguanbi">取消</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" :disabled="(areaid !== '')?false:true" @click="showPicker7 = false">确定</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            <van-field
                    label="*看房时间"
                    placeholder="看房时间"
                    input-align="right"
                    v-model="watchTime"
                    :rules="[{ required: true,message: '请输入正确内容' }]"
            >
            </van-field>
            </van-form>
            
            <van-button @click="nextDate" type="info" style="width: 100%;height: 50px">下一步</van-button>
        </div>
        <div v-if="methods == 1">
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-button icon="plus" type="primary" @click="chooseimg">上传图片</van-button>
                    
                    <!-- <van-uploader v-model="uploader" multiple accept="image/*" result-type="dataUrl"/> -->
                </template>
            </van-field>
            <van-row>
                <div class="image-view">
                    <div class="view" v-if="appSource() == 'ios'">
                       <div class="item" v-for="(item, index) in uploader" :key="index">
                          <span class="cancel-btn" @click="delImg(index)">x</span>
                          <img :src="item.localData">
                       </div>
                    </div>
                   <div class="view" v-else-if="appSource() == 'android'">
                       <div class="item" v-for="(item, index) in uploader" :key="index">
                          <span class="cancel-btn" @click="delImg(index)">x</span>
                          <img :src="item.localIds">
                       </div>
                   </div>
                   <div class="view" v-else>
                       <div class="item" v-for="(item, index) in uploader" :key="index">
                          <span class="cancel-btn" @click="delImg(index)">x</span>
                          <img :src="item.localData">
                       </div>
                   </div>
                </div>
            </van-row>
            <van-field label="配套设施">
                <template #input>
                    <van-row>
                        <ul class="zhuangxiu0" style="width: 100%;border-bottom: 1px solid #ECECEC">
                            <li @click="clickwashing(2)" :class="{active:washing==2}" style="margin-left: 20px">洗衣机</li>
                           <li @click="clickairCond(2)" :class="{active:airCond==2}" style="margin-left: 20px">空调</li>
                           <li @click="clickwardrobe(2)" :class="{active:wardrobe==2}" style="margin-left: 20px">衣柜</li>
                           <li @click="clickwatchTv(2)" :class="{active:watchTv==2}" style="margin-left: 20px">电视机</li>
                           <li @click="clickrefrigerator(2)" :class="{active:refrigerator==2}" style="margin-left: 20px">冰箱</li>
                           <li @click="clickwaterHeater(2)" :class="{active:waterHeater==2}" style="margin-left: 20px">热水器</li>
                           <li @click="clickbed(2)" :class="{active:bed==2}" style="margin-left: 20px">床</li>
                           <li @click="clickwashingRoom(2)" :class="{active:washingRoom==2}" style="margin-left: 20px">卫生间</li>
                           <li @click="clickisOnlyWashingRoom(2)" :class="{active:isOnlyWashingRoom==2}" style="margin-left: 20px">独卫</li>
                           <li @click="clicknaturalGas(2)" :class="{active:naturalGas==2}" style="margin-left: 20px">天然气</li>
                           <li @click="clickelevator(2)" :class="{active:elevator==2}" style="margin-left: 20px">电梯</li>
                           <li @click="clickwifi(2)" :class="{active:wifi==2}" style="margin-left: 20px">宽带</li>
                        </ul>
                    </van-row>
                </template>
            </van-field>
            <van-field
                label="入住要求"
                type="textarea"
                rows="9"
                autosize
                v-model="claim"
                maxlength="300"
                placeholder="可以详细较少一下房源亮点，交通，周边环境， 入住的时间和组合的要求等，增加快速出租的 机会。"
                show-word-limit
            ></van-field>
            <van-button type="info" style="width:100%;height:51px" @click="commit">确定发布</van-button>
        </div>
    </div>
</template>

<script>
    // import 'element-ui/lib/theme-chalk/index.css';
    import mixin from "../mixin/mixin";
    var map, placeSearch,marker;
    export default {
        name: "Faburent",
        mixins:[mixin],
        data(){
            return{
                unitPrice:'',
                message1: /^\d+$|^\d+[.]?\d+$/,
                type:'',
                showPicker0:false,
                columns: ['押一付一', '押一付三'],
                localName:'',
                title:'',
                title0:'',
                showPicker1:false,
                showPicker2:false,
                showPicker3:false,
                showPicker4:false,
                showPicker5:false,
                showPicker6:false,
                showPicker7:false,
                mianji:'',
                area:'',
                areaid:'',
                huxin:'',
                direction:'',
                option3:[],
                huxinName:'',
                renttype:'',
                floor:'',
                level:'',
                cur:0,
                decorate:'',
                watchTime:'',
                methods:0,
                filess1:[],
                uploader:[],
                place:'',
                washing:'',
                airCond:'',
                wardrobe:'',
                watchTv:'',
                refrigerator:'',
                waterHeater:'',
                bed:'',
                elevator:'',
                washingRoom:'',
                isOnlyWashingRoom:'',
                naturalGas:'',
                wifi:'',
                claim:'',
                local:'',
                filess:[],
                option2:[],
                addresslist:[],
                addressIndex:'a',
            }
        },
        mounted(){
            this.getoption2();
        },
        computed:{
            
        },
        methods:{
            tiplist(val){
                let self = this;
                console.log(this.title0);
                 AMap.plugin('AMap.Autocomplete', function(){
                    var autoOptions = {
                      city: '湖州'
                    }
                    var autoComplete = new AMap.Autocomplete(autoOptions);
                    self.addresslist = [];
                   autoComplete.search(self.title0, function(status, result) {
                     // 搜索成功时，result即是对应的匹配数据
                      if(status == "complete"&& result.info === 'OK'){
                          let tips = result.tips;
                          for(let i=0;i<tips.length;i++){
                              if (tips[i].location !== '' && undefined !== tips[i].location && tips[i].district == '浙江省湖州市长兴县'&&typeof tips[i].address == "string") {
                                  self.addresslist.push({
                                    lng: tips[i].location.lng,
                                    lat: tips[i].location.lat,
                                    name: tips[i].name,
                                    address:tips[i].address,
                                    district: tips[i].district
                                  })
                             }
                          }
                      }else{
                          self.addresslist = [];
                      }
                   })
                })
            },
            selectInput(index){
                if(this.addressIndex != index){
                    this.addressIndex = index;
                    this.local = this.addresslist[index].lng+','+this.addresslist[index].lat;
                    this.localName = this.addresslist[index].address;
                    this.name = this.addresslist[index].name;
                }else{
                    this.addressIndex = 'a';
                    this.local = '';
                    this.localName = '';
                    this.name = '';
                }
            },
            guanbi(){
                this.local = '';
                this.localName = '';
                this.name = '';
                this.title0 = '';
                this.addresslist.length = 0;
                this.showPicker1 = false;
            },
            huxinguanbi(){
                this.huxin = '';
                this.showPicker2 = false;
            },
            directionguanbi(){
                this.showPicker3 = false;
                this.direction = '';
            },
            levelguanbi(){
                this.showPicker4 = false;
                this.level = '';
                this.floor = '';
            },
            appSource() {
                 if (navigator.userAgent.indexOf('iPhone') !== -1) {
                   return "ios";
                 } else if(navigator.userAgent.indexOf('android') !== -1) {
                   return "android";
                 }
                 return '0';
            },
            chooseimg(){
                let self = this;
                this.$wxMethod.chooseImage(9,
                res=>{
                    self.filess1 = res.localIds;
                    console.log(res);
                    res.localIds.forEach((item,index)=>{
                        // let items = {localIds:item,localData:'',serverId:''};
                        // console.log(items);
                        // self.uploader.push(items);
                        if(index <3){
                            let items = {localIds:item,localData:'',serverId:''};
                            console.log(items);
                            self.uploader.push(items);
                        }
                    })
                    self.uploader = self.unquine(self.uploader);
                    console.log(self.uploader)
                    let isios = self.appSource();
                    console.log(isios);
                    if(isios == 'android'){
                        console.log(self.uploader)
                        self.uploadImg(self.uploader,0);
                    }else{
                        alert('000');
                        self.previewImg(self.uploader,0);
                        self.uploadImg(self.uploader,0);
                    }
                },
                (err)=>{
                    self.$toast(JSON.stringify(err))
                })
                // this.$wxMethod.chooseImage(9,res=>{
                //     self.filess1 = res.localIds;
                //     console.log(res);
                //     res.localIds.forEach(item=>{
                //         let items = {localIds:item,localData:'',serverId:''};
                //         console.log(items);
                //         self.uploader.push(items);
                //     })
                //     self.uploader = self.unquine(self.uploader);
                //     console.log(self.uploader)
                //     if(self.appSource() == 'android'){
                //         console.log(self.uploader)
                //         self.uploadImg(self.uploader,0);
                //     }else{
                //         alert('000');
                //         self.previewImg(self.uploader,0);
                //         self.uploadImg(self.uploader,0);
                //     }
                    
                // },
                // err=>{
                //     console.log(err);
                //     self.uploadImg(filelist,i);
                // })
            },
            unquine(filearray){
                var result = [], isRepeated;
                for (let i = 0; i < filearray.length; i++) {
                   isRepeated = false;
                   for (let j = 0; j < result.length; j++) {
                      if (filearray[i].localIds == result[j].localIds) {
                           isRepeated = true;
                           console.log('repeat');
                           break;
                        }
                    }
                   if (!isRepeated) {
                      result.push(filearray[i]);
                    }
                }
                return result;
            },
            previewImg(filelist,i){
          let context = this;
          this.$wxsdk.init(['getLocalImgData']).then(wx=>{
              wx.getLocalImgData({
                  localId: filelist[i].localIds, // 图片的localID
                  success: function (res) {
                        var localData = res.localData;
                        
                        if (localData.indexOf('data:image') != 0) {                       
                            //判断是否有这样的头部                                               
                            localData = 'data:image/jpeg;base64,' +  localData                    
                        }                    
                        localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg'); // 此处的localData 就是你所需要的base64位
                        filelist[i].localData = localData;
                        i++;
                        if(i<filelist.length){
                            context.previewImg(filelist,i);
                        }
                  },
                  fail: function (res) {
                        alert('选择图片失败:' + res.errMsg);
                   },
             })
          })
            },
            uploadImg(filelist,i){
                let self = this;
                console.log('upload');
                this.$wxMethod.upLoadImage(filelist[i].localIds,
                    result=>{
                        filelist[i].serverId = result.serverId;
                        i++;
                        alert('111');
                        console.log(filelist);
                        if(i<filelist.length ){
                           self.uploadImg(filelist,i);
                        }
                    },
                    (err)=>{
                        self.$toast(JSON.stringify(err));
                })
            },
            typeguanbi(){
                this.showType5 = false;
                this.type = '';
            },
            decorationguanbi(){
                this.showPicker5 = false;
                this.decorate = '';
            },
            areaidguanbi(){
                this.areaid = '';
                this.showPicker7 = false;
            },
            getoption2(){
                let self = this;
                self.$axios.get("http://house-api.zjlaishang.com:9001/type/area",{
                }).then(function (res) {
                    console.log(res)
                    if(res.data.code == 200){
                        res.data.data.forEach(element=>{
                            self.option2.push({text:element.title,value:element.id})
                        })
                    }
                })
            },
            searchAddress() {
                this.title = this.title0;
               placeSearch.search(this.title0);
 
            },
            clickareaid(index){
                if(this.areaid != index){
                    this.areaid = index;
                }else{
                    this.areaid = '';
                }
            },
            showareaid(){
                this.showPicker7 = true;
            },
            onConfirm(value){
                this.type = value;
                this.showPicker0 = false;
                // console.log(12345);
            },
            clickwashing(index){
                if(this.washing != index){
                    this.washing = index;
                }else{
                    this.washing = '';
                }
            },
            clickelevator(index){
                if(this.elevator != index){
                    this.elevator = index;
                }else{
                    this.elevator = '';
                }
            },
            clickairCond(index){
                if(this.airCond != index){
                    this.airCond = index;
                }else{
                    this.airCond = '';
                }
            },
            clickwardrobe(index){
                if(this.wardrobe != index){
                    this.wardrobe = index;
                }else{
                    this.wardrobe = '';
                }
            },
            clickwatchTv(index){
                if(this.watchTv != index){
                    this.watchTv = index;
                }else{
                    this.watchTv = '';
                }
            },
            clickrefrigerator(index){
                if(this.refrigerator != index){
                    this.refrigerator = index;
                }else{
                    this.refrigerator = '';
                }
            },
            clickwaterHeater(index){
                if(this.waterHeater != index){
                    this.waterHeater = index;
                }else{
                    this.waterHeater = '';
                }
            },
            clickbed(index){
                if(this.bed != index){
                    this.bed = index;
                }else{
                    this.bed = '';
                }
            },
            clickwashingRoom(index){
                if(this.washingRoom != index){
                    this.washingRoom = index;
                }else{
                    this.washingRoom = '';
                }
            },
            clickisOnlyWashingRoom(index){
                if(this.isOnlyWashingRoom != index){
                    this.isOnlyWashingRoom = index;
                }else{
                    this.isOnlyWashingRoom = '';
                }
            },
            clicknaturalGas(index){
                if(this.naturalGas != index){
                    this.naturalGas = index;
                }else{
                    this.naturalGas = '';
                }
            },
            clickwifi(index){
                if(this.wifi != index){
                    this.wifi = index;
                }else{
                    this.wifi = '';
                }
            },
            showType(){
                this.showPicker0 = true;
                console.log(789);
            },
            asyncValidator(val){
                console.log(val);
                return /^\d+$|^\d+[.]?\d+$/.test(val);
            },
            asyncValidator1(val){
                return (parseInt(val)>0)?true:false;
            },
            asyncValidator2(val){
                return (parseInt(val)>parseInt(this.floor))?true:false;
            },
            shouxiaoqu(){
                this.showPicker1 = true;
                this.title0 = '';
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
            shoufloor(){
                this.showPicker4 = true;
                console.log(789);
            },
            shoudecorate(){
                this.showPicker5 = true;
                console.log(789);
            },
            shouwatchtime(){
                this.showPicker6 = true;
                console.log(789);
            },
            nextDate(){
                let paymonth = 0;
                if(this.type == '押一付一'){
                    paymonth = 1;
                }else if(this.type == '押一付三'){
                    paymonth = 3;
                }else{
                    paymonth = 0;
                }
                let title = this.title;
                let local = this.local;
                let localName = this.localName;
                let name = this.name;
                let area = parseFloat(this.mianji).toFixed(2);
                let decoration = parseInt(this.decorate);
                let unitPrice = parseInt(this.unitPrice);
                let level = parseInt(this.level);
                let floor = parseInt(this.floor);
                let unitType = parseInt(this.huxin);
                let direction = parseInt(this.direction);
                let watchTime = this.watchTime;
                let type = parseInt(this.renttype);
                let areaid = parseInt(this.areaid);
                let typeName = (this.huxinName == '')?"一室一厅一卫":this.huxinName;
                if(title == ''){
                    this.$toast('标题不能为空');
                    return;
                }
                if(unitPrice == 0){
                    this.$toast('单价不能为空');
                    return;
                }

                if(paymonth == 0){
                    this.$toast('地区不能为空');
                    return;
                }

                if(local == ''||localName == ''){
                    this.$toast('地址栏不能为空');
                    return;
                }

                if(area == 0){
                    this.$toast('面积不能为空');
                    return;
                }
                if(unitType == 0){
                    this.$toast('户型不能为空');
                    return;
                }

                if(this.huxinName == ''){
                    this.$toast('户型简介不能为空');
                    return;
                }

                if(direction == 0){
                    this.$toast('朝向不能为空');
                    return;
                }
                if(type == 0){
                    this.$toast('方式不能为空');
                    return;
                }
                if(floor == 0){
                    this.$toast('请输入所在楼层');
                    return;
                }
                if(level == 0){
                    this.$toast('请输入总楼层');
                    return;
                }
                if(decoration == 0){
                    this.$toast('装修情况不能为空');
                    return;
                }


                if(areaid == 0){
                    this.$toast('地区不能为空');
                    return;
                }


                this.methods = 1;
            },
            shouhuxing(){
                this.showPicker2 = true;
                console.log(996);
            },
            shoudirection(){
                this.showPicker3 = true;
                console.log('123')
            },
            clickhuxin(index){
                if(this.huxin != index){
                    this.huxin = index;
                }else{
                    this.huxin = '';
                }
            },
            searchplace(){
                // placeSearch.search(this.place);
            },
            selectAddress(e){
                let location = e.selected.data.location;
                this.local = location.lng+','+location.lat;
                this.localName = e.selected.data.address;
                this.name = e.selected.data.name;
                // console.log('lng',location.lng);
                // console.log('lat',location.lat);
            },
            clickarea(index){
                if(this.direction != index){
                    this.direction = index;
                }else{
                    this.direction = '';
                }
            },
            clickrenttype(index){
                if(this.renttype != index){
                    this.renttype = index;
                }else{
                    this.renttype = '';
                }
            },
            clickdecor(index){
                if(this.decorate != index){
                    this.decorate = index;
                }else{
                    this.decorate = '';
                }
            },
            commit(){
                let washing = (this.washing == '')?1:this.washing
                let airCond= (this.airCond == '')?1:this.airCond
                let wardrobe = (this.wardrobe == '')?1:this.wardrobe
                let watchTv = (this.watchTv == '')?1:this.watchTv
                let refrigerator = (this.refrigerator == '')?1:this.refrigerator
                let waterHeater = (this.waterHeater == '')?1:this.waterHeater
                let bed = (this.bed == '')?1:this.bed
                let washingRoom = (this.washingRoom == '')?1:this.washingRoom
                let isOnlyWashingRoom = (this.isOnlyWashingRoom == '')?1:this.isOnlyWashingRoom
                let naturalGas = (this.naturalGas == '')?1:this.naturalGas
                let wifi = (this.wifi == '')?1:this.wifi
                let token = localStorage.getItem('token');
                let paymonth = 0;
                if(this.type == '押一付一'){
                    paymonth = 1;
                }else if(this.type == '押一付三'){
                    paymonth = 3;
                }else{
                    paymonth = 0;
                }
                let title = this.title;
                let local = this.local;
                let localName = this.localName;
                let name = this.name;
                let area = parseFloat(this.mianji).toFixed(2);
                let decoration = parseInt(this.decorate);
                let unitPrice = parseInt(this.unitPrice);
                let level = parseInt(this.level);
                let floor = parseInt(this.floor);
                let unitType = parseInt(this.huxin);
                let direction = parseInt(this.direction);
                let watchTime = this.watchTime;
                let type = parseInt(this.renttype);
                let areaid = parseInt(this.areaid);
                let elevator = (this.elevator == '')?1:this.elevator;
                let claim = this.claim;
                let typeName = (this.huxinName == '')?"一室一厅一卫":this.huxinName;
                var formdata = new FormData();
                this.Trans(this.uploader);
                if(this.uploader.length == 0){
                    this.$toast('您需要上传图片');
                }
                for(let i=0;i<this.filess.length;i++){
                    formdata.append(`imglist[${i}]`,this.filess[i])
                }
                formdata.append("title",title);
                formdata.append("name",this.name);
                formdata.append("type",type);
                formdata.append("direction",direction);
                formdata.append("payMonth",paymonth);
                formdata.append("elevator",elevator);
                formdata.append("unitPrice",unitPrice);
                formdata.append("unitType",unitType);
                formdata.append("area",area);
                formdata.append("local",local);
                formdata.append("localName",localName);
                formdata.append("decoration",decoration);
                formdata.append("washing",washing);
                formdata.append("airCond",airCond);
                formdata.append("wardrobe",wardrobe);
                formdata.append("watchTv",watchTv);
                formdata.append("refrigerator",refrigerator);
                formdata.append("waterHeater",waterHeater);
                formdata.append("bed",bed);
                formdata.append("washingRoom",washingRoom);
                formdata.append("isOnlyWashingRoom",isOnlyWashingRoom);
                formdata.append("naturalGas",naturalGas);
                formdata.append("wifi",wifi);
                formdata.append("areaId",areaid);
                formdata.append("level",level);
                formdata.append("floor",floor);
                formdata.append("claim",claim);
                formdata.append("watchTime",watchTime);
                formdata.append("typeName",typeName);
                let self = this;
                self.$axios.post("http://house-api.zjlaishang.com:9001/rent/save",formdata,{
                    headers:{
                        'Content-Type': 'application/json',
                         token: token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        self.$toast(res.data.msg);
                        let date = new Date().toString();
                        self.$router.push({name:'my',params:{time:date}});
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
                .catch(function(err){
                    alert(err);
                    // self.$toast('获取数据失败');
                })
            },
            delImg(index){
                this.uploader.splice(index,1);
            },
            Trans(filearray){
                for(let i=0;i<filearray.length;i++){
                    this.filess[i] = filearray[i].serverId;
                }
                console.log(this.filess);
            },
        }
    }
</script>

<style scoped>
    .greyline{
        width: 100%;
        height: 36px;
        background-color: #F7F9FE;
        line-height: 36px;
    }

    #container {
        width: 500px;
        margin-top: 150px;
    }

    .greyline .zi{
        margin-left: 18px;
        color: #919496;
        font-size: 14px;
    }

    .zhuangxiu{
        width: 90%;
    }

    #panel {
        position: absolute;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 80px;
       right: 10px;
       width: 280px;
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

    .zhuangxiu0{
        width: 90%;
    }

    .zhuangxiu0 li{
        float: left;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        background-color: #D8D8D8;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 14px;
        color: #000;
        border-radius: 36px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }

    .zhuangxiu0 .active{
        background-color: #4E75EE;
        color: #FFF;
    }

    .zhuangxiu .active{
        background-color: #FCF6EF;
        color: #EC613E;
    }

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
        font-size: 14px;
        border-radius: 5px;
        margin-top: 10.1px;
        background-color: #E1E6F0;
        margin-bottom: 6.6px;
    }
    .tab-tilte .active{
        background-color: #FCF5EF;
        color: #EB613D;
    }
    .site_big {
       display: block;
       font-size: 0.32rem;
       color: #4A4A4A;
       margin-top: 0.08rem;
       /*line-height: 0.68rem;*/
   }
   .site_del {
     display: block;
      height: 0.36rem;
      line-height: 0.36rem;
      font-size: 0.24rem;
      color: #9b9b9b;
    }

    .auto{
      background-color: #F7F9FE;
      background-size: 0.28rem 0.36rem;
      background-position: 0.4rem;
      text-align: left;
    }

    .active00{
        background-color: yellow;
    }

    .image-view{
        width: 7.5rem;
        height:100px;
        /* margin:50px auto; */
    }
    .image-view .item {
        position:relative;
        float:left;
        height:100px;
        width:100px;
        margin:10px 10px 0 0;
    }
    .image-view .item .cancel-btn{
        position:absolute;
        right:0;
        top:0;
        display:block;
        width:20px;
        height:20px;
        color:#fff;
        line-height:20px;
        text-align:center;
        background:red;
        border-radius:10px;
        cursor:pointer;
    }
    .image-view .item img{
        width:100%;
        height:100%;
    }
    .image-view .view{
        clear:both;
    }

    .van-field__label {
         -webkit-box-flex: 0;
         -webkit-flex: none;
         flex: none;
         box-sizing: border-box;
         width: 7em;
         margin-right: 12px;
         color: #646566;
         text-align: left;
         word-wrap: break-word;
    }
</style>