<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useApplicationStore } from "@/stores/application";

const lDrawerVisible = ref(false);
const lStore = useApplicationStore();
const lIsLogged = computed(() => lStore.getIsLogged);
const lRouter = useRouter();

function initLocalStorage() {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

function goTo(aRouteName: string) {
  lRouter.push({ name: aRouteName });
}

function logout() {
  lStore.logout();
  lRouter.push({ name: "home" });
}

onMounted(() => {
  initLocalStorage();
});

</script>


<template>
  <v-app>
    <v-navigation-drawer v-model="lDrawerVisible">
      <v-list>
        <v-list-item
          v-if="lIsLogged"
          link
          @click="goTo('account');"
          prepend-icon="mdi-account-outline"
          title="My account"
          :subtitle="lStore.getCustomer.name"
        ></v-list-item>

        <v-list-item
          v-if="!lIsLogged"
          link
          @click="goTo('login');"
          prepend-icon="mdi-account-outline"
          title="Login"
          subtitle="Register"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-if="lIsLogged"
          link href="/cart"
          prepend-icon="mdi-cart-outline"
          title="Cart"
        ></v-list-item>
        <v-list-item
          v-if="lIsLogged"
          link
          @click="logout"
          prepend-icon="mdi-exit-to-app"
          title="Exit"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-menu" color="grey-lighten-5"
                          @click="lDrawerVisible = !lDrawerVisible"></v-app-bar-nav-icon>
      <v-app-bar-title @click="goTo('home');" style="cursor: pointer">Cupcake</v-app-bar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn icon="mdi-cart-outline" @click="goTo('cart');"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
      <v-snackbar
        v-model="lStore.getSnackbarVisible"
        multi-line
      >
        {{ lStore.getSnackbarMessage }}
        <template v-slot:actions>
          <v-btn
            color="red"
            variant="text"
            @click="lStore.closeSnackBar"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
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