<template>
  <div>
    <loading
      :active="enabled"
      :can-cancel="false"
      :is-full-page="fullScreen"
      :color="loading.color"
      :background-color="loading.backgroundColor"
      :height="loading.height"
      :width="loading.width"
      :opacity="loading.opacity"
      @update:active="$emit('update:enabled', $event)"
    ></loading>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "g-progress",
  components: {
    Loading
  },
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: false
    },
    fullScreen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: {
        color: "blue",
        backgroundColor: "#f5f5f5",
        height: 100,
        width: 100,
        opacity: 1
      }
    };
  }
};
</script>
