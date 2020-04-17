<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button
          class="md-success"
          style="margin-left: auto; display: flex; margin-right: 15px"
          @click.native="createPost()"
        >
          Cadastrar
        </md-button>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">
              Postagens
            </h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="posts" table-header-color="orange">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Título">
                  {{ item.title }}
                </md-table-cell>
                <md-table-cell md-label="Data">
                  {{ dateFormated(item.createdAt) }}
                </md-table-cell>
                <md-table-cell md-label="Editar">
                  <md-button
                    class="md-warning"
                    style="margin: auto;"
                    @click.native="handleUpdate(item.slug)"
                  >
                    Editar
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
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
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Notícia excluido com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { fetchPosts, deletePost } from "@/api/blog";

export default {
  data() {
    return {
      posts: [],
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
  mounted() {
    window.scrollTo(0, 0);
    fetchPosts().then(({ data }) => {
      this.posts = data;
    })
    .catch(e => {
      console.log(e)
    });
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
    createPost() {
      this.$router.push({ name: "createPost" });
    },
    handleUpdate(slug) {
      this.$router.push({ name: "editPost", params: { slug } });
    },
    handleDelete(id) {
      this.confirmModalOpen = true;
      this.id = id;
    },
    delete(id) {
      deletePost(id);
      this.showSnackbar = true;
    },
    onCancel() {
      this.confirmModalOpen = false;
    },
    onConfirm() {
      this.confirmModalOpen = false;
      this.delete(this.id);
    },
    noticeImage(image) {
      //add process.env.API_PATH
      return 'http://localhost:3000' + image
    },
    dateFormated(date) {
      const d = new Date(date);
      const da = new Intl.DateTimeFormat('pt-br', { day: '2-digit' }).format(d);
      const mo = new Intl.DateTimeFormat('pt-br', { month: '2-digit' }).format(d);
      const ye = new Intl.DateTimeFormat('pt-br', { year: 'numeric' }).format(d);
      return `${da}-${mo}-${ye}`;
    }
  }
};
</script>