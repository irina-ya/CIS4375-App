<template>
    <div>
        <form class="editForm">
            <div class="editForm-left">
                <FormulateInput
                    type="text"
                    label="First Name"
                    v-model="customer.model.customerFirstName"
                />
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
            axios.get('http://localhost:3000/api/customers/find/' + this.customerID).then((res) =>{
                this.DB_DATA = res.data
                this.customer.model.customerFirstName = res.data.customerFirstName
            })
        }
    },

    beforeMount(){
        if (this.customerID !== undefined){
            this.isNew = false
            this.populateCustomerData()
        }
    }
}

</script>