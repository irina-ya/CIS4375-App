<template>
  <div>
    <form class="editForm" onsubmit="return false;">
      <div class="editForm-left">
        <br />
        <label>Service Type</label>
        <br />
        <select v-model="svcorderline.model.serviceTypeID" name="serviceTypeID">
          <option
            v-for="(data, index) in TYPE_DATA"
            :key="index"
            :value="data.serviceTypeID"
          >
            {{ data.serviceTypeDesc }}
          </option>
        </select>
        <br />
        <label>Service Part</label>
        <br />
        <select v-model="svcorderline.model.servicePartID" name="servicePartID">
          <option
            v-for="(data, index) in PART_DATA"
            :key="index"
            :value="data.servicePartID"
          >
            {{ data.partDescription }}
          </option>
        </select>
        <br />
        <FormulateInput
          type="number"
          label="Service Part Cost"
          name="partSellPrice"
          v-model="svcorderline.model.serviceOrderDate"
        />
        <br />
        <FormulateInput
          type="text"
          label="Labor Cost"
          name="serviceLaborCost"
          v-model="svcorderline.model.serviceOrderEstimatedCompletion"
        />
        <br />
        <FormulateInput
          type="text"
          label="Labor Hours"
          name="serviceLaborHours"
          v-model="svcorderline.model.serviceOrderComments"
        />
        <br />
        <FormulateInput
          type="text"
          label="Service Line Cost"
          name="serviceOrderLineCost"
          v-model="svcorderline.model.serviceOrderLineCost"
        />
        <br />
        <FormulateInput
          type="text"
          label="Service Order Line Status"
          name="serviceOrderLineStatus"
          v-model="svcorderline.model.serviceOrderLineStatusID"
        />
      </div>

      <button class="swal2-styled" v-on:click="createOrderLine">
        Add Order Line to Service Order
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'addserviceorderline',
  props: ['serviceOrderID'],

  data() {
    return {
      DB_DATA: [],
      PART_DATA: [],
      TYPE_DATA: [],
      svcorderline: {
        model: {
          serviceOrderID: this.serviceOrderID,
          serviceTypeID: '',
          servicePartID: '',
          serviceOrderLineStatusID: '',
          serviceOrderLineCost: '',
        },
      },
    }
  },

  methods: {
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
        .get('http://localhost:3000/api/serviceparts/find')
        .then(res => {
          console.log(JSON.stringify(res.data))
          this.PART_DATA = res.data
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong! with service parts',
            'error',
          )
        })
    },

    createOrderLine() {
      axios.post(
        'http://localhost:3000/api/serviceorderline/addnew',
        this.svcorderline.model,
      )
      Swal.fire({
        title: 'Done!',
        text: 'The service order line has been added!',
        icon: 'success',
      })
    },
  },

  beforeMount() {
    this.loadDropDowns()
  },
}
</script>

<style scoped></style>
