<script setup lang="ts">
import ProductHttpAPI from "@/domains/product/ProductHttpAPI";
import { onMounted, ref } from "vue";
import type { ProductDTO } from "@/domains/product/ProductDTO";
import { useApplicationStore } from "@/stores/application";

const lProducts = ref([] as ProductDTO[]);
const lStore = useApplicationStore();

function listProducts() {
  new ProductHttpAPI().listProducts().then((r) => {
    lProducts.value = r.data;
  }).catch((e) => {
    lStore.showSnackbar(e.data);
    console.error(e);
  });
}

function formatDecimal(aValue: number, aLocale: string = "pt-BR"): string {
  const lFormatter = new Intl.NumberFormat(aLocale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return lFormatter.format(aValue);
}


onMounted(() => {
  listProducts();
});

</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col v-for="iProduct in lProducts" :key="iProduct.id_product" cols="12" xs="12" sm="12" md="6" lg="4">
          <v-card link :href="`/info/${iProduct.id_product}`">
            <v-card height="200">
              <v-img
                width="100%"
                :aspect-ratio="1"
                :src="iProduct.image_base64"
                cover
              ></v-img>
            </v-card>
            <div class="d-flex flex-column">
              <span class="d-flex justify-center pa-3 text-subtitle-1">{{ iProduct.name }}</span>
              <span class="d-flex justify-center pa-3 text-md-h4"
                    style="color: #50C878">R$ {{ formatDecimal(iProduct.price) }}</span>
              <v-btn variant="tonal">Buy</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
