import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductDTO } from "@/domains/product/ProductDTO";

export const useApplicationStore = defineStore("application", {
  state: () => ({
    token: ref(""),
    isLogged: ref(true),
    cartList: ref([] as ProductDTO[]),
    totalCart: 0.0,
    snackbarVisible: ref(false),
    messageSnackBar: ref("")
  }),

  getters: {
    getIsLogged(state) {
      // return state.isLogged && state.token && localStorage.getItem("token");
      return state.isLogged;
    },
    getToken(state) {
      return state.token;
    },
    getCartList(state): ProductDTO[] {
      state.cartList = JSON.parse(localStorage.getItem("cart")!);
      return state.cartList;
    },
    getTotalCart(state) {
      this.totalCart = this.getCartList.reduce((sum, item) => sum + item.price! * item.quantity, 0);
      return state.totalCart;
    },
    getSnackbarVisible(state) {
      return state.snackbarVisible;
    },
    getSnackbarMessage(state) {
      return state.messageSnackBar;
    }
  },
  actions: {
    logout() {
      this.token = "";
      this.isLogged = false;
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
    },

    login(aToken: string) {
      if (["", undefined, null].includes(aToken)) throw Error("Token is invalid");
      this.token = aToken;
      this.isLogged = true;
      localStorage.setItem("token", aToken);
      localStorage.setItem("cart", JSON.stringify([]));
    },

    addItemCart(aQuantity: number, aMaxQuantity: number, aProductDTO: ProductDTO) {
      const lListProducts = this.getCartList;
      const lProductIndex = lListProducts.findIndex((iValue) => iValue.id_product == aProductDTO.id_product);

      if (lProductIndex != -1) {
        if ((lListProducts[lProductIndex].quantity + aQuantity) > aMaxQuantity) throw Error("Largest chosen quantity you have in stock");
        lListProducts[lProductIndex].quantity += aQuantity;
      } else {
        aProductDTO.quantity = aQuantity;
        lListProducts.push(aProductDTO);
      }

      localStorage.setItem("cart", JSON.stringify(lListProducts));
      this.getTotalCart;
    },

    removeItemCart(aIdProduct: bigint) {
      const lProductIndex = this.getCartList.findIndex((iValue) => iValue.id_product == aIdProduct);
      console.log(lProductIndex);
      this.cartList.splice(lProductIndex, 1);
      localStorage.setItem("cart", JSON.stringify(this.getCartList));
      this.getTotalCart;
    },

    finishOrder() {
      this.cartList = [];
      this.totalCart = 0;
      localStorage.setItem("cart", JSON.stringify(this.cartList));
    },

    showSnackbar(aMessage: string) {
      this.snackbarVisible = true;
      this.messageSnackBar = aMessage;
    },

    closeSnackBar() {
      this.snackbarVisible = false;
    }
  }
});
