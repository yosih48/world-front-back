<template>
 

  <v-main
  class="mt-13">
<v-row class=" d-flex justify-space-around button-wrapper mx-auto">
      <v-btn-toggle
        v-model="text"
        tile
        color="deep-purple accent-3"
        group
      >
    

        <v-btn value="true"
        :disabled="text === 'true'">
         הטבלה שלנו
        </v-btn>

        <v-btn value="false"
        :disabled="text === 'false'">
          התוצאות שלנו
        </v-btn>

   
      </v-btn-toggle>
<!-- <v-btn @click="showTable = !showTable ">הטבלה שלנו</v-btn> -->
<!-- <v-btn @click="showTable = !showTable"
:disabled="showTable === true">הטבלה שלנו</v-btn> -->
<!-- <v-spacer></v-spacer> -->
<!-- <v-btn @click="showResultsTable = !showResultsTable"
:disabled="showResultsTable === true">התוצאות שלנו</v-btn> -->
</v-row>

<tables v-show="text ==='true'"></tables>
<carousel v-show="text === 'false'"></carousel>
  </v-main>
 

</template>

<script>

import tables from "../components/table";
import carousel from "../components/carousel";

export default {
  name: "Tables",



  data() {
    return {
showTable: true,
showResultsTable: false,
text: "true",
    };
  },



  components: {
    tables,
    carousel
    
  },
methods:{
  tableButton(){
    this.showTable = false
  }
}


};
</script>
<style scoped>
.button-wrapper{
  /* width: 700px; */
}
</style>