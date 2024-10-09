<template>
  <Drawer
    v-if="isCart"
    :isCart="isCart"
    :updateIsCart="updateIsCart"
    @createOrder="createOrder"
    :isCreatingOrder="isCreatingOrder"
    :sum="sum"
    :orderId="orderId"
  />
  <div class="wrapper">
    <Header :isCart="isCart" :updateIsCart="updateIsCart" :sum="sum" />
    <div class="p-10">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watch, provide, computed } from 'vue'

import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'

const isCart = ref(false)
const cart = ref([])
const items = ref([])
const isCreatingOrder = ref(false)
const orderId = ref(null)

const sum = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0)
})

const updateIsCart = () => {
  isCart.value = !isCart.value
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://ab7785a894880720.mokky.dev/orders', {
      items: cart.value,
      sum: sum.value
    })

    cart.value = []
    orderId.value = data.id

    items.value = items.value.map((item) => {
      if (item.isAdded) {
        return {
          ...item,
          isAdded: false
        }
      } else {
        return item
      }
    })
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const addToCart = (item) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true
  }
)

provide('cart', {
  cart,
  addToCart
})
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply shadow-xl mt-14 bg-white rounded-3xl w-4/5 m-auto;
}
</style>
