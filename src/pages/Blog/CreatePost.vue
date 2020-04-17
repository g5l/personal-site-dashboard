<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <post-form
          title="Cadastrar Post"
          button-title="Cadastrar"
          :post="post"
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
      <span>Postagem criada com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { CharConverter, PostForm } from "@/components";
import { createPost } from "@/api/blog";

export default {
  name: "CreatePost",
  components: {
    PostForm
  },
  data() {
    return {
      post: {
        id: 0,
        title: "",
        image: "",
        article: "",
      },
      sending: false,
      showSnackbar: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    sendRequest() {
      this.sending = true;
      createPost(this.post)
        .then(data => { 
          this.post = {};
          this.showSnackbar = true;
          this.sending = false;
        });
    },
  },
};
</script>
