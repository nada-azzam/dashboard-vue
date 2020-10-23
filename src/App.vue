<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer
      v-if="isLoggining"
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <!-- absolute temporary  -->
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Nada Azzam</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout()" block color="primary"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- <v-card class="overflow-hidden" > -->
    <!-- shrink-on-scroll prominent  -->
    <v-app-bar
      app
      absolute
      color="indigo darken-2"
      dark
      scroll-target="#scrolling-techniques"
    >
      <v-app-bar-nav-icon
        v-if="isLoggining"
        @click.stop="mini = !mini"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list v-if="!isLoggining" dense>
          <v-list-item v-for="(item, i) in menueList" :key="i" :to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="isLoggining" dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="logout()">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- ADS -->
    <ADS :isAdsShow="isAdsShow" />

    <v-sheet id="scrolling-techniques">
      <v-container style="height: 100px"> </v-container>
    </v-sheet>
    <!-- </v-card> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer";
import ADS from "./components/AdsDialog";
import { mapGetters } from "vuex";
export default {
  name: "App",

  components: {
    NavDrawer,
    ADS,
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },

  data() {
    return {
      drawer: true,
      isAdsShow:false,
      items: [
        { title: "Home", icon: "dashboard", path: "/" },
        { title: "Users", icon: "mdi-face-profile-woman", path: "/users" },
        { title: "Resources", icon: "mdi-human-greeting", path: "/resources" },
      ],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      mini: true,
      menueList: [
        { title: "Create Account", icon: "face", path: "/register" },
        { title: "Login", icon: "mdi-login-variant", path: "/login" },
      ],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name != "login" && to.name != "register") {
         this.isAdsShow=true
      }
    },
  },
  computed: {
    isLoggining() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
