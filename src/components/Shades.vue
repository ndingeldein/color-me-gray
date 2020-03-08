<template>
  <div class="w-full">
    <div class="w-full rounded bg-white shadow-lg p-6 mb-4">
      <h2 class="text-lg font-medium mb-4">
        <span class="text-gray-800 inline-block mr-2">{{ hslFull }}</span>
        <span class="text-gray-500">{{ color }}</span>
      </h2>
      <div class="flex justify-between">
        <div v-for="i in 9" :key="i">
          <div
            class="h-24 w-24 rounded shadow-inner mb-2"
            :style="
              'background-color: hsl(' +
                hsl.hue +
                ', ' +
                hsl.saturation +
                '%, ' +
                ((10 - i) * 10 + 5) +
                '%);'
            "
          ></div>
          <div class="text-gray-800 leading-none pl-1">
            <div class="font-semibold text-sm">{{ i }}00</div>
            <div class="mt-1 font-normal opacity-75 text-xs">
              {{ hsl.hue }}, {{ hsl.saturation }}%, {{ (10 - i) * 10 + 5 }}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full rounded bg-white shadow-lg p-6 mb-4">
      <h2 class="text-lg font-medium mb-4">
        <span class="text-gray-800 inline-block mr-2">{{ hslFull }}</span>
        <span class="text-gray-500">{{ color }}</span>
      </h2>
      <div class="flex justify-between">
        <div v-for="i in 9" :key="i">
          <div
            class="h-24 w-24 rounded shadow-inner mb-2"
            :style="
              'background-color: hsl(' +
                hsl.hue +
                ', ' +
                hsl.saturation * 0.25 +
                '%, ' +
                ((10 - i) * 10 + 5) +
                '%);'
            "
          ></div>
          <div class="text-gray-800 leading-none pl-1">
            <div class="font-semibold text-sm">{{ i }}00</div>
            <div class="mt-1 font-normal opacity-75 text-xs">
              {{ hsl.hue }}, {{ hsl.saturation * 0.25 }}%,
              {{ (10 - i) * 10 + 5 }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const hexCodeRegex = /^#[0-9A-F]{6}$/i
export default {
  name: 'Shades',

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
  computed: {
    rgbFull() {
      return `rgb(${this.rgb.red}, ${this.rgb.green}, ${this.rgb.blue})`
    },
    rgb() {
      let r = 0
      let g = 0
      let b = 0
      if (this.color.length == 4) {
        r = '0x' + this.color[1] + this.color[1]
        g = '0x' + this.color[2] + this.color[2]
        b = '0x' + this.color[3] + this.color[3]
      } else if (this.color.length == 7) {
        r = '0x' + this.color[1] + this.color[2]
        g = '0x' + this.color[3] + this.color[4]
        b = '0x' + this.color[5] + this.color[6]
      }
      return {
        red: r,
        green: g,
        blue: b
      }
    },
    hslFull() {
      return `hsl(${this.hsl.hue}, ${this.hsl.saturation}%, ${this.hsl.lightness}%)`
    },
    hsl() {
      // Then to HSL
      let r = this.rgb.red / 255
      let g = this.rgb.green / 255
      let b = this.rgb.blue / 255
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
  }
}
</script>

<style lang="css" scoped></style>
