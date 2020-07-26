<template>
<!-- App.vue -->

<v-app>
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini"
      permanent >
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

            <v-list-item v-for="item in items" :key="item.title" link  :to="item.path">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>

                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <!-- <v-card class="overflow-hidden" > -->
        <!-- shrink-on-scroll prominent  -->
    <v-app-bar app absolute color="indigo darken-2" dark  scroll-target="#scrolling-techniques">
        <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>


        <v-toolbar-title>Dashboard </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
    <v-sheet id="scrolling-techniques">
        <v-container style="height: 100px;">
        </v-container>
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

    <v-footer app
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
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
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavDrawer from './components/NavDrawer';

export default {
    name: 'App',

    components: {
        HelloWorld,
        NavDrawer
    },

    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard', path:'/' },
          { title: 'About', icon: 'question_answer', path:'/about' },
        ],
        icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
        mini:true
      }
    },
};
</script>
