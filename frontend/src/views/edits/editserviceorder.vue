<template>
    <div>
        <form class="editForm" onsubmit="return false;">
            <div class="editForm-left">
                <FormulateInput
                    type="text"
                    label="Car ID"
                    name="carID"
                    v-model="svcorder.model.carID"
                />
            <br>

            <label>Service Type</label>
            <br>
            <select
                v-model="svcorder.model.serviceTypeID"
                name="serviceTypeID"
                >
              <option
                v-for="(data, index) in TYPE_DATA"
                :key="index" :value="data.serviceTypeID">
               {{ data.serviceTypeDesc }}
              </option>
            </select>

            <br>

            <label>Service Status</label>
            <br>
            <select
                v-model="svcorder.model.serviceOrderStatusID"
                name="serviceOrderStatusID"
                >
              <option
                v-for="(data, index) in STATUS_DATA"
                :key="index" :value="data.serviceOrderStatusID">
               {{ data.serviceOrderStatus }}
              </option>
            </select>

            <br>
                <FormulateInput
                    type="text"
                    label="Date of Service"
                    name="serviceOrderDate"
                    v-model="svcorder.model.serviceOrderDate"
                />
            <br>
                <FormulateInput
                    type="text"
                    label="Estimated Completion of Service"
                    name="serviceOrderEstimatedCompletion"
                    v-model="svcorder.model.serviceOrderEstimatedCompletion"
                />
            <br>
                <FormulateInput
                    type="text"
                    label="Service Comments"
                    name="serviceOrderComments"
                    v-model="svcorder.model.serviceOrderComments"
                />
            </div>
            <br><br><br>
            <div class="editForm-right"> 
            <div class="editFooter">
                <button v-if="!isNew" class="swal2-styled" v-on:click="deleteServiceOrder">Delete</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="updateServiceOrder">Update</button>
            </div>

            </div>
            
        </form>

    </div>
</template>

<script>
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';


export default {
    name: 'editserviceorder',
    props: ["serviceOrderID"],

    data(){
        return{
            isNew: 'true',
            DB_DATA: [],
            STATUS_DATA: [],
            TYPE_DATA: [],
            svcorder:{
                model: {
                    carID: '',
                    serviceTypeID: '',
                    serviceOrderStatusID: '',
                    serviceOrderDate: '',
                    serviceOrderEstimatedCompletion: '',
                    serviceOrderComments: ''
                }
            }
        }
    },

    methods: {
        populateServiceOrderData(){
            axios.get('http://localhost:3000/api/serviceorders/find/' + this.serviceOrderID)
                .then((res) =>{
                    this.DB_DATA = res.data;
                    this.svcorder.model.carID = res.data.carID,
                    this.svcorder.model.serviceTypeID = res.data.serviceTypeID,
                    this.svcorder.model.serviceOrderStatusID = res.data.serviceOrderStatusID,
                    this.svcorder.model.serviceOrderDate = res.data.serviceOrderDate,
                    this.svcorder.model.serviceOrderEstimatedCompletion = res.data.serviceOrderEstimatedCompletion,
                    this.svcorder.model.serviceOrderComments = res.data.serviceOrderComments
            })
        },
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

        },
        updateServiceOrder(){
            const serviceOrderID = this.serviceOrderID
            axios.put(`http://localhost:3000/api/serviceorders/update/` + serviceOrderID, this.svcorder.model)
                
                Swal.fire({
                    title: 'Done!',
                    text: 'The service order has been updated!',
                    icon: 'success'
                })
                $this.router.push('/serviceorders')     
        },
        deleteServiceOrder(){
        const serviceOrderID = this.serviceOrderID
        axios.delete(`http://localhost:3000/api/serviceorders/delete/` + serviceOrderID)
            Swal.fire(
                'Done!',
                'The service order has been deleted.',
                'success'
            )
            }

    },

    beforeMount(){
        this.loadDropDowns()
        if (this.serviceOrderID !== undefined){
            this.isNew = false
            this.populateServiceOrderData()
        }
    }
}

</script>
<style scoped>

</style>
