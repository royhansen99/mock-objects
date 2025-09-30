import { EntityClass as s, entity as i } from "deep-recipes";
const a = (x = 9999) => Math.floor(Math.random() * x);
function o(x) {
  let t = 0;
  for (let r = 0; r < x.length; r++) {
    const n = x.charCodeAt(r);
    t = (t << 5) - t + n;
  }
  return (t >>> 0).toString(36).padStart(7, "0");
}
const e = () => [1, 2, 3, 4, 5].reduce((x) => x + o(Math.random().toString()), ""), h = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  /[xy]/g,
  (x) => {
    const t = Math.random() * 16 | 0;
    return (x === "x" ? t : t & 3 | 8).toString(16);
  }
);
export {
  s as EntityClass,
  i as entity,
  o as hash,
  e as randomHash,
  a as randomNumber,
  h as randomUuid
};
//# sourceMappingURL=index.es.js.map
