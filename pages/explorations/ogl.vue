<template>
  <header class="header" data-scroll-section>
    <ClientOnly>
      <VHeaderBackground class="header__canvas" />
      <div class="color-box">
        Background:
        <ElColorPicker
          color-format="rgb"
          v-model="colors.color1"
          @change="setPallet($event, 'color1')"
          size="large"
          class="color-picker"
        />
        color2:
        <ElColorPicker
          v-model="colors.color2"
          @change="setPallet($event, 'color2')"
          color-format="rgb"
          size="large"
          class="color-picker"
        />
        color3:
        <ElColorPicker
          v-model="colors.color3"
          @change="setPallet($event, 'color3')"
          color-format="rgb"
          size="large"
          class="color-picker"
        />
      </div>
    </ClientOnly>
  </header>
</template>

<script setup>
import { ElColorPicker } from 'element-plus';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-color-picker.css';

const emitter = useEmitter();
const colors = reactive({
  color1: '',
  color2: '',
  color3: '',
});
function rgbStringToArray(rgbString) {
  // Extracting the numeric values from the string
  const rgbValues = rgbString.match(/\d+/g);

  // Converting the extracted values to numbers and then performing the transformation
  const transformedValues = rgbValues.map((value) => parseInt(value, 10) + 33);

  return transformedValues;
}

const setPallet = (color, type) => {
  const colorPal = { type: null, color: '' };

  colorPal.type = type;
  colorPal.color = rgbStringToArray(color);
  emitter.emit('backgroundPalletChange', colorPal);
};
</script>

<style>
.color-box {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: black;
  border-radius: 10px;
  background-color: white;
  opacity: 0.5;
  padding: 5px 20px;
}
.color-picker {
  width: 50px;
}
</style>

