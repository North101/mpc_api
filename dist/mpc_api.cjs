"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var V=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function B(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var $={exports:{}};(function(e,r){(function(t,a){e.exports=a()})(V,function(){var t=function(s,o){if(o=o||{},typeof s!="function")throw new n("fetch must be a function");if(typeof o!="object")throw new n("defaults must be an object");if(o.retries!==void 0&&!a(o.retries))throw new n("retries must be a positive integer");if(o.retryDelay!==void 0&&!a(o.retryDelay)&&typeof o.retryDelay!="function")throw new n("retryDelay must be a positive integer or a function returning a positive integer");if(o.retryOn!==void 0&&!Array.isArray(o.retryOn)&&typeof o.retryOn!="function")throw new n("retryOn property expects an array or function");var c={retries:3,retryDelay:1e3,retryOn:[]};return o=Object.assign(c,o),function(f,i){var h=o.retries,x=o.retryDelay,w=o.retryOn;if(i&&i.retries!==void 0)if(a(i.retries))h=i.retries;else throw new n("retries must be a positive integer");if(i&&i.retryDelay!==void 0)if(a(i.retryDelay)||typeof i.retryDelay=="function")x=i.retryDelay;else throw new n("retryDelay must be a positive integer or a function returning a positive integer");if(i&&i.retryOn)if(Array.isArray(i.retryOn)||typeof i.retryOn=="function")w=i.retryOn;else throw new n("retryOn property expects an array or function");return new Promise(function(S,D){var P=function(u){var v=typeof Request<"u"&&f instanceof Request?f.clone():f;s(v,i).then(function(l){if(Array.isArray(w)&&w.indexOf(l.status)===-1)S(l);else if(typeof w=="function")try{return Promise.resolve(w(u,null,l)).then(function(y){y?b(u,null,l):S(l)}).catch(D)}catch(y){D(y)}else u<h?b(u,null,l):S(l)}).catch(function(l){if(typeof w=="function")try{Promise.resolve(w(u,l,null)).then(function(y){y?b(u,l,null):D(l)}).catch(function(y){D(y)})}catch(y){D(y)}else u<h?b(u,l,null):D(l)})};function b(u,v,l){var y=typeof x=="function"?x(u,v,l):x;setTimeout(function(){P(++u)},y)}P(0)})}};function a(s){return Number.isInteger(s)&&s>=0}function n(s){this.name="ArgumentError",this.message=s}return t})})($);var W=$.exports;const Y=B(W),p=Y(window.fetch),m=(e,r)=>r?`${e}?${new URLSearchParams(r)}`:e,G=e=>new DOMParser().parseFromString(e,"text/xml"),_=e=>new DOMParser().parseFromString(e,"text/html"),E=(e,r)=>document.evaluate(r,e,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;function*N(e,r){const t=document.evaluate(r,e,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(var a=0;a<t.snapshotLength;a++){const n=t.snapshotItem(a);n&&(yield n)}}const g=e=>{const r={};for(const t of N(e,'//form[@id="form1"]/div[@class="aspNetHidden"]/input[@type="hidden"]')){const a=t;r[a.name]=a.value}for(const t of N(e,'//form[@id="form1"]/input[@type="hidden"]')){const a=t;r[a.name]=a.value}return r},A=async(e,r)=>{const t=await p(m(`${e.url}/products/pro_item_process_flow.aspx`,{itemid:e.unit,attachno:e.cardStock,pcs:`${r.length}`,producteffectno:e.printType,processno:e.finish,packid:e.packaging,qty:"1"}),{retries:5,retryDelay:500}),a=_(await t.text());return E(a,'/html/body/form[@id="form1"]/@action').textContent.replace("./dn_playingcards_front_dynamic.aspx?ssid=","")},C=async(e,r,t)=>{const a=t.length,n=m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nf.aspx`,{ssid:e}),s=await p(n),o={...g(_(await s.text())),__EVENTTARGET:"btn_next_step",hidd_mode:"ImageText",txt_card_number:`${a}`,dro_total_count:`${a}`,hidd_material_no:r.cardStock,hidd_packing_no:r.packaging,hidd_design_count:`${a}`},c=new FormData;for(const[d,f]of Object.entries(o))c.append(d,f);return p(n,{method:"POST",body:c,retries:5,retryDelay:500})},F=async(e,r,t)=>{const a=t.length,n=m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nb.aspx`,{ssid:e}),s=await p(n),o={...g(_(await s.text())),__EVENTTARGET:"btn_next_step",hidd_mode:"ImageText",hidd_design_count:`${a}`},c=new FormData;for(const[d,f]of Object.entries(o))c.append(d,f);return p(n,{method:"POST",body:c,retries:5,retryDelay:500})},I=async(e,r)=>{const t=m(`${r.url}/products/playingcard/design/dn_playingcards_front_dynamic.aspx`,{ssid:e}),a=await p(t),n={...g(_(await a.text())),__EVENTTARGET:"btn_next_step"},s=new FormData;for(const[c,d]of Object.entries(n))s.append(c,d);await p(t,{method:"POST",body:s,retries:5,retryDelay:500});const o=JSON.parse(n.hdParameter);return{pixelInfo:JSON.parse(o.Base.PixelInfo),unpickInfo:JSON.parse(o.Base.UnpickInfo)[0]}},R=async(e,r)=>{const t=m(`${r.url}/design/dn_texteditor_front.aspx`,{ssid:e}),a=await p(t),n={...g(_(await a.text())),__EVENTTARGET:"btn_next_step"},s=new FormData;for(const[o,c]of Object.entries(n))s.append(o,c);await p(t,{method:"POST",body:s,retries:5,retryDelay:500})},j=async(e,r)=>{const t=m(`${r.url}/products/playingcard/design/dn_playingcards_back_dynamic.aspx`,{ssid:e}),a=await p(t),n={...g(_(await a.text())),__EVENTTARGET:"btn_next_step"},s=new FormData;for(const[o,c]of Object.entries(n))s.append(o,c);await p(t,{method:"POST",body:s,retries:5,retryDelay:500})},k=async(e,r)=>{const t=m(`${r.url}/design/dn_texteditor_back.aspx`,{ssid:e}),a=await p(t),n={...g(_(await a.text())),__EVENTTARGET:"btn_next_step"},s=new FormData;for(const[o,c]of Object.entries(n))s.append(o,c);await p(t,{method:"POST",body:s,retries:5,retryDelay:500})},O=(e,r)=>({ID:r.SourceID,Exp:r.Exp,Owner:"",Path:`${e.url}/PreviewFiles/Normal/temp`,Width:r.Width,Height:r.Height,imageName:`${r.SourceID}.${r.Exp}`}),T=(e,r,t)=>[{ID:e.ID,SourceID:e.SourceID,Exp:e.Exp,X:t.X,Y:t.Y,Width:t.Width,Height:t.Height,CropX:0,CropY:0,CropWidth:t.Width,CropHeight:t.Height,CropRotate:0,Rotate:t.Rotate,Zoom:0,Scale:1,FlipHorizontal:"N",FlipVertical:"N",Sharpen:"N",Filter:r.Filter,Brightness:0,ThumbnailScale:1,AllowEdit:t.AllowEdit,AllowMove:t.AllowMove,Alpha:t.Alpha,Resolution:t.Resolution,Index:0,Quality:e.Height/t.Height*100>=t.Resolution?"Y":"N",AutoDirection:t.AutoDirection,ApplyMask:t.ApplyMask,IsEmpty:!1}],H=async(e,r,t,a,n)=>{const s=new FormData;return s.append("frontImageList",JSON.stringify(t.map(o=>o.front?O(r,o.front):null))),s.append("frontCropInfo",JSON.stringify(t.map(o=>o.front?T(o.front,a,n):null))),s.append("frontDesignModePage","dn_playingcards_mode_nf.aspx"),s.append("frontTextInfo",[...new Array(t.length)].map(()=>"").join("%u25C7")),s.append("backImageList",JSON.stringify(t.map(o=>o.back?O(r,o.back):null))),s.append("backCropInfo",JSON.stringify(t.map(o=>o.back?T(o.back,a,n):null))),s.append("backTextInfo",[...new Array(t.length)].map(()=>"").join("%u25C7")),s.append("backDesignModePage","dn_playingcards_mode_nb.aspx"),s.append("expand","null"),s.append("mapinfo","[]"),p(m(`${r.url}/design/dn_keep_session.aspx`,{ssid:e}),{method:"POST",body:s,retries:5,retryDelay:500})},M=async(e,r)=>{if(!r.name)return;const t=new FormData;return t.append("name",r.name),p(m(`${r.url}/design/dn_project_save.aspx`,{ssid:e}),{method:"POST",body:t,retries:5,retryDelay:500})},J=async(e,r)=>{const t=r.reduce((o,c)=>{for(let d=0;d<c.count;d++)o.push(c);return o},[]),a=await A(e,t);await C(a,e,t),await F(a,e,t);const{pixelInfo:n,unpickInfo:s}=await I(a,e);return await R(a,e),await j(a,e),await k(a,e),await H(a,e,t,n,s),await M(a,e),`${e.url}/design/dn_preview_layout.aspx?ssid=${a}`},X=async(e,r)=>{const t=[],a=e.maxCards,n=Math.ceil(r.reduce((c,d)=>c+d.count,0)/a);let s=0,o=0;for(;s<r.length;){const c=[];let d=0;for(;d<a&&s<r.length;){const i=r[s],h=Math.min(i.count-o,a-d);c.push(h==i.count?i:{...i,count:h}),o+=h,o>=i.count&&(s+=1,o=0),d+=h}const f=n>1?`${e.name} (${t.length+1}/${n})`:e.name;t.push(await J({...e,name:f},c))}return t},L=async e=>await(await p(`${e}/api/common/getdatetime.ashx`)).text().then(t=>t.replace(/\-/g,"/")),q=async(e,r,t)=>{const a=await L(e.url),n=new FormData;n.append("fileData",t),n.append("userName",""),n.append("layer",r),n.append("st",a),n.append("pt","0"),n.append("ip","");const s=await p(`${e.url}/uploader/up_product.aspx`,{method:"POST",body:n,retries:5,retryDelay:500}),o=_(await s.text());return JSON.parse(E(o,'/html/body/form/input[@id="hidd_image_info"]/@value').textContent)},U=async(e,r,t,a)=>{const n=new FormData;n.append("photoindex",`${t}`),n.append("source",JSON.stringify(a)),n.append("face",r),n.append("width",`${e.width}`),n.append("height",`${e.height}`),n.append("dpi",`${e.dpi}`),n.append("auto",e.auto?"Y":"N"),n.append("scale",`${e.scale}`),n.append("filter",""),n.append("productCode",e.product),n.append("designCode",r==="front"?e.frontDesign:e.backDesign),n.append("sortNo",`${e.sortNo}`),n.append("applyMask",e.applyMask?"Y":"N");const s=await p(`${e.url}/design/dn_product_analysis_photo.aspx`,{method:"POST",body:n,retries:5,retryDelay:500}),o=G(await s.text());return JSON.parse(E(o,"/Values/Value/text()").textContent).CropInfo},z=(e,r)=>({ID:e.ID,SourceID:e.SourceID,Exp:r.Exp,Width:r.Width,Height:r.Height});exports.analysisImage=U;exports.compressImageData=z;exports.createAutoSplitProject=X;exports.createProject=J;exports.initProject=A;exports.saveBackImageStep=j;exports.saveBackSettings=F;exports.saveBackTextStep=k;exports.saveFrontImageStep=I;exports.saveFrontSettings=C;exports.saveFrontTextStep=R;exports.saveProject=M;exports.saveSession=H;exports.uncompressCropData=T;exports.uncompressImageData=O;exports.uploadImage=q;
