globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_aH577RwQ.mjs';
import './chunks/astro/server_DbPTNgPy.mjs';
import { s as sequence } from './chunks/index_oYAqoMGA.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
