<template>
    <Pie v-if="loaded" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/UserStore';

interface RoleChartData {
    roleName: string;
    count: number;
}
const userStore = useUserStore()
const loaded = ref(false)
const chartData = ref < ChartData < 'pie' >> ({
    labels: [],
    datasets: []
});
const chartOptions = ref < ChartOptions < 'pie' >> ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Login(Role Wise)'
        }
    }
});

onMounted(() => {
    userStore.getRoleChart()
        .then((res: { data: RoleChartData[] }) => {
            chartData.value = {
                labels: res.data.map(x => x.roleName),
                datasets: [
                    {
                        label: 'Login(Role Wise)',
                        backgroundColor: '#212121',
                        data: res.data.map(x => x.count)
                    }
                ]
            }
            loaded.value = true
        })
})

</script>