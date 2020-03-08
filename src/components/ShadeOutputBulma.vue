<template>
  <div class="w-full rounded shadow-lg mb-4 relative bg-gray-800">
    <div class="w-full language-css rounded text-white py-8 px-10">
      <div class="w-full language-css text-md leading-loose family-mono">
        <span class="block">
          <span
            v-for="shade in shades"
            :key="shade.value"
            class="block w-64 flex"
            ><span class="text-indigo-200">{{ getSassVar(shade.value) }}:</span>
            <span class="text-gray-100 ml-auto">
              hsl({{ shade.hue }}, {{ shade.saturation }}%,
              {{ shade.lightness }}%)</span
            >
          </span>
        </span>
      </div>
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
    }
  }
}
</script>

<style lang="css" scoped></style>
