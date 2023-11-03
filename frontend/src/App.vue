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
          @click="this.$router.push('/account');"
          prepend-icon="mdi-account-outline"
          title="My account"
          subtitle="Felipe"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          link href="/cart"
          prepend-icon="mdi-cart-outline"
          title="Cart"
        ></v-list-item>
        <v-list-item
          link
          prepend-icon="mdi-exit-to-app"
          title="Exit"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-menu" color="grey-lighten-5" @click="drawerVisible = !drawerVisible"></v-app-bar-nav-icon>
      <v-app-bar-title @click="this.$router.push('/');" style="cursor: pointer">Cupcake</v-app-bar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn icon="mdi-cart-outline" @click="this.$router.push('/cart');"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: #FFFF;
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background: #54545400;
}
</style>