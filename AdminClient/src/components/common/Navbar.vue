<template>
    <v-navigation-drawer theme="dark" v-model="drawer">
        <template v-if="smAndDown" v-slot:append>
            <div class="d-flex justify-center py-2">
                <v-btn text="Sign Out" variant="text" prepend-icon="mdi-logout" class="text-capitalize text-purple"
                    @click.stop="dialogSignout = true">
                </v-btn>
            </div>
        </template>
        <v-list>
            <v-list-item>
                <template v-slot:prepend>
                    <v-avatar><v-img :src="profileImage"></v-img></v-avatar>
                </template>
                <template v-slot:title>
                    <div>{{ profileInfo.obj.fullName }}</div>
                </template>
                <template v-slot:subtitle>
                    <div>{{ profileInfo.obj.roleName }}</div>
                </template>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="default">
            <v-list-item v-for="item in menus" :key="item.id" :to="item.route">
                <v-list-item-title v-if="item.childItems.length == 0" class="pl-3">{{ item.title }}</v-list-item-title>
                <template v-if="item.childItems.length == 0" v-slot:prepend>
                    <v-icon class="pl-7">{{ item.icon }}</v-icon>
                </template>

                <v-list-group :value="item.title" v-if="item.childItems.length > 0">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" :title="item.title" :prepend-icon="item.icon"></v-list-item>
                    </template>
                    <v-list-item v-for="val in item.childItems" :key="val.id" :title="val.title" :value="val.title"
                        :to="val.route"></v-list-item>
                </v-list-group>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <template v-slot:append>
            <v-btn icon="mdi-lock" @click.stop="dialogLock = true"></v-btn>
            <v-btn @click.stop="toggleFullScreen"
                :icon="props.isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"></v-btn>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">
                        <v-badge :content="notifications.recordsTotal">
                            <v-icon icon="mdi-bell" size="x-large"></v-icon>
                        </v-badge>
                    </v-btn>
                </template>
                <v-list style="max-height: 300px" class="overflow-y-auto">
                    <v-list-item v-for="(item, i) in notifications.data" :key="i" :value="item">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-arrow-right-box"></v-icon>
                        </template>
                        <v-list-item-title>Login Time:{{ item.logInTime }}, IP:{{ item.ip }}, Browser:{{ item.browser
                        }},
                            OS:{{ item.platform }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn text="Personalize" class="text-capitalize" v-bind="props">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-menu-down" size="x-large"></v-icon>
                        </template>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, i) in personalizeSelect" :key="i" :value="item" :to="item.route">
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn v-if="mdAndUp" icon="mdi-logout" @click.stop="dialogSignout = true"></v-btn>
        </template>
    </v-app-bar>
    <v-dialog v-model="dialogSignout" max-width="290" persistent>
        <v-card theme="dark">
            <v-card-title class="text-h5">Want to leave?</v-card-title>
            <v-card-text class="py-2 text-grey-lighten-1 text-subtitle-2">Press Sign Out to leave</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" class="text-capitalize text-purple" @click.stop="dialogSignout = false">Stay
                    Here</v-btn>
                <v-btn variant="text" class="text-capitalize" @click.stop="signOut">Sign Out</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLock" max-width="290" persistent>
        <v-card theme="dark">
            <v-card-title class="d-flex justify-center"><v-avatar><v-img
                        :src="profileImage"></v-img></v-avatar></v-card-title>
            <v-card-text>
                <v-form v-model="valid" @submit.prevent="lockOpen">
                    <v-text-field v-model="signInForm.password" variant="outlined" type="password"
                        :rules="passwordRules" required></v-text-field>
                    <div class="d-flex justify-center"><v-btn :disabled="!valid" size="x-large" type="submit"
                            icon="mdi-key" variant="text"></v-btn></div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import defaultImg from '@/assets/pp2.png'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/UserStore';
import { useMenuStore } from '@/store/MenuStore';
import { useSettingStore } from '@/store/SettingStore';
import { useDisplay } from 'vuetify';
import { computed, ref } from 'vue';

//interfaces
interface MenuItem {
    id: number
    title: string
    icon: string
    route: string
    childItems: ChildMenuItem[]
}

interface ChildMenuItem {
    id: number;
    title: string;
    route: string;
}

interface NotificationsResponse {
    recordsTotal: number;
    data: Notification[];
}

interface Notification {
    logInTime: string;
    ip: string;
    browser: string;
    platform: string;
}

interface ProfileInfo {
    obj: {
        fullName: string
        roleName: string
        imagePath: string | null
        email: string
    }
}

interface LinkItem {
    text: string
    route: string
}

interface SignInForm {
    email: string
    password: string
}

const props = defineProps<{
    isFullscreen: boolean
}>()
const emits = defineEmits<{
    (e: 'toggle-screen', value: boolean): void
}>()
const { smAndDown, mdAndUp } = useDisplay()
const dialogSignout = ref(false)
const dialogLock = ref(false)
const drawer = ref(true)
const menus = ref<MenuItem[]>([])
const notifications = ref<NotificationsResponse>({
    recordsTotal: 0,
    data: []
})
const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()
const settingStore = useSettingStore()
const valid = ref(false)
const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 6) || 'Password must be more than 6 characters',
]
const signInForm = ref<SignInForm>({
    email: '',
    password: ''
})
const linksAdmin = ref<LinkItem[]>([
    { text: 'Profile', route: '/profile' },
    { text: 'Password', route: '/password-change' }
])
const linksOthers = ref<LinkItem[]>([
    { text: 'Profile', route: '/profile' },
    { text: 'Password', route: '/password-change' },
    { text: 'Faqs', route: '/faq' }
])
const profileInfo = ref<ProfileInfo>(JSON.parse(localStorage.getItem('profile') || '{}'))

//open lock
const lockOpen = () => {
    const obj = {
        ...signInForm.value,
        email: profileInfo.value.obj.email
    }
    userStore.checkPassword(obj)
        .then(response => {
            if (response.status == 200) {
                dialogLock.value = false
            } else if (response.status = 202) {
                settingStore.toggleSnackbar({ status: true, msg: response.data.responseMsg })
            }
        })
        .catch(error => {
            console.log('error', error)
        })
}

//personalize menu selection depend on role
const personalizeSelect = computed(() => {
    return localStorage.getItem('userRoleId') == '1' ? linksAdmin.value : linksOthers.value
})

//toggle full screen event emit
const toggleFullScreen = () => {
    emits('toggle-screen', props.isFullscreen)
}

//profile image
const profileImage = computed(() => {
    return profileInfo.value.obj.imagePath == null ? defaultImg : import.meta.env.VITE_API_URL + profileInfo.value.obj.imagePath
})

//fetch app sidebar
menuStore.getSidebar(parseInt(localStorage.getItem('userRoleId') || '0'))
    .then((res) => {
        menus.value = res.data
    })
    .catch((error) => {
        console.log(error)
    })

//fetch notifications
userStore.getNotifications(parseInt(localStorage.getItem('userId') || '0'))
    .then(res => {
        if (res.status == 200) {
            notifications.value = res.data
        }
    })

//sign out
const signOut = (): void => {
    userStore.updateHistory(localStorage.getItem('logCode') || '')
    userStore.signOut()
    router.push({ name: 'Landing' })
}
</script>