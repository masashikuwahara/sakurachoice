<script setup>
import { useRouter } from "vue-router";
import { useItemStore } from "@/stores/items";
import { computed } from 'vue';

const router = useRouter();
const itemStore = useItemStore();

const selectWinner = (winnerId) => {
  itemStore.registerWin(winnerId);
  if (itemStore.matchCount >= 30) { // 試合数
    router.push("/result");
  }
};

// 進捗を計算
const progress = computed(() => {
  // 試合が進行中であれば、進捗を試合数に基づいて計算
  const progressPercentage = (itemStore.matchCount / itemStore.maxMatches) * 170;
  // 進捗が100%を超えないように制限
  return Math.min(progressPercentage, 100);
})
</script>

<template>
  <transition name="fade" appear>
    <div class="min-h-screen flex flex-col justify-center items-center bg-white p-4">
      <p>進捗状況</p>
      <div class="w-full max-w-md mx-auto my-6">
        <div class="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
          :style="{ width: `${progress}%` }">
          </div>
          <div class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
            {{ Math.floor(progress) }}%
          </div>
        </div>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        どっち？
      </h1>

      <div
        v-if="itemStore.currentPair.length === 2"
        class="flex flex-col sm:flex-row gap-6 items-center justify-center mb-6 w-full max-w-4xl"
      >
        <button
          @click="selectWinner(itemStore.currentPair[0].id)"
          class="flex flex-col items-center bg-[#f19db542] hover:bg-[#f19db5c2] rounded-xl p-4 shadow-md w-64 transition"
        >
          <img
            :src="itemStore.currentPair[0].image"
            :alt="itemStore.currentPair[0].name"
            class="w-32 h-32 object-cover rounded-xl mb-2"
          />
          <p class="text-lg font-semibold text-gray-800">
            {{ itemStore.currentPair[0].name }}
          </p>
        </button>

        <button
          @click="selectWinner(itemStore.currentPair[1].id)"
          class="flex flex-col items-center bg-[#f19db542] hover:bg-[#f19db5c2] rounded-xl p-4 shadow-md w-64 transition"
        >
          <img
            :src="itemStore.currentPair[1].image"
            :alt="itemStore.currentPair[1].name"
            class="w-32 h-32 object-cover rounded-xl mb-2"
          />
          <p class="text-lg font-semibold text-gray-800">
            {{ itemStore.currentPair[1].name }}
          </p>
        </button>
      </div>

      <button
        @click="selectWinner(null)"
        class="bg-[#e84a79] hover:bg-[#d13e6a] text-white font-semibold px-5 py-2 rounded-full transition"
      >
        これは選べん
      </button>
    </div>
  </transition>
</template>

<style scoped>
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
.progress-bar {
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 100%;
  height: 10px;
  margin-bottom: 20px;
}

.progress {
  background-color: #4caf50;
  height: 100%;
  border-radius: 10px;
}
</style>
