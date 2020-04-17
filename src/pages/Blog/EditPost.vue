<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <post-form
          title="Editar Post"
          button-title="Editar"
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
      <span>Postagem editada com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { CharConverter, PostForm } from "@/components";
import { editPost, fetchPost } from "@/api/blog";

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

    const postSlug = this.$route.params.slug;

    fetchPost(postSlug).then(({ data }) => {
      this.post = data;
    })
    .catch(e => {
      console.log(e)
    });
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
      editPost(this.post)
        .then(data => { 
          this.post = {};
          this.showSnackbar = true;
          this.sending = false;
        });
    },
  },
};
</script>