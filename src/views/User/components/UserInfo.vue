<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
        @click="showUSer(id)"
          dark
          v-bind="attrs"
          v-on="on"
          class="mx-2"
          fab
          small
          color="warning"
        >
          <v-icon>mdi-television</v-icon> 
        </v-btn>
      </template>
      <v-card v-if="userResource" class="text-center">
        <v-card-text  class="my-3" style="height: auto">
             <v-avatar class="profile" size="100">
                <img
                  v-if="userResource.avatar"
                  :alt="userResource.first_name"
                  :src="userResource.avatar"
                />
              </v-avatar>
          <p class="display-1 text--primary" >{{userResource.first_name }}  {{userResource.last_name }}</p>
          <p>{{userResource.email }}</p>
        
         
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import UserService from "../../../services/Api/users";

export default {
  props: ["id"],

  data() {
    return {
      dialog: false,
      userResource: null,
    };
  },
  
  methods: {
    showUSer(id) {
      UserService.showUser(id).then((res) => {
        this.userResource = res.data.data;
      });
    },
  },
};
</script>