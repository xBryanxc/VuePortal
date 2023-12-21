<template>
    <div class="bg-white relative border rounded-lg">
        <div class="flex items-center justify-between">
            <!-- Filters -->
            <!-- Search bar -->
            <SearchForm @buscar="administrarBusqueda"/>
            <div class="flex items-center justify-end text-sm font-semibold">
                <!-- Radio buttons -->
                <FilterRadios @filtrar="administrarFiltro"/>
                <!-- Dropdown -->
                <FiltrosDropdown :items="props.items" @filtrar="administrarFiltrosCheckbox"/>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th class="px-4 py-3">ID Tarea</th>
                    <th class="px-4 py-3">ID Proceso</th>
                    <th class="px-4 py-3">Estado</th>
                    <th class="px-4 py-3">Proceso</th>
                    <th class="px-4 py-3">Referencia base</th>
                    <th class="px-4 py-3">Nombre empresa</th>
                    <th class="px-4 py-3">Fecha de vencimiento</th>
                    <th class="px-4 py-3">Origen</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in resultadosFiltrados" :key="item.TaskId" class="border-b cursor-pointer" @click="abrirIframe(item.TaskId ?? 0, item.Project ?? 'VUI')">
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.TaskId }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessId }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.StatusName }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessClassName }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessBaseReference }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessTheme1 }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ formatFecha(item.Deadline ?? new Date()) }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.Project }}</td>
                    <td class="px-4 py-3">
                        <span v-if="comprobarVencimiento(item.Deadline ?? new Date())" class="text-red-500 cursor-pointer" title="VENCIDA">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm1 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <IFrameComponent :url="url" :title="'Tarea 1766'" v-if="showIframe"/> -->
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import ITask from '@/interfaces/ITask'
import SearchForm from './SearchForm.vue';
import FilterRadios from './FilterRadios.vue';
import FiltrosDropdown from './FiltrosDropdown.vue';
// import IFrameComponent from './IFrameComponent.vue';

const filtro = ref('');
const radioFilter = ref('');
const filtroEstados = ref<string[]>([]);
const url = ref('');

// const showIframe = ref(false);

const props = defineProps({
    items: {
        type: Array as () => Array<ITask>,
        required: true
    }
})

const resultadosFiltrados = computed(() => {
    let items = props.items;

    switch (radioFilter.value) {
        case 'VUI':
            items = items.filter(item => item.Project && item.Project.toLowerCase().includes('vui'))
            break;
        case 'SISTEMAS':
            items = items.filter(item => item.Project && item.Project.toLowerCase().includes('sistemas'))
            break;
        default:
            break;
    }

    if (filtroEstados.value.length === 1 && filtroEstados.value[0] !== 'Vencidas') {
        items = items.filter(item => item.StatusName && (filtroEstados.value.includes(item.StatusName) || filtroEstados.value.length === 0));
    }

    if (filtroEstados.value.includes('Vencidas')) {
        items = items.filter(item => comprobarVencimiento(item.Deadline ?? new Date()));
    }

    if (filtro.value !== '') {
        items = items.filter(item => item.ProcessClassName && item.ProcessClassName.toLowerCase().includes(filtro.value.toLowerCase()) || item.TaskId && item.TaskId === parseInt(filtro.value) || item.ProcessId && item.ProcessId === parseInt(filtro.value) || item.ProcessBaseReference && item.ProcessBaseReference.toLowerCase().includes(filtro.value.toLowerCase()) || item.ProcessTheme1 && item.ProcessTheme1.toLocaleLowerCase().includes(filtro.value.toLocaleLowerCase()))
    }

    return items;
})

const administrarBusqueda = (value: string) => 
{
    filtro.value = value;
}

const administrarFiltro = (value: string) => 
{
    radioFilter.value = value;
}

const abrirIframe = (taskId: number, origen: string) => {
    origen === 'VUI' 
    ? url.value = `https://des.vui.cr/BPM_TareaPersonal.aspx?id=${taskId}` 
    : url.value = `http://sistemas-des-int.procomer.com/BPM_TareaPersonal.aspx?id=${taskId}`;

    window.open(url.value, '_blank')
}

const formatFecha = (date: Date) => {
    const fecha = new Date(date);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

const comprobarVencimiento = (date: Date) => {
    const fecha = new Date(date);
    const hoy = new Date();

    return fecha < hoy ? true : false;
}

const administrarFiltrosCheckbox = (value: string) => {
    filtroEstados.value.includes(value) 
    ? filtroEstados.value.splice(filtroEstados.value.indexOf(value), 1) 
    : filtroEstados.value.push(value);

    return filtroEstados.value;
}
</script>