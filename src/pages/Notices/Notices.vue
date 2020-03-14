<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button
          class="md-success"
          style="margin-left: auto; display: flex; margin-right: 15px"
          @click.native="createNotice()"
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
              Notícias
            </h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="notices" table-header-color="orange">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Título">
                  {{ item.title }}
                </md-table-cell>
                <md-table-cell md-label="Categoria">
                  {{ item.notice_category_id }}
                </md-table-cell>
                <md-table-cell md-label="Data">
                  {{ item.createdAt }}
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
import { fetchNotices, deleteNotice } from "@/api/notice";

export default {
  data() {
    return {
      notices: [],
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
    fetchNotices().then(({ data }) => {
      this.notices = data;
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
    createNotice() {
      this.$router.push({ name: "createNotice" });
    },
    handleUpdate(id) {
      this.$router.push({ name: "editNotice", params: { id } });
    },
    handleDelete(id) {
      this.confirmModalOpen = true;
      this.id = id;
    },
    delete(id) {
      deleteNotice(id);
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
  }
};
</script>