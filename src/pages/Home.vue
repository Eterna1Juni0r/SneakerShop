<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchQuery"
          class="border border-slate-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <CardList :items="items" @addToFavorites="addToFavorites" @add-to-cart="addToCart" />
</template>

<script setup>
import axios from 'axios'
import { ref, watch, onMounted, reactive, inject } from 'vue'
import CardList from '../components/CardList.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addToCart = (item) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://ab7785a894880720.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((element) => element.parentId === item.id)
      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://ab7785a894880720.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }

      item.isFavorite = true
      const { data } = await axios.post(`https://ab7785a894880720.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://ab7785a894880720.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchQuery = (event) => {
  filters.searchQuery = event.target.value
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

const { cart } = inject('cart')
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply shadow-xl mt-14 bg-white rounded-3xl w-4/5 m-auto;
}
</style>
