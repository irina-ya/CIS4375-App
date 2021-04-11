<template>
    <div>
        <form class="editForm" onsubmit="return false;">
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
            </div>
            <div class="editForm-right">       
                <FormulateInput
                    type="text"
                    label="City"
                    name="customerCity"
                    v-model="customer.model.customerCity"
                /> <br>

            <label>State</label>
            <br>
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
            <br><br>

            <FormulateInput
                    type="text"
                    label="Zip"
                    name="customerZip"
                    v-model="customer.model.customerZip"
                /> <br>

            <label>Status</label>
            <br>
            <select
                v-model="customer.model.customerStatusID"
                name="customerStatusID"
                >
              <option
                v-for="(data, index) in STATUS_DATA"
                :key="index" :value="data.customerStatusID">
               {{ data.customerStatusDesc }}
              </option>
            </select>

            <br><br><br>
            <div class="editFooter">
                <button v-if="isNew" class="swal2-styled" v-on:click="addNewCustomer">Add New</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="deleteCustomer">Delete</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="updateCustomer">Update</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="addNewCar">Add Car</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="addNewServiceOrder">Create Service Order</button>
            </div>

            </div>
            
        </form>

    </div>
</template>

<script>
import axios from 'axios'
import config from '../../config'
import Swal from 'sweetalert2';


export default {
    name: 'editcustomer',
    props: ["customerID"],

    data(){
        return{
            isNew: 'true',
            DB_DATA: [],
            STATE_DATA: [],
            STATUS_DATA: [],
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
                    customerEmail: '',
                    customerStatusID: ''
                }
            }
        }
    },

    methods: {
        populateCustomerData(){
            axios.get(`${config.api}/api/customers/find/` + this.customerID)
                .then((res) =>{
                    this.DB_DATA = res.data;
                    this.customer.model.customerFirstName = this.DB_DATA[0].customerFirstName,
                    this.customer.model.customerLastName = this.DB_DATA[0].customerLastName,
                    this.customer.model.customerEmail = this.DB_DATA[0].customerEmail,
                    this.customer.model.customerPhone = this.DB_DATA[0].customerPhone,
                    this.customer.model.customerCity = this.DB_DATA[0].customerCity,
                    this.customer.model.customerAddress1 = this.DB_DATA[0].customerAddress1,
                    this.customer.model.customerAddress2 = this.DB_DATA[0].customerAddress2,
                    this.customer.model.customerStatusID = this.DB_DATA[0].customerStatusID,
                    this.customer.model.stateID = this.DB_DATA[0].stateID
            })
        },

        loadDropDowns(){
            axios.get('http://localhost:3000/api/states/find').then((res) =>{
                this.STATE_DATA = res.data;
            }).catch(() => {
          Swal.fire('Error', 'Something went wrong!', 'error')
        })

        axios.get('http://localhost:3000/api/customerstatus/find').then((res) =>{
                this.STATUS_DATA = res.data;
            }).catch(() => {
          Swal.fire('Error', 'Something went wrong!', 'error')
        })

        },

        updateCustomer(){
            const customerID = this.customerID
            
            axios.put(`http://localhost:3000/api/customers/update/` + customerID, this.customer.model)
                .then((res) => console.log('im2'))

                Swal.fire('Done!', 'The customer has been updated!', 'success'
                )
                this.$router.push('/customers')

            },

        addNewCustomer(){
            axios.post('http://localhost:3000/api/customers/addnew', this.customer.model)
                Swal.fire({
                    title: 'Done!',
                    text: 'The customer has been added!',
                    icon: 'success'
                })
        },

        deleteCustomer(){
        const customerID = this.customerID
        axios.delete(`http://localhost:3000/api/customers/delete/` + customerID)

            Swal.fire(
                'Done!',
                'The customer has been deleted.',
                'success'
            )
          
            
        },
        
        addNewCar(){
            
            const customer_id = this.customerID
            this.$router.push({
                name: 'addcar',
                params: {
                    customerID: customer_id
                }
            })
        },
        addNewServiceOrder(){
            
            const customerID = this.customerID
            this.$router.push({
                name: 'addserviceorder',
                params: {
                    customerID: customerID
                }
            })
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

</style>
