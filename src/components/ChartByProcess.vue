<template>
    <div class="w-96 h-48 border rounded-lg mb-4 flex items-center justify-center">
        <canvas id="chartByProcess"></canvas>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, defineProps } from 'vue';
import { Chart } from 'chart.js/auto';
import ITask from '@/interfaces/ITask'

const props = defineProps({
    items: {
        type: Array as () => Array<ITask>,
        required: true
    }
})

watchEffect(() => {
    if (props.items.length > 0) {
        const ctx = document.getElementById('chartByProcess') as HTMLCanvasElement
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [...new Set(props.items.map(item => item.ProcessClassName))],
                datasets: [{
                    label: 'Número de tareas',
                    data: [...new Set(props.items.map(item => item.ProcessClassName))].map(project => props.items.filter(item => item.ProcessClassName === project).length),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                layout: {
                    padding: 5
                },
                plugins: {
                    legend: {
                        position: 'top',
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Tareas por proceso'
                    }
                }
            },
        })
    }
})
</script>