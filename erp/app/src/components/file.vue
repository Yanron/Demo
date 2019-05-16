<template>
  <div class="content" style="width:100%">
    <div class="top clearfix">
      <el-breadcrumb class="pull-left" separator="/">
        <el-breadcrumb-item :to="{path:'/'}">All Project</el-breadcrumb-item>
        <el-breadcrumb-item>Project name</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="pull-right clearfix">
        <router-link to="/user"><el-button type="success" size="small" @click="invite=false" plain>invite</el-button></router-link>
        <el-button type="warning" size="small" plain>New file</el-button>
      </div>
    </div>
    <div class="tablelist" style="width:100%">
      <el-table :data="tableData" style="width:100%" highligh-current-row @current-change="handleCurrentChange"
                :default-sort="{prop:'create_date',order:'descending'}" size="small" stripe>
        <el-table-column type="index" width="30"></el-table-column>
        <!--prop 和下面的区别？？-->
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="create_date" label="CreateAt" width="100" sortable></el-table-column>
        <el-table-column prop="update_date" label="UpdateAt" width="100"></el-table-column>
        <el-table-column label="Option" width="70">
          <template slot-scope="scope">
            <el-popover class="operate" trigger="click" palcement="bottom">
              <ul>
                <li><a href="https://view.officeapps.live.com/op/view.aspx?src={localhost:8080/Q.docx}">View</a></li>
                <li><router-link to="/projectID/fileID/editor">Editor</router-link></li>
                <li><router-link to="/file">Rename</router-link></li>
                <li><router-link to="/file">Delete</router-link></li>
                <li><router-link to="/file">Request to review</router-link></li>
                <li><router-link to="/file">History</router-link></li>
              </ul>
              <i slot="reference" class="iconfont icon-menu"></i>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "file",
    data() {
      return {
        tableData: [{
          name: 'test1这是一个超长超长的名字上面的width好像是盒子的最小宽度！！！',
          create_date: '2016-05-02',
          update_date: '2016-05-02'
        }, {
          name: '就是宽度好么，所以我要去掉宽度',
          create_date: '2008-08-08',
          update_date: '2009-10-11'
        }],
        input10: ''
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 70%;
  }
  .top {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }

  .top h5 {
    margin-top: 8px;
  }


</style>
