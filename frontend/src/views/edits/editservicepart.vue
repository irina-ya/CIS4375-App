<template>
    <div>
        <form class="editForm" onsubmit="return false;">
            <div class="editForm-left">
                <FormulateInput
                    type="text"
                    label="Part Info"
                    name="partDescription"
                    v-model="svcpart.model.partDescription"
                />
                <br/>
                <FormulateInput
                    type="text"
                    label="Retail Price"
                    name="partSellPrice"
                    v-model="svcpart.model.partSellPrice"
                />
                <br/>
                <FormulateInput
                    type="text"
                    label="Wholesale Price"
                    name="partPurchasePrice"
                    v-model="svcpart.model.partPurchasePrice"
                />
            </div>
              <div class="editForm-right">
            <br><br><br>
            <div class="editFooter">
                <button v-if="isNew" class="swal2-styled" v-on:click="addNewServicePart">Add New</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="deleteServicePart">Delete</button>
                <button v-if="!isNew" class="swal2-styled" v-on:click="updateServicePart">Update</button>
            </div>

            </div>
            
        </form>

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
    name: 'editservicepart',
    props: ["servicePartID"],

    data(){
        return{
            isNew: 'true',
            DB_DATA: [],
            svcpart:{
                model: {
                    partDescription: '',
                    partSellPrice: '',
                    partPurchasePrice: ''
                }
            }
        }
    },

    methods: {
        populateServicePartData(){
            axios.get('http://localhost:3000/api/serviceparts/find/' + this.servicePartID)
                .then((res) =>{
                    this.DB_DATA = res.data;
                    this.svcpart.model.partDescription = this.DB_DATA[0].partDescription,
                    this.svcpart.model.partSellPrice = this.DB_DATA[0].partSellPrice,
                    this.svcpart.model.partPurchasePrice = this.DB_DATA[0].partPurchasePrice
            })
        },
        updateServicePart(){
            const servicePartID = this.servicePartID
            axios.put(`http://localhost:3000/api/serviceparts/update/` + servicePartID, this.svcpart.model)
                .then((res) => {
                
                Swal.fire({
                    title: 'Done!',
                    text: 'The service part has been updated!',
                    icon: 'success'
                })
                $this.router.push('/serviceparts')
                })
                .catch(() => {
                Swal.fire('Error', 'Something went wrong (updating service part)', 'error')
                })
        },

        addNewServicePart(){
            axios.post('http://localhost:3000/api/serviceparts/addnew', this.svcpart.model)
            .then((res) => {
                Swal.fire({
                    title: 'Done!',
                    text: 'The service part has been added!',
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
        deleteServicePart(){
        const servicePartID = this.servicePartID
        axios.delete(`http://localhost:3000/api/serviceparts/delete/` + servicePartID)
            .then((res) => {

            Swal.fire(
                'Done!',
                'The service part has been deleted.',
                'success'
            )
            })
            .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting service part)', 'error')
            })
            }

    },

    beforeMount(){
        if (this.servicePartID !== undefined){
            this.isNew = false
            this.populateServicePartData()
        }
    }
}

</script>
<style scoped>

</style>
