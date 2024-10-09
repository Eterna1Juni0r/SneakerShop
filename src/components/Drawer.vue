<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-black bg-opacity-70 z-10"
    @click="updateIsCart"
  ></div>
  <div v-if="isCart" class="fixed bg-white w-96 h-full right-0 top-0 z-20 p-8">
    <DrawerHead :isCart="isCart" :updateIsCart="updateIsCart" v-if="cart.length > 0" />
    <CartItemList />
    <div class="flex flex-col gap-4 mt-7" v-if="cart.length > 0">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ sum }}</b>
      </div>
      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ tax }}</b>
      </div>
      <button
        @click="emit('createOrder')"
        :disabled="disabledButton"
        class="bg-lime-400 w-full rounded-xl py-3 text-white transition hover:bg-lime-500 active:bg-lime-600 disabled:bg-slate-400 cursor-pointer disabled:cursor-not-allowed"
      >
        Оформить заказ
      </button>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full">
      <InfoBlock v-if="!orderId && cart.length === 0" :updateIsCart="updateIsCart" />
      <OrderCreate v-if="orderId" :updateIsCart="updateIsCart" :orderId="orderId" />
    </div>
  </div>
</template>

<script setup>
import CartItemList from './CartItemList.vue'
import OrderCreate from './OrderCreate.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'
import { computed } from 'vue'
import { inject } from 'vue'

const { cart } = inject('cart')
const emit = defineEmits(['createOrder'])

const disabledButton = computed(() => (props.isCreatingOrder ? true : props.sum ? false : true))

const tax = computed(() => {
  return (props.sum * 0.05).toFixed(2)
})

const props = defineProps({
  orderId: Number,
  isCart: Boolean,
  updateIsCart: Function,
  isCreatingOrder: Boolean,
  sum: Number
})
</script>

<style lang="scss" scoped>
.pole {
  transition: opacity 0.5s ease;
}

.pole {
  opacity: 0;
}
</style>
