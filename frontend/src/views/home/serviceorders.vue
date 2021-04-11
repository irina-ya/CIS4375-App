<template>

  <div>
   
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Service Orders List</span>
      </div>
      <div class="tableHeading-right">
        
        
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
          initialSortBy: {field: 'serviceOrderID', type: 'asc'}
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
        @on-row-dblclick="editServiceOrder"
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
data() {
  return {
    DB_DATA: [],
     dataFields: [{
        label: 'ID',
        field: 'serviceOrderID',
        type: 'number'
      },{
        label: 'Car ID',
        field: 'carID'
      },{
        label: 'Customer ID',
        field: 'customerID'
      },{
        label: 'Service Status',
        field: 'serviceOrderStatus'
      },{
        label: 'Date of Service',
        field: 'serviceOrderDate'
      },{
        label: 'Estimated Completion of Service',
        field: 'serviceOrderEstimatedCompletion'
      },{
        label: 'Service Comments',
        field: 'serviceOrderComments'
      }]
  };
},
components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    },
    loadData(){
      axios.get(`http://localhost:3000/api/serviceorders/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          this.DB_DATA.forEach(obj => this.renameKey(obj, 'Customer.customerID','customerID'));
          this.DB_DATA.forEach(obj => this.renameKey(obj, 'Service_Order_Status.serviceOrderStatus','serviceOrderStatus'));
          }
          ).catch(() => {
          Swal.fire('Error', 'Something went wrong (Loading service order List)', 'error')
        })},
    editServiceOrder(params){
      this.$router.push({
        name: '/serviceorders/editserviceorder',
        params: {
          serviceOrderID: params.row.serviceOrderID,
          customerID: params.row.customerID
        }
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