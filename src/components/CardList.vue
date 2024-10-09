<template>
  <div class="collection" v-auto-animate>
    <SneakerCard
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isAdded="item.isAdded"
      :onClickFavotite="isFavorite ? null : () => emit('addToFavorites', item)"
      :onClickAdd="isFavorite ? null : () => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>

<script setup>
import SneakerCard from './SneakerCard.vue'

const emit = defineEmits(['addToFavorites', 'addToCart'])

defineProps({
  items: {
    type: Array,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="postcss" scoped>
.collection {
  @apply grid grid-cols-4  gap-5 mt-5;
}
</style>
