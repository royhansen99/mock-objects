import { pathSetImmutable as y } from "object-standard-path";
class i {
  constructor(t) {
    this.entity = r(t);
  }
  set(t) {
    const n = r(this.entity);
    for (const o of Object.keys(t))
      n[o] = t[o];
    return new i(n);
  }
  setPath(t, n) {
    return new i(y(this.entity, t, n));
  }
  recipe(t) {
    return t(this);
  }
  get() {
    return r(this.entity);
  }
}
function f(e) {
  return new i(e);
}
function r(e) {
  if (e === null || typeof e != "object") return e;
  const t = Array.isArray(e) ? [] : {};
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = r(e[n]));
  return t;
}
export {
  f as entity
};
//# sourceMappingURL=index.es.js.map
