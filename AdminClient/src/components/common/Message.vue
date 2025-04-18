<template>
    <v-snackbar v-model="snackbar" timeout="5000">
        {{ snackbarMsg }}
        <template v-slot:actions>
            <v-btn color="pink" variant="text" text="Close" @click="reset">
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/SettingStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

interface ResetObj {
    status: boolean
    msg: string
}
const resetObj = ref<ResetObj>({
    status: false,
    msg: ''
})
const settingStore = useSettingStore()
const { snackbar, snackbarMsg } = storeToRefs(settingStore)
const reset = (): void => {
    settingStore.toggleSnackbar(resetObj.value)
}
</script>