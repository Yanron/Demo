<template>
    <div class="wrapper">
      <div class="part">
        <h4>List of signals</h4>
      </div>
      <div class="part">
        <h4>Electric performances</h4>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" class="electric" style="text-align: left">
            <el-form ref="form" :model="electric" label-width="170px">
              <h5>Connection description</h5>
              <el-form-item label="Connection application">
                <el-select v-model="electric.connectionApplication" filterable size="mini">
                  <el-option v-for="item in electric.options" :key="item.value" :label="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Connection Assembly type">
                <el-radio v-model="electric.radio" label="1">removable</el-radio>
                <el-radio v-model="electric.radio" label="2">permanent</el-radio>
              </el-form-item>
              <el-form-item label="Shielding feature">
                <el-input v-model="electric.shield" size="mini"></el-input>
              </el-form-item>

              <h5>Circuit</h5>
              <el-form-item label="Number of contacts">
                <el-input v-model="electric.contacts" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="Direction">
                <el-input v-model="electric.direction" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="Connection Pitch">
                <el-input v-model="electric.connection" size="mini">
                  <template slot="append">mm</template>
                </el-input>
              </el-form-item>
              <el-form-item label="Board Pitch">
                <el-input v-model="electric.board" size="mini">
                  <template slot="append">mm</template>
                </el-input>
              </el-form-item>

              <h5>Dimension</h5>
              <el-form-item label="Height">
                <el-input v-model="electric.height" size="mini"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="width">
                <el-input v-model="electric.width" size="mini"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="depth">
                <el-input v-model="electric.depth" size="mini">
                  <template slot="append">mm</template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :xs="24" :sm="12" class="electric" style="text-align: left">
            <el-form ref="form" label-width="180px" :model="electric">
              <el-form-item label="Connector gender">
                <el-select v-model="electric.connectionGender" filterable size="mini">
                  <el-option v-for="item in electric.gender" :key="item.value" :label="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Direction">
                <el-select v-model="electric.direction" allow-create filterable size="mini">
                  <el-option v-for="item in electric.directions" :key="item.value" :label="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <h5>Wires</h5>
              <el-form-item label="Flex cable(Thickness)">
                <el-input v-model="electric.height" size="mini"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="Guage">
                <el-input size="mini" v-model="electric.guage"></el-input>
              </el-form-item>
              <el-form-item label="Type">
                <el-radio v-model="electric.radio2" label="1">Stranded</el-radio>
                <el-radio v-model="electric.radio2" label="2">Solid</el-radio>
              </el-form-item>

              <h5>Electrical parameters</h5>
              <el-form-item label="Withstand Voltage">
                <el-input v-model="electric.WithstandVoltage" size="mini"><template slot="append">V</template></el-input>
              </el-form-item>
              <el-form-item label="Minimum Voltage">
                <el-input v-model="electric.MinimumVoltage" size="mini"><template slot="append">V</template></el-input>
              </el-form-item>
              <el-form-item label="Rated Current">
                <el-input size="mini" v-model="electric.RatedCurrent"><template slot="append">A</template></el-input></el-form-item>
              <el-form-item label="Minimum Current" v-model="electric.MinimumCurrent"><el-input size="mini"><template slot="append">A</template></el-input></el-form-item>
              <el-form-item label="Rated Voltage" v-model="electric.RatedVoltage"><el-input size="mini"><template slot="append">V</template></el-input></el-form-item>
            </el-form>

          </el-col>
        </el-row>
      </div>
      <div class="part">
        <h4>Mechanical performances</h4>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" class="mechanical" style="text-align: left">
            <el-form ref="form" :model="electric" label-width="180px">
              <h5>Connection description</h5>
              <el-form-item label="Locking feature">
                <el-radio v-model="mechanical.feature" label="1">Yes</el-radio>
                <el-radio v-model="mechanical.feature" label="2">No</el-radio>
              </el-form-item>
              <el-form-item label="Keying feature">
                <el-radio v-model="mechanical.feature2" label="1">Yes</el-radio>
                <el-radio v-model="mechanical.feature2" label="2">No</el-radio>
              </el-form-item>
              <h5>Connector Housing</h5>
              <el-form-item label="color">
                <el-input v-model="mechanical.color" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="Flammability">
                <el-input v-model="mechanical.Flammability" size="mini"></el-input>
              </el-form-item>
              <h5>Environmental constraints</h5>
              <el-form-item label="Flex cable(Thickness)">
                <el-input v-model="electric.height" size="mini"><template slot="append">mm</template></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :xs="24" :sm="12" class="mechanical" style="text-align: left">
            <el-form ref="form" label-width="180px" :model="mechanical">
              <h5>Electrical parameters</h5>
              <p>Ambiant temperature：</p>
              <el-form-item label="Max">
                <el-input v-model="mechanical.ambiantMax" size="mini"><template slot="append">V</template></el-input>
              </el-form-item>
              <el-form-item label="Min">
                <el-input v-model="mechanical.ambiantMin" size="mini"><template slot="append">V</template></el-input>
              </el-form-item>
              <p>Storage temoerature:</p>
              <el-form-item label="Max">
                <el-input size="mini" v-model="mechanical.storageMax"><template slot="append">A</template></el-input></el-form-item>
              <el-form-item label="Min" v-model="mechanical.storageMin"><el-input size="mini"><template slot="append">A</template></el-input></el-form-item>
              <el-form-item label="Operating Relative Humidity" v-model="electric.RatedVoltage"><el-input size="mini"><template slot="append">%</template></el-input></el-form-item>
            </el-form>

          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "connector",
        data(){
          return {
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
            }
          }
        }
    }
</script>

<style scoped>

</style>
