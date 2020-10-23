<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
        @click="showResources(id)"
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
      <v-card v-if="singleResource" class="text-center">
        <v-card-text  class="my-3" style="height: auto">
          <div>{{singleResource.year}}</div>
          <p class="display-1 text--primary" s="singleResource.color">{{singleResource.name}}</p>
          <v-chip :color="singleResource.color" dark>
                {{ singleResource.pantone_value }}
              </v-chip>
         
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import ResourcesService from "../../../services/Api/resources";

export default {
  props: ["id"],

  data() {
    return {
      dialog: false,
      singleResource: null,
    };
  },
  
  methods: {
    showResources(id) {
      ResourcesService.showResources(id).then((res) => {
        this.singleResource = res.data.data;
        console.log(this.singleResource)
      });
    },
  },
};
</script>