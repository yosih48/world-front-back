<template>
  <!-- <v-content> -->
<!-- <toast></toast> -->
    <login />
  <!-- </v-content> -->
</template>

<script>
  import login from '../components/login'
  import toast from "../components/snackbar"

  export default {
    name: 'Home',

    components: {
      login,
      toast,
    },
  }
</script>
