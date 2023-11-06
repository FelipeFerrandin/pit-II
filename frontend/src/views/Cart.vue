<script setup lang="ts">

import { useApplicationStore } from "@/stores/application";

const lStore = useApplicationStore();

function removeItem(aIdProduct: bigint) {
  lStore.removeItemCart(aIdProduct);
}

function formatDecimal(aValue: number, aLocale: string = "pt-BR"): string {
  const lFormatter = new Intl.NumberFormat(aLocale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return lFormatter.format(aValue);
}

</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="6" sm="6" md="6" lg="9">
          <section v-if="lStore.getCartList.length == 0">
            <v-card class="pa-3" title="Your shopping cart is empty"></v-card>
          </section>
          <section v-if="lStore.getCartList.length > 0">
            <v-card class="pa-3" v-for="iProduct in lStore.getCartList" :key="iProduct.id_product">
              <div class="d-flex flex-wrap">
                <v-avatar
                  class="ma-3"
                  size="125"
                  rounded="0"
                >
                  <v-img :src="iProduct.image_base64"></v-img>
                </v-avatar>

                <div class="w-50">
                  <v-card-title class="text-h5">
                    {{ iProduct.name }}
                  </v-card-title>

                  <v-card-subtitle>
                    <span>{{ iProduct.description }}</span>
                  </v-card-subtitle>

                  <v-card-subtitle class="mt-1">
                    <span>Quantity: {{ iProduct.quantity }}</span>
                  </v-card-subtitle>

                </div>

                <v-card-actions class="ml-auto">
                  <v-btn density="default" icon="mdi-trash-can-outline"
                         @click="removeItem(iProduct.id_product)"></v-btn>
                </v-card-actions>
              </div>


              <v-divider></v-divider>

            </v-card>
          </section>
        </v-col>
        <v-col cols="12" xs="6" sm="6" md="6" lg="3">
          <v-card class="pa-4">
            <div>
              <v-card-title class="text-h5">
                Resume
              </v-card-title>

              <v-card-subtitle class="my-3 d-flex justify-lg-space-between">
                <span>Value of products:</span>
                <span>R$ {{ formatDecimal(lStore.getTotalCart) }}</span>
              </v-card-subtitle>

              <v-divider></v-divider>

              <v-card-subtitle class="my-3 d-flex justify-lg-space-between">
                <span>Total:</span>
                <span>R$ {{ formatDecimal(lStore.getTotalCart) }}</span>
              </v-card-subtitle>

              <div class="w-100" v-if="lStore.getCartList.length > 0">
                <v-btn class="w-100" variant="tonal" @click="this.$router.push('/finishing-order');">Finish</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
