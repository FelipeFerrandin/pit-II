import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductCartDTO, ProductDTO } from "@/domains/product/ProductDTO";
import { CustomerDTO } from "@/domains/customer/CustomerDTO";
import ErrorHandling from "@/framework/error/ErrorHandling";

export const useApplicationStore = defineStore("application", {
  state: () => ({
    token: ref(""),
    isLogged: ref(false),
    cartList: ref([] as ProductCartDTO[]),
    totalCart: 0.0,
    snackbarVisible: ref(false),
    messageSnackBar: ref(""),
    customer: ref(new CustomerDTO())
  }),

  getters: {
    getIsLogged(state) {
      state.token = this.getToken;
      return !["", null, undefined].includes(state.token);
    },
    getToken(state) {
      state.token = localStorage.getItem("token")!;
      return state.token;
    },
    getCustomer(state): CustomerDTO {
      state.customer = JSON.parse(localStorage.getItem("customer")!);
      return state.customer;
    },
    getCartList(state): ProductCartDTO[] {
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
      localStorage.removeItem("customer");
    },

    login(aToken: string) {
      if (["", undefined, null].includes(aToken)) throw Error("Token is invalid");
      this.token = aToken;
      this.isLogged = true;
      localStorage.setItem("token", aToken);
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("customer", JSON.stringify(null));
    },

    setToken(aToken: string) {
      if (["", undefined, null].includes(aToken)) throw Error("Token is invalid");
      this.token = aToken;
      this.isLogged = true;
      localStorage.setItem("token", aToken);
    },

    setCustomer(aCustomerDTO: CustomerDTO) {
      this.customer = aCustomerDTO;
      localStorage.setItem("customer", JSON.stringify(aCustomerDTO));
    },

    addItemCart(aQuantity: number, aMaxQuantity: number, aProductDTO: ProductDTO) {
      const lListProducts = this.getCartList;
      const lProductIndex = lListProducts.findIndex((iValue) => iValue.id_product == aProductDTO.id_product);

      if (lProductIndex != -1) {
        if ((lListProducts[lProductIndex].quantity + aQuantity) > aMaxQuantity) throw Error("Largest chosen quantity you have in stock");
        lListProducts[lProductIndex].quantity += aQuantity;
      } else {
        aProductDTO.quantity = aQuantity;
        lListProducts.push({
          id_product: aProductDTO.id_product,
          name: aProductDTO.name,
          price: aProductDTO.price,
          description: aProductDTO.description,
          quantity: aProductDTO.quantity,
          max_quantity: aMaxQuantity,
          image_base64: aProductDTO.image_base64
        });
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

    showSnackbar(aMessage: any) {
      this.snackbarVisible = true;
      this.messageSnackBar = ErrorHandling.process(aMessage);
      setTimeout(() => {
        this.snackbarVisible = false;
      }, 3000);
    },

    closeSnackBar() {
      this.snackbarVisible = false;
    },

    updateCartList(){
      localStorage.setItem("cart", JSON.stringify(this.getCartList))
    }
  }
});
