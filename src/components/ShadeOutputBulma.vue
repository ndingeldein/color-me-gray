<template>
  <div class="w-full rounded shadow-lg mb-4 relative bg-gray-800">
    <div class="w-full language-css rounded text-white py-8 px-10">
      <pre
        class="w-full language-css text-md leading-loose family-mono flex p-0"
      ><code class=""><span v-for="(shade, index) in primaryShades" :key="shade.title" class=""><span class="text-grey-200">$primary-{{ (index + 1) }}00:  </span><span class="text-blue-500">hsl</span><span class="text-blue-200">(<span class="text-red-400">{{ shade.hue }}</span>, <span class="text-red-400">{{ shade.saturation }}%</span>, <span class="text-red-400">{{ shade.lightness }}%</span>)</span>
</span>
<span v-for="shade in shades" :key="shade.value" class=""><span class="text-grey-200">{{ getSassVar(shade.value) }}: {{ getSpaces(shade.value) }}</span><span class="text-blue-500">hsl</span><span class="text-blue-200">(<span class="text-red-400">{{ shade.hue }}</span>, <span class="text-red-400">{{ shade.saturation }}%</span>, <span class="text-red-400">{{ shade.lightness }}%</span>)</span>
</span></code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShadeOutputBulma',

  props: {
    shades: {
      type: Array,
      required: true,
      validator: function(value) {
        return value.length === 9
      }
    },
    primaryShades: {
      type: Array,
      required: true,
      validator: function(value) {
        return value.length === 9
      }
    }
  },
  data() {
    return {
      sassVars: {
        100: '$white-bis',
        200: '$white-ter',
        300: '$grey-lighter',
        400: '$grey-light',
        500: '$grey',
        600: '$grey-dark',
        700: '$grey-darker',
        800: '$black-ter',
        900: '$black-bis'
      }
    }
  },
  methods: {
    getSassVar(value) {
      return this.sassVars[value]
    },
    getSpaces(value) {
      let numberOfSpaces = 13 - this.getSassVar(value).length
      let str = ''
      for (var i = numberOfSpaces - 1; i >= 0; i--) {
        str += ' '
      }
      return str
    }
  }
}
</script>

<style lang="css" scoped></style>
