<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";

let drawerVisible = ref(false);

defineExpose({
  drawerVisible
});

</script>


<template>
  <v-app>
    <v-navigation-drawer v-model="drawerVisible">
      <v-list>
        <v-list-item
          link
          prepend-icon="mdi-account-outline"
          title="Minha conta"
          subtitle="Felipe"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          link
          prepend-icon="mdi-cart-outline"
          title="Carrinho"
        ></v-list-item>
        <v-list-item
          link
          prepend-icon="mdi-exit-to-app"
          title="Sair"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-menu" color="grey-lighten-5"
                          @click="drawerVisible = !drawerVisible"></v-app-bar-nav-icon>
      <v-app-bar-title>Cupcake</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

