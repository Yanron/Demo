<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside class="menu" width="initial">
          <el-menu class="el-menu-vertical-demo option" :collapse="iscollapse" default-active="1"
                   text-color="#fff" active-text-color="#fff">
            <el-menu-item index="-1" style="text-align: center" @click="iscollapse=!iscollapse">
              <i class="el-icon-menu"></i>
            </el-menu-item>
            <el-submenu index="0">
              <template slot="title">
                <i class="iconfont icon-work"></i>
                <span slot="title">test</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">project1</el-menu-item>
                <el-submenu index="1-2">
                  <template slot="title">project2</template>
                  <el-menu-item index="1-2-1">file1</el-menu-item>
                  <el-menu-item index="1-2-2">file2</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <router-link to="/project/My">
              <el-menu-item index="1">
                <i class="iconfont icon-work1"></i>
                <span slot="title">My project</span>
              </el-menu-item>
            </router-link>
            <router-link to="/project/Corporate">
              <el-menu-item index="2">
                <i class="iconfont icon-hezuohuobantianchong"></i>
                <span slot="title">Corporate project</span>
              </el-menu-item>
            </router-link>
            <router-link to="/project/All">
              <el-menu-item index="3">
                <i class="iconfont icon-project_info"></i>
                <span slot="title">All projects</span>
              </el-menu-item>
            </router-link>
            <el-menu-item v-if="iscollapse" index="-2">
              <i class="el-icon-circle-plus" @click="projectVisible=true"></i>
              <span slot="title">New Project</span>
            </el-menu-item>
            <div v-else="iscollapse" class="new_project">
              <!--<el-button type="warning" @click="newProject">New project</el-button>-->
              <el-button type="warning" @click="projectVisible=true">New project</el-button>
              <span class="fa fa-plus-circle"></span>
            </div>
          </el-menu>
        </el-aside>
        <el-main style="width:100%">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="New Project" :visible.sync="projectVisible">
      <el-form :model="form" :rules="rules" ref="form" label-position="right">
        <el-form-item label="Project name" prop="name">
          <el-input v-model="form.name" auto-complete="on" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="Prescription">
          <el-input v-model="form.desc" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectVisible=false">cancel</el-button>
        <el-button type="primary" @click="onSubmit('form')">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import HelloWorld from './components/project'
  import fileList from './components/file'
 // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  import qs from 'qs';
  //这个要装哎哎哎哎！！！！--save 项目依赖而不是开发时用
  export default {
    name: 'App',
    data: () => ({
      iscollapse: false,
      screenWidth:document.body.clientWidth,
      form: {
        name: '会有字的吧',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: 'place input project name', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在1到10之间', tigger: 'blur'}
        ]
      },
      projectVisible: false,
      testdata: {}
    }),
    components: {
      HelloWorld, fileList
    },
    mounted(){
      let _this=this;
      window.onresize=function change(){
       // let data=`${document.body.clientWidth}`
        let w=document.body.clientWidth//外面这又啥用么??
        if(w<880){
          _this.iscollapse=true;
        }else{
          _this.iscollapse=false;
        }
      }
    },
    methods: {
      onSubmit(testform) {
        console.log('success');
        console.log(this);
        this.$refs[testform].validate((valid) => {
          if (valid) {
            this.projectVisible = false;
            let name=testform.name;
            console.log(name);
            console.log(this.form.name);
            axios({
              method: 'post',
              url: '/api/addProject',
              owner:'LI',
              //headers: { 'Content-type': 'application/json' },
              data:{
                owner:'LI',
                project_name:this.form.name,
                brief:this.form.desc
              }
            }).then((res)=>{
              if(res.data)
                console.log(res.data)
            }).catch(function(err){
              console.log(err);
            })
          }
          else {
            console.log('err');
            return false;
          }
        });
      }
    }
  }
  //侧边栏我想不到方法自动收缩。。
</script>

<style>
  @media only screen and (min-width:800px){

  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .el-header {
    background: #23262e;
    font-size: 15px;
    color: white;
    line-height: 60px;
  }

  .el-aside {
    font-size: 16px;
    overflow: hidden;
    color: white;
    background: #393D49;
    height: 100%;

  }

  .el-aside a {
    color: white;
  }

  .el-container {
    height: 100%;
  }

  .el-menu-item {
    font-size: 16px;
    text-align: left;
    padding-left: 30px !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    height: 100%;
  }
  .el-submenu,.el-submenu *{
    background:#393D49!important;
    color:white;
  }
  .elsubmenu:hover{
    background:#393D49!important;

  }
  .el-menu-item i.iconfont {
    color: white;
    margin-right: 10px;
    font-size: 18px;
  }

  .el-menu-item [class^=el-icon-] {
    margin-right: 15px;
  }

  .el-menu--collapse > .el-menu-item .el-icon-menu {
    margin-left: -15px;
  }

  .el-icon-circle-plus {
    color: orange;
  }

  /*奇怪了，这个盒模型padding算在高度外面，和margin只有个背景区别了么*/
  .option {
    position: relative;
    background: #393D49;
  }

  .el-menu-item:focus, .el-menu-item:hover {
    background: #393d49;
  }

  .el-menu-item.is-active {
    background: #009688;
  }

  .new_project {
    margin-top: 20px;
  }

  .clearfix:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }


  .pull-left {
    float: left
  }

  .pull-right {
    float: right;
  }

  /*file list*/
  .el-table .el-table_1_column_5 .cell {
    text-align: center;
    width: 100%;
  }

  .el-table .el-table_1_column_5 .cell:hover {
    cursor: pointer
  }

  .el-table .el-table_1_column_5 i {
    width: 100%;
    display: block;
  }

  .el-form-item {
    margin-bottom: 0px;
  }
  .el-menu{border-right:0px !important}
</style>
