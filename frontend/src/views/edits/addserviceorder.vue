<template>
  <div>
    <form class="editForm" onsubmit="return false;">
      <div class="editForm-left">
        
        <label>License Plate</label>
        <br>
        <select
                v-model="serviceorder.model.carID"
                name="carID">
                <option
                    v-for="(data, index) in CAR_DATA"
                    :key="index" :value="data.carID">
                {{ data.licensePlate }}
                </option>
                </select>
              <br><br>
              <label>Service Type</label>
              <br>
              <select
                v-model="serviceorder.model.serviceTypeID"
                name="serviceTypeID">
                <option
                    v-for="(data, index) in TYPE_DATA"
                    :key="index" :value="data.serviceTypeID">
                {{ data.serviceTypeDesc }}
                </option>
                </select>
        <br><br>
        <label>Service Status</label>
        <br>
        <select
                v-model="serviceorder.model.serviceOrderStatusID"
                name="serviceOrderStatusID">
                <option
                    v-for="(data, index) in STATUS_DATA"
                    :key="index" :value="data.serviceOrderStatusID">
                {{ data.serviceOrderStatus }}
                </option>
                </select>
        <br><br>
        <FormulateInput
          type="date"
          label="Date of Service"
          name="serviceOrderDate"
          v-model="serviceorder.model.serviceOrderDate"
        />
        <br />
        <FormulateInput
          type="date"
          label="Estimated Completion of Service"
          name="serviceOrderEstimatedCompletion"
          v-model="serviceorder.model.serviceOrderEstimatedCompletion"
        />
        <br />
        <FormulateInput
          type="text"
          label="Service Comments"
          name="serviceOrderComments"
          v-model="serviceorder.model.serviceOrderComments"
        />
        <br><br>
        <button class="swal2-styled" v-on:click="createServiceOrder">
        Add Service Order to Customer
        </button>
      </div>

      
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'addserviceorder',
  props: ['customerID'],

  data() {
    return {
      STATUS_DATA: [],
      TYPE_DATA: [],
      CAR_DATA: [],
      serviceorder: {
        model: {
          customerID: this.customerID,
          carID: '',
          serviceTypeID: '',
          serviceOrderStatusID: '',
          serviceOrderDate: '',
          serviceOrderEstimatedCompletion: '',
          serviceOrderComments: '',
        },
      },
    }
  },

  methods: {
    loadDropDowns(){
        axios.get('http://localhost:3000/api/servicetypes/find').then((res) =>{
                this.TYPE_DATA = res.data;
            }).catch(() => {
          Swal.fire('Error', 'Something went wrong! with Service type', 'error')
        })

        axios.get('http://localhost:3000/api/serviceorderstatus/find').then((res) =>{
                this.STATUS_DATA = res.data;
            }).catch(() => {
          Swal.fire('Error', 'Something went wrong! with service order status', 'error')
        })

        axios.get('http://localhost:3000/api/car/find/' + this.customerID).then((res) =>{
                this.CAR_DATA = res.data;
                }).catch(() => {
                 Swal.fire('Error', 'Something went wrong! with car', 'error')
                })

    },

    createServiceOrder() {
      axios.post(
        'http://localhost:3000/api/serviceorders/addnew',
        this.serviceorder.model
      )
      Swal.fire({
        title: 'Done!',
        text: 'The service order has been added!',
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
