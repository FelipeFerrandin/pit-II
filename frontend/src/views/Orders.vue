<script setup lang="ts">
import OrderHTTPAPI from "@/domains/order/OrderHTTPAPI";
import { useApplicationStore } from "@/stores/application";
import { onMounted, ref } from "vue";
import { OrderListDTO } from "@/domains/order/OrderDTO";
import { useRouter } from "vue-router";

const lStore = useApplicationStore();
const lOrderListDTO = ref([] as OrderListDTO[]);

function getFinishOrders() {
  new OrderHTTPAPI().getFinishOrders(lStore.getCustomer.id_customer).then((r) => {
    lOrderListDTO.value = r.data;
  }).catch((e) => {
    lStore.showSnackbar(e);
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
  getFinishOrders();
});

const lRouter = useRouter();

function goTo(aRouteName: string) {
  lRouter.push({ name: aRouteName });
}
</script>

<template>

  <v-btn variant="text" icon="mdi-arrow-left" @click="goTo('account');" class="ml-2 mt-2"></v-btn>

  <main>
    <v-container>
      <section v-if="lOrderListDTO.length == 0">
        <v-card class="pa-3" title="No orders placed"></v-card>
      </section>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="iOrderListDTO in lOrderListDTO"
          :key="iOrderListDTO.id_order"
        >
          <v-expansion-panel-title>
            <div class="d-flex justify-space-between w-50">
              <span>#ID {{ iOrderListDTO.id_order }}</span>
              <span>Status {{ iOrderListDTO.status }}</span>
              <span>Total R$ {{ formatDecimal(iOrderListDTO.total) }}</span>
            </div>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-list lines="two">
              <v-list-item
                v-for="iProducts in iOrderListDTO.products"
                :key="iProducts.id_order_product"
                :prepend-avatar="iProducts.image_base64"
              >

                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span>{{ iProducts.name }}</span>
                    <span>R$ {{ formatDecimal(iProducts.subtotal) }}</span>
                  </div>
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ iProducts.description }} - {{ iProducts.quantity }}x
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