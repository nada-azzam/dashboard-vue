<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">PantonValue</th>
            <th class="text-left">Year</th>
            <th class="text-left">ID</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="resourcesList">
          <tr
            v-show="resourcesList.data"
            v-for="item in resourcesList.data"
            :key="item.id"
          >

            <td class="py-4">
              {{ item.name }}
            </td>
            <td>
              <v-chip :color="item.color" dark>
                {{ item.pantone_value }}
              </v-chip>
            </td>
            <td>
              {{ item.year }}
            </td>
            <td>{{ item.id }}</td>
            <td class="text-center">
    <SingleResource :id="item.id" />

              
            </td>
          </tr>
          <tr style="background-color: white !important">
            <td></td>
            <td></td>
            <td></td>
            <v-pagination
              @input="getResourcesPerPage(pageNumber)"
              class="my-5"
              v-model="pageNumber"
              :length="resourcesList.total_pages"
              circle
            ></v-pagination>
          </tr>
        </tbody>
        <v-row v-if="resourcesList" class="mb-6" no-gutters>
          <v-col lg="12">
            <v-alert
              v-if="!resourcesList.data"
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
import UserService from "../../services/Api/users";
import SingleResource from "./components/SingleResources";
export default {
  data() {
    return {
      pageNumber: 1,
      isSubmitted: false,
    };
  },
  components: {
    SingleResource,
  },
  created() {
    this.getResourcesPerPage(this.pageNumber);
  },
  methods: {
    getResourcesPerPage(page) {
      this.$store.dispatch("getResourcesList", page);
    },
  },
  computed: {
    resourcesList() {
      return this.$store.getters.resources;
    },
  },
};
</script>