<template>
    <v-container class="item_size">
      <v-main>
        <h2 class="white--text">משתמשים</h2>
  
      <v-simple-table
         
             
              class="simple-table-color border white--text mt-7"
              calculate-widths
            >
              <template v-slot:default>
                <thead class="tr-color ">
                  <tr class="border-left ">
                    <th class="white--text  " >ID</th>
                    <th class="white--text ">שם</th>
                    <th class="white--text">אימייל</th>
                    <th class="white--text">מנהל</th>
                    <th class="white--text text-center">עריכה </th>
                    <th class="white--text text-center"> מחיקה</th>
                  </tr>
                </thead>
                <tbody class="border-left ">
                  <tr v-for="(item, index) in users" :key="index" class="border-left">
                    <td class="" style="" >{{ item.id }}</td>
  
                    <td  style="">{{ item.userName }}</td>
                    <td  style="">{{ item.email }} </td>
                    <!-- <td>{{ item.isAdmin }} </td> -->
                    <td  style="">
                      <v-icon color="red"  v-if= "item.isAdmin !== 1">mdi-close-circle</v-icon>
                
                      <v-icon color="green" v-else>mdi-checkbox-marked-circle</v-icon>
                    </td>
                    
                    <td class="text-center " style=""  >
                      <v-btn
                        text
                      class="mx-auto center"
                        color="white"
                        @click="updateUser(index)"
                      >
                  
                  
                        <v-icon>mdi-account-edit</v-icon>
                  
                      </v-btn>
                    </td>
                    <td class="text-center" style="width:10%">
                      <v-btn
                        text
                      class="mx-auto center"
                        color="white"
                        @click="deleteUser(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-main>
   </v-container>
  </template>
  
  <script>
  export default {
    name: "admin",
    mounted() {
      this.getUsers();
    },
  
    computed: {
      users() {
        return this.$store.state.users;
      },
      clientInfo() {
        return this.$store.state.clientInfo;
      },
   
    },
    methods: {
      getUsers() {
        fetch(`${process.env.VUE_APP_HOST}users/register`,{
          headers: {
            Authorization: 'Bearer ' + this.clientInfo.token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.$store.commit("setUsers", data);
          });   
      },
  
      deleteUser(index) {
        console.log(this.users[index].id);
        fetch(`${process.env.VUE_APP_HOST}users/${this.users[index].id}`, {
          method: "delete",
          headers: {
            // Authorization: 'Bearer ' + this.clientInfo.token,
          },
        })
          .then((response) => response.json())
          .then((jsonObject) => {
            console.log("deleted");
            // location.reload();
          });
      },
  
      updateUser(index) {
        this.$router.push(`/admin/users/edit/${this.users[index].id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  
  .simple-table-color {
    background-color: #272b30 !important;
  }
  .border {
    border: 1px solid black;
  }
  
  table th + th {
    border-right: 1px solid black;
  }
  table td + td {
    border-right: 1px solid black;
  }
  
  table td {
    border-top: 1px solid black;
  
  }
   tr:nth-child(even){
    background-color: #32363b;
  
  }
  tr:hover {
    background-color: transparent !important;
  }
  .tr-color{
     background-color: #32363b;
  }
  
  </style>
  