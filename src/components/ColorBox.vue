<template>
  <div>
    <div
      class="h-24 w-24 rounded shadow-inner mb-2"
      :style="backgroundColor"
    ></div>
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
        hue: this.dataSaturation
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
        hue: this.dataLightness
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
