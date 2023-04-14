import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import authConfig from '../auth_config.json';

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHatWizard,
  faStore,
  faCartShopping,
  faMinus,
  faPlus,
  faPowerOff,
  faUser,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createAuth0 } from '@auth0/auth0-vue';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from '@highlightjs/vue-plugin';

hljs.registerLanguage('json', json);

library.add(faHatWizard, faStore, faCartShopping, faMinus, faPlus, faLink, faUser, faPowerOff);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(hljsVuePlugin);

app.use(
  createAuth0({
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app');
