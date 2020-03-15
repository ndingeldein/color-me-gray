<template>
  <div class="w-full">
    <div class="w-full rounded bg-white shadow-lg px-4 pt-4 pb-6 mb-4 relative">
      <h2 class="font-medium mb-2">
        <input
          v-model="title"
          v-autowidth="{ maxWidth: '300px', minWidth: '20px', comfortZone: 0 }"
          class="font-medium text-lg text-gray-800 p-2 inline-block mr-2 w-auto outline-none focus:bg-gray-200"
        />
        <span class="text-gray-500 inline-block p-2 mr-2 text-sm">{{
          hslFull
        }}</span>
        <span class="text-gray-500 inline-block p-2 text-sm mr-2">{{
          color
        }}</span>
      </h2>
      <div class="flex justify-between">
        <ColorBox
          v-for="shade in shades"
          :key="shade.value"
          :title="shade.title"
          :value="shade.value"
          :hue="shade.hue"
          :saturation="shade.saturation"
          :lightness="shade.lightness"
          @hue-updated="onHueUpdated"
          @saturation-updated="onSaturationUpdated"
          @lightness-updated="onLightnessUpdated"
        ></ColorBox>
      </div>
      <div
        class="close text-gray-400 hover:text-gray-800 absolute p-2 right-0 top-0 cursor-pointer"
        @click="$emit('close-clicked')"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="times"
          class="svg-inline--fa fa-times fa-w-10 w-6 h-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
          ></path>
        </svg>
      </div>
    </div>
    <ShadeOutputBulma :shades="shades" />
  </div>
</template>

<script>
import ColorBox from '~/components/ColorBox'
import ShadeOutputBulma from '~/components/ShadeOutputBulma'
const hexCodeRegex = /^#[0-9A-F]{6}$/i

function hexToRgb(hex) {
  let r = 0
  let g = 0
  let b = 0
  if (hex.length == 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]
  } else if (hex.length == 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }
  return {
    red: r,
    green: g,
    blue: b
  }
}
function rgbToHsl(rgb) {
  let r = rgb.red / 255
  let g = rgb.green / 255
  let b = rgb.blue / 255
  let cmin = Math.min(r, g, b)
  let cmax = Math.max(r, g, b)
  let delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0
  if (delta == 0) h = 0
  else if (cmax == r) h = ((g - b) / delta) % 6
  else if (cmax == g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = Math.round(+(s * 100))
  l = Math.round(+(l * 100))

  return {
    hue: h,
    saturation: s,
    lightness: l
  }
}

function hexToHsl(hex) {
  let rgb = hexToRgb(hex)
  return rgbToHsl(rgb)
}

export default {
  name: 'Shades',
  components: {
    ColorBox,
    ShadeOutputBulma
  },

  props: {
    color: {
      type: String,
      default: '#32b1ca',
      required: true,
      validator: function(value) {
        return hexCodeRegex.test(value)
      }
    }
  },
  data() {
    let shades = []
    for (var i = 9; i > 0; i--) {
      // saturation: low 15, high 45
      let sat = Math.round((Math.abs(i - 5) / 4) * 30 + 15)
      let shade = {
        title: 'Gray',
        value: (10 - i) * 100,
        hue: hexToHsl(this.color).hue,
        saturation: sat,
        lightness: i * 10
      }
      shades.push(shade)
    }
    return {
      title: 'Gray',
      shades: shades
    }
  },
  computed: {
    hslFull() {
      return `hsl(${this.hsl.hue}, ${this.hsl.saturation}%, ${this.hsl.lightness}%)`
    },
    hsl() {
      // Then to HSL
      return hexToHsl(this.color)
    }
  },
  methods: {
    onHueUpdated({ value, hue }) {
      let shade = this.shades.find(shade => shade.value === value)
      shade.hue = hue
    },
    onSaturationUpdated({ value, saturation }) {
      let shade = this.shades.find(shade => shade.value === value)
      shade.saturation = saturation
    },
    onLightnessUpdated({ value, lightness }) {
      let shade = this.shades.find(shade => shade.value === value)
      shade.lightness = lightness
    }
  }
}
</script>

<style lang="css" scoped></style>
