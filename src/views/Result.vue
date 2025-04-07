<script setup>
import { useItemStore } from '@/stores/items'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const itemStore = useItemStore()
const router = useRouter()

// スコアの高い順に並べ替え
const sortedResults = computed(() =>
  [...itemStore.results].sort((a, b) => b.score - a.score)
)

// 順位のロジック（同率対応）
const getRank = (index) => {
  if (index === 0) return 1
  const currentScore = sortedResults.value[index].score
  const prevScore = sortedResults.value[index - 1].score
  return currentScore === prevScore ? getRank(index - 1) : index + 1
}

const again = () => {
  itemStore.initTournament(); // リセット
  router.push("/Select");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
    <h1 class="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
      結果はこちら
    </h1>

    <ul class="w-full max-w-3xl">
      <li
        v-for="(item, index) in sortedResults"
        :key="item.id"
      >
        <transition name="fade" appear>
          <div
            class="mb-4 p-4 bg-white shadow-lg rounded-xl flex flex-col sm:flex-row items-center"
            :style="{ animationDelay: `${index * 300}ms` }"
          >
            <div class="text-xl font-bold w-full sm:w-16 text-center mb-2 sm:mb-0 text-indigo-600">
              {{ getRank(index) }}位
            </div>
            <img
              :src="item.image || '/default.png'"
              :alt="item.name"
              class="w-24 h-24 object-cover rounded-xl mx-4"
            />
            <div class="text-center sm:text-left mt-2 sm:mt-0">
              <div class="text-lg font-semibold text-gray-800">{{ item.name }}</div>
              <!-- <div class="text-sm text-gray-500">スコア：{{ item.score }}</div> -->
            </div>
          </div>
        </transition>
      </li>
    </ul>

    <button
      @click="again"
      class="mt-8 bg-white border border-[#e84a79] text-[#e84a79] hover:bg-[#ffe4ec] font-semibold px-6 py-3 rounded-full shadow transition transform hover:scale-105"
    >
    もう一度やる
    </button>
  </div>
</template>

<style>
.fade-enter-active {
  transition: opacity 1.9s ease, transform 1.9s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
