<template>

  <div>
   
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Customer List</span>
      </div>
      <div class="tableHeading-right">
        <button v-on:click="addNewCustomer">Add New Customer</button>
        
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
          initialSortBy: {field: 'customerID', type: 'asc'}
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
        @on-row-dblclick="editCustomer"
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
name: 'customers',
data() {
  return {
    DB_DATA: [],
     dataFields: [{
        label: 'ID',
        field: 'customerID',
        type: 'number'
      },{
        label: 'First Name',
        field: 'customerFirstName'
      },{
        label: 'Last Name',
        field: 'customerLastName'
      },{
        label: 'Email',
        field: 'customerEmail'
      },{
        label: 'Phone',
        field: 'customerPhone'
      }]
  };
},
components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    loadData(){
      axios.get(`http://localhost:3000/api/customers/find`)
        .then((response) => {
          this.DB_DATA = response.data}
          ).catch(() => {
          Swal.fire('Error', 'Something went wrong (Loading Customer List)', 'error')
        })},
    editCustomer(params){
      this.$router.push({
        name: '/customers/editcustomer',
        params: {
          customerID: params.row.customerID
        }
      })
    },
    addNewCustomer(){
      this.$router.push({
        name: '/customers/editcustomer',
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
