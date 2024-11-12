import './assets/main.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'
import Chart from 'primevue/chart'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('UiMenubar', Menubar)
app.component('UiChart', Chart)
app.component('UiToast', Toast)
app.component('UiButton', Button)
app.component('UiSelectButton', SelectButton)
app.component('UiCard', Card)
app.component('UiInput', InputText)

app.mount('#app')

const appGlobalProperties = app.config.globalProperties

export default appGlobalProperties
