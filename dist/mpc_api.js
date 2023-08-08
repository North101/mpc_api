var A = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function R(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $ = { exports: {} };
(function(e, r) {
  (function(t, a) {
    e.exports = a();
  })(A, function() {
    var t = function(c, o) {
      if (o = o || {}, typeof c != "function")
        throw new n("fetch must be a function");
      if (typeof o != "object")
        throw new n("defaults must be an object");
      if (o.retries !== void 0 && !a(o.retries))
        throw new n("retries must be a positive integer");
      if (o.retryDelay !== void 0 && !a(o.retryDelay) && typeof o.retryDelay != "function")
        throw new n("retryDelay must be a positive integer or a function returning a positive integer");
      if (o.retryOn !== void 0 && !Array.isArray(o.retryOn) && typeof o.retryOn != "function")
        throw new n("retryOn property expects an array or function");
      var i = {
        retries: 3,
        retryDelay: 1e3,
        retryOn: []
      };
      return o = Object.assign(i, o), function(f, s) {
        var h = o.retries, g = o.retryDelay, w = o.retryOn;
        if (s && s.retries !== void 0)
          if (a(s.retries))
            h = s.retries;
          else
            throw new n("retries must be a positive integer");
        if (s && s.retryDelay !== void 0)
          if (a(s.retryDelay) || typeof s.retryDelay == "function")
            g = s.retryDelay;
          else
            throw new n("retryDelay must be a positive integer or a function returning a positive integer");
        if (s && s.retryOn)
          if (Array.isArray(s.retryOn) || typeof s.retryOn == "function")
            w = s.retryOn;
          else
            throw new n("retryOn property expects an array or function");
        return new Promise(function(O, D) {
          var v = function(u) {
            var S = typeof Request < "u" && f instanceof Request ? f.clone() : f;
            c(S, s).then(function(l) {
              if (Array.isArray(w) && w.indexOf(l.status) === -1)
                O(l);
              else if (typeof w == "function")
                try {
                  return Promise.resolve(w(u, null, l)).then(function(y) {
                    y ? b(u, null, l) : O(l);
                  }).catch(D);
                } catch (y) {
                  D(y);
                }
              else
                u < h ? b(u, null, l) : O(l);
            }).catch(function(l) {
              if (typeof w == "function")
                try {
                  Promise.resolve(w(u, l, null)).then(function(y) {
                    y ? b(u, l, null) : D(l);
                  }).catch(function(y) {
                    D(y);
                  });
                } catch (y) {
                  D(y);
                }
              else
                u < h ? b(u, l, null) : D(l);
            });
          };
          function b(u, S, l) {
            var y = typeof g == "function" ? g(u, S, l) : g;
            setTimeout(function() {
              v(++u);
            }, y);
          }
          v(0);
        });
      };
    };
    function a(c) {
      return Number.isInteger(c) && c >= 0;
    }
    function n(c) {
      this.name = "ArgumentError", this.message = c;
    }
    return t;
  });
})($);
var C = $.exports;
const F = /* @__PURE__ */ R(C), p = F(window.fetch), m = (e, r) => r ? `${e}?${new URLSearchParams(r)}` : e, I = (e) => new DOMParser().parseFromString(e, "text/xml"), _ = (e) => new DOMParser().parseFromString(e, "text/html"), T = (e, r) => document.evaluate(
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
const x = (e) => {
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
}, j = async (e, r) => {
  const t = await p(m(`${e.url}/products/pro_item_process_flow.aspx`, {
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
  }), a = _(await t.text());
  return T(a, '/html/body/form[@id="form1"]/@action').textContent.replace("./dn_playingcards_front_dynamic.aspx?ssid=", "");
}, k = async (e, r, t) => {
  const a = t.length, n = m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nf.aspx`, {
    ssid: e
  }), c = await p(n), o = {
    ...x(_(await c.text())),
    __EVENTTARGET: "btn_next_step",
    hidd_mode: "ImageText",
    txt_card_number: `${a}`,
    dro_total_count: `${a}`,
    hidd_material_no: r.cardStock,
    hidd_packing_no: r.packaging,
    hidd_design_count: `${a}`
  }, i = new FormData();
  for (const [d, f] of Object.entries(o))
    i.append(d, f);
  return p(n, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, H = async (e, r, t) => {
  const a = t.length, n = m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nb.aspx`, {
    ssid: e
  }), c = await p(n), o = {
    ...x(_(await c.text())),
    __EVENTTARGET: "btn_next_step",
    hidd_mode: "ImageText",
    hidd_design_count: `${a}`
  }, i = new FormData();
  for (const [d, f] of Object.entries(o))
    i.append(d, f);
  return p(n, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, M = async (e, r) => {
  const t = m(`${r.url}/products/playingcard/design/dn_playingcards_front_dynamic.aspx`, {
    ssid: e
  }), a = await p(t), n = {
    ...x(_(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [i, d] of Object.entries(n))
    c.append(i, d);
  await p(t, {
    method: "POST",
    body: c,
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
  }), a = await p(t), n = {
    ...x(_(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [o, i] of Object.entries(n))
    c.append(o, i);
  await p(t, {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, V = async (e, r) => {
  const t = m(`${r.url}/products/playingcard/design/dn_playingcards_back_dynamic.aspx`, {
    ssid: e
  }), a = await p(t), n = {
    ...x(_(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [o, i] of Object.entries(n))
    c.append(o, i);
  await p(t, {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, W = async (e, r) => {
  const t = m(`${r.url}/design/dn_texteditor_back.aspx`, {
    ssid: e
  }), a = await p(t), n = {
    ...x(_(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [o, i] of Object.entries(n))
    c.append(o, i);
  await p(t, {
    method: "POST",
    body: c,
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
  const c = new FormData();
  return c.append("frontImageList", JSON.stringify(t.map((o) => o.front ? P(r, o.front) : null))), c.append("frontCropInfo", JSON.stringify(t.map((o) => o.front ? N(o.front, a, n) : null))), c.append("frontDesignModePage", "dn_playingcards_mode_nf.aspx"), c.append("frontTextInfo", [...new Array(t.length)].map(() => "").join("%u25C7")), c.append("backImageList", JSON.stringify(t.map((o) => o.back ? P(r, o.back) : null))), c.append("backCropInfo", JSON.stringify(t.map((o) => o.back ? N(o.back, a, n) : null))), c.append("backTextInfo", [...new Array(t.length)].map(() => "").join("%u25C7")), c.append("backDesignModePage", "dn_playingcards_mode_nb.aspx"), c.append("expand", "null"), c.append("mapinfo", "[]"), p(m(`${r.url}/design/dn_keep_session.aspx`, {
    ssid: e
  }), {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, G = async (e, r) => {
  if (!r.name)
    return;
  const t = new FormData();
  return t.append("name", r.name), p(m(`${r.url}/design/dn_project_save.aspx`, {
    ssid: e
  }), {
    method: "POST",
    body: t,
    retries: 5,
    retryDelay: 500
  });
}, B = async (e, r) => {
  const t = r.reduce((o, i) => {
    for (let d = 0; d < i.count; d++)
      o.push(i);
    return o;
  }, []), a = await j(e, t);
  await k(a, e, t), await H(a, e, t);
  const { pixelInfo: n, unpickInfo: c } = await M(a, e);
  return await J(a, e), await V(a, e), await W(a, e), await Y(a, e, t, n, c), await G(a, e), `${e.url}/design/dn_preview_layout.aspx?ssid=${a}`;
}, L = async (e, r) => {
  const t = [], a = e.maxCards, n = Math.ceil(r.reduce((i, d) => i + d.count, 0) / a);
  let c = 0, o = 0;
  for (; c < r.length; ) {
    const i = [];
    let d = 0;
    for (; d < a && c < r.length; ) {
      const s = r[c], h = Math.min(s.count - o, a - d);
      i.push(h == s.count ? s : {
        ...s,
        count: h
      }), o += h, o >= s.count && (c += 1, o = 0), d += h;
    }
    const f = n > 1 ? `${e.name} (${t.length + 1}/${n})` : e.name;
    t.push(await B({
      ...e,
      name: f
    }, i));
  }
  return t;
}, X = async (e) => await (await p(`${e}/api/common/getdatetime.ashx`)).text().then((t) => t.replace(/\-/g, "/")), q = async (e, r, t) => {
  const a = await X(e.url), n = new FormData();
  n.append("fileData", t), n.append("userName", ""), n.append("layer", r), n.append("st", a), n.append("pt", "0"), n.append("ip", "");
  const c = await p(`${e.url}/uploader/up_product.aspx`, {
    method: "POST",
    body: n,
    retries: 5,
    retryDelay: 500
  }), o = _(await c.text());
  return JSON.parse(T(o, '/html/body/form/input[@id="hidd_image_info"]/@value').textContent);
}, U = async (e, r, t, a) => {
  const n = new FormData();
  n.append("photoindex", `${t}`), n.append("source", JSON.stringify(a)), n.append("face", r), n.append("width", `${e.width}`), n.append("height", `${e.height}`), n.append("dpi", `${e.dpi}`), n.append("auto", e.auto ? "Y" : "N"), n.append("scale", `${e.scale}`), n.append("filter", ""), n.append("productCode", e.product), n.append("designCode", r === "front" ? e.frontDesign : e.backDesign), n.append("sortNo", `${e.sortNo}`), n.append("applyMask", e.applyMask ? "Y" : "N");
  const c = await p(`${e.url}/design/dn_product_analysis_photo.aspx`, {
    method: "POST",
    body: n,
    retries: 5,
    retryDelay: 500
  }), o = I(await c.text());
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
  j as initProject,
  V as saveBackImageStep,
  H as saveBackSettings,
  W as saveBackTextStep,
  M as saveFrontImageStep,
  k as saveFrontSettings,
  J as saveFrontTextStep,
  G as saveProject,
  Y as saveSession,
  N as uncompressCropData,
  P as uncompressImageData,
  q as uploadImage
};
