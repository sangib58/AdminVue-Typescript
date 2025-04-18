<template>
    <div class="d-flex justify-end pr-2 pt-8 pb-2">
        {{ appInitialData?.copyRightText }}
    </div>
</template>

<script lang="ts" setup>
interface AppInitialData {
    copyRightText?: string
}
const appInitialData: AppInitialData = JSON.parse(localStorage.getItem('allSettings') || '{}');

</script>