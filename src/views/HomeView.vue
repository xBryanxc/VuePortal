<template>
  <div class="pl-8 min-h-screem flex items-center justify-start space-x-4 flex-wrap p-1 font-gotham">
    <!-- TODO: Añadir grafico de tareas por estado (vencidad, etc) -->
    <ChartComponent :items="tasks"/>
    <ChartByProcess :items="tasks"/>
  </div>
  <div class="pl-8 pr-8 min-h-screem">
    <!-- Table -->
    <DataTable :items="tasks"/>
  </div>
</template>

<script lang="ts" setup>
import ChartComponent from '@/components/ChartByProject.vue';
import ChartByProcess from '@/components/ChartByProcess.vue';
import DataTable from '@/components/DataTable.vue';
import ApiService from '@/services/ApiService'
import { onMounted } from 'vue';

const service = new ApiService()
const tasks = service.getTasks()

onMounted(async () => {
    await service.fetchTasksOffline()
})
</script>
