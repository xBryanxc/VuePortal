<template>
    <div v-if="showIframe" class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
        <div class="w-1/2 h-5/6 bg-white rounded-lg">
            <button @click="closeIframe" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <iframe :src="url" :title="title" style="width: 100%; height: 100%;" sandbox="allow-same-origin allow-scripts"></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref} from 'vue';

defineProps({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const showIframe = ref(true);

const closeIframe = () => {
    showIframe.value = false;
}
</script>