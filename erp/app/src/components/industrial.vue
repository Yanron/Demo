<template>
    <div class="wrapper">
      <el-form :model="industrial" label-width="100px">
        <div class="part">
          <h5 class="pull-left">Moisture Sensitivity Level:</h5>
          <el-input size="mini" v-model="industrial.moistureSensitivity"></el-input>
        </div>
        <div class="part">
          <h4>Assembly process</h4>
          <h5 style="text-align: left">Termination type </h5>
          <el-row>
            <el-col :xs="24" :sm="12" style="text-align: left">
              <el-form-item label="On PCB">
                <el-select v-model="industrial.pcbType" size="mini">
                  <el-option v-for="item in industrial.pcb" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="On Wire">
                <el-select v-model="industrial.wireType" size="mini">
                  <el-option v-for="item in industrial.wire" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" style="text-align: left">
              <el-form-item label="On Flex">
                <el-select v-model="industrial.flexType" size="mini">
                  <el-option v-for="item in industrial.flex" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Other">
               <el-input class="mwd-191" size="mini" v-model="industrial.other" maxlength="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align: left" class="clearfix">
            <h5>Placing type </h5>
            <el-radio-group class="placeType pull-left" v-model="industrial.placeType" @change="tips">
              <el-radio  label="1" value="Manual">Manual</el-radio>
              <el-radio  label="2"  value="Pick&Place">Pick&Place</el-radio>
            </el-radio-group>
            <el-alert class="pull-left" v-show="tip" title=" Ø2 mm flat area or picking cap " type="info" :closable=false></el-alert>
          </el-row>
        </div>
        <div class="part">
          <el-row style="text-align: left">
            <h5>Packing</h5>
            <el-col :xs="24" :sm="12" class="mechanical" style="text-align: left">
              <el-form-item label="Tape and Reel">
                <el-radio v-model="industrial.reel" label="1">Yes</el-radio>
                <el-radio v-model="industrial.reel" label="2">No</el-radio>
              </el-form-item>
              <el-form-item label="Bulk Bag">
                <el-radio v-model="industrial.bag" label="1">Yes</el-radio>
                <el-radio v-model="industrial.bag" label="2">No</el-radio>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" class="mechanical" style="text-align: left">
              <el-form-item label="Tray">
                <el-radio v-model="industrial.trayPacking" label="1">Yes</el-radio>
                <el-radio v-model="industrial.trayPacking" label="2">No</el-radio>
              </el-form-item>
              <el-form-item label="Box">
                <el-radio v-model="industrial.stick" label="1">Yes</el-radio>
                <el-radio v-model="industrial.stick" label="2">No</el-radio>
              </el-form-item>
            </el-col>
            <el-button class="pull-right" type="primary" size="mini">Other</el-button>
          </el-row>
        </div>
        <div class="part Soldering">
          <h5>Soldering:</h5>
          <p>Reflow soldering in a lead-free assembly process following the IPC/JEDEC J-STD 020D </p>
          <el-form-item label="Number of reflow path:
" label-width="200px">
           <el-input size="mini" class="mwd-191" v-model="industrial.soldering"></el-input>
          </el-form-item>

        </div>
        <div class="part">
          <h5 class="pull-left">Repair:</h5>
          <el-input size="mini" v-model="industrial.repaire"></el-input>
        </div>
        <div class="part" style="text-align: left">
          <h5 >Marking:</h5>
          <el-checkbox-group v-model="checkMarking">
            <el-checkbox v-for="item in marking" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "industrial",
        data(){
          return{
            tip:false,
            marking:['Supplier identification(name or symbol)','Supplier reference','RoHS compliance','Manufacturing plant','Manufacturing date','Batch number','Quantity of components in the packaging','Other'],
            checkMarking:[],
            industrial:{
              moistureSensitivity:'Accepted level is MSL < 3 according to JEDEC J-STD-020D',
              bag:'1',
              reel:'1',
              stick:'1',
              trayPacking:'1',
              pcbType:'NA',
              wireType:'NA',
              flexType:'NA',
              other:'',
              placeType:'',
              soldering:'2',
              repaire:'1 acceptable manual repair acording to IPC 610(E and following)',
              pcb:[{
                value:'Pin Through Hole',
                label:'Pin Through Hole'
              },{
                value:'SMT',
                label:'SMT',
              },{
                value:'Compliant Pin',
                label:'Compliant Pin'
              },{
                value:'Sliding',
                label:'Sliding'
              },{
                value:'Vertical',
                label:'vertical'
              },{
                value:'Contact',
                label:'Contact'
              },{
                value:'NA',
                label:'NA'
              }],
              wire:[{
                value:'Crimp',
                label:'Crimp'
              },{
                value:'IDT',
                label:'IDT,'
              },{
                value:'Solder',
                label:'Solder',
              },{
                value:'Wrapping',
                label:'Wrapping'
              },{
                value:'Screw Clamp',
                label:'Screw Clamp'
              },{
                value:'Spring Clamp',
                label:'Sprint Clamp'
              },{
                value:'NA',
                label:'NA'
              }],
              flex:[{
                value:'LIF',
                label:'LIF'
              },{
                value:'ZIF',
                label:'ZIF'
              },{
                value:'NA',
                label:'NA'
              }],
            }
          };
        },
        methods:{
          tips(e){
            console.log(e);
            console.log(e==2);
            if(e==2){
              //console.log(this)????有些糊涂
              this.$data.tip=true;
              //this.tip=true;
            }else{
              this.$data.tip=false;
            }
          }
        }
    }
</script>

<style scoped>
.wrapper h5{margin-bottom: 10px;text-align: left;}
  p{font-size: 14px;text-align: left;margin-bottom: 5px;}
  .mwd-191{max-width:193px}
  .Soldering{text-align: left;}
  .placeType{margin-left: 35px;}
  .placeType label{height:35px;line-height: 35px;}
  .el-alert{width:300px;margin-left: 10px;}
  .el-checkbox-group label{margin-bottom: 5px;}
  .el-checkbox-group label:first-child{margin-left: 30px;}
</style>
