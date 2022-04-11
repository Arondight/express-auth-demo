import App from "@_/App.vue";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.mount("#app");
