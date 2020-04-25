<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="p-8 mx-auto max-w-5xl">
      <div class="flex">
        <ColorSelector :color="color" @color-change="onColorChange" />
        <div
          class="bg-white rounded shadow-lg px-6 py-4 mb-4 text-sm ml-4 font-mono"
        >
          <p class="mb-2 text-gray-700">
            <strong class="font-semibold text-gray-600">bright hues:</strong>
            <span class="font-mono">&nbsp;60° 180° 300°</span>
          </p>
          <p class="text-gray-700">
            <strong class="font-semibold text-gray-800">dark hues:</strong>
            <span class="font-mono">&nbsp;&nbsp;&nbsp;&nbsp;0° 120° 240°</span>
          </p>
        </div>
      </div>

      <Shades
        v-for="shadeGroup in shadeGroups"
        :key="shadeGroup._uid"
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
