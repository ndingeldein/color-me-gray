<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="p-8 mx-auto max-w-5xl">
      <div>
        <ColorSelector :color="color" @color-change="onColorChange" />
      </div>

      <Shades
        v-for="shadeGroup in shadeGroups"
        :key="shadeGroup.id"
        :color="shadeGroup.color"
        @close-clicked="removeShadeGroup(shadeGroup)"
      />
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
      color: '#000000',
      shadeGroups: []
    }
  },
  methods: {
    onColorChange(newColor) {
      this.shadeGroups.push({
        id: this.shadeGroups.length,
        color: newColor.toUpperCase()
      })
    },
    removeShadeGroup(shadeGroup) {
      this.shadeGroups.splice(this.shadeGroups.indexOf(shadeGroup), 1)
    }
  }
}
</script>

<style></style>
