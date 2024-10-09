<template>
  <div class="head">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneaker</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li class="head-btn" @click="updateIsCart">
        <img src="/cart.svg" alt="Cart" />
        <b>{{ sum }}</b>
      </li>
      <router-link to="/favorites">
        <li class="head-btn">
          <img src="/heart.svg" alt="heart" />
          <span>Закладки</span>
        </li>
      </router-link>

      <li class="head-btn">
        <img src="/profile.svg" alt="profile" />
        <span>Профиль</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  isCart: Boolean,
  updateIsCart: Function,
  sum: Number
})
</script>

<style lang="postcss" scoped>
.head {
  @apply flex justify-between border-b border-slate-200 px-10 py-8;
}
.head-btn {
  @apply flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black;
}
</style>
