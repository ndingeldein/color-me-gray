<template>
  <div class="rounded bg-white shadow-lg px-6 py-4 mb-4 inline-block">
    <span class="text-md mr-2 italic font-medium text-gray-800">
      Select Color:
    </span>
    <input
      v-model.lazy.trim="inputColor"
      type="text"
      class="w-24 border rounded text-gray-600 leading-loose px-2 py-1 text-center"
      placeholder="#32b1ca"
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
const hexCode = helpers.regex('hexCode', hexCodeRegex)
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
        this.$emit('color-change', event.target.value)
        this.inputColor = ''
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
