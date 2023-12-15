<template>
    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="all" checked @change="filtrar">
        <span class="whitespace-nowrap ml-1">Ver todos</span>
    </label>
    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="VUI" @change="filtrar">
        <span class="whitespace-nowrap ml-1">VUI</span>
    </label>
    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="SISTEMAS" @change="filtrar">
        <span class="whitespace-nowrap ml-1">SISTEMAS</span>
    </label>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['filtrar']);

const filtrar = (e: Event) => {
    emit('filtrar', (e.target as HTMLInputElement).value);
}
</script>