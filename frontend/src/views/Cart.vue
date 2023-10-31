<script setup lang="ts">
import lImageCupcake from "@/assets/pexels-photo-1055271.jpeg";
</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="9" sm="9" md="9" lg="9">
          <v-card class="pa-3">
            <div class="d-flex flex-no-wrap">
              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <v-img :src="lImageCupcake"></v-img>
              </v-avatar>

              <div>
                <v-card-title class="text-h5">
                  Supermodel
                </v-card-title>

                <v-card-subtitle>Foster the People</v-card-subtitle>
              </div>

              <v-card-actions class="ml-auto">
                <v-btn density="default" icon="mdi-trash-can-outline"></v-btn>
              </v-card-actions>
            </div>


            <v-divider></v-divider>

          </v-card>
        </v-col>
        <v-col cols="12" xs="3" sm="3" md="3" lg="3">
          <v-card title="This is a title"
                  subtitle="This is a subtitle"
          ></v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
