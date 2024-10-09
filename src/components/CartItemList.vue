<template>
  <div class="flex flex-col" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :id="item.id"
      @onClickRemove="() => addToCart(item)"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
const { cart, addToCart } = inject('cart')
</script>

<style lang="scss" scoped></style>
