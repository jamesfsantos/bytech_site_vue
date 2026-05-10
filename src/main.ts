import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCircleUser,
  faCartShopping,
  faList,
  faMagnifyingGlass,
  faArrowRightToBracket,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
library.add(
  faCircleUser,
  faCartShopping,
  faList,
  faMagnifyingGlass,
  faArrowRightToBracket,
  faPencil,
);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.mount("#app");
