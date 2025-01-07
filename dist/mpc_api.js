function A(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var b = { exports: {} }, F = b.exports, P;
function C() {
  return P || (P = 1, function(e, r) {
    (function(t, a) {
      e.exports = a();
    })(F, function() {
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
        return o = Object.assign(i, o), function(u, d) {
          var O = o.retries, D = o.retryDelay, _ = o.retryOn;
          if (d && d.retries !== void 0)
            if (a(d.retries))
              O = d.retries;
            else
              throw new n("retries must be a positive integer");
          if (d && d.retryDelay !== void 0)
            if (a(d.retryDelay) || typeof d.retryDelay == "function")
              D = d.retryDelay;
            else
              throw new n("retryDelay must be a positive integer or a function returning a positive integer");
          if (d && d.retryOn)
            if (Array.isArray(d.retryOn) || typeof d.retryOn == "function")
              _ = d.retryOn;
            else
              throw new n("retryOn property expects an array or function");
          return new Promise(function(S, w) {
            var E = function(y) {
              var v = typeof Request < "u" && u instanceof Request ? u.clone() : u;
              c(v, d).then(function(l) {
                if (Array.isArray(_) && _.indexOf(l.status) === -1)
                  S(l);
                else if (typeof _ == "function")
                  try {
                    return Promise.resolve(_(y, null, l)).then(function(f) {
                      f ? g(y, null, l) : S(l);
                    }).catch(w);
                  } catch (f) {
                    w(f);
                  }
                else
                  y < O ? g(y, null, l) : S(l);
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
                else y < O ? g(y, l, null) : w(l);
              });
            };
            function g(y, v, l) {
              var f = typeof D == "function" ? D(y, v, l) : D;
              setTimeout(function() {
                E(++y);
              }, f);
            }
            E(0);
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
  }(b)), b.exports;
}
var I = C();
const k = /* @__PURE__ */ A(I), s = k(window.fetch), m = (e, r) => r ? `${e}?${new URLSearchParams(r)}` : e, j = (e) => new DOMParser().parseFromString(e, "text/xml"), h = (e) => new DOMParser().parseFromString(e, "text/html"), T = (e, r) => document.evaluate(
  r,
  e,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;
function* N(e, r) {
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
  for (const t of N(e, '//form[@id="form1"]/div[@class="aspNetHidden"]/input[@type="hidden"]')) {
    const a = t;
    r[a.name] = a.value;
  }
  for (const t of N(e, '//form[@id="form1"]/input[@type="hidden"]')) {
    const a = t;
    r[a.name] = a.value;
  }
  return r;
}, H = async (e, r) => {
  const t = await s(m(`${e.url}/products/pro_item_process_flow.aspx`, {
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
}, M = async (e, r, t) => {
  const a = t.length, n = m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nf.aspx`, {
    ssid: e
  }), c = await s(n), o = {
    ...x(h(await c.text())),
    __EVENTTARGET: "btn_next_step",
    hidd_mode: "ImageText",
    txt_card_number: `${a}`,
    dro_total_count: `${a}`,
    hidd_material_no: r.cardStock,
    hidd_packing_no: r.packaging,
    hidd_design_count: `${a}`
  }, i = new FormData();
  for (const [p, u] of Object.entries(o))
    i.append(p, u);
  return s(n, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, J = async (e, r, t) => {
  const a = t.length, n = m(`${r.url}/products/playingcard/design/dn_playingcards_mode_nb.aspx`, {
    ssid: e
  }), c = await s(n), o = {
    ...x(h(await c.text())),
    __EVENTTARGET: "btn_next_step",
    hidd_mode: "ImageText",
    hidd_design_count: `${a}`
  }, i = new FormData();
  for (const [p, u] of Object.entries(o))
    i.append(p, u);
  return s(n, {
    method: "POST",
    body: i,
    retries: 5,
    retryDelay: 500
  });
}, V = async (e, r) => {
  const t = m(`${r.url}/products/playingcard/design/dn_playingcards_front_dynamic.aspx`, {
    ssid: e
  }), a = await s(t), n = {
    ...x(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [i, p] of Object.entries(n))
    c.append(i, p);
  await s(t, {
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
}, W = async (e, r) => {
  const t = m(`${r.url}/design/dn_texteditor_front.aspx`, {
    ssid: e
  }), a = await s(t), n = {
    ...x(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [o, i] of Object.entries(n))
    c.append(o, i);
  await s(t, {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, Y = async (e, r) => {
  const t = m(`${r.url}/products/playingcard/design/dn_playingcards_back_dynamic.aspx`, {
    ssid: e
  }), a = await s(t), n = {
    ...x(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [o, i] of Object.entries(n))
    c.append(o, i);
  await s(t, {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, B = async (e, r) => {
  const t = m(`${r.url}/design/dn_texteditor_back.aspx`, {
    ssid: e
  }), a = await s(t), n = {
    ...x(h(await a.text())),
    __EVENTTARGET: "btn_next_step"
  }, c = new FormData();
  for (const [o, i] of Object.entries(n))
    c.append(o, i);
  await s(t, {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, R = (e, r) => ({
  ID: r.SourceID,
  Exp: r.Exp,
  Owner: "",
  Path: `${e.url}/PreviewFiles/Normal/temp`,
  Width: r.Width,
  Height: r.Height,
  imageName: `${r.SourceID}.${r.Exp}`
}), $ = (e, r, t) => [{
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
}], G = async (e, r, t, a, n) => {
  const c = new FormData();
  return c.append("frontImageList", JSON.stringify(t.map((o) => o.front ? R(r, o.front) : null))), c.append("frontCropInfo", JSON.stringify(t.map((o) => o.front ? $(o.front, a, n) : null))), c.append("frontDesignModePage", "dn_playingcards_mode_nf.aspx"), c.append("frontTextInfo", [...new Array(t.length)].map(() => "").join("%u25C7")), c.append("backImageList", JSON.stringify(t.map((o) => o.back ? R(r, o.back) : null))), c.append("backCropInfo", JSON.stringify(t.map((o) => o.back ? $(o.back, a, n) : null))), c.append("backTextInfo", [...new Array(t.length)].map(() => "").join("%u25C7")), c.append("backDesignModePage", "dn_playingcards_mode_nb.aspx"), c.append("expand", "null"), c.append("mapinfo", "[]"), s(m(`${r.url}/design/dn_keep_transition_data.aspx`, {
    ssid: e
  }), {
    method: "POST",
    body: c,
    retries: 5,
    retryDelay: 500
  });
}, X = async (e, r) => {
  if (!r.name) return;
  const t = new FormData();
  return t.append("name", r.name), s(m(`${r.url}/design/dn_project_save.aspx`, {
    ssid: e
  }), {
    method: "POST",
    body: t,
    retries: 5,
    retryDelay: 500
  });
}, q = async (e, r) => {
  const t = r.reduce((o, i) => {
    for (let p = 0; p < i.count; p++)
      o.push(i);
    return o;
  }, []), a = await H(e, t);
  await M(a, e, t), await J(a, e, t);
  const { pixelInfo: n, unpickInfo: c } = await V(a, e);
  return await W(a, e), await Y(a, e), await B(a, e), await G(a, e, t, n, c), await X(a, e), `${e.url}/design/dn_preview_layout.aspx?ssid=${a}`;
}, U = async (e, r) => {
  const t = [], a = e.maxCards;
  let n = 0, c = 0;
  for (; n < r.length; ) {
    const o = [];
    let i = 0;
    for (; i < a && n < r.length; ) {
      const p = r[n], u = Math.min(p.count - c, a - i);
      o.push(u == p.count ? p : {
        ...p,
        count: u
      }), c += u, c >= p.count && (n += 1, c = 0), i += u;
    }
    t.push(await q(e, o));
  }
  return t;
}, L = async (e) => await (await s(`${e}/api/common/getdatetime.ashx`)).text().then((t) => t.replace(/\-/g, "/")), z = async (e, r, t) => {
  const a = await L(e.url), n = new FormData();
  n.append("fileData", t), n.append("userName", ""), n.append("layer", r), n.append("st", a), n.append("pt", "0"), n.append("ip", "");
  const c = await s(`${e.url}/uploader/up_product.aspx`, {
    method: "POST",
    body: n,
    retries: 5,
    retryDelay: 500
  }), o = h(await c.text());
  return JSON.parse(T(o, '/html/body/form/input[@id="hidd_image_info"]/@value').textContent);
}, Q = async (e, r, t, a) => {
  const n = new FormData();
  n.append("photoindex", `${t}`), n.append("source", JSON.stringify(a)), n.append("face", r), n.append("width", `${e.width}`), n.append("height", `${e.height}`), n.append("dpi", `${e.dpi}`), n.append("auto", e.auto ? "Y" : "N"), n.append("scale", `${e.scale}`), n.append("filter", ""), n.append("productCode", e.product), n.append("designCode", r === "front" ? e.frontDesign : e.backDesign), n.append("sortNo", `${e.sortNo}`), n.append("applyMask", e.applyMask ? "Y" : "N");
  const c = await s(`${e.url}/design/dn_product_analysis_photo.aspx`, {
    method: "POST",
    body: n,
    retries: 5,
    retryDelay: 500
  }), o = j(await c.text());
  return JSON.parse(T(o, "/Values/Value/text()").textContent).CropInfo;
}, Z = (e, r) => ({
  ID: e.ID,
  SourceID: e.SourceID,
  Exp: r.Exp,
  Width: r.Width,
  Height: r.Height
});
export {
  Q as analysisImage,
  Z as compressImageData,
  U as createAutoSplitProject,
  q as createProject,
  H as initProject,
  Y as saveBackImageStep,
  J as saveBackSettings,
  B as saveBackTextStep,
  V as saveFrontImageStep,
  M as saveFrontSettings,
  W as saveFrontTextStep,
  X as saveProject,
  G as saveSession,
  $ as uncompressCropData,
  R as uncompressImageData,
  z as uploadImage
};
