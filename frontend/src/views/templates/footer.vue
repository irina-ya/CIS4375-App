<template>
  <!-- Footer -->
  <mdb-footer color="unique-color-dark" class="page-footer font-small pt-0">
    <div style="backgroundColor: #6351ce">
      <mdb-container class="text-left">
        <mdb-row class="py-4 d-flex align-items-center">
          <mdb-col md="6" lg="5" class="text-center text-md-left mb-4 mb-md-0">
            <h6 class="mb-0 white-text">Get connected with us on social networks!</h6>
          </mdb-col>
          <mdb-col md="6" lg="6" class="text-center text-md-right">
            <a class="fb-ic ml-1"><i class="fab fa-facebook white-text fa-2x mr-lg-4"> </i></a>
            <a class="tw-ic"><i class="fab fa-twitter white-text fa-2x mr-lg-4"> </i></a>
            <a class="gplus-ic"><i class="fab fa-google-plus white-text fa-2x mr-lg-4"> </i></a>
            <a class="li-ic"><i class="fab fa-linkedin-in white-text fa-2x mr-lg-4"> </i></a>
            <a class="ins-ic"><i class="fab fa-instagram white-text fa-2x mr-lg-4"> </i></a>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </div>
    <mdb-container class="mt-5 mb-4 text-center text-md-left">
      <mdb-row class="mt-3">
        <mdb-col md="3" lg="4" xl="3" class="mb-3">
          <h6 class="text-uppercase white-text fw-bold"><strong>Outback Auto Repair</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p>Auto mechanic shop that specializes in all types of repairs from cars. trucks, tractors, and trailers.</p>
        </mdb-col>
        <mdb-col md="2" lg="2" xl="2" class="mb-3">
          <h6 class="text-uppercase white-text fw-bold"><strong>OAR Links</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><router-link to="/customers">Customers</router-link></p>
          <p><router-link to="/serviceorders">Service Orders</router-link></p>
          <p><router-link to="/serviceparts">Service Parts</router-link></p>
          <p><router-link to="/serviceorders">Invoices</router-link></p>
        </mdb-col>
        <mdb-col md="2" lg="2" xl="2" class="mb-3">
          <h6 class="text-uppercase white-text fw-bold"><strong>Useful links</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><router-link to="/account">Your Account</router-link></p>
          <p><router-link to="/contact">Contact Us</router-link></p>
          <p><router-link to="/services">Services We Offer</router-link></p>
          <p><router-link to="/help">Help</router-link></p>
        </mdb-col>
        <mdb-col md="4" lg="3" xl="3" class="mb-3">
          <h6 class="text-uppercase white-text fw-bold"><strong>Contact</strong></h6>
          <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><i class="fas fa-building mr-3"></i>6032 Neiman Rd, Brookshire, TX 77423</p>
          <p><i class="fas fa-envelope mr-3"></i>winterbauer@consolidated.net</p>
          <p><i class="fas fa-phone mr-3"></i>(832) 232-2986</p>
          
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div class="footer-copyright text-center py-3" >
      <mdb-container fluid>
        &copy; 2021 OUTBACK AUTO REPAIR &nbsp;| &nbsp; ALL RIGHTS RESERVED &nbsp;| &nbsp; WEBSITE PRODUCED BY  <img src="../../assets/img/DHS_logo.png">
      </mdb-container>
    </div>
  </mdb-footer>
  <!-- Footer -->
</template>

<script>
import { mdbFooter, mdbContainer, mdbIcon, mdbRow, mdbCol } from 'mdbvue';
export default {
  name: 'FooterTemplate',
  components: {
      mdbFooter,
      mdbContainer,
      mdbIcon,
      mdbRow,
      mdbCol,
    }
}

</script>

<style lang='stylus'>
</style>



//       <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//         <router-link
//           class="navbar-brand"
//           to="/home">Frontend</router-link>
//       </nav>