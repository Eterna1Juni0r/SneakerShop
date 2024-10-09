<template>
  <div>
    <div class="card">
      <img
        v-if="visibleFavoriteButtton"
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Like1"
        class="absolute top-8 left-8 cursor-pointer"
        @click="onClickFavotite"
      />
      <img :src="imageUrl" alt="Sneaker" />
      <p class="mt-2">{{ title }}</p>

      <div class="card-text">
        <div class="flex flex-col">
          <span class="text-slate-400">Цена:</span>
          <b>{{ price }} руб.</b>
        </div>
        <img
          v-if="visibleFavoriteButtton"
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          alt="Checked"
          class="cursor-pointer"
          @click="onClickAdd"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  isFavorite: {
    type: Boolean,
    required: true
  },
  isAdded: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  onClickFavotite: {
    type: Function,
    required: true
  },
  onClickAdd: {
    type: Function,
    required: true
  }
})

const visibleFavoriteButtton = Boolean(props.onClickFavotite)
</script>

<style lang="postcss" scoped>
.card {
  @apply relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl;
}
.card-text {
  @apply flex justify-between mt-5;
}
</style>
