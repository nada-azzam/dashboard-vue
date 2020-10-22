<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <v-card light="light" max-width="500" class="mx-auto my-12">
          <v-list>
            <v-list-item class="pt-5">
              <v-list-item-avatar class="mx-auto" color="indigo">
                <v-icon dark> mdi-lock </v-icon>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item class="text-center" link>
              <v-list-item-content>
                <v-list-item-title class="title"> Sign in </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-text>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-alert v-if="invalidEmail"  dense outlined type="error">
                   Invalid Email or Password
                  </v-alert>
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    type="email"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="password"
                  rules="required|min:5"
                >
                  <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="errors"
                    label="Password"
                    required
                  ></v-text-field>
                </validation-provider>

                <v-btn
                  color="primary"
                  class="mr-4"
                  type="submit"
                  :disabled="invalid"
                >
                  submit
                </v-btn>
              </form>
            </validation-observer>
          </v-card-text>
        </v-card>
        <div class="pt-3 text-center">
          Don't have an account?
          <v-btn color="primary" light="light" to="/register">Sign up</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, max, min } from "vee-validate/dist/rules";
import store from "../store";
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

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
    invalidEmail:false
  }),

  computed: {
    isLoggining() {
      return this.$store.getters.authStatus;
    },
  },
  methods: {
    submit() {
      // this.$refs.observer.validate();
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("Auth/signIn", {
          email,
          password,
        })
        .then(() => {
          this.$router.push("/users");
        })
        .catch((err) => {
          if (err ) {
            this.invalidEmail = true;
          }
        });
    },
    clear() {
      this.email = "";
      this.password = "";

      this.$refs.observer.reset();
    },
  },
};
</script>

<style>
</style>