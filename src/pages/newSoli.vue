<template>
    <div>
        <Toast />
        <Card>
            <template #title> Nueva solicitud </template>
            <template #content>
                <InputText
                    type="text"
                    v-model="solicitud.tittle"
                    class="maz-width-ee"
                    placeholder="Titulo"
                />

                <br />
                <br />

                <Dropdown
                    v-model="solicitud.sendBy"
                    :options="people"
                    optionLabel="name"
                    placeholder="Creada por: "
                    class="w-full md:w-14rem maz-width-ee"
                />
                <br />
                <br />
                <span class="p-float-label">
                    <Textarea
                        v-model="solicitud.description"
                        rows="5"
                        cols="30"
                        class="maz-width"
                    />
                </span>
            </template>
            <template #footer>
                <Button @click="openDialog" icon="pi pi-check" label="Enviar" />
            </template>
        </Card>

        <Dialog
            v-model:visible="visible"
            modal
            header="Solicitudes"
            :style="{ width: '50vw' }"
        >
            <div class="group">
                <div >
                    <h6>La finalidad de las solicitudes es hacer que tu pareja pueda mejorar en cierto aspecto</h6>
                    <h6>NO deberíamos ver una solicitud como algo que nos digusta, sino como algo que podría ser mejor </h6>
                    <h6>NO queremos cambiar su forma de ser porque l@ amamos tal cual es</h6>
                    <img :src="word" alt="" class="img-fast" />
                </div>
            </div>
            <template #footer>
                <Button
                    label="No, mejor me voy con Michael Jordan"
                    icon="pi pi-times"
                    @click="visible = false"
                    text
                />
                <Button
                    label="Si, acepto que quiero realizar esta solicitud y te sigo amando con la misma intensidad"
                    icon="pi pi-check"
                    @click="sendInfo"
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import ISolicitud from "../components/solicitud";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useIntervalFn } from "@vueuse/core";
import { rand } from "@vueuse/shared";

const products = ref([
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8DZUo6tLTiBpZLXzyxevJmGjKnKuoIVIeaY-5TpHToez6iLOPWJ2pqZY0dIkZjvzIth9YMTnfjVco6hwvG6Cegm2vyqLz05PIZct_B4LTrH5wPEyWd5K5opPSH55y4cZbKWL1nvNkJuiHUmZyVri1-wEg=w721-h961-no?authuser=0",
    },
    {
        image: "https://photos.google.com/share/AF1QipNFrG4D1xUQE3GFniEWcUiz3Og_D1hojX8y19OYYGifW0Z_TlgVMnUxI8CtD5lnUQ/photo/AF1QipMmWmIvbuCCly3ga8MnOnkFIUO1MKXOR-1xMvt3?key=WVd5UFVfeTh1Ym5SMVZaSDhkbFgweXlIX3pTYzZB",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8B-xlrCgjUa40Ip2D8rfqT4WgSothzGhq9TZY6LFDe0cIMbpYVyL59G_CCQmI0EXvrWTIsfTqtosHiuulC0IZlHoRx3Tox6aNOM09_EdVznxPhXfPkERRMD-xucV3mkxpLNG6QozusfukJC3jvQae1r-A=w721-h961-no?authuser=0",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8DQgUYHkzFWzgX8_sT5ABwftAjn5QK-tw_JM6cj328cS9fttgRzDLBiXj-ZI00TgsyzLExYodbAO3muSAsNia5Q8Qy0WpozmGNam03CH35kq6HVIYxeMzOx3xWvkguLr5IXcnQtmrQoHk_ENBT0Wn2D1w=w769-h962-no?authuser=0",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8B4NigCCy1gjdajjJp2TA6iWWM2GDQZfesoVihkaTie53BRiVeCVVt5TIE-_Q0cOuq5J4SlWr7bfJAeyf4LJNFaIjWJOQPjxJ3A5TfztY9ARIGKbmY8gobsorEJzJXsWoTmJ_Kn94-J38Zi_eBPFIAN0w=w721-h961-no?authuser=0",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8ByKgq2OsvoLkeLMU9nCkVXi3GXVU5IcMCAQoH2ZDew3Xb0a8wPqNR7VztVQ9BmsCmYZEFr827H8ZHUqEjf9ydKkJI-T15cwSIIM7lVmDKDudwXbkhb1I10AbJgNOkhb2Q_fcJT5IDWA-BMg3MVW4mkHw=w770-h961-no?authuser=0",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8CJNZ2gK6z56Q6ydGBkKayggda2RF6qkxF9MpL4lQJp0ufclqZlzRkfz3qNSFWhXqJMRa6-Gz4yY1IW13FgOL065Mh8B0cTk6yTBqTIju0u9q1zkn7lKrmQ_gwAzlxf594JTOGVt5R3fBL_d7WO6-FmKw=w775-h961-no?authuser=0",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8DrKKTkG-AA3_tpKPLmwfLbg2Sr5Jm6OgmFPy0pNznXXX6gMaQ3zb7Wua6EnGgWfujAZyO9MmydkYQ8fpt7wSLBhHmQkdFoPhVNQ363cui6Xbjc_8eMZqz6VNvj60UQM5miWqvFlheNURmw3iRmXXL6Gw=w721-h961-no?authuser=0",
    },
    {
        image: "https://lh3.googleusercontent.com/pw/AMWts8CJFbV0vCBc9RSMO8T_OQyUq7tBXZpTjeGRkLTd5eYNk-7yyjyhJ7ddwjdK7wRqydnxoexa5OkkVsNRP_S7O4nFjbbY5l5zbmYmVh91d2ma_-pro8MOJ4Rj3CFLiI3aLDsMLJDaq5hhAlMp0RNROvvsJw=w718-h961-no?authuser=0",
    },
    // { image: '' },
    // { image: '' },
    // { image: '' },
    // { image: '' },
    // { image: '' },
]);

const responsiveOptions = ref([
    {
        breakpoint: "1199px",
        numVisible: 3,
        numScroll: 3,
    },
    {
        breakpoint: "991px",
        numVisible: 2,
        numScroll: 2,
    },
    {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
    },
]);

const toast = useToast();
const visible = ref(false);
const solicitud: ISolicitud = reactive({});

const people = [
    { name: "Damaris", code: "DM" },
    { name: "El Sebas", code: "ST" },
];

const openDialog = () => { 
    visible.value = true;
}

const sendInfo = async () => {   
    visible.value = false;
    solicitud.date = new Date();
    const response = await axios.post('https://60c255b2069afc0017f4a2ca.mockapi.io/trainings', solicitud);
    console.log({ response })
    if (response.status.toString().startsWith('2')) {
        console.log("sadsadsadd")
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Guardado correctamente', life: 5000 });
        solicitud.date = undefined;
        solicitud.description = undefined;
        solicitud.tittle = undefined;
        solicitud.sendBy = undefined;
        solicitud.description = undefined;

    }
};

const greetings = [
    "https://lh3.googleusercontent.com/pw/AMWts8DZUo6tLTiBpZLXzyxevJmGjKnKuoIVIeaY-5TpHToez6iLOPWJ2pqZY0dIkZjvzIth9YMTnfjVco6hwvG6Cegm2vyqLz05PIZct_B4LTrH5wPEyWd5K5opPSH55y4cZbKWL1nvNkJuiHUmZyVri1-wEg=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8CBAwhCcsre1OaYq0hm3r4f4iVB3A6jsYbuDvb9NlKNiKcZhToLYDydm0byxXAnq1NA2t_-b07OlLqWz53KmuPifuWpPmIWyOiytcy3g7ze9AT1X21TvIdv1pL0z3yprzRYX8RFCdlQqLbFPG4QPsv5Vg=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8B-xlrCgjUa40Ip2D8rfqT4WgSothzGhq9TZY6LFDe0cIMbpYVyL59G_CCQmI0EXvrWTIsfTqtosHiuulC0IZlHoRx3Tox6aNOM09_EdVznxPhXfPkERRMD-xucV3mkxpLNG6QozusfukJC3jvQae1r-A=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8DQgUYHkzFWzgX8_sT5ABwftAjn5QK-tw_JM6cj328cS9fttgRzDLBiXj-ZI00TgsyzLExYodbAO3muSAsNia5Q8Qy0WpozmGNam03CH35kq6HVIYxeMzOx3xWvkguLr5IXcnQtmrQoHk_ENBT0Wn2D1w=w769-h962-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8B4NigCCy1gjdajjJp2TA6iWWM2GDQZfesoVihkaTie53BRiVeCVVt5TIE-_Q0cOuq5J4SlWr7bfJAeyf4LJNFaIjWJOQPjxJ3A5TfztY9ARIGKbmY8gobsorEJzJXsWoTmJ_Kn94-J38Zi_eBPFIAN0w=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8ByKgq2OsvoLkeLMU9nCkVXi3GXVU5IcMCAQoH2ZDew3Xb0a8wPqNR7VztVQ9BmsCmYZEFr827H8ZHUqEjf9ydKkJI-T15cwSIIM7lVmDKDudwXbkhb1I10AbJgNOkhb2Q_fcJT5IDWA-BMg3MVW4mkHw=w770-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8CJFbV0vCBc9RSMO8T_OQyUq7tBXZpTjeGRkLTd5eYNk-7yyjyhJ7ddwjdK7wRqydnxoexa5OkkVsNRP_S7O4nFjbbY5l5zbmYmVh91d2ma_-pro8MOJ4Rj3CFLiI3aLDsMLJDaq5hhAlMp0RNROvvsJw=w718-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8DrKKTkG-AA3_tpKPLmwfLbg2Sr5Jm6OgmFPy0pNznXXX6gMaQ3zb7Wua6EnGgWfujAZyO9MmydkYQ8fpt7wSLBhHmQkdFoPhVNQ363cui6Xbjc_8eMZqz6VNvj60UQM5miWqvFlheNURmw3iRmXXL6Gw=w721-h961-no?authuser=0!",
    "https://lh3.googleusercontent.com/pw/AMWts8CBAwhCcsre1OaYq0hm3r4f4iVB3A6jsYbuDvb9NlKNiKcZhToLYDydm0byxXAnq1NA2t_-b07OlLqWz53KmuPifuWpPmIWyOiytcy3g7ze9AT1X21TvIdv1pL0z3yprzRYX8RFCdlQqLbFPG4QPsv5Vg=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8Ai9A1D1v704nZ4ciOaEoIHPzdighOK3YFQJJ8lo-2OpFPiYGolKJSrV8NWJfdIHwrZli14bFkcDXqSh16jr_XohFaqiF8UU2KQ3lAssy41AEWx64oxi92mK31jzL4dGIkIiK6N_LthOxAxFkdPTvqAvg=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8APHbw_xlH4l5tLtSvaACzpzNSFthH7o1TrVITf70pELZGZQ9fBxYScdw5JIa8YFwUxLM_MuRUmuyIOid6WoFfO24ixwTYGWUO4WjkOBbVKg-nLdOKCE1QCLobCWYuxV5jDiidih4NcLRSETbzZ_y4Sxw=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8Az721YnDSwegKBh_HY43Tacu06C-W3ntH4VFeEzCDzuenDARzHALgZNWOrUlfniNsc2_JhB_-7DDWGHKpH8nKRRgb3XX7iSFihELUuxjFbpPH8POaKhQITpNe4LSm0xf7xqfamb3Wej2NkLXfdNbaDjQ=w551-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8AFW8LbngxAghbXld4hgrQvlrbPybXMwfhJE1XeuAn0U6GuxnQzIt4C2VnFusM3yZaSGX3B6fIaxy8_ezKWTNnPEeIGpS-1wZnubC6OBObn90ChE1FnCcZD8yYuhDLGt33wX0Lq5YuAA6QSARKa6oUNlA=w541-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8BW2DJUNqVJDKM3keNh_WH-LOT5LF3C2G1mAX_vvw6Gb1kUmgmovaKJN6IacgGo05GwjSk7kstCJJLqBFOg05whJedRglBZ4v9x8VR0DPuI0rHRvT0kTCZbmQn3jyS5_cpGZemX2aRiE8zy1zheo---XA=w721-h961-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/AMWts8CWZsV6yyELcYEZXVJgk1aBmGPs18kK7PIQfmR5bpBjBP0IFNOsJ1JgXoegt_U_lL5FvLH6d8y0z4iy1QfQE8KhSrUEyiuOpRZDol_3jHLrWZ9SOdES1d_nZKPVZh65pmghpNaNC-oYY5udjVfJ9vNReQ=w721-h961-no?authuser=0"
];
const word = ref("Hello");
const interval = ref(150);
const { pause, resume, isActive } = useIntervalFn(() => {
    word.value = greetings[rand(0, greetings.length - 1)];
}, interval);
</script>

<style>
.maz-width {
    width: 350px !important;
}

.maz-width-ee {
    width: 200px !important;
}

.group {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
}


.img-fast{
    max-height: 40vh;
}
</style>
