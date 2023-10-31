<script setup lang="ts">
import lImageCupcake from "@/assets/pexels-photo-1055271.jpeg";
</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col v-for="n in 24" :key="n" cols="12" xs="12" sm="12" md="6" lg="4">
          <v-card link href="/info">
            <v-card height="200">
              <v-img
                width="100%"
                :aspect-ratio="1"
                :src="lImageCupcake"
                cover
              ></v-img>
            </v-card>
            <div class="d-flex flex-column">
              <span class="d-flex justify-center pa-3 text-subtitle-1">Cupcake jeromel</span>
              <span class="d-flex justify-center pa-3 text-md-h4" style="color: #50C878">R$ 3,99</span>
              <v-btn variant="tonal">Comprar</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
