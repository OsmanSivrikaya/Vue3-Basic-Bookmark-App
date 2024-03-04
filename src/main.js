import { createApp } from 'vue';
import App from './App.vue';

import router from '@/router/index.js';
import store from "@/store/IndexStore.js";
import '@/assets/style.css';

import {appAxios} from './utils/appAxios';

import appHeader from '@/components/shared/appHeader.vue';
import appBookmarkList from '@/components/shared/appBookmarkList/IndexComponent.vue';

import io from "socket.io-client";
const socket = io("http://localhost:9000");

const app = createApp(App);
app.component("app-header", appHeader);
app.component("app-bookmark-list", appBookmarkList);
app.use(router);
app.use(store);
app.config.globalProperties.$appAxios = appAxios;
app.config.globalProperties.$socket = socket;
app.mount('#app');
