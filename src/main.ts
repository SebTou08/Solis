import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";


import Checkbox from "primevue/checkbox";
import Password from "primevue/password";

import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Skeleton from 'primevue/skeleton';
//Highchart library


import 'primeicons/primeicons.css';
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";


import Chips from "primevue/chips";
import VirtualScroller from "primevue/virtualscroller";
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "primevue/breadcrumb";
import ProgressSpinner from "primevue/progressspinner";
import Avatar from "primevue/avatar";
import SpeedDial from "primevue/speeddial";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Editor from "primevue/editor";
import Dialog from "primevue/dialog";
import Chip from 'primevue/chip';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import ScrollPanel from 'primevue/scrollpanel';
import Dropdown from "primevue/dropdown";
import PrimeVue from "primevue/config";
import router from './router';
import Chart from 'primevue/chart';



const app = createApp(App);
app.use(PrimeVue, {inputStyle: 'filled'});
app.use(router);
app.use(ToastService);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Editor', Editor);
app.component('Card', Card);
app.component('Chip', Chip);
app.component('Divider', Divider);
app.component('Tag', Tag);
app.component('Chips', Chips);
app.component('Textarea', Textarea);
app.component('Image', Image);
app.component('ProgressSpinner', ProgressSpinner)
app.component('FileUpload', FileUpload);
app.component('ScrollPanel', ScrollPanel);
app.component("Dialog", Dialog);
app.component('Checkbox', Checkbox);
app.component('Password', Password)
app.component('Toast', Toast)
app.component('Breadcrumb', Breadcrumb)
app.component('Avatar', Avatar);
app.component('Dropdown', Dropdown)
app.component('SpeedDial', SpeedDial)
app.component('Chart', Chart);
app.component('VirtualScroller', VirtualScroller);
app.component('Skeleton', Skeleton);

app.mount("#app");