<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <notice-form
          title="Cadastrar Notícia"
          button-title="Cadastrar"
          :categories="categories"
          :notice="notice"
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
      <span>Notícia criada com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { CharConverter, NoticeForm } from "@/components";
import { createNotice, fetchCategories } from "@/api/notice";

export default {
  name: "CreatePorduct",
  components: {
    NoticeForm
  },
  data() {
    return {
      notice: {
        id: 0,
        title: "",
        image: "",
        article: "",
        date: "",
        noticeCategoryId: 0,
        source: "",
      },
      sending: false,
      showSnackbar: false,
      categories: [],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    fetchCategories().then(({ data }) => {
      this.categories = data;
    })
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
      createNotice(this.notice)
        .then(data => { 
          this.notice = {};
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
