import { createApp } from 'vue'
import App from './App.vue'
import '../mock/index.js'
import 'virtual:svg-icons-register';
import SvgIcon from "@/components/svg-icon"
import { setupRouter } from './router'
import { config } from 'md-editor-v3'
import { isMobile } from './utils/device'
import { setupStore } from './store'

config({
    markdownItConfig(md) {
        // Remember the old renderer if overridden, or proxy to the default renderer.
        const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            // Add a new `target` attribute, or replace the value of the existing one.
            tokens[idx].attrSet('target', '_blank');

            // Pass the token to the default renderer.
            return defaultRender(tokens, idx, options, env, self);
        };
    },
});



const app = createApp(App)

const deviceType = isMobile() ? 'mobile' : 'desktop';
app.provide('deviceType', deviceType);


setupRouter(app);
setupStore(app);
app.use(ArcoVue)
app.component("svg-icon", SvgIcon)
app.mount('#app')
