<template>
  <div>
    <form class="editForm" onsubmit="return false;">
      <div class="editForm-left">
        <label>Car</label>
        <br />
        <select v-model="svcorder.model.carID" name="carID">
          <option
            v-for="(data, index) in CAR_DATA"
            :key="index"
            :value="data.carID"
          >
            {{ data.licensePlate }}
          </option>
        </select>
        <br /><br />

        <label>Service Status</label>
        <br />
        <select
          v-model="svcorder.model.serviceOrderStatusID"
          name="serviceOrderStatusID"
        >
          <option
            v-for="(data, index) in STATUS_DATA"
            :key="index"
            :value="data.serviceOrderStatusID"
          >
            {{ data.serviceOrderStatus }}
          </option>
        </select>

        <br /><br />
        <FormulateInput
          type="text"
          label="Date of Service"
          name="serviceOrderDate"
          v-model="svcorder.model.serviceOrderDate"
        />
        <br />
        <FormulateInput
          type="text"
          label="Estimated Completion of Service"
          name="serviceOrderEstimatedCompletion"
          v-model="svcorder.model.serviceOrderEstimatedCompletion"
        />
        <br />
        <FormulateInput
          type="text"
          label="Service Comments"
          name="serviceOrderComments"
          v-model="svcorder.model.serviceOrderComments"
        />
        <button
          v-if="!isNew"
          class="swal2-styled"
          v-on:click="deleteServiceOrder"
        >
          Delete
        </button>
        <button
          v-if="!isNew"
          class="swal2-styled"
          v-on:click="updateServiceOrder"
        >
          Update
        </button>
        <br />
        <button class="swal2-styled" v-on:click="addNewServiceOrderLine">
          Add Service Order Line Item
        </button>
      </div>
      <br /><br /><br />
      <div class="editForm-right">
        <div slot="table-actions"></div>

        <vue-good-table
          :columns="dataFields"
          :rows="SERVICE_LINE"
          :row-style-class="'rowStyle'"
          :search-options="{
            enabled: true,
            skipDiacritics: true,
            placeholder: 'Search this table',
          }"
          :sort-options="{
            enabled: true,
            initialSortBy: { field: 'serviceTypeDesc', type: 'asc' },
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
          @on-row-dblclick="editServiceOrderLine"
        />
        <br />
        <p>Order Total: ${{ this.invoice_total }}</p>
        <br />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import Swal from 'sweetalert2'

export default {
  name: 'editserviceorder',
  props: ['serviceOrderID', 'customerID'],

  data() {
    return {
      isNew: 'true',
      invoice_total: 0,
      DB_DATA: [],
      STATUS_DATA: [],
      TYPE_DATA: [],
      CAR_DATA: [],
      SERVICE_LINE: [],
      svcorder: {
        model: {
          carID: '',
          serviceOrderStatusID: '',
          serviceOrderDate: '',
          serviceOrderEstimatedCompletion: '',
          serviceOrderComments: '',
        },
      },
      dataFields: [
        {
          label: 'ID',
          field: 'serviceOrderLineID',
        },
        {
          label: 'Service Type',
          field: 'serviceTypeDesc',
        },
        {
          label: 'Service Part',
          field: 'partDescription',
        },
        {
          label: 'Service Part Cost',
          field: 'partSellPrice',
        },
        {
          label: 'Labor Cost',
          field: 'serviceLaborCost',
        },
        {
          label: 'Labor Hours',
          field: 'serviceLaborHours',
        },
        {
          label: 'Service Line Cost',
          field: 'serviceOrderLineCost',
          type: 'number',
        },
        {
          label: 'Status',
          field: 'serviceOrderLineStatus',
        },
      ],
    }
  },
  components: {
    'vue-good-table': VueGoodTable,
  },
  methods: {
    populateServiceOrderData() {
      axios
        .get(
          'http://localhost:3000/api/serviceorders/find/' + this.serviceOrderID,
        )
        .then(res => {
          this.DB_DATA = res.data;
            (this.svcorder.model.carID = this.DB_DATA[0].carID),
            (this.svcorder.model.serviceTypeID = this.DB_DATA[0].serviceTypeID),
            (this.svcorder.model.serviceOrderStatusID = this.DB_DATA[0].serviceOrderStatusID),
            (this.svcorder.model.serviceOrderDate = this.DB_DATA[0].serviceOrderDate),
            (this.svcorder.model.serviceOrderEstimatedCompletion = this.DB_DATA[0].serviceOrderEstimatedCompletion),
            (this.svcorder.model.serviceOrderComments = this.DB_DATA[0].serviceOrderComments)
        })
    },

    loadServiceLine() {
      axios
        .get(
          `http://localhost:3000/api/serviceorderline/find/` +
            this.serviceOrderID,
        )
        .then(response => {
          this.SERVICE_LINE = response.data
          this.SERVICE_LINE.forEach(obj =>
            this.renameKey(
              obj,
              'Service_Type.serviceTypeDesc',
              'serviceTypeDesc',
            ),
          )
          this.SERVICE_LINE.forEach(obj =>
            this.renameKey(
              obj,
              'Service_Type.serviceLaborCost',
              'serviceLaborCost',
            ),
          )
          this.SERVICE_LINE.forEach(obj =>
            this.renameKey(
              obj,
              'Service_Type.serviceLaborHours',
              'serviceLaborHours',
            ),
          )
          this.SERVICE_LINE.forEach(obj =>
            this.renameKey(
              obj,
              'Service_Order_Line_Status.serviceOrderLineStatus',
              'serviceOrderLineStatus',
            ),
          )
          this.SERVICE_LINE.forEach(obj =>
            this.renameKey(
              obj,
              'Service_Part.partDescription',
              'partDescription',
            ),
          )
          this.SERVICE_LINE.forEach(obj =>
            this.renameKey(obj, 'Service_Part.partSellPrice', 'partSellPrice'),
          )

          //calculate invoice total
          var total = this.SERVICE_LINE.map(
            cost => cost.serviceOrderLineCost,
          ).reduce((x, cost) => cost + x)

          this.invoice_total = total
        })
    },

    loadDropDowns() {
      axios
        .get('http://localhost:3000/api/servicetypes/find')
        .then(res => {
          this.TYPE_DATA = res.data
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong! with Service type', 'error')
        })

      axios
        .get('http://localhost:3000/api/serviceorderstatus/find')
        .then(res => {
          this.STATUS_DATA = res.data
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong! with service order status',
            'error',
          )
        })

      axios
        .get('http://localhost:3000/api/car/find/' + this.customerID)
        .then(res => {
          this.CAR_DATA = res.data
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong! with car', 'error')
        })
    },

    renameKey(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey]
      delete obj[oldKey]
    },
    updateServiceOrder() {
      const serviceOrderID = this.serviceOrderID
      axios.put(
        `http://localhost:3000/api/serviceorders/update/` + serviceOrderID,
        this.svcorder.model,
      )

      Swal.fire({
        title: 'Done!',
        text: 'The service order has been updated!',
        icon: 'success',
      })
      this.$router.push('/serviceorders')
    },
    deleteServiceOrder() {
      const serviceOrderID = this.serviceOrderID
      axios.delete(
        `http://localhost:3000/api/serviceorders/delete/` + serviceOrderID,
      )
      Swal.fire('Done!', 'The service order has been deleted.', 'success')
      this.$router.push('/serviceorders/') 
    },
    editServiceOrderLine(params) {
      this.$router.push({
        name: 'editserviceorderline',
        params: {
          serviceOrderLineID: params.row.serviceOrderLineID,
          serviceOrderID: this.serviceOrderID
        },
      })
    },
    addNewServiceOrderLine() {
      this.$router.push({
        name: 'addserviceorderline',
        params: {
          serviceOrderID: this.serviceOrderID,
        },
      })
    }
  },

  beforeMount() {
    this.loadDropDowns()
    if (this.serviceOrderID !== undefined) {
      this.isNew = false
      this.populateServiceOrderData()
      this.loadServiceLine()
    }
  },
}
</script>
<style scoped>
p {
  font-size: 1em;
  padding-left: 65%;
}
</style>
