<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button
          class="md-success"
          style="margin-left: auto; display: flex; margin-right: 15px"
          @click.native="createProduct()"
        >
          Cadastrar
        </md-button>
      </div>
    </div>
    <div class="md-layout">
      <div
        v-for="(product, key) in products"
        :id="key"
        :key="key"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <card
          :card-title="product.name"
          :card-image="productImage(product.image)"
          @update="handleUpdate(product.id)"
          @remove="handleDelete(product.id)"
        />
      </div>
    </div>
    <md-dialog-confirm
      :md-active.sync="confirmModalOpen"
      md-title="Quer mesmo excluir?"
      md-cancel-text="Não"
      md-confirm-text="Sim"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <md-snackbar
      md-position="right"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Produto excluido com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { Card } from "@/components";
import { fetchProducts, deleteProduct } from "@/api/product";

export default {
  components: {
    Card
  },
  data() {
    return {
      products: null,
      confirmModalOpen: false,
      id: -1,
      showSnackbar: false
    };
  },
  computed: {
    groupByPropertyDeveloper() {
      let list = {};
      for (let i in this.enterprise) {
        const { property_developer: propDev } = this.enterprise[i];
        if (propDev) {
          if (!(propDev.name in list)) {
            list[propDev.name] = [];
          }
          list[propDev.name].push(this.filterData(this.enterprise[i]));
        }
      }
      return list;
    }
  },
  created() {
    fetchProducts().then(response => {
      this.products = response.data
    })
    .catch(e => {
      console.log(e)
    })
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    tableDescription(table) {
      return `${table.length} registros`;
    },
    filterData(enterprise) {
      let newEnterprise = {};
      newEnterprise["id"] = enterprise.id;
      newEnterprise["Nome"] = enterprise.name;

      newEnterprise["Status"] =
        enterprise.status === "active" ? "Ativado" : "Desativado";
      return newEnterprise;
    },
    createProduct() {
      this.$router.push({ name: "createProduct" });
    },
    handleUpdate(id) {
      this.$router.push({ name: "editProduct", params: { id } });
    },
    handleDelete(id) {
      this.confirmModalOpen = true;
      this.id = id;
    },
    delete(id) {
      deleteProduct(id);
      this.showSnackbar = true;
    },
    onCancel() {
      this.confirmModalOpen = false;
    },
    onConfirm() {
      this.confirmModalOpen = false;
      this.delete(this.id);
    },
    productImage(image) {
      //add process.env.API_PATH
      return 'http://localhost:3000' + image
    },
  }
};
</script>