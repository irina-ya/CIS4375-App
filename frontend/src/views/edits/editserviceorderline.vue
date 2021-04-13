<template>
    <div>
        <form class="editForm" onsubmit="return false;">
            <div class="editForm-left">
                <br>
                <label>Service Type</label>
                <br>
                <select
                    v-model="svcorderline.model.serviceTypeID"
                    name="serviceTypeID"
                    >
                <option
                    v-for="(data, index) in TYPE_DATA"
                    :key="index" :value="data.serviceTypeID">
                {{ data.serviceTypeDesc }}
                </option>
                </select>
                <br/>
                <label>Service Part</label>
                <br>
                <select
                    v-model="svcorderline.model.servicePartID"
                    name="servicePartID"
                    >
                <option
                    v-for="(data, index) in PART_DATA"
                    :key="index" :value="data.servicePartID">
                {{ data.partDescription }}
                </option>
                </select>
                <br/>
                    <FormulateInput
                        type="number"
                        label="Service Part Cost"
                        name="partSellPrice"
                        v-model="svcorderline.model.serviceOrderDate"
                    />
                <br>
                    <FormulateInput
                        type="text"
                        label="Labor Cost"
                        name="serviceLaborCost"
                        v-model="svcorderline.model.serviceOrderEstimatedCompletion"
                    />
                <br>
                    <FormulateInput
                        type="text"
                        label="Labor Hours"
                        name="serviceLaborHours"
                        v-model="svcorderline.model.serviceOrderComments"
                    />
                    <br>
                    <FormulateInput
                        type="text"
                        label="Service Line Cost"
                        name="serviceOrderLineCost"
                        v-model="svcorderline.model.serviceOrderLineCost"
                    />
                    <br>
                    <FormulateInput
                        type="text"
                        label="Service Order Line Status"
                        name="serviceOrderLineStatus"
                        v-model="svcorderline.model.serviceOrderLineStatusID"
                    />
        
                <div class="editFooter">
                    <button class="swal2-styled" v-on:click="deleteServiceOrderLine">Delete</button>
                    <button class="swal2-styled" v-on:click="updateServiceOrderLine">Update</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'


export default {
    name: 'editserviceorderline',
    props: ["serviceOrderLineID"],

    data(){
        return{
            isNew: 'true',
            DB_DATA: [],
            PART_DATA: [],
            TYPE_DATA: [],
            SERVICE_LINE: [],
            svcorderline:{
                model: {
                    serviceOrderID: '',
                    serviceTypeID: '',
                    servicePartID: '',
                    serviceOrderLineStatusID: '',
                    serviceOrderLineCost: ''
                }
            }
        }
    },
    components: {
    'vue-good-table': VueGoodTable
    },
    methods: {
        populateServiceOrderLineData(){
            axios.get(`http://localhost:3000/api/serviceorderline/find/`+ this.serviceOrderID)
                .then((response) => {
                    this.DB_DATA = response.data;

                    this.svcorderline.model.serviceOrderID = this.DB_DATA[0].serviceOrderID,
                    this.svcorderline.model.serviceTypeID = this.DB_DATA[0].serviceTypeID,
                    this.svcorderline.model.servicePartID = this.DB_DATA[0].servicePartID,
                    this.svcorderline.model.serviceOrderLineStatusID = this.DB_DATA[0].serviceOrderLineStatusID,
                    this.svcorderline.model.serviceOrderLineCost = this.DB_DATA[0].serviceOrderLineCost
                   
                    this.DB_DATA.forEach( obj => this.renameKey(obj, 'Service_Type.serviceTypeDesc','serviceTypeDesc'))
                    this.DB_DATA.forEach( obj => this.renameKey(obj, 'Service_Type.serviceLaborCost','serviceLaborCost'))
                    this.DB_DATA.forEach( obj => this.renameKey(obj, 'Service_Type.serviceLaborHours','serviceLaborHours'))
                    this.DB_DATA.forEach( obj => this.renameKey(obj, 'Service_Order_Line_Status.serviceOrderLineStatus','serviceOrderLineStatus'))
                    this.DB_DATA.forEach( obj => this.renameKey(obj, 'Service_Part.partDescription','partDescription'))
                    this.DB_DATA.forEach( obj => this.renameKey(obj, 'Service_Part.partSellPrice','partSellPrice'))
                })
        },

        loadDropDowns(){
            axios.get('http://localhost:3000/api/servicetypes/find').then((res) =>{
                this.TYPE_DATA = res.data;
            }).catch(() => {
                Swal.fire('Error', 'Something went wrong! with Service type', 'error')
                })

        axios.get('http://localhost:3000/api/serviceparts/find').then((res) =>{
                console.log(JSON.stringify(res.data))
                this.PART_DATA = res.data;
                }).catch(() => {
                 Swal.fire('Error', 'Something went wrong! with service parts', 'error')
                })

        },

        renameKey( obj, oldKey, newKey ) {
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
            },

        updateServiceOrderLine(){
            const serviceOrderID = this.serviceOrderID
            axios.put(`http://localhost:3000/api/serviceorderline/update/` + serviceOrderID, this.svcorderline.model)
                
                Swal.fire({
                    title: 'Done!',
                    text: 'The service order has been updated!',
                    icon: 'success'
                })
                $this.router.push('/serviceorders')     
        },
        deleteServiceOrderLine(){
        const serviceOrderID = this.serviceOrderID
        axios.delete(`http://localhost:3000/api/serviceorderline/delete/` + serviceOrderID)
            Swal.fire(
                'Done!',
                'The service order has been deleted.',
                'success'
            )
        },
        addNewServiceOrderLine(){
            axios.post('http://localhost:3000/api/serviceorderline/addnew', this.svcorderline.model)
            .then((res) => {
                Swal.fire({
                    title: 'Done!',
                    text: 'The service order line has been added!',
                    icon: 'success'
                })
                
            }).catch(() => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Something is wrong, Please try again!',
                    icon: 'error'
                })
            })
        },

    },

    beforeMount(){
        this.loadDropDowns()
        if (this.serviceOrderID !== undefined){
            this.isNew = false
            this.populateServiceOrderLineData()
        }
    }
}

</script>
<style scoped>

</style>
