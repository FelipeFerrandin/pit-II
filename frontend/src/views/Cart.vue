<script setup lang="ts">
import lImageCupcake from "@/assets/pexels-photo-1055271.jpeg";
</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="6" sm="6" md="6" lg="9">
          <v-card class="pa-3">
            <div class="d-flex flex-wrap">
              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <v-img :src="lImageCupcake"></v-img>
              </v-avatar>

              <div>
                <v-card-title class="text-h5">
                  Cupcake jubileu conterraneo
                </v-card-title>

                <v-card-subtitle>
                  <span>Feito de erva mate</span>
                </v-card-subtitle>

                <v-card-subtitle class="mt-1">
                  <span>Quantity: 10</span>
                </v-card-subtitle>

              </div>

              <v-card-actions class="ml-auto">
                <v-btn density="default" icon="mdi-trash-can-outline"></v-btn>
              </v-card-actions>
            </div>


            <v-divider></v-divider>

          </v-card>
        </v-col>
        <v-col cols="12" xs="6" sm="6" md="6" lg="3">
          <v-card class="pa-4">
            <div>
              <v-card-title class="text-h5">
                Resume
              </v-card-title>

              <v-card-subtitle class="my-3 d-flex justify-lg-space-between">
                <span>Value of products:</span>
                <span>R$ 10,99</span>
              </v-card-subtitle>

              <v-divider></v-divider>

              <v-card-subtitle class="my-3 d-flex justify-lg-space-between">
                <span>Total:</span>
                <span>R$ 10,99</span>
              </v-card-subtitle>

              <div class="w-100">
                <v-btn class="w-100" variant="tonal" @click="this.$router.push('/finishing-order');">Finish</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
