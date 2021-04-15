<template>
  <nav style="backgroundColor: #1C2331" class="navbar navbar-expand-lg navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <span class="navbar-brand">Outback Auto Repair</span>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/customers">Customers</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/serviceorders">Service Orders</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/serviceparts">Service Parts</router-link>
      </li>
    </ul>
    
  </nav>
</template>

<script>
export default {
  name: 'HeaderTemplateAnonymous',
}
</script>

<style lang='stylus'>
</style>
