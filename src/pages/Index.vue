<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="p-8 mx-auto">
      <div>
        <ColorSelector :color="color" @color-change="onColorChange" />
      </div>

      <Shades :color="color" />
    </div>
  </Layout>
</template>

<script>
import ColorSelector from '~/components/ColorSelector'
import Shades from '~/components/Shades'
export default {
  components: {
    ColorSelector,
    Shades
  },
  metaInfo: {
    title: 'Color Me Gray'
  },
  data() {
    return {
      color: '#32b1ca'
    }
  },
  methods: {
    onColorChange(newColor) {
      this.color = newColor.toUpperCase()
    }
  }
}
</script>

<style></style>
