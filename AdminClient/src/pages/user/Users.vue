<template>
    <v-container>
        <v-data-table :headers="headers" :items="items" :loading="loading" class="elevation-2">
            <template v-slot:top>
                <v-toolbar density="comfortable" flat>
                    <template v-slot:prepend>
                        <div class="d-flex flex-row ga-1">
                            <v-btn class="text-capitalize" variant="outlined"><download-excel :data="items"
                                    :fields="headersExcel" type="xlsx" worksheet="all-data"
                                    name="user_excel.xlsx">Excel</download-excel></v-btn>
                            <v-btn class="text-capitalize" variant="outlined"><download-excel :data="items"
                                    :fields="headersExcel" type="csv" name="user_csv.xls">Csv</download-excel></v-btn>
                            <v-btn class="text-capitalize" variant="outlined" @click.stop="exportPdf">Pdf</v-btn>
                        </div>
                    </template>
                    <template v-slot:append>
                        <v-dialog v-model="dialog" max-width="850">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" text="Add User" color="primary" variant="elevated"
                                    class="text-capitalize">
                                </v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card :title="formTitle">
                                    <v-form v-model="valid" @submit.prevent="saveUser">
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="userForm.fullName" label="Name"
                                                        :rules="[rules.required]" variant="underlined" clearable
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-select v-model="roleSelect" :items="itemsRole"
                                                        item-title="roleName" item-value="userRoleId" label="Role"
                                                        variant="underlined" :rules="[rules.required]" return-object
                                                        clearable required>
                                                    </v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="userForm.mobile" label="Mobile"
                                                        variant="underlined" clearable>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="userForm.email" label="Email"
                                                        :rules="[rules.required, rules.emailChk]" variant="underlined"
                                                        clearable required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4" v-if="editedIndex == -1">
                                                    <v-text-field v-model="userForm.password"
                                                        :rules="[rules.required, rules.passwordChk]" label="Password"
                                                        variant="underlined" type="password" required clearable>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-menu v-model="birthMenu" :close-on-content-click="false"
                                                        :nudge-right="40" transition="scale-transition" offset-y
                                                        min-width="auto">
                                                        <template v-slot:activator="{ props }">
                                                            <v-text-field v-model="userForm.dateOfBirth"
                                                                label="Birth Date" prepend-icon="mdi-calendar" readonly
                                                                v-bind="props" variant="underlined"
                                                                clearable></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="userForm.dateOfBirth" color="primary"
                                                            @input="birthMenu = false"></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-file-input accept="image/*" label="Profile Picture"
                                                        prepend-icon="mdi-camera" variant="underlined"
                                                        @update:model-value="onImageChange" show-size>
                                                    </v-file-input>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-img :src="imagePreviewSrc" max-height="100" max-width="150"
                                                        contain>
                                                    </v-img>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-row justify="end">
                                                <v-btn text="Cancel" color="primary" class="text-capitalize"
                                                    @click="isActive.value = false">
                                                </v-btn>
                                                <v-btn :disabled="!valid" :loading="loading" text="Save" type="submit"
                                                    color="grey-darken-4" class="text-capitalize">
                                                </v-btn>
                                            </v-row>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="330">
                            <v-card>
                                <v-card-title>Are you sure to delete this item?</v-card-title>
                                <v-card-actions>
                                    <v-row justify="end" class="pr-4">
                                        <v-btn text="Cancel" color="primary" class="text-capitalize"
                                            @click="dialogDelete = false">
                                        </v-btn>
                                        <v-btn :loading="loading" text="Delete" color="grey-darken-4"
                                            class="text-capitalize" @click="deleteConform">
                                        </v-btn>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="mr-1" icon="mdi-pencil" @click="editItem(item)">
                </v-icon>
                <v-icon size="small" icon="mdi-delete" @click="deleteItem(item)">
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/UserStore';
import { useSettingStore } from '@/store/SettingStore';
import { storeToRefs } from 'pinia';
import { resetObject } from '@/helper/ResetObject';
import { computed, ref, watch } from 'vue';
import { useDate } from 'vuetify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface UserItem {
    userId: number,
    userRoleId: number,
    roleName: string,
    fullName: string,
    mobile: string,
    email: string,
    imagePath: string,
    dateOfBirth: Date | null,
    password: string,
}
interface UserForm {
    userId: number,
    userRoleId: number,
    roleName: string,
    fullName: string,
    mobile: string,
    email: string,
    imagePath: string,
    dateOfBirth: Date | null,
    password: string,
}
interface Role {
    userRoleId: number,
    roleName: string,
}
const userStore = useUserStore()
const settingStore = useSettingStore()
const { loading } = storeToRefs(userStore)
const date = useDate()
const headers = ref([
    { title: 'Name', key: 'fullName' },
    { title: 'Role', key: 'roleName' },
    { title: 'Mobile', key: 'mobile' },
    { title: 'Email', key: 'email' },
    { title: 'Date of Birth', key: 'dateOfBirth' },
    { title: 'Actions', key: 'actions', sortable: false }
])
const headersExcel = ref({
    'Id': 'userId',
    'Name': 'fullName',
    'Role': 'roleName',
    'Mobile': 'mobile',
    'Email': 'email',
    'Date of Birth': 'dateOfBirth',
})
const headersPdf = ['Id', 'Name', 'Role', 'Mobile', 'Email', 'Date Of Birth']
const items = ref<UserItem[]>([])
const itemsRole = ref<Role[]>([])
const roleSelect = ref<Role | null>(null)
const dialog = ref(false)
const dialogDelete = ref(false)
const valid = ref(false)
const birthMenu = ref(false)
const imagePreviewSrc = ref('')
const editedIndex = ref(-1)
const rules = {
    required: (v: string) => !!v || 'Required',
    lengthChk: (v: string) => (v && v.length >= 3) || 'Name must be greater than or equal to 3 characters',
    emailChk: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    passwordChk: (v: string) => (v && v.length >= 6) || 'Password must be more than 6 characters',
}
const userForm = ref<UserForm>({
    userId: 0,
    userRoleId: 0,
    roleName: '',
    fullName: '',
    mobile: '',
    email: '',
    imagePath: '',
    dateOfBirth: null,
    password: '',
})

//export to pdf
const exportPdf = () => {
    const doc = new jsPDF({
        orientation: 'landscape'
    })
    doc.text('User', 14, 10)
    autoTable(doc, {
        head: [headersPdf],
        body: items.value.map((row) => [
            row.userId,
            row.fullName,
            row.roleName,
            row.mobile,
            row.email,
            row.dateOfBirth ? new Date(row.dateOfBirth).toLocaleDateString() : ''
        ])
    })
    doc.save('user.pdf')
}

//initialize role
const initializeRole = () => {
    userStore.getUserRoles()
        .then((response) => {
            itemsRole.value = response.data.data
        })
}

//initialize users
const initializeUsers = () => {
    userStore.getUsers()
        .then((response) => {
            items.value = response.data.data
        })
}

//get all menu group
initializeUsers()

//get user roles
initializeRole()

//edit initialize
const editItem = (item: UserItem) => {
    userForm.value = Object.assign({}, item)
    roleSelect.value = { roleName: item.roleName, userRoleId: item.userRoleId }
    userForm.value.dateOfBirth = item.dateOfBirth != null ? new Date(item.dateOfBirth.toISOString().slice(0, 10)) : null
    imagePreviewSrc.value = item.imagePath != null ? import.meta.env.VITE_API_URL + item.imagePath : ''
    editedIndex.value = items.value.indexOf(item)
    dialog.value = true
}

//delete dialog
const deleteItem = (item: UserItem) => {
    userForm.value = Object.assign({}, item)
    dialogDelete.value = true
}

//delete confirm
const deleteConform = () => {
    userStore.deleteSingleUser(userForm.value.userId)
        .then((response) => {
            settingStore.toggleSnackbar({ status: true, msg: response.data.responseMsg })
            closeDialog()
            initializeUsers()
        })
}

//image change event
const onImageChange = (event: any) => {
    if (event != null) {
        const fd = new FormData()
        fd.append('image', event)
        userStore.imageUpload(fd)
            .then((res) => {
                if (res.status == 200) {
                    userForm.value.imagePath = '/' + res.data.dbPath
                    const reader = new FileReader()
                    reader.readAsDataURL(event)
                    reader.onload = (event) => {
                        imagePreviewSrc.value = event.target?.result as string
                    }
                }
            })
    }
}

//save user
const saveUser = () => {
    if (editedIndex.value > -1) {
        //update
        const updateObj = {
            userId: userForm.value.userId,
            userRoleId: roleSelect.value?.userRoleId,
            fullName: userForm.value.fullName,
            mobile: userForm.value.mobile,
            email: userForm.value.email,
            imagePath: userForm.value.imagePath,
            dateOfBirth: userForm.value.dateOfBirth != null ? date.toISO(userForm.value.dateOfBirth) : null,
            password: userForm.value.password,
            lastUpdatedBy: localStorage.getItem('userId'),
        }
        userStore.updateSingleUser(updateObj)
            .then((response) => {
                if (response.status == 200) {
                    settingStore.toggleSnackbar({ status: true, msg: response.data.responseMsg })
                    closeDialog()
                    initializeUsers()
                } else if (response.status == 202) {
                    settingStore.toggleSnackbar({ status: true, msg: response.data.responseMsg })
                }
            })
    } else {
        //insert
        const insertObj = {
            userRoleId: roleSelect.value?.userRoleId,
            fullName: userForm.value.fullName,
            mobile: userForm.value.mobile,
            email: userForm.value.email,
            imagePath: userForm.value.imagePath,
            dateOfBirth: userForm.value.dateOfBirth != null ? date.toISO(userForm.value.dateOfBirth) : null,
            password: userForm.value.password,
            addedBy: localStorage.getItem('userId'),
        }
        userStore.createSingleUser(insertObj)
            .then((response) => {
                if (response.status == 200) {
                    settingStore.toggleSnackbar({ status: true, msg: response.data.responseMsg })
                    closeDialog()
                    initializeUsers()
                } else if (response.status == 202) {
                    settingStore.toggleSnackbar({ status: true, msg: response.data.responseMsg })
                }
            })
    }
}

//close dialog
const closeDialog = () => {
    imagePreviewSrc.value = ''
    roleSelect.value = null
    dialogDelete.value = false
    dialog.value = false
    editedIndex.value = -1
    resetObject(userForm.value)
}

//dialog false execute closeDialog()
watch(dialog, () => {
    dialog.value || closeDialog()
})

//dialogDelete false execute closeDialog()
watch(dialogDelete, () => {
    dialogDelete.value || closeDialog()
})

//get form title
const formTitle = computed(() => {
    return editedIndex.value == -1 ? 'Add User' : 'Edit User'
})
</script>