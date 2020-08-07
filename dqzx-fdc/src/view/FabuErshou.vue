<template>
    <div>
        <div v-show="method == 0">
            <div class="greyline">
                <label class="zi">二手房详情</label>
            </div>
            <van-field
                v-model="title"
                label="标题"
                placeholder="标题"
                input-align="right"
                type="text"
                :rules="[{ required: true,message: '请输入正确内容' }]"
            ></van-field>
            <!-- <van-field
                 v-model="totalPrice"
                 label="*总价"
                 placeholder="总价"
                 input-align="right"
                 type="number"
                 :rules="[{ required: true,validator: asyncValidator,message: '请输入正确内容' }]"
            ></van-field> -->
            <van-field
                 v-model="unitPrice"
                 label="单价"
                 placeholder="单价"
                 input-align="right"
                 type="digit"
                 required
                 val
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
                 :rules="[{ required: true,validator: zhongwen,message: '请输入正确内容' }]"
            ></van-field>
            <el-dialog :visible.sync="showType0" style="background: #F7F9FE" title="选择小区" fullscreen>
                <van-row>
                    <van-field
                     label="请输入关键字："
                     v-model="title0"
                     input-align="right"
                     placeholder="请输入关键字"
                      @input="tiplist"></van-field>
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
                        <van-button type="primary" size="small" @click="showType0 = false">确定</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="warning" size="small" @click="guanbi">取消选择</van-button>
                    </van-col>
                </van-row>
                <!-- <div id="container"></div>
                <div id="panel"></div> -->
            </el-dialog>
            <div class="greyline">
                <label class="zi">基本信息</label>
            </div>
            <van-field
               v-model="mianji"
               label="面积"
               type="digit"
               placeholder="面积"
               input-align="right"
               required
               :rules="[{message: '请输入正确内容' }]"
            ></van-field>
            <van-field
               v-model="typeName"
               label="*户型"
               type="text"
               placeholder="户型"
               input-align="right"
               readonly
               clickable
               @click="showhuxing"
               :rules="[{ required: true,message: '请输入正确内容' }]"
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
                        <van-button type="primary" size="small" @click="showType1 = false">确定</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="warning" size="small" @click="huxinguanbi">取消选择</van-button>
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
                label="*产权"
                type="digit"
                placeholder="产权"
                input-align="right"
                :rules="[{ required: true,message: '请输入正确内容' }]"
            ></van-field>
            <van-field
              v-model="putYear"
              label="*建造年代"
              input-align="right"
              readonly
              clickable
              @click="showPutyear"
            ></van-field>
            <el-dialog :visible.sync="showType2" title="建造年代" fullscreen>
                <van-row>
                    <van-datetime-picker
                        v-model="currentDate" 
                        type="year-month"
                        title="选择完整时间"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @cancel="oncancel"
                        @confirm="onConfirm"
                    />
                </van-row>
            </el-dialog>
            <van-field
               v-model="saveYear"
               label="*购买时间"
               input-align="right"
               readonly
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
                    label="*层数"
                    placeholder="层数"
                    input-align="right"
                    readonly
                    @click="showfloor"
                    clickable
                    :rules="[{ required: true,message: '请输入正确内容' }]"
            >

            </van-field>
            <el-dialog :visible.sync="showType4" title="楼层" width="100%">
                <ul class="tab-tilte" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                    <li @click="cur = 0" :class="{active:cur==0}" style="margin-left: 61px;margin-bottom: 6.6px">所在层数</li>
                    <li @click="cur = 1" :class="{active:cur==1}" style="margin-left: 50px">总层数</li>
                </ul>
                <div v-show="cur == 0">
                    <van-row style="width: 100%;height: 48.65px">
                        <van-col style="margin-left: 24px;font-size: 15px;margin-top: 15.6px">
                            <van-field label="所在楼层" placeholder="所在楼层" type="digit" v-model="floor"></van-field>
                        </van-col>
                    </van-row>
                </div>
                <div v-show="cur == 1">
                    <van-row style="width: 100%;height: 48.65px">
                        <van-col style="margin-left: 24px;font-size: 15px;margin-top: 15.6px">
                            <van-field label="总楼层" placeholder="总楼层" type="digit" v-model="level" ></van-field>
                        </van-col>
                    </van-row>
                </div>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="primary" size="small" :disabled="(floor !== ''&&level !== '')?false:true" @click="showType4 = false">确定</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="warning" size="small" @click="levelguanbi">取消选择</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
			<!-- <van-field
			        v-model="direction"
			        label="*朝向"
			        placeholder="朝向"
			        input-align="right"
			        readonly
			        clickable
			        :rules="[{ required: true,message: '请输入正确内容' }]"
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
			</el-dialog> -->
            <van-field
                    label="*权属"
                    placeholder="权属"
                    input-align="right"
                    readonly
                    clickable
                    v-model="type"
                    :rules="[{ required: true,message: '请输入正确内容' }]"
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
                        <van-button type="primary" size="small" :disabled="(type !== '')?false:true" @click="showType5 = false">确定</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="warning" size="small" @click="typeguanbi">取消选择</van-button>
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
                    :rules="[{ required: true,message: '请输入正确内容' }]"
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
                        <van-button type="primary" size="small" :disabled="(decoration !== '')?false:true" @click="showType6 = false">确定</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="warning" size="small" @click="decorationguanbi">取消选择</van-button>
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
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC;">
                        <div v-for="(item,index) in options1" :key="index">
                            <li @click="clickareaid(item.value)" :class="{active:areaid==item.value}" style="margin-left: 10px;margin-bottom: 6.6px">{{item.text}}</li>
                        </div>
                    </ul>
                </van-row>
                <van-row style="margin-top: 20px">
                    <van-col :span="6">
                        <van-button type="primary" size="small" :disabled="(areaid !== '')?false:true" @click="showType7 = false">确定</van-button>
                    </van-col>
                    <van-col :offset="12" :span="6">
                        <van-button type="warning" size="small" @click="areaidguanbi">取消选择</van-button>
                    </van-col>
                </van-row>
            </el-dialog>
            <van-button @click="nextDate" type="info" style="width: 100%;height: 50px">下一步</van-button>
        </div>
        <div v-show="method == 1">
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-uploader v-model="uploader" accept="image/*" result-type="dataUrl"/>
                </template>
            </van-field>
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
    import 'element-ui/lib/theme-chalk/index.css';
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
                huxin:'',
                property:'',
                putYear:'',
                saveYear:'',
                minDate: new Date(1949, 0, 1),
                maxDate: new Date(2100,11,24),
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
            asyncValidator(){
                console.log(val);
                return /^\d+$|^\d+[.]?\d+$/.test(val);
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
            showLocalName(){
                this.showType0 = true;
                // AMap.service(["AMap.PlaceSearch"], function() {
                //     //构造地点查询类
                //    placeSearch = new AMap.PlaceSearch({ 
                //       pageSize: 5, // 单页显示结果条数
                //       pageIndex: 1, // 页码
                //       city: "0572", // 兴趣点城市
                //       citylimit: true,  //是否强制限制在设置的城市内搜索
                //       map: map, // 展现结果的地图实例
                //       panel: "panel", // 结果列表将在此容器中进行展示。
                //       autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                //     });
                //   //关键字查询
                // });
                // AMap.event.addListener(placeSearch, "selectChanged", this.selectAddress);
            },
            showareaid(){
                this.showType7 = true;
            },
            onConfirm(value){
                this.showType2 = false;
                let year = value.getFullYear();
                this.putYear  = year;
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
                if(name == ''||typeName == ''||title == ''||
                   local == ''||localName == ''||unitPrice == 0||
                   totalPrice == 0||area == 0||property == 0||
                   type == 0||decoration == 0||putYear == 0||saveYear == ''
                   ||level == 0||floor == 0||areaid == 0||unitType == 0){
                       this.$toast("有元素没写");
                       return;
                   }
                if(level<floor){
                    this.$toast("总楼层小于当前楼层");
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
				// let direction = parseInt(this.direction)
                this.Trans(this.uploader)
                let huxinName = (this.huxinName == '')?"一室一厅一卫":this.huxinName;
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
                        self.$router.push({path:"/my"})
                        // self.method = 0;
                    }else{
                        self.$toast(res.data.msg)
                    }
                }).catch(function(err){
                    console.log(err);
                })
            },
            Trans(uploader){
                for(let i=0;i<uploader.length;i++){
                    this.filess[i] = uploader[i].content;
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
    
</style>