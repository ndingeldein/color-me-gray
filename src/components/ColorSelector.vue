<template>
  <div
    class="rounded bg-white shadow-lg px-6 py-4 mb-4 flex justify-center text-xl flex-col"
  >
    <!-- <span class="text-md mr-2 italic font-medium text-gray-800">
      Select Color:
    </span> -->
    <input
      v-model.lazy.trim="inputColor"
      type="text"
      class="w-32 border rounded text-gray-600 leading-loose px-2 py-1 text-center"
      placeholder="#xxxxxx"
      @change="onChange"
    />
    <div v-if="!$v.inputColor.hexCode" class="text-red-600 text-sm mt-2">
      Color must be a valid hex code.
    </div>
  </div>
</template>

<script>
import { helpers } from 'vuelidate/lib/validators'
const hexCodeRegex = /^#[0-9A-F]{6}$/i
const hexCodeNoHashRegex = /[0-9A-F]{6}$/i
const hexCode = value =>
  hexCodeRegex.test(value) || hexCodeNoHashRegex.test(value)

export default {
  name: 'ColorSelector',

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
  data: function() {
    return {
      inputColor: this.color
    }
  },
  validations: {
    inputColor: {
      hexCode
    }
  },
  methods: {
    onChange(event) {
      if (this.$v.inputColor.hexCode) {
        let value = event.target.value
        // check if starts with hash
        if (!value.includes('#')) {
          value = '#' + value
        }
        this.$emit('color-change', value)
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
