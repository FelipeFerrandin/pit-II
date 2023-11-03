<script setup lang="ts">
import lImageCupcake from "@/assets/pexels-photo-1055271.jpeg";
</script>

<template>

  <v-btn variant="text" icon="mdi-arrow-left" @click="this.$router.push('/account');" class="ml-2 mt-2"></v-btn>

  <main>
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="i in 3"
          :key="i"
        >
          <v-expansion-panel-title>
            <div class="d-flex justify-space-between w-50">
              <span>#ID 10</span>
              <span>Status FECHADO</span>
              <span>Total R$ 10,99</span>
            </div>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-list lines="two">
              <v-list-item
                v-for="n in 3"
                :key="n"
                :prepend-avatar="lImageCupcake"
              >

                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span>Cupcake jubileu conterraneo</span>
                    <span>R$ 10,99</span>
                  </div>
                </v-list-item-title>

                <v-list-item-subtitle>
                  Feito de erva mate - 10x
                </v-list-item-subtitle>


              </v-list-item>
            </v-list>
          </v-expansion-panel-text>

        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </main>
</template>

<style scoped lang="scss">

</style>