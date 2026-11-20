"use strict";

(() => {
  const repeat = (count, render) => Array.from({ length: count }, (_, index) => render(index)).join("");
  const intro = subject => `一段关于${subject}的概述文本，具体内容根据实际需求进行调整。`;
  const biography = "创作者简介，具体内容根据实际需求进行调整。".repeat(5);
  const line = name => name ? `<img src="assets/${name}.svg" alt="">` : "";
  const image = (label, { asset, ratio, preview, className = "" } = {}) => {
    const style = ratio ? ` style="--picture-ratio:${ratio}"` : "";
    const content = `${line(asset)}<span>${label}</span>`;
    return preview
      ? `<button type="button" class="wire-image ${className}"${style} data-preview="${preview}">${content}</button>`
      : `<div class="wire-image ${className}"${style}>${content}</div>`;
  };
  const catalogCard = (label = "产品名称", asset = "card-line") => `
    <button type="button" class="wire-card" data-preview="product">${image("产品白底图<br>点击跳转详情页", { ratio: "330 / 400", asset })}<span>${label}，点击跳转详情页 →</span></button>`;
  const storyCards = (label, count, asset) => repeat(count, () => {
    const caseView = label === "案例";
    return `<button type="button" class="wire-card" data-preview="${caseView ? "case" : "story"}">${image(`${label}缩略图`, { ratio: "507 / 330", asset })}<span>${label}名称，点击跳转${caseView ? "案例详情" : "图文"} →</span></button>`;
  });
  const add = (id, markup) => document.getElementById(id).insertAdjacentHTML("beforeend", markup);
  const section = (id, label, content) => `<section class="indexed-section" data-section="${id}" aria-label="${label}">${content}</section>`;

  add("academy", `<div class="page-content">
    ${[1, 4].map((count, index) => `<section class="academy-designer" aria-label="设计师 ${index + 1}">
      <div class="grid content-grid academy-stage">
      <div class="academy-work"><div class="academy-track">
        ${image("设计师肖像照<br>点击可跳转 F&amp;文档", { asset: "academy-line-2", ratio: "1", preview: "story" })}
        <div class="wire-cards two">${repeat(count, () => catalogCard("产品名称", "academy-line-1"))}</div>
      </div></div>
      <div class="academy-profile">
        <h2><strong>设计师中文名</strong><br>设计师外文名/国籍</h2>
        <p class="academy-identity">职业身份<br>1900–2000</p>
        <p class="academy-honor">获得最高荣誉</p>
        <p class="academy-description">${"设计师推崇设计理论概要，具体内容根据实际需求进行调整。".repeat(5)}</p>
        <button type="button" class="academy-document" data-preview="story">跳转F&amp;文档 →</button>
      </div>
      </div>
    </section>`).join("")}</div>`);

  const systemImage = (ratio, className = "", preview) => image("X™ System 图片", { ratio, className, preview });
  const systemNote = (number, label, doubled = false) => `<div class="system-note"><span>${number}</span><p>${`X™ System 描述文案段落${label}，具体内容根据实际需求进行调整。`.repeat(doubled ? 2 : 1)}</p></div>`;
  const systemGalleryCaption = "X™ System 图片<br>点击放大进入画廊，可点击右侧画廊切换/或轮播";
  add("system", `<div class="page-content">
    <section class="grid content-grid system-row">${systemImage("684 / 496.295654", "span-six")}${systemNote(1, "一", true)}</section>
    <section class="grid content-grid system-row"><div class="span-six system-media">
      ${systemImage("684 / 732.44342")}<div class="wire-cards three">${repeat(3, () => systemImage("212 / 217.77777"))}</div>
    </div>${systemNote(2, "二")}</section>
    <section class="grid content-grid system-row system-row-three"><div class="span-six system-media">
      <div class="system-pair">${systemImage("212 / 217.77777")}${systemImage("448 / 496.295654")}</div>
    </div>${systemNote(3, "三", true)}</section>
    <section class="grid content-grid system-row">${systemImage("684 / 496.295654", "span-six")}${systemNote(4, "四")}</section>
    <section class="grid content-grid system-row" data-section="custom">
      <button type="button" class="wire-image span-six system-gallery-image" data-preview="gallery" aria-label="X™ System 图片，点击放大进入画廊">
        ${repeat(5, index => `<span class="system-slide${index % 2 ? " alternate" : ""}" aria-hidden="true"${index === 0 ? " data-current" : ""}>${systemGalleryCaption}</span>`)}
      </button>
      <div class="span-six system-details">
        <a class="system-detail-line" data-view="template" data-title="X System 定制/购买说明"><span aria-hidden="true">→</span><h2>X System 定制/购买说明</h2></a>
        <a class="system-detail-line" data-view="template" data-title="定制"><span aria-hidden="true">→</span><p>定制</p></a>
        <div class="system-gallery">
          <button type="button" data-preview="gallery">查看 X™ System 画廊 →</button>
          <div class="thumbs">${repeat(5, index => `<button type="button" aria-pressed="${index === 0}" data-image="${index}">图 ${index + 1}</button>`)}</div>
        </div>
      </div>
    </section>
  </div>`);

  const socialChannels = ["锐驰 Instagram", "锐驰官方公众号", "锐驰官方视频号", "锐驰官方小红书", "锐驰园区小红书"];
  const socialLink = name => `<a data-view="template" data-title="${name}">${name} →</a>`;
  add("about", `<div class="page-content about-details">
    <section class="grid content-grid about-row">
      ${image("全球经销网络配图", { ratio: "684 / 384", className: "about-network-image" })}
      <h2>锐驰全球经销网络</h2>
      <div class="about-list">
        <p class="about-network-intro">${intro("锐驰全球经销网络")}</p>
        ${repeat(6, () => '<div class="info-row"><span>门店编号</span><span>地址</span></div>')}
      </div>
    </section>
    <section class="grid content-grid about-row" data-section="contact">
      <h2>联系方式</h2>
      <div class="about-list">
        <div class="info-row about-contact">
          <strong>锐驰北京研发园区</strong>
          <span>地址<br>电话<br>邮箱</span><span>锐驰北京研发园区地址<br>+0000000000<br>0000000@00.com</span>
        </div>
        <div class="info-row about-contact">
          <strong>锐驰嘉兴超级工厂</strong>
          <span>地址</span><span>锐驰嘉兴超级工厂地址</span>
        </div>
      </div>
    </section>
    <section class="grid content-grid about-row">
      <a class="about-enquiry" data-view="template" data-title="咨询"><strong>咨询</strong><span>→</span></a>
      <h2>关注锐驰</h2>
      <div class="about-list">
        ${socialChannels.map((name, index) => `<div class="info-row">${socialLink(name)}<div>${
          index ? `<a data-view="template" data-title="${name}">${image("二维码", { ratio: "1" })}</a>` : ""
        }<span>@CAMERICH</span></div></div>`).join("")}
      </div>
    </section>
  </div>`);

  add("exhibitions", `<div class="indexed-body">
    ${section("exhibition", "展览", `<div class="wire-cards two">${storyCards("展览", 8, "exhibitions-line-1")}</div>`)}
    ${section("case", "案例", `<div class="wire-cards two">${storyCards("案例", 8, "exhibitions-line-1")}</div>`)}
  </div>`);

  const creatorGrid = (key, count) => `<div class="creator-grid">
    ${repeat(count, index => {
      const panel = `creator-${key}-${index + 1}`;
      const projects = repeat(2, () => `<div class="wire-card">${image("项目缩略图", { ratio: "330 / 214" })}<span>项目名称</span></div>`);
      return `<article class="creator-entry">
        <button type="button" class="wire-card creator-toggle" aria-expanded="false" aria-controls="${panel}">
          ${image("创作者肖像照<br>点击右侧展开", { ratio: "1", asset: "creators-line-1" })}
          <span>创作者名称，右侧展开 →</span>
        </button>
        <div class="creator-expansion" id="${panel}" hidden>
          <p class="creator-bio">${biography}</p>
          ${["product", "residency"].includes(key) ? catalogCard("合作产品", "creators-line-1") : `<div class="creator-projects">${projects}</div>`}
        </div>
      </article>`;
    })}
  </div>`;
  add("creators", `<div class="indexed-body">
    ${section("product", "产品", `<p class="creator-intro">${intro("创作者").repeat(2)}</p>${creatorGrid("product", 9)}`)}
    ${section("architecture", "建筑", creatorGrid("architecture", 10))}
    ${section("graphic", "平面", creatorGrid("graphic", 6))}
    ${section("culture", "文化", creatorGrid("culture", 12))}
  </div>`);

  const cardMotion = new WeakMap();
  const expansionMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("click", event => {
    const toggle = event.target.closest(".creator-toggle");
    if (!toggle) return;
    const page = toggle.closest("main");
    const previous = page.querySelector(".creator-toggle[aria-expanded='true']");
    const cards = [...page.querySelectorAll(".creator-toggle")];
    const first = expansionMotion.matches ? [] : cards.map(card => card.getBoundingClientRect());
    for (const card of cards) cardMotion.get(card)?.cancel();
    function setExpanded(button, expanded) {
      button.setAttribute("aria-expanded", String(expanded));
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      panel.hidden = !expanded;
      button.lastElementChild.textContent = expanded ? "创作者名称，收起 ↑" : "创作者名称，右侧展开 →";
      return panel;
    }
    if (previous) setExpanded(previous, false);
    let panel;
    if (previous !== toggle) {
      panel = setExpanded(toggle, true);
      const bounds = toggle.getBoundingClientRect();
      const navBottom = document.querySelector(".site-header").getBoundingClientRect().bottom;
      if (bounds.top >= innerHeight - 48 || bounds.bottom <= navBottom) {
        toggle.scrollIntoView({ block: "start" });
      }
    }
    if (expansionMotion.matches) return;
    const last = cards.map(card => card.getBoundingClientRect());
    const timing = { duration: 340, easing: "cubic-bezier(.22,.61,.36,1)" };
    for (const [index, card] of cards.entries()) {
      const x = first[index].left - last[index].left;
      const y = first[index].top - last[index].top;
      if ((x || y) && last[index].bottom > 0 && last[index].top < innerHeight) {
        cardMotion.set(card, card.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: "none" }], timing));
      }
    }
    for (const child of panel?.children || []) {
      child.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }],
        { ...timing, delay: 110, fill: "backwards" });
    }
  });

  add("campus", `<div class="indexed-body">
    ${section("beijing", "锐驰北京研发园区", `
      <p class="indexed-note">${intro("锐驰北京研发园区").repeat(2)}</p>
      ${image("锐驰北京研发园区头图<br>轮播，点击跳转园区地图图文", { asset: "campus-line-1", preview: "map", className: "campus-cover" })}
      <div class="campus-row"><h2>园区地图</h2>${image("园区地图<br>点击放大", { ratio: "1", asset: "campus-line-1", preview: "map" })}</div>
      <div class="campus-row"><h2>联系方式</h2><div>
        <div class="info-row"><span>线上预约</span><a data-view="template" data-title="线上预约">点击跳转 →</a></div>
        <div class="info-row"><span>现场预约</span><a data-view="template" data-title="现场预约">点击跳转 →</a></div>
        <div class="info-row"><a data-view="template">如何抵达</a></div>
      </div></div>`)}
    ${section("jiaxing", "锐驰嘉兴超级工厂", `<p class="indexed-note">${intro("锐驰嘉兴超级工厂").repeat(2)}</p>${image("锐驰嘉兴超级工厂头图<br>轮播，点击跳转园区画廊", { asset: "campus-line-1", preview: "gallery", className: "campus-cover" })}`)}
    ${section("events", "园区活动", `<div class="wire-cards two">${storyCards("活动", 6, "campus-line-1")}</div>`)}
    ${section("residency", "驻地计划", `<p class="indexed-note">${intro("驻地计划").repeat(2)}</p>${creatorGrid("residency", 15)}`)}
  </div>`);


  function selectSystemSlide(thumb) {
    if (thumb.getAttribute("aria-pressed") === "true") return;
    for (const button of thumb.parentElement.children) {
      button.setAttribute("aria-pressed", String(button === thumb));
    }
    for (const [index, slide] of [...document.querySelector(".system-gallery-image").children].entries()) {
      slide.toggleAttribute("data-current", index === Number(thumb.dataset.image));
    }
  }
  for (const thumb of document.querySelectorAll(".system-gallery [data-image]")) {
    thumb.addEventListener("pointerenter", event => {
      if (event.pointerType !== "touch") selectSystemSlide(thumb);
    });
    thumb.addEventListener("focus", () => selectSystemSlide(thumb));
  }
  document.querySelector(".system-gallery").addEventListener("click", event => {
    const thumb = event.target.closest("button[data-image]");
    if (thumb) selectSystemSlide(thumb);
  });

  const rotatingCovers = document.querySelectorAll("#academy .section-cover, .campus-cover");
  const visibleCovers = new Set();
  const coverObserver = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visibleCovers.add(target);
      else visibleCovers.delete(target);
    }
  }, { threshold: 0.25 });
  rotatingCovers.forEach(cover => coverObserver.observe(cover));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.setInterval(() => {
    if (document.hidden || reducedMotion.matches || document.querySelector(".content-preview").open || document.documentElement.classList.contains("menu-open")) return;
    for (const cover of visibleCovers) cover.classList.toggle("alternate-cover");
  }, 3600);
})();
