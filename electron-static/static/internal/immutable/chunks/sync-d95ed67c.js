import{d as A,s as H,e as T,f as L,g as P,h as R,p as $,j as M,k as N,l as V,n as j,o as I,q as W,r as q,u as f,w as m,x as C,y as O,z as _,A as U,B as z}from"./app-stores-4e7315fd.js";import{H as g,B as J,A as r}from"./custom-banner-69a35a82.js";import{s as i,b as c}from"./index-2f7744fb.js";import{w as p}from"./index-7767edb7.js";import{r as K,b as G}from"./toast-3b548df1.js";import{c as Y}from"./api-cookie-d587b0da.js";const{clearIDB:Q}=g,X=async()=>{const e=await caches.keys();for(const a of e)await caches.delete(a);return!0},he=async({clearCache:e=!1,keepSetting:a=!1}={})=>{if(await Q(),e&&await X(),A.set({point:null,selected:null}),H.set(!0),T.set(20),a){const k=i.get("config"),E=i.get("pity"),D=i.get("balance"),B=i.get("probabilityRates"),w=i.get("export");localStorage.removeItem("WishSimulator.App"),i.set("config",k),i.set("pity",E),i.set("balance",D),i.set("probabilityRates",B),w?.id&&i.set("export",w);return}const t=c.get("locale"),s=i.get("export");localStorage.removeItem("WishSimulator.App"),t&&c.set("locale",t),s?.id&&i.set("export",s);const{fates:o,genesis:b,primogem:v}=z;L.set(o),P.set(o),R.set(b),$.set(v),M.set(0),N.set(0),V.set(0),j.set(0),I.set({}),W.set(!1),c.set("storageVersion",q),c.set("version",`${f}-${m}`),C.set({patch:f,phase:m}),O.set(0),_.set(!1),U.set("default")},l=p({}),y=p(null),F=p(!1),n=p(!1),Z=()=>{const{id:e}=i.get("export"),a=e||`GI${K(111111111,999999999)}`,t=new Date;i.set("export",{id:a,date:t})},u=async()=>{const e=await J.getAll(),a=await g.getAllHistories(),t=Y.get("accessKey");Z();const s=i.getData(),o={banners:e,histories:a,settings:s,accessKey:t};return JSON.stringify(o)},xe=async()=>{const e=await u(),a=new Blob([e],{type:"text/plain"}),t=document.createElement("a"),s=new Date().toLocaleDateString();t.download=`WishSimulator.App_Backup_${s}.bin`,t.href=(window.webkitURL||window.URL).createObjectURL(a),t.dataset.downloadurl=["text/plain",t.download,t.href].join(":"),t.click()},ee="application/octet-stream, application/json, text/plain",te=e=>{const a=ee.match(e.type),t=e.name.match(/.(bin|json|txt)$/);return a&&t},ae=async e=>{try{const a=await e.text(),t=JSON.parse(a),{id:s}=t?.settings?.data?.export||{};return s?t:null}catch{return null}},h=async e=>{if(!te(e))throw new Error("Not a valid Backup File");const t=await ae(e);if(!t)throw new Error("Failed to parse imported file");return t},Se=async e=>{const a=e[0],t=await h(a);return{file:a,parsedFile:t}},be=()=>{const{isSupported:e}=G(),a="chooseFileSystemEntries"in window,t="showSaveFilePicker"in window;return e&&(a||t)},ve=e=>isNaN(e)?"...B":`${(e/(1024*1024)).toFixed(2)}MB`,x=async e=>{if(!e)return l.set({});const{name:a,size:t,webkitRelativePath:s,lastModified:o}=await e.getFile();l.set({name:a,size:t,webkitRelativePath:s,lastModified:o})},se=async e=>{const a={key:"savedFile",fileHandle:e};return await r.put(a)},ke=async()=>{const{fileHandle:e}=await r.get("savedFile")||{};if(!e)return null;l.set({name:e.name}),y.set(e)},ie=async()=>{await r.delete("savedFile"),l.set({}),F.set(!1)},oe=async e=>{try{return await e.getFile()}catch{return ie(),!1}},Ee=async(e,{checkOnly:a=!1}={})=>{if(!e)return!1;const t={writable:!0,mode:"readwrite"};return a?await e.queryPermission(t)==="granted":await e.queryPermission(t)==="granted"||await e.requestPermission(t)==="granted"},ne=()=>{const a=`WishSimulator.App_Backup_${new Date().toLocaleDateString()}.bin`;if("showSaveFilePicker"in window){const s={suggestedName:a,types:[{description:"Text file",accept:{"text/plain":[".bin"]}}]};return window.showSaveFilePicker(s)}const t={type:"save-file",accepts:[{description:"Text file",extensions:["bin"],mimeTypes:["text/plain"]}]};return window.chooseFileSystemEntries({opts:t})},S=async(e,a)=>{if(e.createWriter){const s=await e.createWriter();await s.write(0,a),await s.close();return}const t=await e.createWritable();await t.write(a),await t.close()},De=async()=>{try{n.set(!0);const e=await ne(),a=await u();return await S(e,a),await se(e),x(e),y.set(e),F.set(!0),n.set(!1),e}catch(e){console.error("failed to save export",e),n.set(!1)}},re=async()=>{try{n.set(!0);const{fileHandle:e}=await r.get("savedFile");if(!e)return n.set(!1);if(!await oe(e))throw new Error("Destination File does not exist, Auto Export will be turned off");const t=await u();await S(e,t),await x(e),n.set(!1)}catch(e){console.error("Auto Export Failed:",e.message),n.set(!1)}},ce=async e=>{const{fileHandle:a}=await r.get("savedFile");if(await e.isSameEntry(a))throw new Error("You cannot import the currently exported file.");const s=await e.getFile(),o=await h(s);return{handle:e,file:s,parsedFile:o}},Be=async e=>{const a=[...e].filter(t=>t.kind==="file").map(t=>t.getAsFileSystemHandle());for await(const t of a)if(t.kind==="file")return ce(t)},le=({to:e}={})=>{if(e==="local")return re();e!="drive"},pe=2500;let d=!1;const de=async()=>{if(d)return;d=!0,await le({to:"local"});const e=setTimeout(()=>{d=!1,clearTimeout(e)},pe)},ue=async()=>{},Ae=e=>{ue(),e&&de()};export{be as F,F as a,ve as b,X as c,ee as d,y as e,he as f,l as g,n as h,Se as i,oe as j,ke as k,xe as l,De as m,Be as r,Ae as s,le as u,Ee as v};