<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <product-form
          title="Cadastrar Produto"
          button-title="Cadastrar"
          :product="product"
          :loading="sending"
          @send-click="sendRequest"
        />
      </div>
    </div>
    <md-snackbar
      md-position="left"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Produto criado com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { CharConverter, ProductForm } from "@/components";
import { createProduct } from "@/api/product";

export default {
  name: "CreatePorduct",
  components: {
    ProductForm
  },
  data() {
    return {
      product: {
        id: 0,
        name: "",
        image: "",
        description: ""
      },
      sending: false,
      showSnackbar: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    cloneAndCleanObj(obj) {
      var clone = {};
      for (var o in obj) {
        if (obj[o] == null) {
          clone[o] = null;
        } else if (Array.isArray(obj)) {
          clone = obj.map(this.cloneArrayCallback);
        } else if (typeof obj[o] == "object") {
          clone[o] = this.cloneAndCleanObj(obj[o]);
        } else if (o !== "__typename" && o !== "validationId") {
          if (typeof obj[o] === "string") {
            const conversor = new CharConverter(obj[o]);
            clone[o] = conversor.utf8ToAscii();
          } else {
            clone[o] = obj[o];
          }
        }
      }
      return clone;
    },
    cloneArrayCallback(current_value) {
      return this.cloneAndCleanObj(current_value);
    },
    sendRequest() {
      this.sending = true;
      createProduct(this.product)
        .then(data => { 
          this.product = {};
          this.showSnackbar = true;
          this.sending = false;
        });
    },
  },
};
</script>

<style scoped>
.create {
  display: flex;
  align-self: center;
  height: 100%;
  font-size: 40px;
}

.create.add-button {
  display: flex;
  justify-content: center;
}

.no-apartments-div {
  position: relative;
}

.no-apartments-btn {
  position: absolute;
  top: 44.8%;
}
</style>
