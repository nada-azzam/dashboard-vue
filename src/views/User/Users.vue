<template>
  <div>
    <div class="text-right mr-5">
      <v-btn to="/create/user" depressed color="primary"
        ><v-icon right dark class="mr-2"> mdi-account-plus-outline </v-icon> Add
        User
      </v-btn>
    </div>
    <!-- SNACKBAR -->
     <v-snackbar
      v-model="isSubmitted"
      color="success"
       
      top
    >
    Deleted Successfully  
    </v-snackbar>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">User Info</th>
            <th class="text-left">Email</th>
            <th class="text-left">Id</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="userList">
          <tr
            v-show="userList.data"
            v-for="item in userList.data"
            :key="item.id"
          >
            <td class="py-4">
              <v-avatar class="profile" size="100">
                <img
                  v-if="item.avatar"
                  :alt="item.first_name"
                  :src="item.avatar"
                />
              </v-avatar>
              <strong
                class="ml-5"
                v-html="`${item.first_name}  ${item.last_name}`"
              ></strong>
            </td>
            <td>
              <p>{{ item.email }}</p>
            </td>
            <td>{{ item.id }}</td>
            <td class="text-center">
              <v-btn  :to="{name:'edit-user', params:{id:item.id}}"  class="mx-2" fab dark small color="primary">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>

              <v-btn @click="deleteUser(item.id)" class="mx-2" fab dark small color="pink">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
              <v-btn :to="{name:'show-user', params:{id:item.id}}" class="mx-2" fab dark small color="warning">
                <v-icon>mdi-television</v-icon>
              </v-btn>
              
            </td>
          </tr>
          <tr style="background-color: white !important">
            <td></td>
            <td></td>
            <td></td>
            <v-pagination
            @input="getUserPerPage(pageNumber)"
              class="my-5"
              v-model="pageNumber"
              :length="userList.total_pages"
              circle
            ></v-pagination>
          </tr>
        </tbody>
        <v-row  v-if="userList" class="mb-6" no-gutters>
          <v-col lg="12">
            <v-alert
              v-if="!userList.data"
              border="bottom"
              colored-border
              type="warning"
              elevation="2"
            >
              Sed in libero ut nibh placerat accumsan. Phasellus leo dolor,
              tempus non, auctor et, hendrerit quis, nisi. Phasellus leo dolor,
              tempus non, auctor et, hendrerit quis, nisi. Sed consequat, leo
              eget bibendum sodales, augue velit cursus nunc, quis gravida magna
              mi a libero. Donec elit libero, sodales nec, volutpat a, suscipit
              non, turpis.
            </v-alert>
          </v-col>
        </v-row>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import UserService from '../../services/Api/users';
export default {
  data() {
    return {
      pageNumber: 1,
      isSubmitted:false,
    };
  },
  created() {
    this.getUserPerPage(this.pageNumber)
  },
  methods:{
    getUserPerPage(page){
    this.$store.dispatch("getUserList", page);

    },
    
    deleteUser(id){
      console.log(id)
       UserService.deleteUser(id).then(res=>{
        this.isSubmitted=true
      })
    }
  },
  computed: {
    userList() {
      return  this.$store.getters.users;
    },
  },
};
</script>