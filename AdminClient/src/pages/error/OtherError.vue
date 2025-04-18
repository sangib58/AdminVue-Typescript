<template>
    <div class="mx-10 my-10">
        <div class="text-h2">{{ errorHeading }}</div>
        <div class="text-subtitle-2 text-grey-darken-1 pt-1">{{ errorDetail }}</div>
        <div class="pt-12">Try going back to sign in page by clicking <router-link to="/">here</router-link></div>.
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/UserStore';

type ErrorCode = '401' | '403' | '0' | string

const errorCode = ref<ErrorCode>(localStorage.getItem('http_error') || '')
const userStore = useUserStore()

//hide Navbar and Footer
userStore.setVisibility(false)

//Map Error Messages
const errorMessages = {
    '401': {
        heading: 'Token Expired',
        detail: 'Your current token has expired.Sign in again to get a new one.'
    },
    '403': {
        heading: 'Limited Access',
        detail: 'You have limited access to this resource.Contact your admin to get permission here.'
    },
    '0': {
        heading: 'No Internet',
        detail: 'Looks like your internet connectivity is down.Please wait until get that back.'
    },
    'default': {
        heading: 'Unknown Error',
        detail: 'We have no clue about this error.Please start a new journey by sign in again.'
    }
}

//Get Error Heading
const errorHeading = computed(() => {
    return errorCode.value in errorMessages ? errorMessages[errorCode.value as keyof typeof errorMessages].heading : errorMessages['default'].heading
})

//Get Error Detail
const errorDetail = computed(() => {
    return errorCode.value in errorMessages ? errorMessages[errorCode.value as keyof typeof errorMessages].detail : errorMessages['default'].detail
})
</script>