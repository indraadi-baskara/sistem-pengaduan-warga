import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { A as AppTopbar_default } from './AppTopbar-DwGHk3aT.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import './nuxt-link-C7FSBqNN.mjs';
import '../virtual/entry.mjs';
import 'node:module';
import 'node:buffer';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '../nitro/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'drizzle-orm/neon-http';
import '@neondatabase/serverless';
import 'drizzle-orm/pg-core';
import 'drizzle-orm';
import 'node:crypto';
import 'node:events';
import 'node:fs/promises';
import '@iconify/utils';
import 'consola';
import './components-0OfPnzPL.mjs';
import './useAuth-DE_CnqO1.mjs';

// layouts/public.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_AppTopbar = AppTopbar_default;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F1F6FB]" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_AppTopbar, null, null, _parent));
	_push(`<div class="mx-auto max-w-[1440px] px-4 md:px-6 py-6">`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/public.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var public_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { public_default as default };
//# sourceMappingURL=public-DZCrWGiG.mjs.map
