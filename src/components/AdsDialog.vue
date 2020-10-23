<template>
  <v-row justify="center">
    <v-dialog v-model="isAdsShow" scrollable width="500">
      <v-card v-if="ADS" class="mx-auto" outlined href="300">
           <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>
        <v-list-item three-line>
          <v-list-item-content>
              
            <v-list-item-title class="headline my-5">
              {{ADS.company}}
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ADS.text}}</v-list-item-subtitle
            >
          </v-list-item-content>

        </v-list-item>

        <v-card-actions class="my-4">
          <v-btn class="ml-auto" depressed color="error" :href="ADS.url" > Our NewSletter </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import ResourcesService from "../services/Api/resources";

export default {
  props: ["isAdsShow"],
  data() {
    return {
      ADS: null,
    };
  },
  mounted() {
    this.showAds();
  },
  methods: {
    showAds() {
      ResourcesService.getResourcesList().then((res) => {
        this.ADS = res.data.ad;
      });
    },
  },
};
</script>