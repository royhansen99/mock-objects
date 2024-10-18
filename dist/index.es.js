import { pathSetImmutable as a } from "object-standard-path";
const h = (n = 9999) => Math.floor(Math.random() * n);
function i(n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const e = n.charCodeAt(r);
    t = (t << 5) - t + e;
  }
  return (t >>> 0).toString(36).padStart(7, "0");
}
const s = () => [1, 2, 3, 4, 5].reduce((n) => n + i(Math.random().toString()), ""), l = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  /[xy]/g,
  (n) => {
    const t = Math.random() * 16 | 0;
    return (n === "x" ? t : t & 3 | 8).toString(16);
  }
);
function o(n) {
  if (n === null || typeof n != "object") return n;
  const t = Array.isArray(n) ? [] : {};
  for (const r in n)
    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = o(n[r]));
  return t;
}
class x {
  constructor(t) {
    this.entity = o(t);
  }
  set(t) {
    const r = o(this.entity);
    for (const e of Object.keys(t))
      r[e] = t[e];
    return new x(r);
  }
  setPath(t, r) {
    return new x(a(this.entity, t, r));
  }
  recipe(t) {
    return t(this);
  }
  get() {
    return o(this.entity);
  }
}
function u(n) {
  return new x(n);
}
export {
  u as entity,
  i as hash,
  s as randomHash,
  h as randomNumber,
  l as randomUuid
};
//# sourceMappingURL=index.es.js.map
