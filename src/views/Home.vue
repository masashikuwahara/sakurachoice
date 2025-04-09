<script setup>
import { onMounted } from "vue";
import { useItemStore } from "@/stores/items";
import { useRouter } from "vue-router";
import { ref } from 'vue'

const itemStore = useItemStore();
const router = useRouter();

onMounted(() => {
  itemStore.fetchItems();
});

const startComparison = () => {
  router.push("/select"); // 選択画面へ移動
};

const histories = ref([
  { date: '2025.04.08', content: 'ベータ版' },
  { date: '2025.04.08', content: 'ベータ版' }
])
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#ffffff] to-[#f19db5] p-4">
    <h1 class="text-3xl sm:text-5xl font-bold text-gray-800 mb-8 text-center">
      SAKURACHOICE
    </h1>
    <P>櫻坂46四期生の推しメンチェッカーです</P>
    <img src="https://www.crank-in.net/img/db/243113240232456_1200.jpg" alt="" class="hinata"><br>
    <button
      @click="startComparison"
      class="bg-white border border-[#e84a79] text-[#e84a79] hover:bg-[#ffe4ec] text-lg sm:text-xl font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105"
    >
      スタート
    </button><br>
    -更新履歴-
    <div v-for="history in histories">
      {{ history.date }} {{ history.content }}
    </div>
    1.0.0-beta.2
  </div>
</template>
