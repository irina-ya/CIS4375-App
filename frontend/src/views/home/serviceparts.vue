<template>

  <div>
   
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Service Parts List</span>
      </div>
      <div class="tableHeading-right">
        <button v-on:click="addNewServicePart">Add New Service Part</button>
        
      </div>
  </div>
      <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        :columns="dataFields"
        :rows="DB_DATA"
        :row-style-class="'rowStyle'"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'servicePartID', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [3, 5, 10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
        @on-row-dblclick="editServicePart"
      />
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
name: 'serviceparts',
data() {
  return {
    DB_DATA: [],
    myAPI: `http://localhost:3000/api/serviceparts/find`,
     dataFields: [{
        label: 'ID',
        field: 'servicePartID',
        type: 'number'
      },{
        label: 'Part Info',
        field: 'partDescription'
      },{
        label: 'Retail Price',
        field: 'partSellPrice',
        type: 'number'
      },{
        label: 'Wholesale Price',
        field: 'partPurchasePrice',
        type: 'number'
      }]
  };
},
components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    loadData(){
      axios.get(`http://localhost:3000/api/serviceparts/find`)
        .then((response) => {
          this.DB_DATA = response.data}
          ).catch(() => {
          Swal.fire('Error', 'Something went wrong (Loading Service Part List)', 'error')
        })},
    editServicePart(params){
      this.$router.push({
        name: 'editservicepart',
        params: {
          servicePartID: params.row.servicePartID
        }
      })
    },
    addNewServicePart(){
      this.$router.push({
        name: 'editservicepart',
      })
    }
  },
  beforeMount() {
      this.loadData();
  }

}


</script>

<style scoped>

button {
  background-color: #e7e7e7;
  color: rgb(12, 12, 12);
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

</style>
