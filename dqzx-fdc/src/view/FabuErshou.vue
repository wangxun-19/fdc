<template>
    <div>
        <div v-if="method == 0">
            <div class="greyline">
                <label class="zi">二手房详情</label>
            </div>
            <van-form>
                 <van-field
                v-model="title"
                label="标题"
                placeholder="标题"
                input-align="right"
                type="text"
                :rules="[{ required: true,message: '标题不为空' }]"
            ></van-field>
            <van-field
                 v-model="unitPrice"
                 label="单价"
                 placeholder="单价"
                 input-align="right"
                 type="digit"
                 required
                 :rules="[{ required: true,message: '单价不为空' }]"
            ></van-field>
            <van-field
                 v-model="localName"
                 label="*地址"
                 placeholder="地址"
                 input-align="right"
                 type="text"
                 readonly
                 clickable
                 @click="showLocalName"
            ></van-field>
            </van-form>
            <el-dialog :visible.sync="showType0" style="background: #F7F9FE" title="选择小区" fullscreen>
                <van-row>
                    <van-field
                           label="小区名:"
                           v-model="title0"
                           input-align="right"
                           placeholder="请输入关键字"
                           @input="tiplist"
                        >
                      </van-field>
                    <!-- <van-col :span="7">
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
                        <van-button type="warning" size="small" @click="guanbi">取消选择</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" size="small" @click="showType0 = false" >确定</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            <div class="greyline">
                <label class="zi">基本信息</label>
            </div>
            <van-form>
                <van-field
               v-model="mianji"
               label="面积"
               type="digit"
               placeholder="面积"
               input-align="right"
               :rules="[{ required: true,message: '面积不可为空' }]"
            ></van-field>
            <van-field
               v-model="typeName"
               label="户型"
               type="text"
               placeholder="户型"
               input-align="right"
               readonly
               clickable
               required
               @click="showhuxing"
            ></van-field>
            <el-dialog :visible.sync="showType1" title="选择户型" width="100%">
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
                        <van-button type="warning" size="small" @click="huxinguanbi">取消选择</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" size="small" @click="showType1 = false">确定</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            <van-field
                    v-model="huxinName"
                    label="户型简介"
                    placeholder="一室一厅一卫"
                    input-align="right"
                    required
            >
            </van-field>
            <van-field
                v-model="property"
                label="产权"
                type="digit"
                placeholder="产权"
                input-align="right"
                :rules="[{ required: true,message: '产权不能为空' }]"
            ></van-field>
            <van-field
              v-model="putYear"
              label="建造年代"
              input-align="right"
              readonly
              clickable
              required
              @click="showPutyear"
            ></van-field>
            <el-dialog :visible.sync="showType2" title="建造年代" fullscreen>
                <van-row>
                    <van-picker
                        title="标题"
                        show-toolbar
                        v-model="currentDate" 
                        :columns="columns"
                        @cancel="oncancel"
                        @confirm="onConfirm"
                    />
                </van-row>
            </el-dialog>
            <van-field
               v-model="saveYear"
               label="购买时间"
               input-align="right"
               readonly
               required
               clickable
               @click="showsaveYear"
            ></van-field>
            <el-dialog :visible.sync="showType3" title="购买时间" fullscreen>
                <van-row>
                    <van-datetime-picker
                        v-model="currentDate1" 
                        type="date"
                        title="选择完整时间"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @cancel="oncancel2"
                        @confirm="onConfirm2"
                    />
                </van-row>
            </el-dialog>
            <van-field
                    v-model="floor"
                    label="所在楼层"
                    placeholder="所在楼层"
                    input-align="right"
                    type="digit"
                    :rules="[{ required: true,validator: asyncValidator1,message:'所在楼层不可为0' }]"
            >

            </van-field>

            <van-field
                    v-model="level"
                    label="总楼层"
                    placeholder="总楼层"
                    input-align="right"
                    type="digit"
                    :rules="[{ required: true,validator: asyncValidator2,message:'总楼层不能小于所在楼层' }]"
            >

            </van-field>
            
            <van-field
                    label="*权属"
                    placeholder="权属"
                    input-align="right"
                    readonly
                    clickable
                    v-model="type"
                    @click="showtype"
            >
            </van-field>
            <el-dialog :visible.sync="showType5" title="装修情况" width="100%">
                <van-row>
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                        <li @click="clicktype(1)" :class="{active:type==1}" style="margin-left: 20px">住宅</li>
                        <li @click="clicktype(2)" :class="{active:type==2}" style="margin-left: 20px">别墅</li>
                        <li @click="clicktype(3)" :class="{active:type==3}" style="margin-left: 20px">商铺</li>
                        <li @click="clicktype(4)" :class="{active:type==4}" style="margin-left: 20px">写字楼</li>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="warning" size="small" @click="typeguanbi">取消选择</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" size="small" :disabled="(type !== '')?false:true" @click="showType5 = false">确定</van-button>
                        
                    </van-col>
                </van-row>
                
            </el-dialog>
            <van-field
                    label="*装修情况"
                    placeholder="装修情况"
                    input-align="right"
                    readonly
                    clickable
                    v-model="decoration"
                    @click="showdecorate"
            >
            </van-field>
            <el-dialog :visible.sync="showType6" title="装修情况" width="100%">
                <van-row>
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                        <li @click="clickdecor(1)" :class="{active:decoration==1}" style="margin-left: 20px">毛坯</li>
                        <li @click="clickdecor(2)" :class="{active:decoration==2}" style="margin-left: 20px">简装</li>
                        <li @click="clickdecor(3)" :class="{active:decoration==3}" style="margin-left: 20px">精装修</li>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="warning" size="small" @click="decorationguanbi">取消选择</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" size="small" :disabled="(decoration !== '')?false:true" @click="showType6 = false">确定</van-button>
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
            <el-dialog :visible.sync="showType7" title="区域选择" width="100%">
                <van-row style="overflow: auto">
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                        <div v-for="(item,index) in options1" :key="index">
                            <li @click="clickareaid(item.value)" :class="{active:areaid==item.value}" style="margin-left: 10px;margin-bottom: 6.6px;width: 99px">{{item.text}}</li>
                        </div>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="warning" size="small" @click="areaidguanbi">取消选择</van-button>
                        
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="primary" size="small" :disabled="(areaid !== '')?false:true" @click="showType7 = false">确定</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            </van-form>
            <van-button @click="nextDate" type="info" style="width: 100%;height: 50px">下一步</van-button>
        </div>
        <div v-if="method == 1">
            <van-field name="uploader" label="文件上传" >
                <template #input>
                    <!-- <el-upload
                      action="#"
                      multiple
                      list-type="picture-card"
                       :auto-upload="false"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                      accept="image/*"
                    >
                    <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> -->
                    <van-button icon="plus" type="primary" @click="chooseimg">上传图片</van-button>
                    
                </template>
            </van-field>
            <van-row>
                <div class="image-view">
                  <div class="view" v-if="appSource() == 'android'">
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
            <van-field label="更多">
                <template #input>
                    <van-row>
                        <ul class="zhuangxiu0" style="width: 100%;border-bottom: 1px solid #ECECEC">
                           <li @click="clickonly(2)" :class="{active:only==2}" style="margin-left: 20px">唯一住房</li>
                           <li @click="clickelevator(2)" :class="{active:elevator==2}" style="margin-left: 20px">电梯</li>
                        </ul>
                    </van-row>
                </template>
            </van-field>
            <van-button type="info" style="width:100%;height:51px" @click="commit">确定发布</van-button>
        </div>
    </div>
</template>

<script>
    // import 'element-ui/lib/theme-chalk/index.css';
    import mixin from "../mixin/mixin";
    var map, placeSearch,marker,autocomplete;
    export default {
        name: "FabuErshou",
        mixins:[mixin],
        data(){
            return{
                method:0,
                title:'',
                totalPrice:'',
                addressIndex:'a',
                unitPrice:'',
                local:'',
                localName:'',
				// direction:'',
                showType0:false,
                showType1:false,
                dialogVisible:false,
                showType2:false,
                showType3:false,
                showType4:false,
                showType5:false,
                showType6:false,
                showType7:false,
				showPicker3:false,
                title0:'',
                name:'',
                mianji:'',
                areaid:'',
                typeName:'',
                decoration:'',
                currentDate:'',
                currentDate1:'',
                huxinName:'',
                options1:[],
                filess1:[],
                huxin:'',
                property:'',
                putYear:'',
                saveYear:'',
                minDate: new Date(1949, 0, 1),
                maxDate: new Date(2100,11,24),
                columns:[],
                floor:'',
                level:'',
                type:'',
                cur:0,
                only:'',
                elevator:'',
                uploader:[],
                filess:[],
                addresslist:[]
            }
        },
        created(){
            this.getOptions();
            this.columns.length = 0;
            let today = new Date();
            let toyears = today.getFullYear();
            let fromyear = toyears-70;
            for(let i=fromyear;i<=toyears;i++){
                this.columns.push(i);
            }
            this.minDate = new Date(fromyear, 0, 1)
            this.maxDate = new Date(toyears, 11, 24)
        },
        mounted(){
            // autocomplete = new AMap.Autocomplete({
            //     city:'湖州'
            // })
        },
        methods:{
            getOptions(){
                let self = this;
                self.$axios.get("http://house-api.zjlaishang.com:9001/type/area",{
                }).then(function (res) {
                    if(res.data.code == 200){
                        res.data.data.forEach(item=>{
                            self.options1.push({text:item.title,value:item.id});
                        })
                    }else{}
                })
            },
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file,filelist){
                 console.log('123');
            },
            guanbi(){
                this.local = '';
                this.localName = '';
                this.name = '';
                this.title0 = '';
                this.addresslist = [];
                this.showType0 = false;
            },
            huxinguanbi(){
                this.showType1 = false;
                this.huxin = '';
                this.typeName = '';
            },
            levelguanbi(){
                this.showType4 = false;
                this.level = '';
                this.floor = '';
            },
            typeguanbi(){
                this.showType5 = false;
                this.type = '';
            },
            decorationguanbi(){
                this.showType6 = false;
                this.decoration = '';
            },
            areaidguanbi(){
                this.areaid = '';
                this.showType7 = false;
            },
            asyncValidator(val){
                console.log(val);
                return /^\d+$|^\d+[.]?\d+$/.test(val);
            },
            asyncValidator1(val){
                return (val>0)?true:false;
            },
            asyncValidator2(val){
                return (parseInt(val)>=parseInt(this.floor))?true:false;
            },
			shoudirection(){
				this.showPicker3 = true;
			},
			clickarea(index){
			    if(this.direction != index){
			        this.direction = index;
			    }else{
			        this.direction = '';
			    }
            },
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
                // autocomplete.search(function(status,result){
                //     if(status === 'complete' && result.info === 'OK'){
                //         // var tips = result.ttp;
                //         console.log(result);
                //     }
                // })
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
                        if(index <3){
                            let items = {localIds:item,localData:'',serverId:''};
                            console.log(items);
                            self.uploader.push(items);
                        }
                        // let items = {localIds:item,localData:'',serverId:''};
                        // console.log(items);
                        // self.uploader.push(items);
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
                    console.log(JSON.stringify(err))
                    // self.uploadImg(filelist,i);
                })
            },
            showLocalName(){
                this.showType0 = true;
            },
            showareaid(){
                this.showType7 = true;
            },
            onConfirm(value,index){
                this.showType2 = false;
                let year = value;
                this.putYear  = year;
                this.minDate = new Date(year,0,1)
                let today = new Date();
                let toyears = today.getFullYear();
                this.maxDate = new Date(toyears,11,24)
                console.log(this.putYear);
            },
            oncancel(){
                this.showType2 = false;
                this.putYear = '';
            },
            onConfirm2(value){
                this.showType3 = false;
                let year = value.getFullYear();
                let month = value.getMonth()+1;
                let months = '';
                if(month < 10){
                    months = '0'+month;
                }else{
                    months = month
                }
                let day = value.getDate();
                let days = ''
                if(day <10){
                    days = '0'+day;
                }else{
                    days = day
                }
				this.saveYear = year + '-' + month + '-'+day;
                console.log(this.saveYear);
            },
            oncancel2(){
                this.showType3 = false;
                this.saveYear = '';
            },
            zhongwen(val){
                console.log(val);
                return /^[\u4e00-\u9fa5]+$/.test(val);
            },
            searchAddress(){
                 placeSearch.search(this.title0);
            },
            selectAddress(e){
                let location = e.selected.data.location;
                this.local = location.lng+','+location.lat;
                this.localName = e.selected.data.address;
                this.name = e.selected.data.name;
                console.log(this.localName);
            },
            showhuxing(){
                this.showType1 = true;
            },
            clickareaid(index){
                if(this.areaid != index){
                    this.areaid = index;
                }else{
                    this.areaid = '';
                }
            },
            clickhuxin(index){
                if(this.huxin != index){
                    this.huxin = index;
                }else{
                    this.huxin = '';
                }
                if(this.huxin == 1){
                    this.typeName = '1居'
                }else if(this.huxin == 2){
                    this.typeName = '2居'
                }else if(this.huxin == 3){
                    this.typeName = '3居'
                }else if(this.huxin == 4){
                    this.typeName = '4居'
                }else if(this.huxin == 5){
                    this.typeName = '5居'
                }else if(this.huxin == 6){
                    this.typeName = '5居以上'
                }else{
                    this.typeName = ''
                }
            },
            showPutyear(){
                this.showType2 = true;
            },
            showsaveYear(){
                this.showType3 = true;
            },
            showfloor(){
                this.showType4 = true;
            },
            showtype(){
                this.showType5 = true;
            },
            showdecorate(){
                this.showType6 = true;
            },
            clickdecor(index){
                if(this.decoration != index){
                    this.decoration = index;
                }else{
                    this.decoration = '';
                }
            },
            clicktype(index){
                if(this.type != index){
                    this.type = index;
                }else{
                    this.type = '';
                }
            },
            clickonly(index){
                if(this.only != index){
                    this.only = index;
                }else{
                    this.only = '';
                }
            },
            clickelevator(index){
                if(this.elevator != index){
                    this.elevator = index;
                }else{
                    this.elevator = '';
                }
            },
            nextDate(){
                let name = this.name;
                let typeName = this.typeName;
                let title = this.title;
                let local = this.local;
                let localName = this.localName;
                let unitPrice = parseInt(this.unitPrice);
                let area = parseFloat(this.mianji).toFixed(2);
                let totalPrices = (unitPrice*area)/10000;
                let totalPrice = parseFloat(totalPrices).toFixed(2);
                let property = parseInt(this.property);
				let unitType = parseInt(this.huxin)
                let type = parseInt(this.type);
                let decoration = parseInt(this.decoration);
                let putYear = parseInt(this.putYear);
                let saveYear = this.saveYear;
                let level = parseInt(this.level);
                let floor = parseInt(this.floor);
                let areaid = parseInt(this.areaid);
				console.log(totalPrice)
                let huxinName = (this.huxinName == '')?"一室一厅一卫":this.huxinName;
                if(title == ''){
                    this.$toast('标题不能为空');
                    return;
                }
                if(unitPrice == 0){
                    this.$toast('单价不能为空');
                    return;
                }
                if(area == 0){
                    this.$toast('面积不能为空');
                    return;
                }
                if(local == ''||localName == ''){
                    this.$toast('地址栏不能为空');
                    return;
                }
                if(typeName == ''&&unitType == 0){
                    this.$toast('户型不能为空');
                    return;
                }
                if(property == 0){
                    this.$toast('请输入产权');
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
                if(putYear == 0){
                    this.$toast('建造年代不能为空');
                    return;
                }
                if(saveYear == ''){
                    this.$toast('购买时间不能为空');
                    return;
                }
                if(property == 0){
                    this.$toast('权属不能为空');
                    return;
                }
                if(decoration == 0){
                    this.$toast('装修情况不能为空');
                    return;
                }
                this.method = 1;
            },
            commit(){
                let only = (this.only == '')?1:this.only;
                let elevator = (this.elevator == '')?1:this.elevator;
                let name = this.name;
                let typeName = this.typeName;
                let title = this.title;
                let local = this.local;
                let localName = this.localName;
                let unitPrice = parseInt(this.unitPrice);
				let unitType = parseInt(this.huxin)
                let area = parseFloat(this.mianji).toFixed(2);
				let totalPrices = (unitPrice*area)/10000;
				let totalPrice = parseFloat(totalPrices).toFixed(2);
                let property = parseInt(this.property);
                let type = parseInt(this.type);
                let decoration = parseInt(this.decoration);
                let putYear = parseInt(this.putYear);
                let saveYear = this.saveYear;
                let level = parseInt(this.level);
                let floor = parseInt(this.floor);
                let areaid = parseInt(this.areaid);
                this.Trans(this.uploader)
                let huxinName = (this.huxinName == '')?"一室一厅一卫":this.huxinName;
                if(this.uploader.length == 0){
                    this.$toast('请上传图片');
                    return;
                }
                let formdata = new FormData();
                let token = localStorage.getItem("token");
                for(let i=0;i<this.filess.length;i++){
                    formdata.append(`imglist[${i}]`,this.filess[i]);
                }
                // formdata.append("imgList",this.filess[0]);
                formdata.append("name",name);
                formdata.append("title",title);
                formdata.append("type",type);
                formdata.append("unitPrice",unitPrice);
                formdata.append("totalPrice",totalPrice);
                formdata.append("local",local);
                formdata.append("localName",localName);
				// formdata.append("direction",direction);
                formdata.append("property",property);
				formdata.append("unitType",unitType)
                formdata.append("putYear",putYear);
                formdata.append("saveYear",saveYear);
                formdata.append("only",only);
                formdata.append("elevator",elevator);
				formdata.append("area",area);
                formdata.append("level",level);
                formdata.append("floor",floor);
                formdata.append("decoration",decoration);
                formdata.append("areaId",areaid);
                formdata.append("typeName",huxinName);
                let self = this;
                this.$axios.post("http://house-api.zjlaishang.com:9001/old/save",formdata,{
                    headers:{
                        token: token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        self.$toast(res.data.msg)
                        let date = new Date().toString();
                        self.$router.push({name:"my",params:{time:date}});
                        // self.method = 0;
                    }else{
                        self.$toast(res.data.msg)
                        // self.$toast(res.data.msg)
                    }
                }).catch(function(err){
                    alert(err);
                    console.log(err);
                })
            },
            delImg(index){
               this.uploader.splice(index,1);
            },
            Trans(uploader){
                for(let i=0;i<uploader.length;i++){
                    this.filess[i] = uploader[i].serverId;
                }
                console.log(this.filess);
            }
        }
    }
</script>

<style lang="less" scoped>
   .greyline{
        width: 100%;
        height: 36px;
        background-color: #F7F9FE;
        line-height: 36px;
        .zi{
            margin-left: 18px;
            color: #919496;
            font-size: 14px;
        }
    }
    #container{
        width: 100%;
        height: 500px;
    }
    #panel{
        position: absolute;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 80px;
        right: 10px;
        width: 280px;
    }

    .zhuangxiu{
        width: 90%;
        li{
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
        .active{
            background-color: #FCF6EF;
            color: #EC613E;
        }
    }
    .tab-tilte{
        width: 90%;
        li{
           float: left;
           text-align: center;
           line-height: 32.75px;
           cursor: pointer;
           min-width: 92.75px;
           min-height: 32.75px;
           font-size: 14px;
           border-radius: 5px;
           margin-top: 10.1px;
           margin-bottom: 6.6px;
        }
        .active{
           background-color: #FCF5EF;
           color: #EB613D;
        }
    }

    .van-field__label {
         -webkit-box-flex: 0;
         -webkit-flex: none;
         flex: none;
         box-sizing: border-box;
         width: 35%;
         margin-right: 12px;
         color: #646566;
         text-align: left;
         word-wrap: break-word;
    }
    .zhuangxiu0{
        width: 90%;
        li{
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
        .active{
            background-color: #4E75EE;
            color: #FFF;
        }
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
        width:7.5rem;
        height:100px;
        // margin:50px auto;
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