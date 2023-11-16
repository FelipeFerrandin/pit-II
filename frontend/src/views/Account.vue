<script setup lang="ts">
import { useRouter } from "vue-router";

const lRouter = useRouter();

function goTo(aRouteName: string) {
  lRouter.push({ name: aRouteName });
}


</script>

<template>
  <main>
    <v-container>
      <section class="d-flex flex-wrap">
        <v-card
          class="ma-2"
          width="400"
          title="My orders"
          subtitle="See your placed orders"
        >
          <v-card-actions>
            <v-btn
              class="ml-auto"
              variant="outlined"
              size="small"
              @click="goTo('orders');"
            >
              view
            </v-btn>
          </v-card-actions>

        </v-card>
        <v-card
          class="ma-2"
          width="400"
          title="Info account"
          subtitle="Change your account details"
        >

          <v-card-actions>
            <v-btn
              class="ml-auto"
              variant="outlined"
              size="small"
              @click="goTo('info-account');"
            >
              go to
            </v-btn>
          </v-card-actions>

        </v-card>
      </section>

    </v-container>
  </main>
</template>
