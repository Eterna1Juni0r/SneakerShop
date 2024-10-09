<template>
  <div>
    <h2 class="text-3xl font-bold">Избранное</h2>
    <CardList :items="favorites" is-favorite />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://ab7785a894880720.mokky.dev/favorites')
    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<style lang="scss" scoped></style>
