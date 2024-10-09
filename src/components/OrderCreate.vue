<template>
  <img src="/create-order.svg" alt="create-order" />
  <p class="text-xl leading-7">Заказ оформлен!</p>
  <p class="text-slate-400 my-2 text-center">
    Ваш заказ #{{ orderId }} скоро будет передан курьерской доставке
  </p>
  <div
    @click="updateIsCart"
    class="group flex gap-2 bg-lime-400 rounded-xl py-3 px-10 text-white transition hover:bg-lime-500 active:bg-lime-600 disabled:bg-slate-400 cursor-pointer disabled:cursor-not-allowed"
  >
    <svg
      class="cursor-pointer rotate-180 transition group-hover:-translate-x-1 relative top-1.5 right-1.5"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H14.7143"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span>Вернуться назад</span>
  </div>
</template>

<script setup>
defineProps({
  updateIsCart: Function,
  orderId: Number
})
</script>

<style lang="scss" scoped></style>
