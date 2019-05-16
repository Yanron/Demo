<template>
  <div class="wrapper">
    <div class="part">
      <h4>Application Overview</h4>
      <div class="clearfix btnWrapper">
        <el-button class="pull-right" type="primary" size="mini" @click="applicationCopy=true" plain>
          copy from
        </el-button>
      </div>
      <!--applicationCopy-->
      <el-dialog title="sample" :visible.sync="applicationCopy" width="85%"></el-dialog>
      <el-form ref="form" class="clearfix">
        <el-col :xs="24" :sm="12" class="overview">
          <el-input type="textarea"
                    value="The (fe)male connector is referenced as J? in schematics, it is used to connect ???"
                    autosize></el-input>
          <el-button size="small" type="primary" @click="picAdd" id="picAdd">Add pic to show position in product
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-col>
        <el-col :xs="24" :sm="12" class="overview">
          <!--要实现图片的放大预览，我自己写个放大的框就好啊-->
          <el-upload class="img-upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                     :on-remove="handleRemove" :file-list="fileList2" list-type="picture" @click="bigpic(e)">
            <el-button id="upload" style="display:none">upload</el-button>
          </el-upload>
          <transition name="el-fade-in-linear">
            <div class="imgdetail" v-show="show" @click="hide">
              <div class="imgmask"></div>
              <div class="img">
                <img :src="bigpicURL" alt="piccc"/>
              </div>
            </div>
          </transition>
        </el-col>
      </el-form>
    </div>
    <div class="part">
      <h4>Component Overview</h4>
      <el-row>
        <h5 class="pull-left">Automatically <i class="sync"><u>synchronize</u></i> from other inputs:</h5>
        <el-form :model="sync" class="syncform">
          <el-col :xs="24" :sm="12" style="text-align: left">
            <el-form-item label="Type:">
              <span v-model="sync.type"></span>
            </el-form-item>
            <el-form-item label="Contacts number:">
              <span v-model="sync.contact"></span>
            </el-form-item>
            <el-form-item label="Pitch:">
              <span v-model="sync.pitch"></span>
            </el-form-item>
            <el-form-item label="Number of plugs/unplugs:">
              <span v-model="sync.plugsNum"></span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Pluggable or not:">
              <span v-model="sync.pluggable"></span>
            </el-form-item>
            <el-form-item label="Keying or not">
              <span v-model="sync.plugable"></span>
            </el-form-item>
            <el-form-item label="Shield or not">
              <span v-model="sync.shield"></span>
            </el-form-item>
            <el-form-item label="Assembly technology">
              <span v-model="sync.assembly"></span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="part" id="profile">
      <h4>Product Mission profile</h4>
      <div class="clearfix btnWrapper">
        <el-button class="pull-right" type="primary" size="mini" @click="product.profileCopy=true" plain>
          copy from
        </el-button>
      </div>
      <el-dialog title="profile" :visible.sync="product.profileCopy" width="85%">
      </el-dialog>
      <!--有了label-width就在一行了，也不换行。。。-->
      <el-form ref="form" :model="overview" label-width="150px" style="text-align: left;">
        <el-row>
          <el-col :xs="24" :sm="12">
            <h5>Service life & Climatic</h5>
            <el-form-item label="Standars:">
              <el-select v-model="standard" size="mini" filterable allow-create>
                <el-option v-for="year in product.years" :key="year.value" :label="year.value"
                           :value="year.label"></el-option>
                <el-option label="search in Option list"  :value="lifeAndClimatic.chooseValue">
                  <div @click="lifeAndClimatic.visibeChoose=true">search in Option list</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :xs="24">
            <el-form-item label="Product Family">
              <el-select v-model="productFamily" size="mini" filterable allow-create>
                <el-option v-for="item in product.productFamilyoption" :key="item.value" :label="item.value"
                           :value="item.value"></el-option>
                <el-option label="search in Option list"  :value="lifeAndClimatic.chooseValue">
                  <div @click="lifeAndClimatic.visibeChoose=true">search in Option list</div>
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>
        </el-row>
        <!--可选框-->
        <el-dialog title="Options" :visible.sync="lifeAndClimatic.visibleChoosec" width="85%">
          <el-table :data="lifeAndClimatic.data" :default-sort="{property:'quotation',order:'descending'}">
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="life" label="Service life"></el-table-column>
            <el-table-column property="hours" label="Typical hours"></el-table-column>
            <el-table-column property="project" label="Project"></el-table-column>
            <el-table-column property="quotation" label="Quotation time" sortable width="160"></el-table-column>
            <el-table-column property="recent" label="Latest quotation" sortable width="160"></el-table-column>
          </el-table>
          <el-button type="primary" size="mini" style="margin-top:10px;" @click="lifeAndClimatic.visibleChoose=false">Apply</el-button>
        </el-dialog>

        <h5 style="margin-bottom: 10px;text-align: left;">The mission profile within predefined areas is the sum of
          Temperature/duration for Typical and Extreme condition: </h5>
        <el-row>
          <el-col :sm="12" :xs="24">
            <el-form-item label="Typical Condition">
              <el-select size="mini" v-model="condition.typicalCondition" filterable allow-create>
                <el-option v-for="item in product.typicalCondition" :key="item.value" :label="item.value"
                           :value="item.value"></el-option>
                <el-option label="search in Option list"  :value="condition.chooseValue">
                  <div @click="conditionChoose">search in Option list</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :xs="24">
            <el-form-item label="Extreme Condition">
              <el-select size="mini" v-model="condition.extremeCondition" filterable allow-create>
                <el-option v-for="item in product.extremeCondition" :key="item.value" :label="item.value"
                           :value="item.value"></el-option>
                <el-option label="search in Option list"  :value="condition.chooseValue">
                  <div @click="conditionChoose">search in Option list</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--condition choose dialog-->
        <el-dialog title="Option List" :visible.sync="condition.all" width="85%">
          <el-table :data="condition.allData" :default-sort="{prop: 'quotation', order: 'descending'}" @selection-change="handleSelectionChange" stripe>
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="typical" label="Typical" ></el-table-column>
            <el-table-column prop="extreme" label="Extreme" ></el-table-column>
            <el-table-column prop="project" label="Project" ></el-table-column>
            <el-table-column prop="quotation" label="Quotation time" width="95"></el-table-column>
            <el-table-column prop="last" label="latest quotation"></el-table-column>
          </el-table>
          <el-button type="primary" size="mini" style="margin-top:10px">Apply</el-button>
        </el-dialog>

        <h5 style="margin-bottom: 5px">Breaker Storage/shipping- Mounting – Wiring conditions:</h5>
        <el-input size="mini"
                  value="T°C should be [- 35°C; + 85°C] ; RH [0% ; 80%] during maximum 7 month + 1 week (7.25 months)" @focus="conditionDescp=true;"></el-input>
        <el-dialog title="Options" :visible.sync="conditionDescp" width="85%">
          <el-table :data="conditions" :default-sort="{property:'quotation',order:'descending'}">
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="extreme" label="Extreme contidion"></el-table-column>
            <el-table-column property="project" label="Project"></el-table-column>
            <el-table-column property="quotation" label="Quotation time" sortable width="160"></el-table-column>
            <el-table-column property="recent" label="Latest quotation" ></el-table-column>
          </el-table>
          <el-button type="primary" size="mini">Apply</el-button>
        </el-dialog>
        <el-form-item class="myForm" style="text-align: center">
          <table class="mytable" border="1" cellspacing="0">
            <thead>
            <tr>
              <th></th>
              <th>TOTAL Hours</th>
              <th>
                <div><span>TYPICAL</span>
                  <el-input v-model="percent" size="mini"></el-input>
                  <span>%Hours</span></div>
              </th>
              <th>EXTREME({{100-percent}}%) Hours</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th><span>Time Duration for</span>
                <el-input v-model="year" size="mini"></el-input>
                <span>years</span></th>
              <th>{{year*365*24}}</th>
              <th>{{year*365*24*percent/100}}</th>
              <th>{{year*365*24*(100-percent)/100}}</th>
            </tr>
            </tbody>
          </table>

        </el-form-item>
        <h5 label="Vibrations/Shocks/Shakes">Vibrations/Shocks/Shakes:</h5>
        <el-checkbox-group class="checkbox-group" v-model="formClass" @change="handleCheckedChange">
          <el-checkbox label="Industrial Class"></el-checkbox>
          <el-checkbox label="Merchant Navy Class"></el-checkbox>
          <el-checkbox label="French Navy Military"></el-checkbox>
          <el-checkbox label="Specific Windmills applications"></el-checkbox>
        </el-checkbox-group>
        <div class="button-group">
          <el-button type="primary" size="mini" @click="shake.classOptionVisible=true" plain>Other</el-button>
        </div>
      </el-form>
      <!--根据所选内容显示的项目-->
      <div class="checkedForm">
        <div v-show="industrial" class="form">
          <h5>Industrial Class</h5>
          <table class="industrial" border="1" cellspacing="0">
            <thead>
            <tr>
              <th>Profile</th>
              <th>Reference</th>
              <th>Mechanical conditions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Vibrations</td>
              <td>3M4(*)according to IEC 60721-3-3</td>
              <td>1g-5 to 150Hz</td>
            </tr>
            <tr>
              <td>Mechanical shocks</td>
              <td>3M4 according to IEC 60721-3-3</td>
              <td>15g</td>
            </tr>
            <tr>
              <td>Shakes</td>
              <td>3M4 according to IEC 60721-3-3</td>
              <td>15g</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="form" v-show="merchant">
          <h5>Merchant Navy Class</h5>
          <table class="merchant" border="1" cellspacing="0">
            <thead>
            <tr>
              <th>Profile</th>
              <th>Reference</th>
              <th>Mechanical conditions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Vibrations</td>
              <td>IACS E10 normal conditions</td>
              <td>0.7g-13.2 to 100Hz</td>
            </tr>
            <tr>
              <td>Mechanical shocks</td>
              <td>3M4 according to IEC 60721-3-3</td>
              <td>15g</td>
            </tr>
            <tr>
              <td>Shakes</td>
              <td>3M4 according to IEC 60721-3-3</td>
              <td>15g</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="form" v-show="french">
          <h5>French Navy Military</h5>
          <table class="french" border="1" cellspacing="0">
            <thead>
            <tr>
              <th>Profile</th>
              <th>Reference</th>
              <th>Mechanical conditions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Vibrations</td>
              <td>CEI 60068-2-6</td>
              <td>2g-22 to 50Hz</td>
            </tr>
            <tr>
              <td>Mechanical shocks</td>
              <td>3M4 according to IEC 60721-3-3</td>
              <td>15g</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--修改表格内容-->
      <el-dialog title="Options" :visible.sync="shake.classOptionVisible" width="85%">
        <el-table :data="shake.classOption" :default-sort="{prop: 'quotationTimes', order: 'descending'}" stripe>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="quotationTimes" label="Quotation times" sortable></el-table-column>
          <el-table-column prop="recentQuotation" label="Recent quotation" sortable></el-table-column>
          <el-table-column width="270" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">Modify</el-button>
              <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">Rename</el-button>
              <el-button size="mini" type="danger">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" style="text-align: left" @click="handleClickAdd">Add</el-button>
        </div>
      </el-dialog>

      <!--修改表格内容2-->
      <el-dialog :title="formTemplateTitle" :visible.sync="formTemplateVisible" width="75%">
        <table class="changeFormTemplate" border="1" cellspacing="0" :model="formTemplate" style="width:100%">
          <thead>
          <tr>
            <th>Profile</th>
            <th>Reference</th>
            <th>Mechanical conditions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Vibrations</td>
            <td>
              <el-input v-model="formTemplate.vibrationRef"></el-input>
            </td>
            <td>
              <el-input v-model="formTemplate.vibrationCon"></el-input>
            </td>
          </tr>
          <tr>
            <td>Mechanical shocks</td>
            <td>
              <el-input v-model="formTemplate.shockRef"></el-input>
            </td>
            <td>
              <el-input v-model="formTemplate.shockCon"></el-input>
            </td>
          </tr>
          <tr>
            <td>Shakes</td>
            <td>
              <el-input v-model="formTemplate.shakeRef"></el-input>
            </td>
            <td>
              <el-input v-model="formTemplate.shakeCon"></el-input>
            </td>
          </tr>
          </tbody>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" style="text-align: left" @click="formTemplateSubmit">Confirm</el-button>
        </div>
      </el-dialog>


      <h5>Chemical：</h5>
      <el-checkbox-group class="checkbox-group" v-model="formClass" @change="handleCheckChange2">
        <el-checkbox label="Nova"></el-checkbox>
        <div class="button-group">
          <el-button type="primary" size="mini" plain @click="chemical.chemicalOptionVisible=true">Other</el-button>
        </div>
      </el-checkbox-group>
      <el-dialog title="Options" :visible.sync="chemical.chemicalOptionVisible">
        <el-table :data="chemical.chemicalOption" stripe>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column width="270">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">Modify</el-button>
              <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">Rename</el-button>
              <el-button size="mini" type="danger">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--根据所选内容显示chemical-->
      <div class="checkedForm">
        <div v-show="chemical.chemicalOptionForm.SPEC008" class="form">
          <h5>Nova Chemical:</h5>
          <table class="industrial" border="1" cellspacing="0">
            <thead>
            <tr>
              <th>Profile</th>
              <th>Pollutions (*)</th>
              <th>Active substances</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Corrosive Industrial atmospheres</td>
              <td>Category 3C2 according to
                IEC 60721-3-3
              </td>
              <td>SO2 – 1 mg/m3 (max)<br/>
                H2S – 0,5 mg/m3 (max)<br/>
                CL2 – 0,3 mg/m3 (max)<br/>
                NO2– 1 mg/m3 (max)
              </td>
            </tr>
            <tr>
              <td>Sea salts</td>
              <td>According to IEC 60721-2-5
              </td>
              <td>0.8 to 8 mg/(m2.day)
                Average over the year
              </td>
            </tr>
            <tr>
              <td>Mechanically active substances</td>
              <td>Category 3S3 according to IEC 60721-3-3</td>
              <td>Sand - 300mg/m3 (max)<br/>
                Dust (suspension) – 0,4 mg/m3 (max)<br/>
                Dust (sedimentation) – 15 mg/m2.h (max)<br/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--Altitude template-->
      <h4 style="text-align: left">Altitude :</h4>
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 16 }" :model="altitude" :value="altitude.value"></el-input>
      <div class="button-group">
        <el-button type="primary" size="mini" @click="templateVisible=true">Copy from template</el-button>
        <el-button type="success" size="mini">Save</el-button>
        <el-button type="warning" size="mini">Save as template</el-button>
      </div>
      <el-dialog title="Template" :visible.sync="templateVisible" width="85%">
        <el-table :data="altitude.template" :default-sort="{property:'quotation',order:'descending'}">
         <el-table-column property="name" label="Altitude template"></el-table-column>
          <el-table-column property="belong" label="Project"></el-table-column>
          <el-table-column property="quotation" label="Quotation time" sortable width="160"></el-table-column>
          <el-table-column property="recent" label="Latest quotation" width="160" sortable></el-table-column>
          <el-table-column class="option" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="preview(scope)">Preview</el-button>
              <el-button size="mini" @click="apply(scope)" type="danger">Apply</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "overview",
    data() {
      return {
        applicationCopy:false,
        percent: '70',
        year: 20,
        fileList2: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0NnB4IiBoZWlnaHQ9IjM4cHgiIHZpZXdCb3g9IjAgMCAxNDYgMzgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQwICgzMzc2MikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+U2hhcGUgQ29weTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJ2Mi4yLjAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLpppbpobUt6buY6K6k5pWI5p6cLWNvcHktMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcwLjAwMDAwMCwgLTE5LjAwMDAwMCkiIGZpbGw9IiM0MDlFRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEyLjEzNTQ0MSw0NS4xNTc4MDc3IEMyMTIuMTM1NDQxLDQ1LjE1NzgwNzcgMjEyLjQyMDIzNyw0NS4xNTA1MTA1IDIxMi45NjA5MzcsNDUuMTU3ODA3NyBDMjEzLjUwMTYzNyw0NS4xNjUxMDQ5IDIxMy42NDg4NTEsNDUuNTcwODU1NiAyMTMuNjQ4ODUxLDQ1LjU3MDg1NTYgQzIxMy42NDg4NTEsNDUuNTcwODU1NiAyMTQuNzMzODI4LDQ3LjU2NjU2NTcgMjE1LjAyNDY3Nyw0OC4wNDkxNDM0IEMyMTUuMjgzNjA4LDQ4LjQ3ODcxMzMgMjE0Ljk3MzIyMSw0OC40NzA4NjU0IDIxNC45MDE4MTYsNDguNDYzODQzNiBDMjE0LjkwMjUwNCw0OC40NjI4Nzk4IDIxNC44ODcwOTUsNDguNDYyMTkxNCAyMTQuODg3MDk1LDQ4LjQ2MjE5MTQgQzIxNC44ODcwOTUsNDguNDYyMTkxNCAyMTQuODkzMDExLDQ4LjQ2MzAxNzUgMjE0LjkwMTgxNiw0OC40NjM4NDM2IEMyMTQuODk4NjUyLDQ4LjQ2ODI0OTUgMjE0LjU5NDczMSw0OC40NzgzMDAzIDIxMS40NDc1MjgsNDguNDYyMTkxNCBDMjA3LjA1ODY0MSw0Ny44NjY1NzYyIDIwNi45MDczLDQzLjkxODY2MzggMjA2LjkwNzMsNDMuOTE4NjYzOCBMMjA2LjkwNzMsMzYuODk2ODQ4MyBMMjA0LjQzMDgxMiwzNi44OTY4NDgzIEwyMDQuNDMwODEyLDM0LjI4MDg3NzkgQzIwNC40MzA4MTIsMzMuOTI0Mjc5OCAyMDQuODQzNTYsMzMuODY3ODI5OSAyMDQuODQzNTYsMzMuODY3ODI5OSBMMjA2LjkwNzMsMzMuODY3ODI5OSBMMjA2LjkwNzMsMzEuMjUxODU5NCBDMjA2LjkwNzMsMzAuODI1MTgwOSAyMDcuMzIwMDQ4LDMwLjcwMTEyODggMjA3LjMyMDA0OCwzMC43MDExMjg4IEMyMDcuMzIwMDQ4LDMwLjcwMTEyODggMjA4Ljc3MjY0NiwzMC4yODU4Nzc5IDIwOS42MTc4MTYsMzAuMDQ0MTA3MiBDMjA5Ljk2NDY2MiwyOS45NDQ5NzU2IDIxMC4wNzE3MDEsMzAuMTUwMzk4MiAyMTAuMDcxNzAxLDMwLjE1MDM5ODIgQzIxMC4wNzE3MDEsMzAuMTUwMzk4MiAyMTAuMjA5Mjg0LDMwLjA3NzQyNjQgMjEwLjIwOTI4NCwzMC4zOTI3MTk2IEwyMTAuMjA5Mjg0LDM0LjAwNTUxMjUgTDIxMy43ODY0MzMsMzQuMDA1NTEyNSBDMjE0LjEzNDY1NSwzNC4wMDU1MTI1IDIxNC4xOTkxODEsMzQuNDE4NTYwNSAyMTQuMTk5MTgxLDM0LjQxODU2MDUgTDIxNC4xOTkxODEsMzcuMDM0NTMxIEwyMTAuMjA5Mjg0LDM3LjAzNDUzMSBMMjEwLjIwOTI4NCw0My4wOTI1Njc4IEMyMTAuMjA5Mjg0LDQ0Ljg1MzM5MTMgMjEyLjEzNTQ0MSw0NS4xNTc4MDc3IDIxMi4xMzU0NDEsNDUuMTU3ODA3NyBMMjEyLjEzNTQ0MSw0NS4xNTc4MDc3IFogTTIwMS41NDE1NzYsNDguMTg2ODI2MSBMMTk5LjM0MDI1Myw0OC4xODY4MjYxIEMxOTguOTA4MzgxLDQ4LjE4NjgyNjEgMTk4LjkyNzUwNSw0Ny42MzYwOTU1IDE5OC45Mjc1MDUsNDcuNjM2MDk1NSBMMTk4LjkyNzUwNSwzNy40NDc1Nzg5IEMxOTguOTI3NTA1LDM2LjgyODY5NTQgMTk4LjEwMjAwOSwzNi42MjE0ODMgMTk4LjEwMjAwOSwzNi42MjE0ODMgTDE5My41NjE3ODEsMzYuNjIxNDgzIEMxOTIuODg0NDYyLDM2LjYyMTQ4MyAxOTIuODczODY4LDM3LjQ0NzU3ODkgMTkyLjg3Mzg2OCwzNy40NDc1Nzg5IEwxOTIuODczODY4LDQ3Ljc3Mzc3ODEgQzE5Mi44NzM4NjgsNDguMTc4NzAyOCAxOTIuNDYxMTIsNDguMTg2ODI2MSAxOTIuNDYxMTIsNDguMTg2ODI2MSBMMTkwLjI1OTc5Nyw0OC4xODY4MjYxIEMxODkuNzc1NzgyLDQ4LjE4NjgyNjEgMTg5Ljg0NzA0OSw0Ny42MzYwOTU1IDE4OS44NDcwNDksNDcuNjM2MDk1NSBMMTg5Ljg0NzA0OSwzNC44MzE2MDg1IEMxODkuODQ3MDQ5LDMzLjgwMzExOSAxOTEuMDg1MjkzLDMzLjU5MjQ2NDYgMTkxLjA4NTI5MywzMy41OTI0NjQ2IEwyMDAuNzE2MDgsMzMuNTkyNDY0NiBDMjAxLjY3Nzc4MywzMy41OTI0NjQ2IDIwMS45NTQzMjQsMzQuODMxNjA4NSAyMDEuOTU0MzI0LDM0LjgzMTYwODUgTDIwMS45NTQzMjQsNDcuNDk4NDEyOCBDMjAxLjk1NDMyNCw0OC4yMTg2MzA4IDIwMS41NDE1NzYsNDguMTg2ODI2MSAyMDEuNTQxNTc2LDQ4LjE4NjgyNjEgTDIwMS41NDE1NzYsNDguMTg2ODI2MSBaIE0xODUuODU3MTUyLDQyLjQwNDE1NDYgTDE3Ny4zMjcwMjcsNDIuNDA0MTU0NiBMMTc3LjMyNzAyNyw0NC40NjkzOTQ0IEMxNzcuMzI3MDI3LDQ1LjIxMzU2OTEgMTc4LjI5MDEwNiw0NS40MzMxNzMgMTc4LjI5MDEwNiw0NS40MzMxNzMgTDE4NS4xNjkyMzksNDUuNDMzMTczIEMxODUuNjU4NzU4LDQ1LjQzMzE3MyAxODUuOTk0NzM1LDQ1Ljg0NjIyMSAxODUuOTk0NzM1LDQ1Ljg0NjIyMSBDMTg1Ljk5NDczNSw0NS44NDYyMjEgMTg2LjU5NTAwOCw0Ny4wOTUxNDAzIDE4Ni44MjAyMzEsNDcuNjM2MDk1NSBDMTg3LjA0NTQ1NCw0OC4xNzcwNTA2IDE4Ni40MDc0ODMsNDguMTg2ODI2MSAxODYuNDA3NDgzLDQ4LjE4NjgyNjEgTDE3Ni4wODg3ODMsNDguMTg2ODI2MSBDMTc0Ljg0NjEzNiw0OC4xODY4MjYxIDE3NC41NzUzNzQsNDYuNjcyMzE2OSAxNzQuNTc1Mzc0LDQ2LjY3MjMxNjkgTDE3NC41NzUzNzQsMzQuOTY5MjkxMSBDMTc0LjU3NTM3NCwzNC4yOTYyOTgzIDE3NS41Mzg0NTIsMzQuMDA1NTEyNSAxNzUuNTM4NDUyLDM0LjAwNTUxMjUgTDE4NS44NTcxNTIsMzQuMDA1NTEyNSBDMTg2Ljg5NDExMywzNC4wMDU1MTI1IDE4Ny4wOTUzOTYsMzUuMjQ0NjU2NCAxODcuMDk1Mzk2LDM1LjI0NDY1NjQgTDE4Ny4wOTUzOTYsNDEuMTY1MDEwNyBDMTg3LjA5NTM5Niw0Mi4xNjM4OTgzIDE4NS44NTcxNTIsNDIuNDA0MTU0NiAxODUuODU3MTUyLDQyLjQwNDE1NDYgTDE4NS44NTcxNTIsNDIuNDA0MTU0NiBaIE0xODQuMzQzNzQzLDM3LjQ0NzU3ODkgQzE4NC4zNDM3NDMsMzcuNDQ3NTc4OSAxODQuMjU3MDY2LDM2Ljc1OTE2NTcgMTgzLjY1NTgzLDM2Ljc1OTE2NTcgTDE3OC4wMTQ5NCwzNi43NTkxNjU3IEMxNzguMDE0OTQsMzYuNzU5MTY1NyAxNzcuMzI3MDI3LDM2Ljk0Mzc5ODEgMTc3LjMyNzAyNywzNy40NDc1Nzg5IEwxNzcuMzI3MDI3LDM4Ljk2MjA4ODIgQzE3Ny4zMjcwMjcsMzguOTYyMDg4MiAxNzcuMzQ2ODM5LDM5LjY1MDUwMTQgMTc4LjAxNDk0LDM5LjY1MDUwMTQgTDE4My42NTU4MywzOS42NTA1MDE0IEMxODMuNjU1ODMsMzkuNjUwNTAxNCAxODQuMzQzNzQzLDM5LjQ4MDQ2MzQgMTg0LjM0Mzc0MywzOC44MjQ0MDU1IEwxODQuMzQzNzQzLDM3LjQ0NzU3ODkgTDE4NC4zNDM3NDMsMzcuNDQ3NTc4OSBaIE0xNzEuNDEwOTcyLDQ4LjE4NjgyNjEgTDE2OS4yMDk2NSw0OC4xODY4MjYxIEMxNjguOTE5MjEzLDQ4LjE4NjgyNjEgMTY4Ljc5NjkwMiw0Ny43NzM3NzgxIDE2OC43OTY5MDIsNDcuNzczNzc4MSBMMTY4Ljc5NjkwMiwzNy40NDc1Nzg5IEMxNjguNzk2OTAyLDM2LjgwNzIxNjkgMTY3Ljk3MTQwNiwzNi42MjE0ODMgMTY3Ljk3MTQwNiwzNi42MjE0ODMgTDE2NS45MDc2NjYsMzYuNjIxNDgzIEMxNjUuMzMxODgyLDM2LjYyMTQ4MyAxNjUuMjE5NzUyLDM3LjQ0NzU3ODkgMTY1LjIxOTc1MiwzNy40NDc1Nzg5IEwxNjUuMjE5NzUyLDQ3Ljc3Mzc3ODEgQzE2NS4yMTk3NTIsNDguMTE2MzMyNiAxNjQuODA3MDA0LDQ4LjE4NjgyNjEgMTY0LjgwNzAwNCw0OC4xODY4MjYxIEwxNjIuNjA1NjgyLDQ4LjE4NjgyNjEgQzE2Mi4yOTk1Niw0OC4xODY4MjYxIDE2Mi4xOTI5MzQsNDcuNzczNzc4MSAxNjIuMTkyOTM0LDQ3Ljc3Mzc3ODEgTDE2Mi4xOTI5MzQsMzcuNDQ3NTc4OSBDMTYyLjE5MjkzNCwzNi43OTI4OTc5IDE2MS4zNjc0MzgsMzYuNjIxNDgzIDE2MS4zNjc0MzgsMzYuNjIxNDgzIEwxNTkuMzAzNjk4LDM2LjYyMTQ4MyBDMTU4LjY3Mzk4MiwzNi42MjE0ODMgMTU4LjYxNTc4NCwzNy40NDc1Nzg5IDE1OC42MTU3ODQsMzcuNDQ3NTc4OSBMMTU4LjYxNTc4NCw0Ny43NzM3NzgxIEMxNTguNjE1Nzg0LDQ4LjIxNTczOTUgMTU4LjIwMzAzNiw0OC4xODY4MjYxIDE1OC4yMDMwMzYsNDguMTg2ODI2MSBMMTU2LjAwMTcxNCw0OC4xODY4MjYxIEMxNTUuNTg5Mzc4LDQ4LjE4NjgyNjEgMTU1LjU4ODk2Niw0Ny43NzM3NzgxIDE1NS41ODg5NjYsNDcuNzczNzc4MSBMMTU1LjU4ODk2NiwzNC42OTM5MjU4IEMxNTUuNTg4OTY2LDMzLjkzNjI1ODIgMTU2LjY4OTYyNywzMy41OTI0NjQ2IDE1Ni42ODk2MjcsMzMuNTkyNDY0NiBMMTcwLjQ0Nzg5NCwzMy41OTI0NjQ2IEMxNzEuNTUyMjcsMzMuNTkyNDY0NiAxNzEuODIzNzIsMzQuOTY5MjkxMSAxNzEuODIzNzIsMzQuOTY5MjkxMSBMMTcxLjgyMzcyLDQ3Ljc3Mzc3ODEgQzE3MS44MjM3Miw0OC4yNDkzMzQgMTcxLjQxMDk3Miw0OC4xODY4MjYxIDE3MS40MTA5NzIsNDguMTg2ODI2MSBMMTcxLjQxMDk3Miw0OC4xODY4MjYxIFogTTE1MS40NjE0ODYsNDIuNDA0MTU0NiBMMTQyLjkzMTM2LDQyLjQwNDE1NDYgTDE0Mi45MzEzNiw0NC40NjkzOTQ0IEMxNDIuOTMxMzYsNDUuMjEzNTY5MSAxNDMuODk0NDM5LDQ1LjQzMzE3MyAxNDMuODk0NDM5LDQ1LjQzMzE3MyBMMTUwLjc3MzU3Miw0NS40MzMxNzMgQzE1MS4yNjMwOTIsNDUuNDMzMTczIDE1MS41OTkwNjgsNDUuODQ2MjIxIDE1MS41OTkwNjgsNDUuODQ2MjIxIEMxNTEuNTk5MDY4LDQ1Ljg0NjIyMSAxNTIuMTk5MjA0LDQ3LjA5NTE0MDMgMTUyLjQyNDU2NCw0Ny42MzYwOTU1IEMxNTIuNjQ5Nzg3LDQ4LjE3NzA1MDYgMTUyLjAxMTgxNiw0OC4xODY4MjYxIDE1Mi4wMTE4MTYsNDguMTg2ODI2MSBMMTQxLjY5MzExNyw0OC4xODY4MjYxIEMxNDAuNDUwNDcsNDguMTg2ODI2MSAxNDAuMTc5NzA3LDQ2LjY3MjMxNjkgMTQwLjE3OTcwNyw0Ni42NzIzMTY5IEwxNDAuMTc5NzA3LDM0Ljk2OTI5MTEgQzE0MC4xNzk3MDcsMzQuMjk2Mjk4MyAxNDEuMTQyNzg2LDM0LjAwNTUxMjUgMTQxLjE0Mjc4NiwzNC4wMDU1MTI1IEwxNTEuNDYxNDg2LDM0LjAwNTUxMjUgQzE1Mi40OTg0NDYsMzQuMDA1NTEyNSAxNTIuNjk5NzMsMzUuMjQ0NjU2NCAxNTIuNjk5NzMsMzUuMjQ0NjU2NCBMMTUyLjY5OTczLDQxLjE2NTAxMDcgQzE1Mi42OTk3Myw0Mi4xNjM4OTgzIDE1MS40NjE0ODYsNDIuNDA0MTU0NiAxNTEuNDYxNDg2LDQyLjQwNDE1NDYgTDE1MS40NjE0ODYsNDIuNDA0MTU0NiBaIE0xNDkuOTQ4MDc2LDM3LjQ0NzU3ODkgQzE0OS45NDgwNzYsMzcuNDQ3NTc4OSAxNDkuODYxMzk5LDM2Ljc1OTE2NTcgMTQ5LjI2MDE2MywzNi43NTkxNjU3IEwxNDMuNjE5Mjc0LDM2Ljc1OTE2NTcgQzE0My42MTkyNzQsMzYuNzU5MTY1NyAxNDIuOTMxMzYsMzYuOTQzNzk4MSAxNDIuOTMxMzYsMzcuNDQ3NTc4OSBMMTQyLjkzMTM2LDM4Ljk2MjA4ODIgQzE0Mi45MzEzNiwzOC45NjIwODgyIDE0Mi45NTExNzIsMzkuNjUwNTAxNCAxNDMuNjE5Mjc0LDM5LjY1MDUwMTQgTDE0OS4yNjAxNjMsMzkuNjUwNTAxNCBDMTQ5LjI2MDE2MywzOS42NTA1MDE0IDE0OS45NDgwNzYsMzkuNDgwNDYzNCAxNDkuOTQ4MDc2LDM4LjgyNDQwNTUgTDE0OS45NDgwNzYsMzcuNDQ3NTc4OSBMMTQ5Ljk0ODA3NiwzNy40NDc1Nzg5IFogTTEzOC4xMTU5NjcsNDguMTg2ODI2MSBMMTMyLjg4NzgyNiw0OC4xODY4MjYxIEMxMzIuODg3ODI2LDQ4LjE4NjgyNjEgMTI5LjA2MTkyNyw0OC4wMDYxODY1IDEyOC43NjAzNDYsNDQuMTk0MDI5MSBDMTI4Ljc0ODIzOSw0MC4yNzkwMjI4IDEyOC43NjAzNDYsMjguMDg1MTU4MyAxMjguNzYwMzQ2LDI4LjA4NTE1ODMgTDEzMS4yMzY4MzQsMjguMDg1MTU4MyBDMTMxLjIzNjgzNCwyOC4wODUxNTgzIDEzMi4wNjIzMywyOC4wNzAxNTA5IDEzMi4wNjIzMywyOC45MTEyNTQzIEwxMzIuMDYyMzMsNDMuMzY3OTMzMSBDMTMyLjA2MjMzLDQzLjM2NzkzMzEgMTMyLjM1MDAxNSw0NC41NjM4NDQ3IDEzMy45ODg0ODcsNDUuMDIwMTI1IEMxMzUuODM5OCw0NS4wMTA3NjI2IDEzNi4xODk4MSw0NS4wMjAxMjUgMTM2LjE4OTgxLDQ1LjAyMDEyNSBDMTM2LjE4OTgxLDQ1LjAyMDEyNSAxMzYuOTA3MzAzLDQ0Ljc5MDE5NSAxMzcuNDI4MDU0LDQ1LjcwODUzODMgQzEzNy45NDg4MDQsNDYuNjI2ODgxNiAxMzguNTI4NzE1LDQ3LjYzNjA5NTUgMTM4LjUyODcxNSw0Ny42MzYwOTU1IEMxMzguNTI4NzE1LDQ3LjYzNjA5NTUgMTM4LjYxMTU0LDQ4LjE4NjgyNjEgMTM4LjExNTk2Nyw0OC4xODY4MjYxIEwxMzguMTE1OTY3LDQ4LjE4NjgyNjEgWiBNMTExLjU2MjUxMyw0Ny4zNjA3MzAyIEwxMTEuNTYyNTEzLDI5LjE4NjYxOTYgQzExMS41NjI1MTMsMjguMzgwNzYzIDExMi4yNTA0MjYsMjguMjIyODQxIDExMi4yNTA0MjYsMjguMjIyODQxIEwxMjUuMTgzMTk3LDI4LjIyMjg0MSBDMTI1LjkwNjQ2OSwyOC4yMjI4NDEgMTI1LjU5NTk0NSwyOS4wNDg5MzY5IDEyNS41OTU5NDUsMjkuMDQ4OTM2OSBDMTI1LjU5NTk0NSwyOS4wNDg5MzY5IDEyNS4xOTI4MjcsMzAuMTY2MDk0IDEyNC45MDgwMzEsMzAuNzAxMTI4OCBDMTI0LjYyMzIzNSwzMS4yMzYxNjM2IDEyNC4wODI1MzUsMzEuMjUxODU5NCAxMjQuMDgyNTM1LDMxLjI1MTg1OTQgTDExNS42ODk5OTMsMzEuMjUxODU5NCBDMTE0LjkwODUyMywzMS4yNTE4NTk0IDExNC44NjQ0OTcsMzEuOTQwMjcyNyAxMTQuODY0NDk3LDMxLjk0MDI3MjcgTDExNC44NjQ0OTcsMzYuNDgzODAwMyBMMTI0LjM1NzcwMSwzNi40ODM4MDAzIEMxMjQuOTE0NjM1LDM2LjQ4MzgwMDMgMTI0LjYzMjg2NiwzNy4xNzIyMTM2IDEyNC42MzI4NjYsMzcuMTcyMjEzNiBDMTI0LjYzMjg2NiwzNy4xNzIyMTM2IDEyMy45MjE4MzksMzguNjg4OTI1OCAxMjMuNjY5Nzg3LDM5LjA5OTc3MDggQzEyMy40MTc3MzYsMzkuNTEwNjE1OSAxMjIuODQ0MjkxLDM5LjUxMjgxODggMTIyLjg0NDI5MSwzOS41MTI4MTg4IEwxMTQuODY0NDk3LDM5LjUxMjgxODggTDExNC44NjQ0OTcsNDQuMzMxNzExNyBDMTE0Ljg2NDQ5Nyw0NC45ODg0NTggMTE1LjU1MjQxLDQ1LjE1NzgwNzcgMTE1LjU1MjQxLDQ1LjE1NzgwNzcgTDEyNC4zNTc3MDEsNDUuMTU3ODA3NyBDMTI0Ljk5NjIyMiw0NS4xNTc4MDc3IDEyNS4xODMxOTcsNDUuNTcwODU1NiAxMjUuMTgzMTk3LDQ1LjU3MDg1NTYgQzEyNS4xODMxOTcsNDUuNTcwODU1NiAxMjYuMDU1MTk2LDQ2LjkzMjM5OTQgMTI2LjQyMTQ0MSw0Ny40OTg0MTI4IEMxMjYuNzg3ODIzLDQ4LjA2NDQyNjIgMTI2LjI4Mzg1OCw0OC4xODY4MjYxIDEyNi4yODM4NTgsNDguMTg2ODI2MSBMMTEyLjM4ODAwOSw0OC4xODY4MjYxIEMxMTEuODE0MTUxLDQ4LjE4NjgyNjEgMTExLjU2MjUxMyw0Ny4zNjA3MzAyIDExMS41NjI1MTMsNDcuMzYwNzMwMiBaIE0xMDMuNDE2NTAyLDQ2LjIxNzU1MTEgQzEwMy40MDcwMDgsNDcuNzk0NTY4MiAxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgMTAyLjU4Nzg0MSw0OC4xNDYzNDc0IEMxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgODguNDUyMDQ3OCw1Ni4zMTQ1MDg3IDg3LjUzMjk5NTYsNTYuODI2Mjc1MSBDODYuNjIyMzM2LDU3LjIxNzE1NjEgODYuMDEzNjcwMyw1Ni44MjYyNzUxIDg2LjAxMzY3MDMsNTYuODI2Mjc1MSBDODYuMDEzNjcwMyw1Ni44MjYyNzUxIDcxLjIyMjU3MDYsNDguMjQ3OTU3MiA3MC42ODI2OTYyLDQ3Ljg3MDg0NDQgQzcwLjE0MjY4NDMsNDcuNDkzNzMxNiA3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTMwMTY0Myw0Ni45MDYzNzc0IEM3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTQ1MDIzMiwyOS45MTk5MTc0IDcwLjEzMDE2NDMsMjkuMTMzMzM2NCBDNzAuMTE1MzA1MywyOC4zNDY2MTc3IDcxLjA5Njk1NzYsMjcuNzU1NTQ2MSA3MS4wOTY5NTc2LDI3Ljc1NTU0NjEgTDg1Ljg3NTUzNzMsMTkuMjEzNDM4NyBDODYuNzg1MzcxNCwxOC43MzMyMDE2IDg3LjY3MTEyODYsMTkuMjEzNDM4NyA4Ny42NzExMjg2LDE5LjIxMzQzODcgQzg3LjY3MTEyODYsMTkuMjEzNDM4NyAxMDAuNzI2NjIzLDI2LjgwMjA5MzcgMTAyLjE3MzQ0MiwyNy42MTc3MjU3IEMxMDMuNTkxNTA3LDI4LjI5MTk1NzcgMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MTY1MDIsMjkuNjg0MzQyNCBDMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MjUzMDcsNDQuNzUxOTE5MiAxMDMuNDE2NTAyLDQ2LjIxNzU1MTEgTDEwMy40MTY1MDIsNDYuMjE3NTUxMSBaIE05Ny41MTYwMTA1LDI5LjE2OTEzMzkgQzk0LjQ5MDAxNzMsMjcuNDI3NDQ4MyA4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODcuMzYxNTg0MiwyMy4yOTcxMDYzIEM4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODYuNjY2MTAzOSwyMi45MjEyMzI2IDg1Ljk1MTc3NDcsMjMuMjk3MTA2MyBMNzQuMzQ4NzQwNiwyOS45ODIxNSBDNzQuMzQ4NzQwNiwyOS45ODIxNSA3My41NzgwMDI1LDMwLjQ0NDkwMTQgNzMuNTg5Njk3LDMxLjA2MDQ4MDUgQzczLjYwMTM5MTUsMzEuNjc2MDU5NyA3My41ODk2OTcsNDQuOTY5ODcwOCA3My41ODk2OTcsNDQuOTY5ODcwOCBDNzMuNTg5Njk3LDQ0Ljk2OTg3MDggNzMuNTk5NDY1NCw0NS40Mjk1OTMyIDc0LjAyMzQ5NTEsNDUuNzI0NjQ3MiBDNzQuNDQ3Mzg3Myw0Ni4wMTk3MDExIDg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni4wNjAxODk4LDUyLjczMzI0NTEgQzg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni41MzgxNTIsNTMuMDM5MTc1OSA4Ny4yNTMwMzE1LDUyLjczMzI0NTEgQzg3Ljk3NDY1MjYsNTIuMzMyNzI2MiA5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuMDczMDMzNSw0NS45NDAyNTgyIEM5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuNzE2MjMyNSw0NS42NjQ4OTI5IDk5LjcyMzY2MTksNDQuNDMwNzA1NiBDOTkuNzI1NzI1Nyw0NC4wNzQ3OTU5IDk5LjcyNjU1MTIsNDIuNjkzMjg4MSA5OS43MjY2ODg3LDQwLjk1NzUyMjkgTDg2LjY2MDA1MDIsNDguODc1MjM5NCBMODYuNjYwMDUwMiw0NS44NDYyMjEgQzg2LjY2MDA1MDIsNDQuNjAyMTIwNSA4Ny42MjMxMjg5LDQzLjc4MDk4MTEgODcuNjIzMTI4OSw0My43ODA5ODExIEw5OS4xODA3NjA3LDM2LjgxNjU3OTMgQzk5LjYxNjg5NzgsMzYuMzYxMTI1MSA5OS43MDY4NzY4LDM1LjYzMTU0NDcgOTkuNzI1NDUwNSwzNS4zNTU2Mjg3IEM5OS43MjUwMzc4LDM0LjA5MDQ2MjcgOTkuNzI0NDg3NCwzMi45ODUyODQxIDk5LjcyNDA3NDcsMzIuMjg1MTY3OCBMODYuNjYwMDUwMiw0MC4yMDEyMzIxIEw4Ni42NjAwNTAyLDM3LjAzNDUzMSBDODYuNjYwMDUwMiwzNS43OTA0MzA1IDg3LjQ4NTU0NjIsMzUuMjQ0NjU2NCA4Ny40ODU1NDYyLDM1LjI0NDY1NjQgTDk3LjUxNjAxMDUsMjkuMTY5MTMzOSBaIiBpZD0iU2hhcGUtQ29weSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
        }],
        productFamily: 'dhft',
        standard: '20',
        industrial: false,
        merchant: false,
        french: false,
        conditions:[
        {
          extreme:'T°C should be [- 35°C; + 85°C] ; RH [0% ; 80%] during maximum 7 month + 1 week (7.25 months)',
          project:'Nova',
          quotation:50,
          recent:'2018-08-08'
         }],
        condition:{
          extremeCondition: '+85ᵒC, RH<5%, Humidity 30 g/m3',
          typicalCondition: '+70ᵒC, RH=11%, Humidity 21 g/m3',
          all:false,
          allData:[{
            typical:'+70ᵒC, RH=11%, Humidity 21 g/m3',
            extreme:'+85ᵒC, RH<5%, Humidity 30 g/m3',
            project:'Nova',
            quotation:123,
            last:'2018-07-07',
          }],
          chooseValue:'',
        },
        lifeAndClimatic:{
          chooseValue:'',
          visibleChoose:false,
          data:[{
            life:'20',
            hours:'70',
            project:'p1,p2',
            quotation:56,
            recent:'2018-04-04'
          }]
        },
        product: {
          productFamilyoption: [{
            value: 'test'
          }],
          years: [{
            value: '20'
          }],
          extremeCondition: [{
            value: '+85ᵒC, RH<5%, Humidity 30 g/m3'
          }],
          typicalCondition: [{
            value: '+70ᵒC, RH=11%, Humidity 21 g/m3'
          }],
          profileCopy:false
        },
        sync: {
          type: 'ha??',
          contact: '',
          pitch: '',
          plugNum: '',
          pluggable: '',
          keying: 'Yes',
          shield: '',
          assembly: ''
        },
        show: false,
        bigpicURL: '',
        formClass: [],
        overview: {},
        templateVisible: false,
        altitude: '',
        conditionDescp:false,
        chemical: {
          chemicalOption: [{
            name: 'Nova'
          }],
          chemicalOptionForm:{
            SPEC008:false,
          },
          chemicalOptionVisible: false
        },
        shake: {
          classOptionVisible: false,
          classOption: [{
            name: 'Industrial Class',
            quotationTimes: '1234',
            recentQuotation: '2018-06-26'
          }, {
            name: 'French Navy Military',
            quotationTimes: '634',
            recentQuotation: '2018-06-06'
          }, {
            name: 'Merchant Navy Class',
            quotationTimes: '34',
            recentQuotation: '2018-04-16'
          }]
        },
        formTemplateTitle: 'New Form',
        formTemplateVisible: false,
        formTemplate: {
          vibrationRef: '3M4(*)according to IEC 60721-3-3',
          vibrationCon: '1g-5 to 150Hz',
          shockRef: '3M4 according to IEC 60721-3-3',
          shockCon: '15g',
          shakeRef: '3M4 according to IEC 60721-3-3',
          shakeCon: '15g'
        },
        altitude:{
          value:'Altitude should not affect the characteristics of novA offer up to 2000 m. Above this altitude, it is necessary to take into account the decrease in the dielectric strength and cooling capacity of air.Some derating has to be applied in consistency with the current catalogue derating tables :- Dielectric resistance voltage (V)- Average insulation level (V)- Maximum utilisation voltage (V)- Average thermal current (A)These values shall be the same as current offer.',
          template: [
            {
              name:'Decrease_2000m_above',
              belong:'Nova',
              recent:'2009-12-04',
              quotation:68
            }
          ],
        }
      }
    },
    methods: {
      picAdd(e) {
        document.getElementById('upload').click();
      },
      handlePreview(file) {
        //处理的是a的点击事件,我取兄弟？？额那也要点击a
        console.log(file);
        this.show = true;
        this.bigpicURL = file.url;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      hide(e) {
        this.show = false;
      },
      handleCheckedChange(val) {
        //这些肯定要从后面拉都不知道有几个怎么判断就先这么写写
        //条件渲染也用不了啊，我又不能确定有几个项
        this.industrial = this.merchant = this.french = false;
        let checkedCount = val.length;
        for (let i = 0; i < checkedCount; i++) {
          if (val[i] == 'Industrial Class') {
            console.log(this);
            this.industrial = true;
            continue;
          } else if (val[i] == 'Merchant Navy Class') {
            this.merchant = true;
            continue;
          } else if (val[i] == 'French Navy Military') {
            this.french = true;
            continue;
          }
        }
      },
      handleCheckChange2(val) {
        this.chemical.chemicalOptionForm.SPEC008=false;
        console.log(val);
        let checkedCount=val.length;
        for(let i=0;i<checkedCount;i++){
          if(val[i]=='Nova'){
          console.log('bb')
            this.chemical.chemicalOptionForm.SPEC008=true;
            continue;
          }
        }
      },
      handleSelectionChange(){},
      conditionDescp1(){console.log("0")},
      handleEdit(a, b) {
        console.log(a, b);
        this.formTemplateVisible = true;
      },
      formTemplateSubmit(){
        console.log('template submit');
        this.formTemplateVisible=false;
      },
      conditionChoose(e){
        console.log("d");
        this.condition.all=true;
      },
      handleClickAdd() {
        this.$prompt('Please input Newname', 'name', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          //还可以匹配正则过滤
        }).then(({value}) => {
          this.$message({
            type:'success',
            message:'successfully'
          });
          this.formTemplateTitle=value;
          this.formTemplateVisible=true;
        }).catch(() => {
          this.$message({
            type:'info',
            message:'cancel'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .sync {
    color: orange;
  }

  .sync:hover {
    cursor: pointer
  }

  .mytable {
    margin: 10px auto;
  }

  .mytable span {
    display: inline-block;
  }

  .overview .el-upload-list {
    padding-left: 25px;
    border-left: 1px solid #fff;
  }

  .overview .el-textarea, .overview .img-upload {
    width: 90%;
  }

  .overview .el-textarea {
    margin-bottom: 20px
  }

  .overview:last-child {
    border-left: 1px solid #ccc;
    height: 100%;
  }

  .overview button {
    margin-bottom: 20px;
  }

  .syncform {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .img-upload {
    margin: 0 auto;
  }

  .el-breadcrumb {
    margin-bottom: 10px
  }

  .imgdetail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2001;
  }

  .imgmask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }
  .img {
    position: relative;
    margin: 0 auto;
    top: 65px;
  }
  .checkedForm table {
    margin: 0 auto
  }

  .checkedForm .form {
    margin: 5px auto
  }
  #profile .el-form-item__label {
    min-width: 170px;
  }

  #profile h5 {
    text-align: left;
  }

  .checkbox-group {
    text-align: left;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .checkbox-group label:first-child {
    margin-left: 30px;
  }

  .button-group {
    text-align: right;
    margin-top: 10px;
  }
  .btnWrapper{margin-top:-20px;margin-bottom:8px}
  .el-table .el-table_1_column_5 i{width:initial!important}
</style>
