<template>
  <div class="text-center">
    <v-btn
    class="red white--text button-size "
    
      @click="closeToDo(),snackbar = true"
    >
    שמור תוצאה
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
name: "toast",

props:{
msg: String
},

    data: () => ({
      snackbar: false,
      text: 'נשמר בהצלחה',
      timeout: 2000,
    }),

    methods: {
        closeToDo(){
         
            this.$emit("onClose")
        }
    },
}
</script>

<style>
.button-size{
/* width: 40px; */
}
</style>