<script setup lang="ts">
import { useRoute } from "vue-router";
import ProductHttpAPI from "@/domains/product/ProductHttpAPI";
import { onMounted, ref } from "vue";
import { ProductDTO } from "@/domains/product/ProductDTO";
import { useApplicationStore } from "@/stores/application";

const lRoute = useRoute();
const lIdProduct = lRoute.params.id;
const lProduct = ref(new ProductDTO());
const lStore = useApplicationStore();
const lQuantity = ref(1);
const lMaxQuantity = ref(0);

function arrayItems(aQuantity: number) {
  let arrayRegressive = [];

  for (let i = aQuantity; i >= 1; i--) {
    arrayRegressive.push(i);
  }

  return arrayRegressive.sort((a, b) => a - b);
}


function getProductById() {
  new ProductHttpAPI().getProductById(+lIdProduct).then((r) => {
    lProduct.value = r.data;
    lMaxQuantity.value = r.data.quantity;
  }).catch((e) => {
    lStore.showSnackbar(e);
  });
}

function buyProduct(aQuantity: number, aProductDTO: ProductDTO) {
  try {
    lStore.addItemCart(aQuantity, lMaxQuantity.value, aProductDTO);
    lStore.showSnackbar("Item successfully added to cart !!!");
  } catch (e) {
    lStore.showSnackbar(e);
  }
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
  getProductById();
});

</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="6" sm="6" md="6" lg="6">
          <v-img
            width="100%"
            :aspect-ratio="1"
            :src="lProduct.image_base64"
            cover
          ></v-img>
        </v-col>
        <v-col cols="12" xs="6" sm="6" md="6" lg="6">
          <div class="d-flex flex-column justify-center w-100 h-100">
            <span class="text-h2 mx-auto" style="text-align: center">{{ lProduct.name }}</span>
            <span class="text-subtitle-1 mx-auto" style="text-align: center">{{ lProduct.description }}</span>
            <div class="d-flex align-content-space-between mt-5">
              <div style="width: 30%">
                <v-select
                  hide-details
                  v-model="lQuantity"
                  label="Quantity"
                  :items="arrayItems(lProduct.quantity)"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </div>
              <div class="ma-auto" style="width: 65%">
                <v-btn variant="tonal" class="w-100" size="large" @click="buyProduct(lQuantity,lProduct)">Buy</v-btn>
              </div>
            </div>
            <div class="d-flex justify-end mt-5 mr-5">
              <span class="text-h2" style="color: #50C878">R$ {{ formatDecimal(lProduct.price) }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
