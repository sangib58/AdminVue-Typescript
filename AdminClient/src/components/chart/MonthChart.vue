<template>
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" :style="style" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/UserStore';

interface MonthChartData {
    month: string;
    count: number;
}
const userStore = useUserStore()
const loaded = ref(false)
const chartData = ref<ChartData<'bar'>>({
    labels: [],
    datasets: []
});
const chartOptions = ref<ChartOptions<'bar'>>({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Login(Browser Wise)'
        }
    }
});
const style = computed(() => {
    return {
        height: '400px',
        width: '600px',
        position: 'relative'
    }
})

onMounted(() => {
    const userId: any = localStorage.getItem('userId')
    userStore.getMonthChart(userId)
        .then((res: { data: MonthChartData[] }) => {
            chartData.value = {
                labels: res.data.map(x => x.month),
                datasets: [
                    {
                        label: 'Login(Month Wise)',
                        backgroundColor: '#212121',
                        data: res.data.map(x => x.count)
                    }
                ]
            }
            loaded.value = true
        })
})

</script>