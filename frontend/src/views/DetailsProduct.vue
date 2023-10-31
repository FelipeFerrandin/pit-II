<script setup lang="ts">
import lImageCupcake from "@/assets/pexels-photo-1055271.jpeg";
</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="6" sm="6" md="6" lg="6">
          <v-img
            width="100%"
            :aspect-ratio="1"
            :src="lImageCupcake"
            cover
          ></v-img>
        </v-col>
        <v-col cols="12" xs="6" sm="6" md="6" lg="6">
          <div class="d-flex flex-column justify-center w-100 h-100">
            <span class="text-h2 mx-auto">Cupcake jubileu conterraneo</span>
            <span class="text-subtitle-1 mx-auto">Feito de erva mate </span>
            <div class="d-flex align-content-space-between mt-5">
              <div style="width: 30%">
                <v-select
                  hide-details
                  label="Quantity"
                  :items="[1,2,3,4]"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </div>
              <div class="ma-auto" style="width: 65%">
                <v-btn variant="tonal" class="w-100" size="large">Buy</v-btn>
              </div>
            </div>
            <div class="d-flex justify-end mt-5 mr-5">
              <span class="text-h2" style="color: #50C878">R$ 9,99</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
