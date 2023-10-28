<script setup lang="ts"></script>

<template>
  <main>
    <v-container>

      <v-row>
        <v-col v-for="n in 24" :key="n" cols="12" xs="12" sm="12" md="6" lg="4">
          <v-card height="200"></v-card>
        </v-col>
      </v-row>

    </v-container>
  </main>
</template>
