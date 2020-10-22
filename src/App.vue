<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer v-if="isLoggining"
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
          <v-btn block> Logout </v-btn>
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
      <v-app-bar-nav-icon v-if="isLoggining" @click.stop="mini = !mini"></v-app-bar-nav-icon>

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
      </v-menu>
    </v-app-bar>
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

    <!-- <v-footer app dark padless absolute>
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer> -->
  </v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer";

export default {
  name: "App",

  components: {
    
    NavDrawer,
  },

  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard", path: "/" },
        { title: "Users", icon: "mdi-face-profile-woman", path: "/users" },
      ],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      mini: true,
      menueList: [
        { title: "Create Account",icon:"face", path: "/register" },
        { title: "Login",icon:"mdi-login-variant", path: "/login" },
      ],
    };
  },
    computed: {
        isLoggining() {
            return this.$store.getters.authStatus
        },
    },
};
</script>
