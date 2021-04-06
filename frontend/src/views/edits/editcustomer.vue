<template>
    <div>
        <form class="editForm">
            <div class="editForm-left">
                <FormulateInput
                    type="text"
                    label="First Name"
                    name="customerFirstName"
                    v-model="customer.model.customerFirstName"
                />
                <br>
                <FormulateInput
                    type="text"
                    label="Last Name"
                    name="customerLastName"
                    v-model="customer.model.customerLastName"
                />
                <br>
                <FormulateInput
                    type="email"
                    label="E-mail"
                    name="customerEmail"
                    v-model="customer.model.customerEmail"
                />
                <br>
                <FormulateInput
                    type="text"
                    label="Phone Number"
                    name="customerPhone"
                    v-model="customer.model.customerPhone"
                /> <br>

                <button>Add Service Order</button>

            </div>
            <div class="editForm-right">
                <FormulateInput
                    type="text"
                    label="Address 1"
                    name="customerAddress1"
                    v-model="customer.model.customerAddress1"
                />
                <br>
                <FormulateInput
                    type="text"
                    label="Address 2"
                    name="customerAddress2"
                    v-model="customer.model.customerAddress2"
                />
                <br>
                <FormulateInput
                    type="text"
                    label="City"
                    name="customerCity"
                    v-model="customer.model.customerCity"
                /> <br>

            <label>State</label>
            <select
                v-model="customer.model.stateID"
                name="stateID"
                >
              <option
                v-for="(data, index) in STATE_DATA"
                :key="index" :value="data.stateID">
               {{ data.stateName }}
              </option>
            </select>

            <br>
            <button>Update User</button>
            </div>
        </form>

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
    name: 'editcustomer',
    props: ["customerID"],

    data(){
        return{
            isNew: 'true',
            DB_DATA: [],
            STATUS_DATA: [],
            STATE_DATA: [],
            customer:{
                model: {
                    customerStatusID: '',
                    customerFirstName: '',
                    customerLastName: '',
                    stateID: '',
                    customerCity: '',
                    customerZip: '',
                    customerAddress1: '',
                    customerAddress2: '',
                    customerPhone: '',
                    customerEmail: ''
                }
            }
        }
    },

    methods: {
        populateCustomerData(){
            axios.get('http://localhost:3000/api/customers/find/' + this.customerID)
                .then((res) =>{
                    this.DB_DATA = res.data;
                    this.customer.model.customerFirstName = res.data.customerFirstName,
                    this.customer.model.customerLastName = res.data.customerLastName,
                    this.customer.model.customerEmail = res.data.customerEmail,
                    this.customer.model.customerPhone = res.data.customerPhone,
                    this.customer.model.customerCity = res.data.customerCity,
                    this.customer.model.customerAddress1 = res.data.customerAddress1,
                    this.customer.model.customerAddress2 = res.data.customerAddress2,
                    this.customer.model.stateID = res.data.stateID
            })
        },

        loadDropDowns(){
            axios.get('http://localhost:3000/api/states/find').then((res) =>{
                this.STATE_DATA = res.data;
            }).catch(() => {
          Swal.fire('Error', 'Something went wrong!', 'error')
        })
        },

        renameKey( obj, oldKey, newKey ) {
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
         }
    },

    beforeMount(){
        this.loadDropDowns()
        if (this.customerID !== undefined){
            this.isNew = false
            this.populateCustomerData()
        }
    }
}

</script>
<style scoped>
button {
  background-color: #b9b9b9;
  color: rgb(12, 12, 12);
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
}
</style>
