<template>
  <div
    class="relative flex items-center border transition border-slate-200 p-4 rounded-xl mt-4 hover:border-slate-300"
  >
    <img :src="imageUrl" alt="Sneaker" class="w-16 h-16" />
    <div class="flex flex-col ml-4">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }}</b>
        <img
          @click="emit('onClickRemove')"
          src="/close.svg"
          class="cursor-pointer absolute right-4 bottom-4 transition hover:rotate-90"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
