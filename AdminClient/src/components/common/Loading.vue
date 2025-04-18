<template>
    <v-overlay :model-value="isLoading" opacity="0.6" class="align-center justify-center">
        <v-progress-circular size="100" indeterminate></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/SettingStore';
import { computed } from 'vue';

const isLoading = computed<boolean>(() => {
    return useSettingStore().isOverlay ?? false
})
</script>