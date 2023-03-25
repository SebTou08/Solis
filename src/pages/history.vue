<template>
    <div>
        <div class="gp">
            <div class="card flex justify-content-center graph">
                <Chart type="doughnut" :data="chartData" :options="chartOptions"
                    class="w-full md:w-30rem" />
            </div>
        </div>
        <div>
            <div class="gallery">
                <Card class="card" v-for="soli in arraySorted" :key="soli.id">
                    <template #title> Solicitud de: {{ soli.sendBy?.name }}
                    </template>
                    <template #content>
                        <h4>{{ soli.tittle }}</h4>
                        <h6>{{ soli.description }}</h6>
                        <h6>Creado el: {{
                            soli.date }}
                        </h6>
                    </template>


                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import ISolicitud from "../components/solicitud";

const chartData: any = ref();
const chartOptions = ref({
    cutout: '60%'
});


const allSolis: Array<ISolicitud> = reactive((await axios.get("https://60c255b2069afc0017f4a2ca.mockapi.io/trainings")).data);

console.log(allSolis);


function sortFunction(a: any, b: any) {
    var dateA = new Date(a.dateB).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
};

const arraySorted = allSolis.sort(sortFunction);
console.log(arraySorted);

const stNum = allSolis.filter(e => e.sendBy?.code == 'ST').length;
const dmNum = allSolis.filter(e => e.sendBy?.code == 'DM').length;

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Sebastian', 'Damaris'],
        datasets: [
            {
                data: [stNum, dmNum],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
            }
        ]
    };
};

chartData.value = setChartData();
console.log(chartData)
</script>

<style>
.gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 18rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 30rem), 1fr));

}


</style>