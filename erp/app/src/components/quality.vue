<template>
    <div class="wrapper">
      <el-form>
        <h4>Quality</h4>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 16 }"></el-input>
       <div class="button-group">
         <el-button type="primary"  size="mini" @click="templateVisible=true">Copy from template</el-button>
         <el-button type="success"  size="mini">Save</el-button>
         <el-button type="warning"  size="mini">Save as template</el-button>
       </div>
      </el-form>
      <el-dialog title="Template" :visible.sync="templateVisible" width="85%">
        <el-table :data="template" :default-sort="{property:'quotation',order:'descending'}">
          <el-table-column property="name" label="Template name" ></el-table-column>
          <el-table-column property="belong" label="Project" ></el-table-column>
          <el-table-column property="quotation" label="Quotation times"  sortable width="160"></el-table-column>
          <el-table-column property="recent" label="Recent quotation" width="160" sortable ></el-table-column>
          <el-table-column class="option"  width="180" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini"  @click="preview(scope)">Preview</el-button>
              <el-button size="mini"  @click="apply(scope)" type="danger">Apply</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    <el-dialog :title="templateName" :visible.sync="templateDetailVisible" fullscreen>
      另开一个word/pdf预览
    </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "quality",
        data(){
          return {
            templateVisible:false,
            templateDetailVisible:false,
            template:[{
              name:'file name hahaha',
              belong:'project name',
              quotation:'98898',
              recent:'2018-6-29'
            },{
              name:'fiejdzfojcasz',
              belong:'dsafefme',
              quotation:'8898',
              recent:'2018-6-28'
            },{
              name:'blalalala haha',
              belong:'project name',
              quotation:'123',
              recent:'2018-6-29'
            }],
            templateName:''
          }
        },
        methods:{
          preview(o){
            this.templateDetailVisible=true;
            this.templateName=o.row.name
          },
          apply(o){
            this.$message({
              message:'success',
              type:'success',
              duration:2000,
            });
            this.templateVisible=false;
            //然后应该填充数据到现有的表格
          }
        }
    }
</script>

<style scoped>
  .button-group{float:right;margin-top: 10px;}
</style>
