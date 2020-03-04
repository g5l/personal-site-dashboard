<template>
  <form>
    <md-card>
      <md-card-header class="header" data-background-color="orange">
        <div>
          <h4 class="title">
            {{ title }}
          </h4>
          <p class="category">
            {{ description }}
          </p>
        </div>
      </md-card-header>

      <md-card-content>
        <div v-if="form" class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('name')">
              <label for="name">Nome *</label>
              <md-input id="name" v-model="form.name" name="name" />
              <span v-if="!$v.form.name.required" class="md-error">
                É preciso informar um nome</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('image')">
              <label for="image">Imagem</label>
              <md-file
                id="image"
                name="image"
                placeholder="Escolha uma imagem"
                required
                @md-change="onFileUpload($event)"
              />
              <span v-if="!$v.form.image.required" class="md-error">
                É preciso selecionar uma imagem
              </span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('description')">
              <label for="description">Descrição</label>
              <md-textarea id="description" v-model="form.description" required />
              <span v-if="!$v.form.description.required" class="md-error">
                É preciso informar uma descrição
              </span>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <spinner-button
              type="submit"
              button-class="md-success"
              :disabled="btnDisabled"
              :is-sending="loading"
              @submit-form="validateUser"
            >
              {{ buttonTitle }}
            </spinner-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import SpinnerButton from "../Buttons/SpinnerButton.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductForm",
  components: {
    SpinnerButton
  },
  mixins: [validationMixin],
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    buttonTitle: {
      type: String,
      default: ""
    },
    product: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnDisabled: false,
      form: this.product
    };
  },
  watch: {
    product(data) {
      this.form = data;
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateUser() {
      this.btnDisabled = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.handleSend();
      } else {
        this.btnDisabled = false;
      }
    },
    onFileUpload(event) {
      this.form.image = event[0]
    },
    handleSend() {
      this.$emit("send-click");
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      image: {
        required,
      },
      description: {
        required,
      }
    }
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.delete {
  display: flex;
  align-self: center;
  height: 100%;
  cursor: pointer;
  font-size: 40px;
}

.error {
  border: solid #ff0000 1px;
}
</style>
