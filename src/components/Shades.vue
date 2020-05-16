<template>
  <div class="w-full">
    <div class="w-full rounded bg-white shadow-lg px-4 pt-4 pb-6 mb-4 relative">
      <h2 class="font-medium mb-2">
        <input
          v-model="primaryTitle"
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
          v-for="shade in primaryShades"
          :key="shade.title"
          :title="shade.title"
          :value="shade.value"
          :hue="shade.hue"
          :saturation="shade.saturation"
          :lightness="shade.lightness"
          @hue-updated="onPrimaryHueUpdated"
          @saturation-updated="onPrimarySaturationUpdated"
          @lightness-updated="onPrimaryLightnessUpdated"
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
    <ShadeOutputBulma :shades="shades" :primary-shades="primaryShades" />
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

function HSLToHex(h, s, l) {
  s /= 100
  l /= 100

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16)
  g = Math.round((g + m) * 255).toString(16)
  b = Math.round((b + m) * 255).toString(16)

  // Prepend 0s, if necessary
  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b

  return '#' + r + g + b
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
    let hue = hexToHsl(this.color).hue

    let brightHues = [60, 180, 300]
    let darkHues = [0, 120, 240]
    let brightHue = Math.min(
      ...brightHues.map(bh => {
        return Math.abs(hue - bh)
      })
    )

    let hues

    if (hue - brightHue) {
      hues = [
        hue - 6,
        hue - 5,
        hue - 4,
        hue - 2,
        hue,
        hue + 2,
        hue + 4,
        hue + 5,
        hue + 6
      ]
    } else {
      hues = [
        hue + 6,
        hue + 5,
        hue + 4,
        hue + 2,
        hue,
        hue - 2,
        hue - 4,
        hue - 5,
        hue - 6
      ]
    }

    let saturation = [45, 38, 32, 25, 20, 15, 17, 23, 26]
    let lightness = [97, 91, 84, 69, 52, 41, 32, 23, 14]

    let primarySaturation = [100, 81, 82, 79, 73, 62, 61, 49, 41]
    let primaryLightness = [96, 86, 76, 66, 57, 50, 43, 34, 26]

    let shades = []
    let primaryShades = []
    for (var i = 9; i > 0; i--) {
      // saturation: low 15, high 45
      let h = hues[9 - i]
      h = h > 360 ? 360 : h
      h = h < 0 ? 0 : h
      let shade = {
        title: 'gray-' + i + '00',
        value: (10 - i) * 100,
        hue: h,
        saturation: saturation[9 - i],
        lightness: lightness[9 - i]
      }
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
      shades.push(shade)

      let primaryShade = {
        title: 'primary-' + i + '00',
        value: (10 - i) * 100,
        hue: h,
        saturation: primarySaturation[9 - i],
        lightness: primaryLightness[9 - i]
      }
      primaryShade.hex = HSLToHex(
        primaryShade.hue,
        primaryShade.saturation,
        primaryShade.lightness
      )
      primaryShades.push(primaryShade)
    }
    return {
      title: 'Gray',
      primaryTitle: 'Primary',
      shades: shades,
      primaryShades: primaryShades
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
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
    },
    onSaturationUpdated({ value, saturation }) {
      let shade = this.shades.find(shade => shade.value === value)
      shade.saturation = saturation
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
    },
    onLightnessUpdated({ value, lightness }) {
      let shade = this.shades.find(shade => shade.value === value)
      shade.lightness = lightness
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
    },
    onPrimaryHueUpdated({ value, hue }) {
      let shade = this.primaryShades.find(shade => shade.value === value)
      shade.hue = hue
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
    },
    onPrimarySaturationUpdated({ value, saturation }) {
      let shade = this.primaryShades.find(shade => shade.value === value)
      shade.saturation = saturation
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
    },
    onPrimaryLightnessUpdated({ value, lightness }) {
      let shade = this.primaryShades.find(shade => shade.value === value)
      shade.lightness = lightness
      shade.hex = HSLToHex(shade.hue, shade.saturation, shade.lightness)
    }
  }
}
</script>

<style lang="css" scoped></style>
