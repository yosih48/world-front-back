<template>
  <v-app id="inspire">
    <!-- <v-main> -->
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    label="email"
                    type="email"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                            :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                    id="password"
                    name="password"
                    label="Password"
                  
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
    
                <v-btn color="success" @click="login"> התחבר</v-btn>
                <v-spacer></v-spacer>
   <v-row >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         הירשם
        </v-btn>
      </template>
     <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-form ref="form" lazy-validation>
            <v-row>
              <v-col
                cols="12"
             
              >
                <v-text-field
                  label="user name"
                  v-model="usernamea"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :rules="emailRules"
                  label="Email*"
          v-model="emaila"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                   :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                :rules="[rules.required, rules.min]"
                  label="Password*"
                
                    v-model="passworda"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                    @click:append="show2 = !show2"
                  label="Confirm Password*"
                
                    v-model="confirmPassword"
                  required
                ></v-text-field>
              </v-col>
         
            </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="register(); dialog = false"
  
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    <!-- </v-main> -->
   
  </v-app>
   

</template>


<script>
export default {
  name: "login",
  props: {
    source: String,
  },
  data() {
    return {
         show1: false,
      show2: false,
        emailRules: [
        (v) => !!v || "חובה",
        (v) => /.+@.+\..+/.test(v) || " יש להזין כתובת אימייל חוקית ",
      ],
          rules: {
        required: (value) => !!value || "חובה.",
        min: (v) => v.length >= 4 || "מינימום 4 תווים",
      },
      dialog: false,
        username:"",
      email: "",
      password: "",
        usernamea:"",
      emaila: "",
      passworda: "",
        confirmPassword: "",
      access: false,
      id: null,
   
    };
  },
    computed: {
 
    

    clientInfo() {
      return this.$store.state.clientInfo;
      },
        localHost() {
      return this.$store.state.localHost;
    },
  
  },

  mounted() {
    this.getUsers();
    console.log(process.env.VUE_APP_HOST)
  },

  methods: {
    login() {
      fetch(`${process.env.VUE_APP_HOST}users/login`, {
        method: "POST",
        body: JSON.stringify({
          email: this.email,

          password: this.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error !== false) {
            console.log(data);
            alert("כתובת מייל או סיסמה לא נכונים");
          } else {
            console.log("no error");
            console.log(data.name);
                   let clientData = {
                id: data.id,
                name: data.name,
                 admin: data.admin,
               
                // token: data.newToken
              };
              localStorage.setItem("user", JSON.stringify(clientData));


            this.checkLocal(JSON.parse(localStorage.user));
                this.$router.push('/fixtures');
// console.log(this.clientInfo)
            // for (let i = 0; i < this.users.length; i++) {
            //   if (this.email === this.users[i].email) {
            //     this.id = this.users[i].id;
         
            //          this.$router.push(`match/${this.id}`)
            //   }
            // }
          }
        });
    },
    checkLocal(value) {
      if (localStorage["user"]) {
        this.$store.commit("increment", value);
      }
    },
    register() {
      if (this.$refs.form.validate() &&this.passworda === this.confirmPassword) {
        fetch(`${process.env.VUE_APP_HOST}users/add`, {
          method: "POST",
          body: JSON.stringify({
            userName: this.usernamea,
            email: this.emaila,
            password: this.passworda,

          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error !== false) {
              console.log(data);
              alert("שגיאת רישום")

            } else if(this.passworda !== this.confirmPassword) {
              alert("סיסמאות אינן תואמות")
              // window.location.reload();
            } else {
              console.log("no error");
              alert("נרשמת בהצלחה")
              
            }
          });
      } else {
         alert("סיסמאות אינן תואמות")
      }
          },

    getUsers() {
      fetch("http://localhost:3000/users/register")
        .then((response) => response.json())
        .then((data) => {
          this.$store.state.users = data;
          console.log(this.users);
        });
    },
  },
  computed: {
    resultarr() {
      return this.$store.state.resultarr;
    },
    users() {
      return this.$store.state.users;
    },
  },
};
</script>

<style></style>
