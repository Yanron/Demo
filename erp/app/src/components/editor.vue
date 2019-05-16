<template>
  <div>
   <section class="clearfix">
     <el-breadcrumb class="pull-left" separator="/">
       <el-breadcrumb-item :to="{path:'/'}">All project</el-breadcrumb-item>
       <el-breadcrumb-item :to="{path:'/projectID/file'}">Project name</el-breadcrumb-item>
       <el-breadcrumb-item>File name</el-breadcrumb-item>
     </el-breadcrumb>
     <div class="pull-right">
       <el-button type="success" size="mini" plain>Print</el-button>
       <el-button type="warning" size="mini" plain>Export to Word</el-button>
     </div>
   </section>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Overview" class="Overview" name="first">
       <overview></overview>
      </el-tab-pane>
      <el-tab-pane label="Connector" class="Connector" name="second">
        <connector></connector>
      </el-tab-pane>
      <el-tab-pane label="Industrial" class="Industrial" name="third">
        <industrial></industrial>
      </el-tab-pane>
      <el-tab-pane label="Quailty" name="fourth">
        <quality></quality>
      </el-tab-pane>
      <el-tab-pane label="Certification" name="certification">
        <certification></certification>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import overview from './overview'
    import connector from './connector'
    import  certification from './certification'
    import industrial from './industrial'
    import quality from './quality'
    export default {
        name: "editor",
        data() {
          return {
            activeName2: 'first',
            electric:{
              connectionApply:'',
              connectionApplication:'Board to Component',
              shield:'',
              contacts:'',
              direction:'',
              connection:'',
              board:'',
              height:'',
              width:'',
              depth:'',
              radio:'1',
              radio2:'1',
              connectionGender:'male',
              direction:'Right Angle',
              guage:'',
              WithstandVoltage:'',
              RatedCurrent:'',
              MinimumCurrent:'',
              RatedVoltage:'',
              MinimumVoltage:'',
              options:[
                {value:'Board to Component'},
                {value:'Board to Board'},
                {value:'Board to Wire'},
                {value:'Wire to Wire'},
                {value:'Board to Flex'},
                {value:'other'}
              ],
              directions:[
                {value:'Right Angle'},
                {value:'Straight'}
              ],
              gender:[
                {value:'male'},
                {value:'female'},
                {value:'Hermaphrodite'},
                {value:'Not applicable'}
              ]
            },
            mechanical:{
              feature:'1',
              feature2:'1',
              color:'',
              Flammability:'',
              ambiantMax:'',
              ambiantMim:'',
              storageMin:'',
              storageMax:'',
              humidity:''
            },

          };
        },
       components:{
          overview,connector,certification,industrial,quality
      },
        methods: {
          handleClick(tab, event) {

          }
        }
    }
</script>

<style>

  h4{margin-bottom: 10px}
  .part{padding-bottom:20px;margin-top:20px;border-bottom: 1px solid #ccc;}
  .el-tab-pane .part:first-child{margin-top: 0px;}
  .el-tab-pane .part:last-child{border-bottom: none;}
  .el-tabs{margin-top:10px;}
  .part{padding-bottom:20px;margin-top:20px;border-bottom: 1px solid #ccc;}
</style>
