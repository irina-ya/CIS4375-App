<template>
<div>
    
    <form class="editForm" onsubmit="return false;">
        <div class="editForm-left">
            <label>Make</label>
                <br>
                <select
                    v-model="car.model.carMakeID"
                    name="carMakeID"
                    >
                <option
                    v-for="(data, index) in MAKE_LIST"
                    :key="index" :value="data.carMakeID">
                {{ data.carMake }}
                </option>
                </select>
                <br><br>
                
                <lable>Model</lable>
                <br>
                <select
                    v-model="car.model.carModelID"
                    name="carModelID"
                    >
                <option
                    v-for="(data, index) in MODEL_LIST"
                    :key="index" :value="data.carModelID">
                {{ data.carModel }}
                </option>
                </select>
                <br><br>
                
                <lable>Car Year</lable>
                <br>
                <select
                    v-model="car.model.yearID"
                    name="yearID"
                    >
                <option
                    v-for="(data, index) in YEAR_LIST"
                    :key="index" :value="data.yearID">
                {{ data.carYear }}
                </option>
                </select>
                <br><br>
                
                <lable>Color</lable>
                <br>
                <select
                    v-model="car.model.colorID"
                    name="yearID"
                    >
                <option
                    v-for="(data, index) in COLOR_LIST"
                    :key="index" :value="data.colorID">
                {{ data.colorName }}
                </option>
                </select>
                <br><br>

                <FormulateInput
                        type="text"
                        label="License Plate"
                        name="licensePlate"
                        v-model="car.model.licensePlate"
                    />
        </div>
        
            <button class="swal2-styled" v-on:click="createCar">Add Car to Customer</button>
        
        
        </form>
    </div>

    
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'addcar',
    props: ["customerID"],

    data(){
        return{
            MAKE_LIST: [],
            MODEL_LIST: [],
            YEAR_LIST: [],
            COLOR_LIST:[],
            car:{
                model: {
                    customerID: this.customerID,
                    carModelID: '',
                    carMakeID: '',
                    yearID: '',
                    colorID:'',
                    licensePlate: ''
                }
            },
            
        
        }
    },

    methods:{
        loadDropDowns(){

            axios.get('http://localhost:3000/api/makes/find').then((res) =>{
                    this.MAKE_LIST = res.data;
                }).catch(() => {
            Swal.fire('Error', 'Something went wrong!', 'error')
            })

            axios.get('http://localhost:3000/api/models/find').then((res) =>{
                    this.MODEL_LIST = res.data;
                }).catch(() => {
            Swal.fire('Error', 'Something went wrong!', 'error')
            })

            axios.get('http://localhost:3000/api/caryears/find').then((res) =>{
                    this.YEAR_LIST = res.data;
                }).catch(() => {
            Swal.fire('Error', 'Something went wrong!', 'error')
            })

            axios.get('http://localhost:3000/api/colors/find').then((res) =>{
                    this.COLOR_LIST = res.data;
                }).catch(() => {
            Swal.fire('Error', 'Something went wrong!', 'error')
            })

        },

        createCar(){
            axios.post('http://localhost:3000/api/car/addnew', this.car.model)
                Swal.fire({
                    title: 'Done!',
                    text: 'The customer has been added!',
                    icon: 'success'
                })
            

        }
    },

    beforeMount(){      
        this.loadDropDowns();
        
    },
    
}
        
</script>

<style scoped>

</style>
