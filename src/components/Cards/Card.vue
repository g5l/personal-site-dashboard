<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img :src="cardImage" class="img"/>
    </div>

    <md-card-content>
      <h4 class="card-title">
        {{ cardTitle }}
      </h4>
      <md-button class="md-round md-warning" @click="update">
        Editar
      </md-button>
      <md-button class="md-round md-danger" @click="remove">
        Excluir
      </md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "Card",
  props: {
    cardTitle: {
      type: String,
      default: ""
    },
    cardImage: {
      type: String,
      default: require("@/assets/img/logo.png")
    }
  },
  methods: {
    update() {
      this.$emit("update");
    },
    remove() {
      this.$emit("remove");
    }
  }
};
</script>
<style>
.md-card-avatar img.not-found {
  background-color: white;
  object-fit: none;
}

.md-card-avatar {
  display: flex;
  padding: 12px;
  background: #fff;
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
}
</style>
