<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <product-form
          title="Editar Produto"
          button-title="Atualizar"
          :product="product"
          :loading="sending"
          @send-click="sendRequest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CharConverter, ProductForm } from "@/components";
import { fetchProduct, editProduct } from "@/api/product";

export default {
  name: "EditProduct",
  components: {
    ProductForm
  },
  props: {
    id: {
      type: String,
      default: "-1"
    }
  },
  data() {
    return {
      product: {
        id: 0,
        name: "",
        image: "",
        description: "",
      },
      sending: false
    };
  },
  computed: {
    intID() {
      return parseInt(this.id);
    }
  },
  created() {
    fetchProduct(this.intID)
      .then(response => {
        this.product = response.data
      })
      .catch(e => {
        console.log(e)
      })
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
        } else if (o !== "__typename") {
          clone[o] = obj[o];
        }
      }
      return clone;
    },
    cloneArrayCallback(current_value) {
      return this.cloneAndCleanObj(current_value);
    },
    sendRequest() {
      this.sending = true;
      editProduct(this.product)
        .then(data => {
          console.log({data})
        })
        .catch(e => {
          console.log(e)
        });
    }
  }
};
</script>
