// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/assets/*", "/*.png", "/*.ico", "/*.xml", "/*.txt"]
};

// ../../../root/.npm/_npx/c943b712072b77c4/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/user/grupo-rc-sitio/.wrangler/tmp/pages-xCXICN/functionsWorker-0.8975482986804928.mjs";
import { isRoutingRuleMatch } from "/root/.npm/_npx/c943b712072b77c4/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/user/grupo-rc-sitio/.wrangler/tmp/pages-xCXICN/functionsWorker-0.8975482986804928.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=7531558lx8h.js.map
