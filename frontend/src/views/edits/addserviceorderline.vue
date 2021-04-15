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
        <br><br>



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
        <br><br>
            <FormulateInput
              type="text"
              label="Service Line Cost"
              name="serviceOrderLineCost"
              v-model="svcorderline.model.serviceOrderLineCost"
        />
        <br>
        <label>Service Status</label>
        <br>
        <select
          v-model="svcorderline.model.serviceOrderLineStatusID"
          name="serviceOrderStatusID"
        >
          <option
            v-for="(data, index) in STATUS_DATA"
            :key="index"
            :value="data.serviceOrderLineStatusID"
          >
            {{ data.serviceOrderLineStatus }}
          </option>
        </select>
        <br><br>
        <button class="swal2-styled" v-on:click="createOrderLine">
        Add Order Line to Service Order
      </button>
      </div>

      
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
      STATUS_DATA: [],
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
          this.PART_DATA = res.data
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong! with service parts',
            'error',
          )
        })

      axios
        .get('http://localhost:3000/api/serviceorderlinestatus/find')
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
    },

    createOrderLine() {
      axios.post(
        'http://localhost:3000/api/serviceorderline/addnew', this.svcorderline.model)
      Swal.fire({
        title: 'Done!',
        text: 'The service order line has been added!',
        icon: 'success',
      })
      this.router.push('/serviceorders')
    },
  },

  beforeMount() {
    this.loadDropDowns()
  },
}
</script>

<style scoped></style>
