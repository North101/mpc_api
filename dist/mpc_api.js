var A = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function R(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $ = { exports: {} };
(function(e, r) {
  (function(t, a) {
    e.exports = a();
  })(A, function() {
    var t = function(i, o) {
      if (o = o || {}, typeof i != "function")
        throw new n("fetch must be a function");
      if (typeof o != "object")
        throw new n("defaults must be an object");
      if (o.retries !== void 0 && !a(o.retries))
        throw new n("retries must be a positive integer");
      if (o.retryDelay !== void 0 && !a(o.retryDelay) && typeof o.retryDelay != "function")
        throw new n("retryDelay must be a positive integer or a function returning a positive integer");
      if (o.retryOn !== void 0 && !Array.isArray(o.retryOn) && typeof o.retryOn != "function")
        throw new n("retryOn property expects an array or function");
      var s = {
        retries: 3,
        retryDelay: 1e3,
        retryOn: []
      };
      return o = Object.assign(s, o), function(u, d) {
        var b = o.retries, x = o.retryDelay, _ = o.retryOn;
        if (d && d.retries !== void 0)
          if (a(d.retries))
            b = d.retries;
          else
            throw new n("retries must be a positive integer");
        if (d && d.retryDelay !== void 0)
          if (a(d.retryDelay) || typeof d.retryDelay == "function")
            x = d.retryDelay;
          else
            throw new n("retryDelay must be a positive integer or a function returning a positive integer");
        if (d && d.retryOn)
          if (Array.isArray(d.retryOn) || typeof d.retryOn == "function")
            _ = d.retryOn;
          else
            throw new n("retryOn property expects an array or function");
        return new Promise(function(O, w) {
          var v = function(y) {
            var S = typeof Request < "u" && u instanceof Request ? u.clone() : u;
            i(S, d).then(function(l) {
              if (Array.isArray(_) && _.indexOf(l.status) === -1)
                O(l);
              else if (typeof _ == "function")
                try {
                  return Promise.resolve(_(y, null, l)).then(function(f) {
                    f ? g(y, null, l) : O(l);
                  }).catch(w);
                } catch (f) {
                  w(f);
                }
              else
                y < b ? g(y, null, l) : O(l);
            }).catch(function(l) {
              if (typeof _ == "function")
                try {
                  Promise.resolve(_(y, l, null)).then(function(f) {
                    f ? g(y, l, null) : w(l);
                  }).catch(function(f) {
                    w(f);
                  });
                } catch (f) {
                  w(f);
                }
              else
                y < b ? g(y, l, null) : w(l);
            });
          };
          function g(y, S, l) {
            var f = typeof x == "function" ? x(y, S, l) : x;
            setTimeout(function() {
              v(++y);
            }, f);
          }
          v(0);
        });
      };
    };
    function a(i) {
      return Number.isInteger(i) && i >= 0;
    }
    function n(i) {
      this.name = "ArgumentError", this.message = i;
    }
    return t;
  });
})($);
var C = $.exports;
const F = /* @__PURE__ */ R(C), c = F(window.fetch), m = (e, r) => r ? `${e}?${new URLSearchParams(r)}` : e, I = (e) => new DOMParser().parseFromString(e, "text/xml"), h = (e) => new DOMParser().parseFromString(e, "text/html"), T = (e, r) => document.evaluate(
  r,
  e,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;
function* E(e, r) {
  const t = document.evaluate(
    r,
    e,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (var a = 0; a < t.snapshotLength; a++) {
    const n = t.snapshotItem(a);
    n && (yield n);
  }
}
const D = (e) => {
  const r = {};
  for (const t of E(e, '//form[@id="form1"]/div[@class="aspNetHidden"]/input[@type="hidden"]')) {
    const a = t;
    r[a.name] = a.value;
  }
  for (const t of E(e, '//form[@id="form1"]/input[@type="hidden"]')) {
    const a = t;
    r[a.name] = a.value;
  }
  return r;
}, k = async (e, r) => {
  const t = await c(m(`${e.url}/products/pro_item_process_flow.aspx`, {
    // Card type
    itemid: e.unit,
    // Card Stock
    attachno: e.cardStock,
    // number of cards
    pcs: `${r.length}`,
    // Print type
    producteffectno: e.printType,
    // Finish
    processno: e.finish,
    // Packaging
    packid: e.packaging,
    qty: "1"
  }), {
    retries: 5,
    retryDelay: 500
  }), a = h(await t.text());
  return T(a, '/html/body/form[@id="form1"]/@action').textContent.replace("./dn_playingcards_front_dynamic.aspx?ssid=", "");
}, j = async (e, r, t) => {
  const a = t.length, n = m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nf.aspx`, {
    ssid: e
  }), i = await c(n), o = {
    ...D(h(await i.text())),
    __EVENTTARGET: "btn_next_step",
    hidd_mode: "ImageText",
    txt_card_number: `${a}`,
    dro_total_count: `${a}`,
    hidd_material_no: r.cardStock,
    hidd_packing_no: r.packaging,
    hidd_design_count: `${a}`
  }, s = new FormData();
  for (const [p, u] of Object.entries(o))
    s.append(p, u);
  return c(n, {
    method: "POST",
    body: s,
    retries: 5,
    retryDelay: 500
  });
}, H = async (e, r, t) => {
  const a = t.length, n = m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nb.aspx`, {
    ssid: e
  }), i = await c(n), o = {
    ...D(h(await i.text())),
    __EVENTTARGET: "btn_next_step",
    hidd_mode: "ImageText",
    hidd_design_count: `${a}`
  }, s = new FormData();
  for (const [p, u] of Object.entries(o))
    s.append(p, u);
  return c(n, {
    method: "POST",
    body: s,
    retries: 5,
    retryDelay: 500
  });
}, M = async (e, r) => {
  const t = m(`${r.url}/products/playingcard/design/dn_playingcards_front_dynamic.aspx`, {
    ssid: e
  }), a = await c(t), n = {
    ...D(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, i = new FormData();
  for (const [s, p] of Object.entries(n))
    i.append(s, p);
  await c(t, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
  const o = JSON.parse(n.hdParameter);
  return {
    pixelInfo: JSON.parse(o.Base.PixelInfo),
    unpickInfo: JSON.parse(o.Base.UnpickInfo)[0]
  };
}, J = async (e, r) => {
  const t = m(`${r.url}/design/dn_texteditor_front.aspx`, {
    ssid: e
  }), a = await c(t), n = {
    ...D(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, i = new FormData();
  for (const [o, s] of Object.entries(n))
    i.append(o, s);
  await c(t, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, V = async (e, r) => {
  const t = m(`${r.url}/products/playingcard/design/dn_playingcards_back_dynamic.aspx`, {
    ssid: e
  }), a = await c(t), n = {
    ...D(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, i = new FormData();
  for (const [o, s] of Object.entries(n))
    i.append(o, s);
  await c(t, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, W = async (e, r) => {
  const t = m(`${r.url}/design/dn_texteditor_back.aspx`, {
    ssid: e
  }), a = await c(t), n = {
    ...D(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, i = new FormData();
  for (const [o, s] of Object.entries(n))
    i.append(o, s);
  await c(t, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, P = (e, r) => ({
  ID: r.SourceID,
  Exp: r.Exp,
  Owner: "",
  Path: `${e.url}/PreviewFiles/Normal/temp`,
  Width: r.Width,
  Height: r.Height,
  imageName: `${r.SourceID}.${r.Exp}`
}), N = (e, r, t) => [{
  ID: e.ID,
  SourceID: e.SourceID,
  Exp: e.Exp,
  X: t.X,
  Y: t.Y,
  Width: t.Width,
  Height: t.Height,
  CropX: 0,
  CropY: 0,
  CropWidth: t.Width,
  CropHeight: t.Height,
  CropRotate: 0,
  Rotate: t.Rotate,
  Zoom: 0,
  Scale: 1,
  FlipHorizontal: "N",
  FlipVertical: "N",
  Sharpen: "N",
  Filter: r.Filter,
  Brightness: 0,
  ThumbnailScale: 1,
  AllowEdit: t.AllowEdit,
  AllowMove: t.AllowMove,
  Alpha: t.Alpha,
  Resolution: t.Resolution,
  Index: 0,
  Quality: e.Height / t.Height * 100 >= t.Resolution ? "Y" : "N",
  // A guess
  AutoDirection: t.AutoDirection,
  ApplyMask: t.ApplyMask,
  IsEmpty: !1
}], Y = async (e, r, t, a, n) => {
  const i = new FormData();
  return i.append("frontImageList", JSON.stringify(t.map((o) => o.front ? P(r, o.front) : null))), i.append("frontCropInfo", JSON.stringify(t.map((o) => o.front ? N(o.front, a, n) : null))), i.append("frontDesignModePage", "dn_playingcards_mode_nf.aspx"), i.append("frontTextInfo", [...new Array(t.length)].map(() => "").join("%u25C7")), i.append("backImageList", JSON.stringify(t.map((o) => o.back ? P(r, o.back) : null))), i.append("backCropInfo", JSON.stringify(t.map((o) => o.back ? N(o.back, a, n) : null))), i.append("backTextInfo", [...new Array(t.length)].map(() => "").join("%u25C7")), i.append("backDesignModePage", "dn_playingcards_mode_nb.aspx"), i.append("expand", "null"), i.append("mapinfo", "[]"), c(m(`${r.url}/design/dn_keep_transition_data.aspx`, {
    ssid: e
  }), {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, G = async (e, r) => {
  if (!r.name)
    return;
  const t = new FormData();
  return t.append("name", r.name), c(m(`${r.url}/design/dn_project_save.aspx`, {
    ssid: e
  }), {
    method: "POST",
    body: t,
    retries: 5,
    retryDelay: 500
  });
}, B = async (e, r) => {
  const t = r.reduce((o, s) => {
    for (let p = 0; p < s.count; p++)
      o.push(s);
    return o;
  }, []), a = await k(e, t);
  await j(a, e, t), await H(a, e, t);
  const { pixelInfo: n, unpickInfo: i } = await M(a, e);
  return await J(a, e), await V(a, e), await W(a, e), await Y(a, e, t, n, i), await G(a, e), `${e.url}/design/dn_preview_layout.aspx?ssid=${a}`;
}, L = async (e, r) => {
  const t = [], a = e.maxCards;
  let n = 0, i = 0;
  for (; n < r.length; ) {
    const o = [];
    let s = 0;
    for (; s < a && n < r.length; ) {
      const p = r[n], u = Math.min(p.count - i, a - s);
      o.push(u == p.count ? p : {
        ...p,
        count: u
      }), i += u, i >= p.count && (n += 1, i = 0), s += u;
    }
    t.push(await B(e, o));
  }
  return t;
}, X = async (e) => await (await c(`${e}/api/common/getdatetime.ashx`)).text().then((t) => t.replace(/\-/g, "/")), q = async (e, r, t) => {
  const a = await X(e.url), n = new FormData();
  n.append("fileData", t), n.append("userName", ""), n.append("layer", r), n.append("st", a), n.append("pt", "0"), n.append("ip", "");
  const i = await c(`${e.url}/uploader/up_product.aspx`, {
    method: "POST",
    body: n,
    retries: 5,
    retryDelay: 500
  }), o = h(await i.text());
  return JSON.parse(T(o, '/html/body/form/input[@id="hidd_image_info"]/@value').textContent);
}, U = async (e, r, t, a) => {
  const n = new FormData();
  n.append("photoindex", `${t}`), n.append("source", JSON.stringify(a)), n.append("face", r), n.append("width", `${e.width}`), n.append("height", `${e.height}`), n.append("dpi", `${e.dpi}`), n.append("auto", e.auto ? "Y" : "N"), n.append("scale", `${e.scale}`), n.append("filter", ""), n.append("productCode", e.product), n.append("designCode", r === "front" ? e.frontDesign : e.backDesign), n.append("sortNo", `${e.sortNo}`), n.append("applyMask", e.applyMask ? "Y" : "N");
  const i = await c(`${e.url}/design/dn_product_analysis_photo.aspx`, {
    method: "POST",
    body: n,
    retries: 5,
    retryDelay: 500
  }), o = I(await i.text());
  return JSON.parse(T(o, "/Values/Value/text()").textContent).CropInfo;
}, z = (e, r) => ({
  ID: e.ID,
  SourceID: e.SourceID,
  Exp: r.Exp,
  Width: r.Width,
  Height: r.Height
});
export {
  U as analysisImage,
  z as compressImageData,
  L as createAutoSplitProject,
  B as createProject,
  k as initProject,
  V as saveBackImageStep,
  H as saveBackSettings,
  W as saveBackTextStep,
  M as saveFrontImageStep,
  j as saveFrontSettings,
  J as saveFrontTextStep,
  G as saveProject,
  Y as saveSession,
  N as uncompressCropData,
  P as uncompressImageData,
  q as uploadImage
};
