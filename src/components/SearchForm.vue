<template>
    <form class="py-3 px-4 flex items-center">
        <label class="sr-only">Buscar</label>
        <div class="relative w-full">
            <input @input="buscar" type="text" placeholder="Buscar" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-2 py-1">
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['buscar']);

const buscar = (e: Event) => {
    emit('buscar', (e.target as HTMLInputElement).value);
}
</script>