<template>
  <div class="spinner-button">
    <md-button class="md-raised" :class="buttonClass" v-if="isSending" title="Submitting form...">
      <md-progress-spinner
        :md-diameter="20"
        :md-stroke="3"
        md-mode="indeterminate"
      />
    </md-button>
    <md-button
      v-else
      class="spinner md-raised"
      :class="buttonClass"
      @click="handleSubmit"
    >
      <slot />
    </md-button>
  </div>
</template>

<script>
export default {
  name: "SpinnerButton",
  props: {
    isSending: {
      type: Boolean,
      default: false
    },
    buttonClass: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("submit-form");
    }
  }
};
</script>

<style scoped>
.spinner-button /deep/ .md-progress-spinner-circle {
  stroke: rgba(255, 255, 255, 0.8);
}
</style>
