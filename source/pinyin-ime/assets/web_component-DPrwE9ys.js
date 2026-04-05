import{g as I}from"./demo-routes-DjO6En3a.js";import{P as T,D as g}from"./pinyin-ime-CdK8Zop0.js";customElements.get("pinyin-ime-editor")||customElements.define("pinyin-ime-editor",T);const b=`import { PinyinIMEEditor } from "pinyin-ime";
import "pinyin-ime/pinyin-ime.css";

if (!customElements.get("pinyin-ime-editor")) {
  customElements.define("pinyin-ime-editor", PinyinIMEEditor);
}`,A=`${b}

const el = document.createElement("pinyin-ime-editor");
document.body.append(el);`,R=`${b}

const el = document.createElement("pinyin-ime-editor");
el.setAttribute("editor-type", "textarea");
document.body.append(el);`,P=`${b}

const CDN_DICT_URL = "${g}";
const el = document.createElement("pinyin-ime-editor") as HTMLElement & {
  getDictionary?: () => Promise<PinyinDict> | PinyinDict;
};
el.setAttribute("editor-type", "textarea");
el.setAttribute("popup-position", "bottom");
el.getDictionary = async () => {
  const mod = (await import(/* @vite-ignore */ CDN_DICT_URL)) as {
    dict: PinyinDict;
  };
  return mod.dict;
};
document.body.append(el);`;async function L(){return(await import(g)).dict}function O(i){const e=I(),t=document.createElement("nav");t.className="mb-2 flex flex-wrap gap-x-4 gap-y-2",t.setAttribute("aria-label","演示页面");const o=[{label:"首页",href:e.home,current:!1},{label:"React",href:e.react,current:!1},{label:"Vue",href:e.vue,current:!1},{label:"Web Component",href:e.webComponent,current:!0}];for(const d of o){const n=document.createElement("a");n.href=d.href,n.textContent=d.label,n.className=d.current?"text-sm font-medium text-foreground":"text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",t.appendChild(n)}i.appendChild(t)}function S(i){const e=document.createElement("section");e.className="rounded-md border border-border bg-muted/40 p-4 text-sm";const t=document.createElement("h2");t.className="font-medium",t.textContent="快捷键",e.appendChild(t);const o=document.createElement("ul");o.className="mt-2 list-inside list-disc space-y-1 text-muted-foreground";const d=["字母 a–z：写入拼音缓冲","空格：选择当前高亮候选；无候选则上屏拼音","上/下方向键：切换候选高亮（默认高亮第一个）","1–n：选当前页第 n 个候选（默认每页 5 条，最大 9）","= / . / 小键盘 +：下一页；- / , / 小键盘 -：上一页","左右方向键：拼音串内移动光标","Ctrl+A：全选拼音缓冲，可删除或直接替换","Enter：上屏拼音；Escape：清空缓冲","Shift 单击：无拼音时切换中/英（见框内角标）","Shift 单击：有拼音时上屏拼音（与 Enter 相同）；Shift+左右键仍用于扩选"];for(const n of d){const a=document.createElement("li");a.textContent=n,o.appendChild(a)}e.appendChild(o),i.appendChild(e)}function y(i,e){const t=document.createElement("pre");t.className="overflow-x-auto rounded bg-muted/40 p-3 text-xs";const o=document.createElement("code");o.textContent=e,t.appendChild(o),i.appendChild(t)}function $(){const i=document.getElementById("root");if(!i)return;i.replaceChildren();const e=document.createElement("main");e.className="mx-auto max-w-xl space-y-10 px-4 py-10",O(e);const t=document.createElement("div"),o=document.createElement("h1");o.className="text-2xl font-semibold tracking-tight",o.textContent="Web Component 演示",t.appendChild(o);const d=document.createElement("p");d.className="mt-2 text-sm text-muted-foreground",d.textContent='使用 document.createElement("pinyin-ime-editor") 挂载；editor-type、popup-position 等用 setAttribute；getDictionary 仅可写 property。首载由组件内部 idle 与 focusin 竞速触发。',t.appendChild(d),e.appendChild(t);const n=document.createElement("section");n.className="space-y-2";const a=document.createElement("h2");a.className="text-lg font-semibold",a.textContent="单行（默认 input，包内 google 词典）",n.appendChild(a);const N=document.createElement("div"),D=document.createElement("pinyin-ime-editor"),p=document.createElement("p");p.className="text-xs text-muted-foreground",D.addEventListener("change",s=>{const l=s.detail.value;p.textContent=`受控值：${JSON.stringify(l)}`}),N.appendChild(D),n.appendChild(N),n.appendChild(p),y(n,A),e.appendChild(n);const m=document.createElement("section");m.className="space-y-2";const u=document.createElement("h2");u.className="text-lg font-semibold",u.textContent='多行（editor-type = "textarea"）',m.appendChild(u);const v=document.createElement("div"),C=document.createElement("pinyin-ime-editor");C.setAttribute("editor-type","textarea");const E=document.createElement("p");E.className="text-xs text-muted-foreground",C.addEventListener("change",s=>{const l=s.detail.value;E.textContent=`受控值：${JSON.stringify(l)}`}),v.appendChild(C),m.appendChild(v),m.appendChild(E),y(m,R),e.appendChild(m);const c=document.createElement("section");c.className="space-y-2";const h=document.createElement("h2");h.className="text-lg font-semibold",h.textContent="多行 + CDN 词典 + popup-position（统一推迟首载）",c.appendChild(h);const x=document.createElement("p");x.className="text-xs text-muted-foreground",x.textContent=`getDictionary 加载 ${g}；属性与下方代码块一致。`,c.appendChild(x);const _=document.createElement("div"),r=document.createElement("pinyin-ime-editor");r.setAttribute("editor-type","textarea"),r.setAttribute("popup-position","bottom"),r.getDictionary=L;const f=document.createElement("p");f.className="text-xs text-muted-foreground",r.addEventListener("change",s=>{const l=s.detail.value;f.textContent=`受控值：${JSON.stringify(l)}`}),_.appendChild(r),c.appendChild(_),c.appendChild(f),y(c,P),e.appendChild(c),S(e),i.appendChild(e)}$();
