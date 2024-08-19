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
                    <th class="px-4 py-3">Id</th>
                    <th class="px-4 py-3">Trámite</th>
                    <th class="px-4 py-3">Fase</th>
                    <th class="px-4 py-3">Referencia base</th>
                    <th class="px-4 py-3">Id Solicitante</th>
                    <th class="px-4 py-3">Descripción Solicitante</th>
                    <th class="px-4 py-3">Fecha de llegada</th>
                    <th class="px-4 py-3">Fecha de vencimiento</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in resultadosFiltrados" :key="item.TaskId" class="border-b cursor-pointer" @click="abrirIframe(item.TaskId ?? 0, item.Project ?? 'VUI')">
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.TaskId }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessClassName }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.StatusName }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessBaseReference }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ 1111111 }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.ProcessTheme1 }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ formatFecha(item.ArrivalDate ?? new Date()) }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ formatFecha(item.Deadline ?? new Date()) }}</td>
                    <td class="px-4 py-3">
                        <span v-if="comprobarVencimiento(item.Deadline ?? new Date()) == 'vencida'" class="text-red-500 cursor-pointer" title="VENCIDA">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm1 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-else-if="comprobarVencimiento(item.Deadline ?? new Date()) == 'casi_vencida'" class="text-yellow-500 cursor-pointer" title="POR VENCER">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 10h12a1 1 0 110 2H4a1 1 0 110-2z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-else-if="comprobarVencimiento(item.Deadline ?? new Date()) == 'en_tiempo'" class="text-green-500 cursor-pointer" title="A TIEMPO">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" />
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
    // if fecha  is 1/1/1900 return empty string
    return dia === 1 && mes === 1 && anio === 1900 ? "" : `${dia}/${mes}/${anio}`;
}

const comprobarVencimiento = (date: Date) => {
    const fecha = new Date(date);
    const hoy = new Date();
    const casiVencida = new Date(fecha);
    casiVencida.setDate(casiVencida.getDate() - 90);

    if (fecha.getDate() === 1 && fecha.getMonth() === 0 && fecha.getFullYear() === 1900){
        return "sin venimiento";
    }

    if (fecha < hoy){
        return "vencida";
    } else if (casiVencida <= hoy){
        return "casi_vencida";
    } else {
        return "en_tiempo";
    }
}

const administrarFiltrosCheckbox = (value: string) => {
    filtroEstados.value.includes(value) 
    ? filtroEstados.value.splice(filtroEstados.value.indexOf(value), 1) 
    : filtroEstados.value.push(value);

    return filtroEstados.value;
}
</script>