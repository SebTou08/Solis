<template>
    <Card>
        <Toast />
        <template #title> Nueva solicitud </template>
        <template #content>
            <InputText type="text" v-model="solicitud.tittle"  class="maz-width-ee" placeholder="Titulo"/>

            <br>
            <br>

            <Dropdown v-model="solicitud.sendBy" :options="people"
                optionLabel="name" placeholder="Creada por: "
                class="w-full md:w-14rem maz-width-ee" />
                <br>
                <br>
            <span class="p-float-label">
                <Textarea v-model="solicitud.description" rows="5" cols="30"
                    class="maz-width" />
                <label>Soli pe mami</label>
            </span>
        </template>
        <template #footer>
            <Button @click="sendInfo" icon="pi pi-check" label="Enviar" />
        </template>


    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ISolicitud from "../components/solicitud";
import axios from "axios";
import { useToast } from "primevue/usetoast";


const toast = useToast();

const solicitud: ISolicitud = {}

const people = [
    { name: 'Damaris', code: 'DM' },
    { name: 'El Sebas', code: 'ST' }];

const sendInfo = async () => {
    solicitud.date = new Date();
    const response = await axios.post('https://60c255b2069afc0017f4a2ca.mockapi.io/trainings', solicitud);
    console.log({ response })
    if (response.status.toString().startsWith('2')) {
        console.log("sadsadsadd")
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    }
}


</script>


<style>
.maz-width {
    width: 350px !important;
}

.maz-width-ee {
    width: 200px !important;
}</style>