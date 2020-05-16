<template>
  <div class="group">
    <div
      class=" h-24 w-24 rounded shadow-inner mb-2 flex flex-col p-4 items-end justify-start"
      :style="backgroundColor"
    >
      <span
        class="text-white block mb-2 text-md leading-none font-bold opacity-0 group-hover:opacity-50"
      >
        {{ contrastRatioLight }}
      </span>
      <span
        class="text-black block mb-2 text-md leading-none font-bold opacity-0 group-hover:opacity-50"
      >
        {{ contrastRatioDark }}
      </span>
    </div>
    <div class="text-gray-800 leading-none pl-1">
      <div class="font-semibold text-sm">{{ value }}</div>
      <div class="mt-1 font-normal opacity-75 text-xs is-flex">
        <input
          v-model.number="dataHue"
          v-autowidth="{ maxWidth: '100px', minWidth: '10px', comfortZone: 2 }"
          type="text"
          class="outline-none inline-block focus:bg-gray-300 focus:text-gray-900 focus:font-bold mr-1"
          @keydown.up="incrementHue"
          @keydown.down="decrementHue"
          @change="updateHue"
        />
        <input
          v-model.number="dataSaturation"
          v-autowidth="{ maxWidth: '100px', minWidth: '10px', comfortZone: 2 }"
          type="text"
          class="outline-none inline-block focus:bg-gray-300 focus:font-bold"
          @keydown.up="incrementSaturation"
          @keydown.down="decrementSaturation"
          @change="updateSaturation"
        /><span class="is-inline-block select-none -ml-1 mr-2">%</span>
        <input
          v-model.number="dataLightness"
          v-autowidth="{ maxWidth: '100px', minWidth: '10px', comfortZone: 2 }"
          type="text"
          class="outline-none inline-block focus:bg-gray-300 focus:font-bold"
          @keydown.up="incrementLightness"
          @keydown.down="decrementLightness"
          @change="updateLightness"
        /><span class="is-inline-block select-none -ml-1">%</span>
      </div>
    </div>
  </div>
</template>

<script>
function luminance(r, g, b) {
  var a = [r, g, b].map(function(v) {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function HSLToRGB(h, s, l) {
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

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }

  // return 'rgb(' + +r + ',' + +g + ',' + +b + ')'
}

export default {
  name: 'ColorBox',
  props: {
    title: {
      type: String,
      required: true,
      default: 'primary'
    },
    value: {
      type: Number,
      required: true,
      default: 100
    },
    hue: {
      type: Number,
      required: true,
      default: 0
    },
    saturation: {
      type: Number,
      required: true,
      default: 0
    },
    lightness: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      dataHue: this.hue,
      dataSaturation: this.saturation,
      dataLightness: this.lightness
    }
  },
  computed: {
    label() {
      return `${this.title}-${this.value}`
    },
    backgroundColor() {
      return `background-color: hsl(${this.dataHue}, ${this.dataSaturation}%, ${this.dataLightness}%);`
    },
    contrastRatioLight() {
      let rgb = HSLToRGB(this.dataHue, this.dataSaturation, this.dataLightness)
      let lum1 = luminance(rgb.r, rgb.g, rgb.b)
      let lum2 = 1
      const ratio =
        lum1 > lum2
          ? (lum2 + 0.05) / (lum1 + 0.05)
          : (lum1 + 0.05) / (lum2 + 0.05)

      return (Math.floor((1 / ratio) * 100) / 100).toFixed(2)
    },
    contrastRatioDark() {
      let rgb = HSLToRGB(this.dataHue, this.dataSaturation, this.dataLightness)
      let lum1 = luminance(rgb.r, rgb.g, rgb.b)
      let lum2 = 0
      const ratio =
        lum1 > lum2
          ? (lum2 + 0.05) / (lum1 + 0.05)
          : (lum1 + 0.05) / (lum2 + 0.05)

      return (Math.floor((1 / ratio) * 100) / 100).toFixed(2)
    }
  },
  methods: {
    updateHue() {
      this.$emit('hue-updated', {
        value: this.value,
        hue: this.dataHue
      })
    },
    incrementHue() {
      if (this.dataHue < 360) {
        this.dataHue++
        this.$emit('hue-updated', {
          value: this.value,
          hue: this.dataHue
        })
      }
    },
    decrementHue() {
      if (this.dataHue > 0) {
        this.dataHue--
        this.$emit('hue-updated', {
          value: this.value,
          hue: this.dataHue
        })
      }
    },
    updateSaturation() {
      this.$emit('saturation-updated', {
        value: this.value,
        saturation: this.dataSaturation
      })
    },
    incrementSaturation() {
      if (this.dataSaturation < 100) {
        this.dataSaturation++
        this.$emit('saturation-updated', {
          value: this.value,
          saturation: this.dataSaturation
        })
      }
    },
    decrementSaturation() {
      if (this.dataSaturation > 0) {
        this.dataSaturation--
        this.$emit('saturation-updated', {
          value: this.value,
          saturation: this.dataSaturation
        })
      }
    },
    updateLightness() {
      this.$emit('lightness-updated', {
        value: this.value,
        lightness: this.dataLightness
      })
    },
    incrementLightness() {
      if (this.dataLightness < 100) {
        this.dataLightness++
        this.$emit('lightness-updated', {
          value: this.value,
          lightness: this.dataLightness
        })
      }
    },
    decrementLightness() {
      if (this.dataLightness > 0) {
        this.dataLightness--
        this.$emit('lightness-updated', {
          value: this.value,
          lightness: this.dataLightness
        })
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
