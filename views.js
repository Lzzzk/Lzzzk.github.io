"use strict";

(() => {
  const dialog = document.querySelector(".content-preview");
  const close = dialog.querySelector("form button");
  const content = dialog.querySelector(".preview-body");
  const stack = [];
  const destinations = { product: "a", gallery: "b", map: "c", story: "d", case: "case" };
  const routes = new Set(["a", "b", "c", "d", "case", "template"]);
  const repeat = (count, render) => Array.from({ length: count }, (_, index) => render(index)).join("");
  const escape = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const titleOf = element => element.dataset.title || element.textContent.trim().replace(/\s*[→↓]\s*$/, "");
  const urlFor = (view, title, image = 0) => {
    const url = new URL(location.href);
    url.searchParams.set("view", view);
    url.searchParams.set("title", title);
    if (image > 0) url.searchParams.set("image", image);
    else url.searchParams.delete("image");
    return url;
  };
  const viewLink = (view, title, markup, className = "", image = 0) => `
    <a class="${className}" href="${escape(urlFor(view, title, image))}" data-view="${view}" data-title="${escape(title)}"${image ? ` data-view-image="${image}"` : ""}>${markup}</a>`;

  function convert(element, view, title) {
    const link = document.createElement("a");
    link.className = element.className;
    link.style.cssText = element.style.cssText;
    if (element.hasAttribute("aria-label")) link.setAttribute("aria-label", element.getAttribute("aria-label"));
    link.dataset.view = view;
    link.dataset.title = title;
    link.href = urlFor(view, title);
    link.append(...element.childNodes);
    element.replaceWith(link);
    return link;
  }

  for (const element of document.querySelectorAll("[data-preview]")) {
    const view = destinations[element.dataset.preview];
    const caption = element.lastElementChild?.textContent.trim() || "";
    const label = element.textContent.trim();
    let title = titleOf(element);
    if (view === "a") title = label.match(/主线产品 \d+/)?.[0] || (label.includes("合作产品") ? "合作产品" : "产品名称");
    if (view === "b") title = element.closest("#system") ? "X™ System 画廊" : "锐驰嘉兴超级工厂画廊";
    if (view === "c") title = element.closest("#exhibitions") ? caption.split("，")[0] : "北京研发园区地图";
    if (view === "d") title = element.closest("#academy") ? "F&文档" : (caption.split("，")[0] || title);
    if (view === "case") title = caption.split("，")[0];
    convert(element, view, title);
  }

  for (const element of document.querySelectorAll("a[data-view]:not([href])")) {
    element.dataset.title = titleOf(element);
    element.href = urlFor(element.dataset.view, element.dataset.title);
  }

  for (const image of document.querySelectorAll(".wire-image, .section-cover")) {
    if (image.closest("a, .creator-toggle, .creator-projects, #system") ||
        image.matches("#academy .section-cover, .about-network-image")) continue;
    const row = image.closest(".info-row");
    const name = row ? row.firstElementChild.textContent.split("@")[0].trim() : titleOf(image);
    convert(image, "template", name);
  }

  const block = (caption, className = "") => `<span class="view-block ${className}">${caption}</span>`;
  const photos = (count, label, current) => repeat(count, index => `
    <button type="button" data-slide="${index + 1}" aria-pressed="${index + 1 === current}">${label} ${index + 1}</button>`);
  const previewPicture = (title, caption, className, current = 1) => viewLink("b", title, block(caption), className, current);
  const articleCopy = "正文，具体内容根据实际需求进行调整。";
  const productCopy = "一段关于该产品的设计说明，<br>具体内容根据实际需求进行调整。";
  const material = repeatCount => repeat(repeatCount, () => `<div>${block("材质图")}<span>Number-00</span></div>`);

  function product(title) {
    const menuRoutes = { products: "#catalog", exhibitions: "#exhibitions", campus: "#campus", creators: "#creators" };
    const nav = document.querySelector(".nav").cloneNode(true);
    nav.removeAttribute("data-expanded");
    for (const button of nav.querySelectorAll("[data-menu]")) {
      const link = document.createElement("a");
      link.href = menuRoutes[button.dataset.menu];
      link.textContent = button.textContent;
      button.replaceWith(link);
    }
    const footer = document.querySelector("#catalog .footer").cloneNode(true);
    footer.classList.add("grid");
    const dimension = () => `<div class="spec-row spec-dimensions"><span>C01G0000</span><small>L 000 cm<br>D 000 cm<br>H 000 cm</small>${previewPicture("尺寸规格（分开）", "线框图<br>点击放大", "spec-image")}</div>`;
    return `${nav.outerHTML}<div class="grid product-view">
      ${previewPicture(title, "产品大图<br>可点击右侧产品画廊切换/或轮播", "product-view-image")}
      <div class="product-view-intro">
        <h1>${escape(title)}</h1>
        <p>${productCopy}<br>${productCopy}</p>
      </div>
      <div class="view-thumbs product-view-thumbs" aria-label="产品画廊缩略图">${photos(4, "产品图", 1)}</div>
      <div class="product-specs">
        <p class="spec-row">信息列表，根据网站迭代情况增减内容</p>
        <div class="spec-row"><span>3D 视图</span>${viewLink("template", "3D 视图", "点击跳转 →")}</div>
        <section aria-label="材质选择">
          <div class="spec-row"><span>材质选择</span><button type="button" data-spec-toggle aria-expanded="false" aria-controls="extra-materials">查看全部 ↓</button></div>
          <div class="spec-row"><span>布</span><div class="material-tiles">${material(5)}</div></div>
          <div class="spec-row"><span>皮</span><div class="material-tiles">${material(3)}</div></div>
          <div id="extra-materials" hidden>
            <div class="spec-row"><span>布</span><div class="material-tiles">${material(5)}</div></div>
            <div class="spec-row"><span>皮</span><div class="material-tiles">${material(5)}</div></div>
          </div>
        </section>
        <section class="spec-overview" aria-label="尺寸规格（整图）">
          <div class="spec-row"><span>尺寸规格（整图）</span><button type="button" data-spec-toggle="length" aria-expanded="false" aria-controls="overview-drawing">查看全部 ↓</button></div>
          <div id="overview-drawing">${previewPicture("尺寸规格（整图）", "线框图", "spec-image")}</div>
        </section>
        <section aria-label="尺寸规格（分开）">
          <div class="spec-row"><span>尺寸规格（分开）</span><button type="button" data-spec-toggle aria-expanded="false" aria-controls="extra-dimensions">查看全部 ↓</button></div>
          ${dimension()}${dimension()}
          <div id="extra-dimensions" hidden>${dimension()}</div>
        </section>
      </div>
    </div>${footer.outerHTML}`;
  }

  function gallery(view, title, current) {
    const map = view === "c";
    const caseView = view === "case";
    const mapLabel = title === "北京研发园区地图" ? "园区地图" : "案例地图";
    const mapText = "具体内容根据实际需求进行调整。".repeat(4);
    return `<div class="grid gallery-view${map || caseView ? " map-view" : ""}${caseView ? " case-view" : ""}">
      ${caseView ? articleAside(title) : ""}
      ${map ? `<div class="map-panel"><div class="map-overview">
        ${block(`${mapLabel}，<br>悬停时右侧变化`)}
        <div class="map-regions">${repeat(9, i => `<button type="button" data-slide="${i + 1}" aria-label="区域 ${i + 1}"></button>`)}</div>
      </div><p>${mapText}</p></div>` : ""}
      <figure class="gallery-figure">
        ${block(caseView ? "案例大图" : map ? "各区域大图，<br>悬停左侧地图或者右侧切换" : "大图<br>可点击右侧画廊切换", "gallery-large")}
        <figcaption><span data-image-number>${current}</span><span>${map ? "区域名称" : "图片名称"}</span></figcaption>
      </figure>
      <div class="view-thumbs gallery-rail" aria-label="缩略图">${photos(15, "图", current)}</div>
    </div>`;
  }

  function articleAside(title) {
    return `<aside class="article-aside"><h1>${escape(title)}</h1>
        ${viewLink("a", "涉及产品 1", '<span class="view-block"><span><img src="assets/article-line.svg" alt=""><br>产品白底图<br>点击跳转详情页</span></span><span class="article-product-label">涉及产品 1，点击跳转详情页→</span>', "article-product")}
      </aside>`;
  }
  function article(title) {
    return `<div class="grid article-view">
      ${articleAside(title)}
      <div class="article-copy" tabindex="0" aria-label="图文正文">
        ${[8, 4, 12, 6, 10, 3].map((length, index) => `<section class="article-section" data-article-product="${index + 1}">
          <figure class="${index % 2 ? "wide" : "narrow"}"><div class="article-image">${block("文章配图")}</div><figcaption>图注</figcaption></figure>
          <p>${articleCopy.repeat(length)}</p>
        </section>`).join("")}
      </div>
    </div>`;
  }

  function show(view, title, image = 0, origin = null) {
    const current = image ? Math.max(1, Math.min(15, image)) : 8;
    if (dialog.open) {
      const articleScroll = content.querySelector(".article-copy")?.scrollTop;
      const scroll = content.scrollTop;
      const previous = document.createDocumentFragment();
      previous.append(...content.childNodes);
      stack.push({ previous, view: dialog.dataset.view, title: dialog.getAttribute("aria-label"), scroll, articleScroll, origin });
    } else {
      stack.push({ origin });
    }
    dialog.dataset.view = view;
    dialog.setAttribute("aria-label", title);
    close.textContent = view === "a" ? "<返回" : "关闭";
    content.innerHTML = view === "a" ? product(title)
      : view === "b" || view === "c" || view === "case" ? gallery(view, title, current)
      : view === "d" ? article(title)
      : `<h1 class="template-title">${escape(title)}</h1>`;
    content.scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    close.focus({ preventScroll: true });
    content.querySelector(".gallery-rail [aria-pressed='true']")?.scrollIntoView({ block: "center", inline: "nearest" });
  }

  function dismiss() {
    const parent = stack.pop();
    if (parent?.previous) {
      content.replaceChildren(parent.previous);
      dialog.dataset.view = parent.view;
      dialog.setAttribute("aria-label", parent.title);
      close.textContent = parent.view === "a" ? "<返回" : "关闭";
      content.scrollTop = parent.scroll;
      const article = content.querySelector(".article-copy");
      if (article && parent.articleScroll !== undefined) article.scrollTop = parent.articleScroll;
    } else {
      dialog.close();
      content.replaceChildren();
    }
    parent?.origin?.focus({ preventScroll: true });
  }

  function select(button) {
    const number = Number(button.dataset.slide);
    const picture = content.querySelector(".gallery-large, .product-view-image .view-block");
    if (!picture) return;
    const active = content.querySelector(".view-thumbs [aria-pressed='true']");
    if (Number(active?.dataset.slide) === number) return;
    active?.setAttribute("aria-pressed", "false");
    content.querySelector(`.view-thumbs [data-slide="${number}"]`)?.setAttribute("aria-pressed", "true");
    picture.classList.toggle("alternate-cover", number % 2 === 0);
    if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(picture, { opacity: 0.55 }, { opacity: 1, duration: 0.45, overwrite: true, clearProps: "opacity" });
    }
    const label = content.querySelector("[data-image-number]");
    if (label) label.textContent = number;
    const productImage = content.querySelector(".product-view-image");
    if (productImage) {
      productImage.dataset.viewImage = number;
      productImage.href = urlFor("b", productImage.dataset.title, number);
    }
  }

  document.addEventListener("click", event => {
    const link = event.target.closest("a[data-view]");
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      const image = link.closest("#system") ? Number(document.querySelector(".system-gallery [aria-pressed='true']")?.dataset.image) + 1 : Number(link.dataset.viewImage);
      show(link.dataset.view, link.dataset.title, image, link);
      return;
    }
    const thumb = event.target.closest("button[data-slide]");
    if (thumb && dialog.contains(thumb)) select(thumb);
    const pageLink = event.target.closest(".content-preview a[href^='#']");
    if (pageLink) {
      event.preventDefault();
      while (dialog.open) dismiss();
      navigateTo(pageLink.hash);
    }
  });

  content.addEventListener("pointerover", event => {
    const thumb = event.target.closest("[data-slide]");
    if (thumb && !thumb.contains(event.relatedTarget) && event.pointerType !== "touch") select(thumb);
  });
  content.addEventListener("scroll", event => {
    const article = event.target;
    if (!article.matches?.(".article-copy")) return;
    const anchor = article.getBoundingClientRect().top + article.clientHeight * 0.45;
    const sections = [...article.querySelectorAll("[data-article-product]")];
    const active = sections.findLast(section => section.getBoundingClientRect().top <= anchor) || sections[0];
    const card = content.querySelector(".article-product");
    const number = active.dataset.articleProduct;
    const title = `涉及产品 ${number}`;
    if (card.dataset.title === title) return;
    card.dataset.title = title;
    card.href = urlFor("a", title);
    card.querySelector(".article-product-label").textContent = `${title}，点击跳转详情页→`;
    card.querySelector(".view-block").classList.toggle("alternate-cover", Number(number) % 2 === 0);
  }, true);
  content.addEventListener("click", event => {
    const toggle = event.target.closest("[data-spec-toggle]");
    if (!toggle) return;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    const target = content.querySelector(`#${toggle.getAttribute("aria-controls")}`);
    if (toggle.dataset.specToggle === "length") target.classList.toggle("is-long", !expanded);
    else target.hidden = expanded;
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.textContent = expanded ? "查看全部 ↓" : "收起 ↑";
  });
  content.addEventListener("focusin", event => {
    if (event.target.matches("[data-slide]")) select(event.target);
  });
  dialog.querySelector("form").addEventListener("submit", event => { event.preventDefault(); dismiss(); });
  dialog.addEventListener("cancel", event => { event.preventDefault(); dismiss(); });

  const params = new URLSearchParams(location.search);
  const view = params.get("view");
  if (routes.has(view)) show(view, params.get("title") || "页面名称", Number(params.get("image")));
})();
