<script setup>
import { useRouter } from "vue-router";
import { useItemStore } from "@/stores/items";

const router = useRouter();
const itemStore = useItemStore();

const selectWinner = (winnerId) => {
  itemStore.registerWin(winnerId);
  if (itemStore.matchCount >= 30) { // 試合数
    router.push("/result");
  }
};
</script>

<template>
  <transition name="fade" appear>
    <div class="min-h-screen flex flex-col justify-center items-center bg-white p-4">
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
