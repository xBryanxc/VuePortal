<template>
    <div class="relative flex items-center w-full px-4">
        <button @click="show = !show" class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900">
            Filtros
        </button>
        <div v-if="show" class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
            <h6 class="mb-3 text-sm font-medium text-gray-900">Estado</h6>
            <ul class="space-y-2 text-sm">
                <li v-for="(estado, index) in estados" :key="index">
                    <input type="checkbox" :value="estado" @change="filtrar" :id="`filto_${index}`" class="w-4 h-4 bg-gray-400">
                    <label :for="`filto_${index}`" class="ml-2 text-gray-900 text-sm">{{ estado }}</label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from 'vue';
import ITask from '@/interfaces/ITask'

const show = ref(false);

const emit = defineEmits(['filtrar']);

const props = defineProps({
    items: {
        type: Array as () => Array<ITask>,
        required: true
    }
})

const estados = computed(() => {
    return [...new Set(props.items.map(item => item.StatusName)).add('Vencidas')];
})

const filtrar = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('filtrar', target.value)
}
</script>