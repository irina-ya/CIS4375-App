<template>
    <div>
        <form class="editForm" onsubmit="return false;">
            <div class="editForm-left">
<<<<<<< Updated upstream
                <FormulateInput
                    type="text"
                    label="Car ID"
                    name="carID"
                    v-model="svcorder.model.carID"
                />
=======
               
>>>>>>> Stashed changes
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

            <br><br>
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
               <button v-if="!isNew" class="swal2-styled" v-on:click="deleteServiceOrder">Delete</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="updateServiceOrder">Update</button> 
            </div>
            <br><br><br>
            <div class="editForm-right"> 
<<<<<<< Updated upstream

=======
            
                <div slot="table-actions"></div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    initialSortBy: {field: 'serviceTypeID', type: 'asc'}
=======
                    initialSortBy: {field: 'serviceTypeDesc', type: 'asc'}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    @on-row-dblclick="editServiceLine"
=======
                    
>>>>>>> Stashed changes
                />

            
<<<<<<< Updated upstream
            
=======
                </div>
>>>>>>> Stashed changes
        </form>
        
</div>
    
</template>

<script>
import axios from 'axios';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'


export default {
    name: 'editserviceorder',
    props: ["serviceOrderID"],

    data(){
        return{
            isNew: 'true',
            DB_DATA: [],
            STATUS_DATA: [],
            TYPE_DATA: [],
            SERVICE_LINE: [],
            svcorder:{
                model: {
                    carID: '',
<<<<<<< Updated upstream
                    //serviceTypeID: '',
=======
>>>>>>> Stashed changes
                    serviceOrderStatusID: '',
                    serviceOrderDate: '',
                    serviceOrderEstimatedCompletion: '',
                    serviceOrderComments: ''
                }
            },
            dataFields: [{
                label: 'Service Type',
<<<<<<< Updated upstream
                field: 'customerID',
            },{
                label: 'Labor Cost',
                field: 'customerFirstName'
            },{
                label: 'Labor Hours',
                field: 'customerLastName'
            }]
=======
                field: 'serviceTypeDesc'
            },{
                label: 'Service Part',
                field: 'partDescription'
            },{
                label: 'Service Part Cost',
                field: 'partSellPrice'
            },{
                label: 'Labor Cost',
                field: 'serviceLaborCost'
            },{
                label: 'Labor Hours',
                field: 'serviceLaborHours'
            },{
                label: 'Service Line Cost',
                field: 'serviceOrderLineCost'
            },{
                label: 'Status',
                field: 'serviceOrderLineStatus'
            }
            ]
>>>>>>> Stashed changes
        }
    },
    components: {
    'vue-good-table': VueGoodTable
    },
    methods: {
        populateServiceOrderData(){
            axios.get('http://localhost:3000/api/serviceorders/find/' + this.serviceOrderID)
                .then((res) =>{
                    this.DB_DATA = res.data;
<<<<<<< Updated upstream
                    this.svcorder.model.carID = res.data.carID,
                    //this.svcorder.model.serviceTypeID = res.data.serviceTypeID,
                    this.svcorder.model.serviceOrderStatusID = res.data.serviceOrderStatusID,
                    this.svcorder.model.serviceOrderDate = res.data.serviceOrderDate,
                    this.svcorder.model.serviceOrderEstimatedCompletion = res.data.serviceOrderEstimatedCompletion,
                    this.svcorder.model.serviceOrderComments = res.data.serviceOrderComments
            })
        },


=======
                    
                    this.svcorder.model.serviceOrderStatusID = this.DB_DATA[0].serviceOrderStatusID,
                    this.svcorder.model.serviceOrderDate = this.DB_DATA[0].serviceOrderDate,
                    this.svcorder.model.serviceOrderEstimatedCompletion = this.DB_DATA[0].serviceOrderEstimatedCompletion,
                    this.svcorder.model.serviceOrderComments = this.DB_DATA[0].serviceOrderComments
            })
        },

        loadServiceLine(){
            axios.get(`http://localhost:3000/api/serviceorderline/find/`+ this.serviceOrderID)
                .then((response) => {
                    this.SERVICE_LINE = response.data;
                   
                    this.SERVICE_LINE.forEach( obj => this.renameKey(obj, 'Service_Type.serviceTypeDesc','serviceTypeDesc'))
                    this.SERVICE_LINE.forEach( obj => this.renameKey(obj, 'Service_Type.serviceLaborCost','serviceLaborCost'))
                    this.SERVICE_LINE.forEach( obj => this.renameKey(obj, 'Service_Type.serviceLaborHours','serviceLaborHours'))
                    this.SERVICE_LINE.forEach( obj => this.renameKey(obj, 'Service_Order_Line_Status.serviceOrderLineStatus','serviceOrderLineStatus'))
                    this.SERVICE_LINE.forEach( obj => this.renameKey(obj, 'Service_Part.partDescription','partDescription'))
                    this.SERVICE_LINE.forEach( obj => this.renameKey(obj, 'Service_Part.partSellPrice','partSellPrice'))
                })
        },
>>>>>>> Stashed changes

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

        renameKey( obj, oldKey, newKey ) {
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
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
            this.loadServiceLine()
        }
    }
}

</script>
<style scoped>

</style>
