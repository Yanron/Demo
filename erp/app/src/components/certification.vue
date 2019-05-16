<template>
    <div class="wrapper">
      <el-form class="part">
        <el-row>
          <h5>UL needs</h5>
          <el-form-item>
            <el-checkbox-group v-model="UL">
              <el-checkbox label="UL recognized"></el-checkbox>
              <el-checkbox label="UL recognized component material UL94v0"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Eco-design">
            <el-input  @focus="ecoVisible=true"type="textarea" v-model="ecoDesign"  :autosize="{minRows: 3}"></el-input>

          </el-form-item>
          <el-form-item label="Whiskers issue:"></el-form-item>
          <p>All Schneider-Electric requirements are described in last version of :
            FTF50010 EN “Use of Lead Free components having a Tin surface termination”.
            Schneider Product is a class 3 product according to JESD 201.
          </p>
        </el-row>
      </el-form>
      <!--woc这里有问题，没办法自己编辑，因为每次都跳弹窗所以可能需要改一下！！但是？？有内容了以后不在跳。呃感觉不满足要求-->
      <el-dialog class="ecoDesign" title="Eco-design" :visible.sync="ecoVisible">
        <el-checkbox-group v-model="eco">
          <el-checkbox label="ROHS2 EU"></el-checkbox>
          <p>Must comply with the 2011/65/EU (RoHS2) European Directive without exemptions.
            At minima, if the use of Annex III RoHS exemptions cannot be technically avoided, you must provide a material declaration using IPC 1752 format informing Schneider which exemption is used.
          </p>
          <el-checkbox label="REACH"></el-checkbox>
          <p>The presence of a Reach candidate list (SVHC) substance must be declared using IPC 1752 format.
            The presence of a Reach Annex XIV substance (submited to autorization) is prohibited by
          </p>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ecoVisible = false" size="mini">cancel</el-button>
          <el-button @click="ecoDetailVisible=true" type="success" size="mini">Detail</el-button>
          <el-button type="primary" @click="addContent" size="mini">confirm</el-button>
        </div>
      </el-dialog>

      <!--analyse-->
      <el-dialog :title="Detail" :visible.sync="ecoDetailVisible">
        <el-table :data="ecoDetailData" :default-sort="{property:'quotation',order:'descending'}">
          <el-table-column property="name" label="Name"></el-table-column>
          <el-table-column property="quotation" label="Quotation times" sortable width="160"></el-table-column>
          <el-table-column property="recent" label="Recent quotation" width="160" sortable></el-table-column>
          <el-table-column class="apply" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="ecoDetailVisible=false" size="mini">Apply</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <!--ref detail-->
      <el-dialog title="">

      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "certification",
        data(){
          return {
            UL:[],
            ecoDesign:'',
            eco:[],
            ecoVisible:false,
            ecoDetailVisible:false,
            ecoDetailData:[{
              name:'ROHS2 EU',
              quotation:20,
              recent:'2018-01-11'
            },{
              name:'REACH',
              quotation:18,
              recent:'2018-01-01'
            },{
              name:'ROHS2 EU&REACH',
              quotation:55,
              recent:'2007-07-07'
            }]
          }
        },
         methods:{
           addContent(e){
             console.log(this);
             this.ecoVisible=false;
             //这里是只选一个么
             if(this.eco.length>0){
               if(this.eco[0]=='ROHS2 EU'){
                 this.ecoDesign='ROHS2 EU\nMust comply with the 2011/65/EU (RoHS2) European Directive without exemptions.\n' +
                   'At minima, if the use of Annex III RoHS exemptions cannot be technically avoided, you must provide a material declaration using IPC 1752 format informing Schneider which exemption is used.'
               }
             }
           }
         }
    }
</script>

<style scoped>
  .part{
    text-align: left;
  }
  p{font-size:14px;color:#606266}
  .ecoDesign{text-align: left;}
</style>
