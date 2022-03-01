import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App);

Sentry.init({
  app,
  dsn: "xxxx", // replace your own dsn
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  release: "vue3@0.0.0",
  environment: "production",
  initialScope: {
    tags: { version: "vue3" },
    user: { id: 99, email: "vue-sentry@example.com" },
  },
  autoSessionTracking: false,
  logErrors: true,
});

app.use(router);

app.mount("#app");
