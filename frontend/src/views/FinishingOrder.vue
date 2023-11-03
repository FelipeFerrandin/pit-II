<script setup lang="ts">
 import { ref } from "vue";

 const lHasAccount = ref(true)
</script>

<template>
  <main>
    <v-container>
      <v-card class="pa-5">
        <div class="d-flex justify-end w-100">
          <v-switch v-model="lHasAccount"  hide-details color="secondary" label="Do you have account?"></v-switch>
        </div>
      </v-card>
    </v-container>
  </main>
</template>