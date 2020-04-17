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
            <md-field :class="getValidationClass('title')">
              <label for="title">Titúlo *</label>
              <md-input id="title" v-model="form.title" name="title" />
              <span v-if="!$v.form.title.required" class="md-error">
                É preciso informar um titúlo</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('image')">
              <label for="image">Imagem destaque</label>
              <md-file
                id="image"
                name="image"
                placeholder="Escolha uma imagem destaque"
                required
                @md-change="onFileUpload($event)"
              />
              <span v-if="!$v.form.image.required" class="md-error">
                É preciso selecionar uma imagem destaque
              </span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <editor-menu-bar
              v-slot="{ commands, isActive }"
              :editor="editor"
            >
              <div class="menubar">
                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                >
                  <icon name="bold" />
                </button>
                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"
                >
                  <icon name="italic" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.strike() }"
                  @click="commands.strike"
                >
                  <icon name="strike" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.underline() }"
                  @click="commands.underline"
                >
                  <icon name="underline" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.paragraph() }"
                  @click="commands.paragraph"
                >
                  <icon name="paragraph" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="commands.heading({ level: 1 })"
                >
                  H1
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                  @click="commands.heading({ level: 2 })"
                >
                  H2
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                  @click="commands.heading({ level: 3 })"
                >
                  H3
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bullet_list() }"
                  @click="commands.bullet_list"
                >
                  <icon name="ul" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.ordered_list"
                >
                  <icon name="ol" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.blockquote() }"
                  @click="commands.blockquote"
                >
                  <icon name="quote" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code_block() }"
                  @click="commands.code_block"
                >
                  <icon name="code" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  @click="commands.horizontal_rule"
                >
                  <icon name="hr" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  @click="commands.undo"
                >
                  <icon name="undo" />
                </button>

                <button
                  type="button"
                  class="menubar__button"
                  @click="commands.redo"
                >
                  <icon name="redo" />
                </button>
              </div>
            </editor-menu-bar>
            <editor-content class="editor__content" :editor="editor" />
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
import Icon from "../Icon";
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  name: "PostForm",
  components: {
    SpinnerButton,
    EditorMenuBar,
    EditorContent,
    Icon,
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
    post: {
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
      form: this.post,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: '',
      }),
    };
  },
  watch: {
    post(data) {
      this.form = data;
      this.updateArticle(this.post.article)
    }
  },
  mounted() {
    this.editor.on('update', ({ getHTML }) => {
      this.form.article = getHTML();
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    updateArticle(article) {
      this.editor.setContent(article);
    },
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
      title: {
        required
      },
      image: {
        required,
      },
      article: {
        required,
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.menubar {
  margin-top: 40px;
}

.editor__content {
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 20px;
}

.error {
  border: solid #ff0000 1px;
}
</style>
