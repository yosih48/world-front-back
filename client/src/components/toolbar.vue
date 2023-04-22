<template>

    <v-app-bar
      app
      color="primary"
     
    >
      <v-container class="py-0 fill-height">
       <v-toolbar-title > <v-btn > 
        <router-link 
        v-if="Object.keys(this.clientInfo).length === 0"
         class="black--text"
            style="text-decoration: none"
       to="/">כניסה</router-link>
          <div class="text-center" v-else>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                class="min-button black--text"
                text dark v-bind="attrs" v-on="on">
                  {{ clientInfo.name }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
        
            
                <v-list-item @click="logOut" to="/">יציאה</v-list-item>
              </v-list>
            </v-menu>
          </div>
              <div class="text-center " v-if="this.clientInfo.admin == 'true'" >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn  class="min-button black--text" text dark v-bind="attrs" v-on="on">
                  ניהול
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
           
                <v-list-item to="/admin">משתמשים</v-list-item>
                <v-list-item to="/editg">ניחושים</v-list-item>
                <v-list-item to="/test">הורדות</v-list-item>
                <!-- <v-list-item  to="/admin/orders">הזמנות</v-list-item> -->
              </v-list>
            </v-menu>
          </div>
       
       

       
       
       </v-btn></v-toolbar-title>
 <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down ">
      <!-- <v-btn text>
          <router-link class="white--text" style="text-decoration: none" to="/login">התחברות והרשמה</router-link>
        </v-btn>

        <v-btn text >
           <router-link class="white--text" style="text-decoration: none" to="/cart">עגלת קניות</router-link>
        </v-btn>  -->
      <v-btn v-for="item in menu" :key="item.icon" :to="item.to" text>{{
        item.title
      }}</v-btn>
    </v-toolbar-items>
     <div class="hidden-md-and-up">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="item in menu" :key="item.icon" :to="item.to">
              <v-list-item-icon>
                <v-icon small>mdi-{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>



    </v-container>
    </v-app-bar>

    <!-- <v-main>
      <router-view/>
    </v-main> -->
  
</template>

<script>
export default {
   name: 'login',
   props: {
    
    },
  data() {
    return {
      sidebar: false,
      menu: [
        { to: "/tables", title: "טבלה" },
        { to: "/fixtures", title: "התוצאות שלי" },
      ],
    };
  },

  computed: {
      clientInfo() {
      return this.$store.state.clientInfo;
    },
    items() {
      return this.$store.state.items;
    },
  },

  mounted() {
    console.log(this.clientInfo)
  },
  
      methods: {
            logOut() {
              this.$store.commit("setItems", {});
        console.log(this.items);

        if (localStorage["user"]) {
          localStorage.removeItem("user");
          this.$store.commit("increment", {});
        
        }
      
       
       
      },
      },


 
};
</script>

<style></style>