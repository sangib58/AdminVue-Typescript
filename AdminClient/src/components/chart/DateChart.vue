<template>
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/UserStore';

interface DateChartData {
    date: string;
    count: number;
}

const userStore = useUserStore()
const loaded = ref(false)
const chartData = ref<ChartData<'line'>>({
    labels: [],
    datasets: []
});
const chartOptions = ref<ChartOptions<'line'>>({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Login(Date Wise)'
        }
    }
});

onMounted(() => {
    const userId: any = localStorage.getItem('userId')
    userStore.getDateChart(userId)
        .then((res: { data: DateChartData[] }) => {
            chartData.value = {
                labels: res.data.map(x => x.date.substr(0, 10)),
                datasets: [
                    {
                        label: 'Login(Date Wise)',
                        backgroundColor: '#212121',
                        data: res.data.map(x => x.count)
                    }
                ]
            }
            loaded.value = true
        })
})
</script>