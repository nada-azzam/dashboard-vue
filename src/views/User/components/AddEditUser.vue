<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <!-- SNACKBAR -->
        <v-snackbar v-model="isSubmitted" color="success" top>
          {{ $route.params.id ? "Updated" : "Saved" }} Successfully
        </v-snackbar>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="name"
                      :error-messages="errors"
                      label="Name"
                      type="text"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="job"
                    rules="required"
                  >
                    <v-text-field
                      v-model="job"
                      type="text"
                      :error-messages="errors"
                      label="Job"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <v-btn
                    color="primary"
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                  >
                    {{ $route.params.id ? "Update" : "Save" }}
                  </v-btn>
                </form>
              </validation-observer>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import UserService from "../../../services/Api/users";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    job: "",
    id: 1,
    isSubmitted: false,
  }),
  mounted() {
    if (this.$route.params.id) {
      console.log(this.$route.params.id);
      this.showUser(this.$route.params.id);
    }
  },

  methods: {
    showUser(id) {
      UserService.showUser(id).then((res) => {
        console.log(res);
      });
    },
    createUser() {
      const add = {
        name: this.name,
        job: this.job,
      };
      UserService.createUser(add).then((res) => {
        this.isSubmitted = true;
      });
    },
    updateUser(id) {
      const update = {
        name: this.name,
        job: this.job,
      };
      UserService.updateUser(id, update).then((res) => {
        this.isSubmitted = true;
      });
    },
    submit() {
      // this.$refs.observer.validate();
      // UserService.
      if (this.$route.params.id) {
        this.updateUser(this.$route.params.id);
      } else {
        this.createUser();
      }
    },
  },
};
</script>

<style>
</style>