<template>
  <div class="content">
    <div class="top clearfix">
      <h5 class="pull-left">{{type}} projects</h5>
      <div class="pull-right clearfix">
        <el-input class="pull-left" v-model="input10" size="small" clearable></el-input>
        <el-button class="pull-right" size="small" type="success">search</el-button>
      </div>
    </div>
    <el-row :gutter="25" id="all-projects">
      <el-col v-for="project in projects" :xs="24" :sm="12" :md="8" :lg="6">
        <router-link to="/projectID/file">
          <div class="grid-content bg-purple">
              <span class="status status_2"></span>
              <div class="proj_info">
                <p class="proj_name">{{project.project_name}}</p>
                <p class="owner">{{project.owner}}</p>
              </div>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <div class="grid-content bg-purple">
          <span class="status status_3"></span>
          <div class="proj_info">
            <p class="proj_name">proj_name</p>
            <p class="owner">owner Name</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination background @current-change="handleCurrentChange" :pager-count="5" :current-page.aync="pageNum" layout="prev,pager,next,jumper" :total="100">

    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "project",
        data(){
          return {
            input10:'',
            projects:[{project_name:'hhh',owner:'test'}],
            pageNum:1,
            type:this.$route.params.type
          }
        },
        watch:{
          '$route'(to,from){
            console.log(this.$route.params)
            this.type=this.$route.params.type;
            axios({
              method: 'get',
              url:'/api/ProjectList',
              params:{
                type:this.type
              }
            }).then((res)=>{
              console.log('success');
              if(res.data){
                this.projects=res.data;
              }
            }).catch(function (err) {
              console.log(err);
            });
          }
        },
        methods:{
          handleCurrentChange(val){
            axios({
              method: 'get',
              url: '/api/test/'+val
            }).then((res)=>{
              console.log('success')
            }).catch(function (err) {
              console.log(err);
            });
          }
        },
        created(){
          //一页12个比较合适
          console.log(this.$route.params)
          axios({
            method: 'get',
           // url: '/api/test'
            url:'/api/ProjectList'
          }).then((res)=>{
            console.log('success');
            if(res.data){
              this.projects=res.data;
            }
          }).catch(function (err) {
            console.log(err);
          });
        }
    }
</script>

<style scoped>
  .el-row{
    margin-top: 20px;
  }
  .el-row:last-child{margin-bottom: 0;}
  .grid-content{
    min-height: 90px;
    max-height: 150px;
    margin-bottom: 20px;
    position:relative;
    border-radius: 5px;
  }
  .bg-purple{
    border:1px solid #ebeef5;
    transition: all .3s ease;
  }
  .bg-purple:hover{
    cursor: pointer;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1) ;
  }
  /*background:#e5e9f2;*/
  .el-input{width:70%;}
  .top{
    padding-bottom: 20px;
    border-bottom:1px solid #ccc;
  }
  .top h5{margin-top: 8px;}
  #all-projects .grid-content{
    cursor:pointer;
  }
  .status{
    height:5px;
    width: 5px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    position:absolute;
    top:50%;
    left:15px;
  }
  .status_1{background: red;}
  .status_2{background: #009688}
  .status_3{background: #8F8F8F}
  .proj_info{text-align: left;margin-left: 35px;padding-top: 20px;font-size: 15px;}
  .proj_name{margin-bottom: 10px}
</style>
