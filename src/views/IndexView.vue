<script setup lang="ts">
import { ref, reactive } from 'vue';
import { FEG, Order, type IFEGLineTemplate, type IFEGLinesSchema } from '@/types/feg';
const linesTemplate: IFEGLinesSchema = reactive({
  lines: [
    {
      name: "Line 1",
      order: Order.ASC,
      layout: {
        amountOfStations: 10,
        amountPerSide: [2, 8],
        defaultRoles: ["Direct"],
        specials: {
          1: {
            name: 'PS-$$',
            defaultRoles: ['PS']
          }
        }
      }
    }
  ]
})
const linesToString = ref(JSON.stringify(linesTemplate))
function returnLine(line: IFEGLineTemplate): IFEGLineTemplate {
  console.log(line)
  return line
}

let test = new FEG(linesTemplate)
console.log(test.init())
</script>

<template>
  <textarea v-model="linesToString" class="flex w-full h-full bg-slate-700 outline-none focus:outline-none p-4"></textarea>
  <div class="absolute flex justify-center w-full h-auto left-0 bottom-0 py-4">
    <div 
    @click="returnLine(linesTemplate.lines[0])"
    class="flex text-center rounded-lg px-4 py-2 bg-emerald-600 text-white/95 shadow-sm shadow-slate-800">BRUHE</div>
  </div>
</template>