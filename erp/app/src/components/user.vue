<template>
  <div class="content" style="width:100%">
    <div class="top clearfix">
      <h5 class="pull-left">All user</h5>
    </div>
    <div class="tablelist" style="width:100%">
      <el-table :data="userData" style="width:100%" highligh-current-row ref="multipleTable" size="small" @selection-change="handleSelectionChange" stripe>
        <el-table-column type="selection" width="35"></el-table-column>
        <!--prop 和下面的区别？？-->
        <el-table-column prop="name" label="Name" sortable></el-table-column>
        <el-table-column prop="SESA" label="SESA" width="150"></el-table-column>
        <el-table-column prop="permission" label="Permission" width="120" :filters="[{text:'owner',value:'owner'},{text:'editor',value:'editor'}]" :filter-method="filter" filter-placement="bottom-end">
        </el-table-column>
        <el-table-column prop="email" label="Email" width="300"></el-table-column>
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
      <el-button type="success" id="inviteUser">Submit</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "user",
        data() {
          return{
            userData:[
              {
                name:'王小虎',
                SESA:'sesa501967',
                permission:'owner',
                email:'sesa501967@schneider-electric.com'
              },
              {
                name:'王大虎',
                SESA:'sesa501968',
                permission:'editor',
                email:'sesa501967@schneider-electric.com'
              },
              {
                name:'王二虎',
                SESA:'sesa501969',
                permission:'editor',
                email:'sesa501967@schneider-electric.com'
              }
            ],
            multipleSelection:[]
          }
        },
      methods:{
        handleSelectionChange(val){
          //this.multipleSelection=val;
          this.multipleSelection.length=0;
          var len,i;
          for(i=0,len=val.length;i<len;i++){
            this.multipleSelection.push(val[i].SESA);
          }
        },
        filter(value,row){
          return row.permission===value;
        }
      }
    }
</script>

<style scoped>
#inviteUser{
  margin-top: 20px;
}
</style>
