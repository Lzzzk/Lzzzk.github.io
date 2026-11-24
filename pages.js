"use strict";

(() => {
  const repeat = (count, render) => Array.from({ length: count }, (_, index) => render(index)).join("");
  const intro = subject => `一段关于${subject}的概述文本，具体内容根据实际需求进行调整。`;
  const biography = "创作者简介，具体内容根据实际需求进行调整。".repeat(5);
  const line = name => name ? `<img src="assets/${name}.svg" alt="">` : "";
  const image = (label, { asset, ratio, preview, title, className = "" } = {}) => {
    const style = ratio ? ` style="--picture-ratio:${ratio}"` : "";
    const content = `${line(asset)}<span>${label}</span>`;
    return preview
      ? `<button type="button" class="wire-image ${className}"${style} data-preview="${preview}"${title ? ` data-title="${title}"` : ""}>${content}</button>`
      : `<div class="wire-image ${className}"${style}>${content}</div>`;
  };
  const catalogCard = (label = "产品名", asset = "card-line") => `
    <button type="button" class="wire-card" data-preview="product">${image("产品白底图<br>点击跳转详情页", { ratio: "330 / 400", asset })}<span>${label}，点击跳转详情页 →</span></button>`;
  const sampleDates = count => Array.from({ length: count }, (_, index) =>
    `2000-01-${String(index + 1).padStart(2, "0")}`).sort((left, right) => right.localeCompare(left));
  const cardDate = date => `<time class="card-date" datetime="${date}">${date.replaceAll("-", "/")}</time>`;
  const storyCards = (label, count, asset, featureFirst = false) => sampleDates(count).map((date, index) => {
    const caseView = label === "案例";
    const featured = featureFirst && index === 0;
    return `<button type="button" class="wire-card${featured ? " wire-card-featured" : ""}" data-preview="${caseView ? "case" : "event"}">${image(caseView ? "案例缩略图<br>点击跳转案例画廊" : "事件缩略图<br>点击跳转事件图文画廊", { ratio: "507 / 330", asset })}<span>${featured ? "最新" : ""}${label}名称，点击跳转${caseView ? "画廊" : "图文画廊"} →${caseView ? "" : cardDate(date)}</span></button>`;
  }).join("");
  const add = (id, markup) => document.getElementById(id).insertAdjacentHTML("beforeend", markup);
  const section = (id, label, content) => `<section class="indexed-section" data-section="${id}" aria-label="${label}">${content}</section>`;

  add("academy", `<div class="page-content">
    ${[1, 4].map((count, index) => `<section class="academy-designer" data-section="designer-${index + 1}" aria-label="设计师 ${index + 1}">
      <div class="grid content-grid academy-stage">
      <div class="academy-work"><div class="academy-track">
        ${image("设计师肖像照", { ratio: "1", className: "academy-portrait" })}
        <div class="academy-extract">
          ${image("F&amp;文档 摘选图片，轮播<br>点击可跳转 F&amp;文档", { asset: "academy-line-2", preview: "story" })}
          <p data-extract-copy></p>
        </div>
        <div class="wire-cards two">${repeat(count, () => catalogCard("产品名", "academy-line-1"))}</div>
      </div></div>
      <div class="academy-profile"><div class="academy-profile-copy">
        <h2><strong>${["阿尔瓦罗·西扎","张轲"][index]}</strong><br>设计师外文名/国籍</h2>
        <p class="academy-identity">职业身份<br>1900–2000</p>
        <p class="academy-honor">获得最高荣誉</p>
        <p class="academy-description">${"设计师推崇设计理论概要，具体内容根据实际需求进行调整。".repeat(5)}</p>
      </div>
        <button type="button" class="academy-document" data-preview="story">跳转F&amp;文档 →</button>
      </div>
      </div>
    </section>`).join("")}</div>`);

  const systemImage = (ratio, className = "", preview) => image("X™ System 图片", { ratio, className, preview });
  const systemNote = (number, label, doubled = false) => `<div class="system-note"><span>${number}</span><p>${`X™ System 描述文案段落${label}，具体内容根据实际需求进行调整。`.repeat(doubled ? 2 : 1)}</p></div>`;
  const systemGalleryCaption = "X™ System 图片<br>点击放大进入画廊，可点击右侧画廊切换/或轮播";
  add("system", `<div class="page-content">
    <section class="grid content-grid system-gallery">
      <button type="button" class="wire-image system-gallery-image" data-preview="gallery" aria-label="X™ System 图片，点击放大进入画廊">
        ${repeat(4, index => `<span class="system-slide" data-slide-index="${index}" aria-hidden="true"${index === 0 ? " data-current" : ""}>${systemGalleryCaption}</span>`)}
      </button>
      <div class="thumbs" aria-label="X™ System 画廊缩略图">${repeat(4, index => `<button type="button" aria-pressed="${index === 0}" data-image="${index}">图 ${index + 1}</button>`)}</div>
      <button type="button" class="system-gallery-all" data-preview="gallery">查看全部 X™ System 画廊 →</button>
    </section>
    <section class="grid content-grid system-row">${systemImage("684 / 496.295654", "span-six")}${systemNote(1, "一", true)}</section>
    <section class="grid content-grid system-row"><div class="span-six system-media">
      ${systemImage("684 / 732.44342")}<div class="wire-cards three">${repeat(3, () => systemImage("212 / 217.77777"))}</div>
    </div>${systemNote(2, "二")}</section>
    <section class="grid content-grid system-row system-row-three"><div class="span-six system-media">
      <div class="system-pair">${systemImage("212 / 217.77777")}${systemImage("448 / 496.295654")}</div>
    </div>${systemNote(3, "三", true)}</section>
    <section class="grid content-grid system-row">${systemImage("684 / 496.295654", "span-six")}${systemNote(4, "四")}</section>
    <section class="grid content-grid system-row" data-section="custom">
      <button class="wire-image span-six system-exhibition-image" type="button" data-preview="event" data-title="X™ System 展览">
        X™ System 展览图片轮播<br>点击放大进入展览图文
      </button>
      <div class="span-six system-details">
        <a class="system-detail-line" data-view="template" data-title="X System 定制/购买说明"><span aria-hidden="true">→</span><h2>X System 定制/购买说明</h2></a>
        <a class="system-detail-line" href="https://rcjiaju.66.fractaltest.cn/designer?new=select"><span aria-hidden="true">→</span><p>定制</p></a>
        <a class="system-detail-line system-exhibition-link" data-view="e" data-title="X™ System 展览"><span aria-hidden="true">→</span><p>X™ System 展览</p></a>
      </div>
    </section>
  </div>`);

  const socialChannels = [
    ["锐驰 Instagram", "CAMERICH_OFFICIAL", "https://www.instagram.com/camerich_official/", "Instagram"],
    ["锐驰官方公众号", "CAMERICH锐驰家具", "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MDIwMzIwNw==#wechat_redirect", "微信公众号"],
    ["锐驰官方视频号", "CAMERICH锐驰家具"],
    ["锐驰官方小红书", "CAMERICH锐驰", "https://www.xiaohongshu.com/user/profile/5bd83df97b99c10001ad044f?xsec_token=ABy5S4MoVTs70htv_u0YXwluFxdzfQR2S8YqwwH75IYQk%3D&xsec_source=pc_search", "小红书"],
    ["锐驰园区小红书", "CAMERICH CAMPUS", "https://www.xiaohongshu.com/user/profile/60252ea1000000000100a6a8?xsec_token=ABovoNZ4DWeCP8Tp-tAK9cAStiypaHy9hpKaoeqEQKy1g=&xsec_source=pc_search&wechatWid=5e878f65abce86d139af5a796d7478b0&wechatOrigin=menu"],
  ];
  const socialLink = (url, name) => `<a href="${url.replaceAll("&", "&amp;")}">${name}</a>`;
  document.querySelector("#catalog .footer-social p").innerHTML = socialChannels
    .filter(([, , , footerLabel]) => footerLabel)
    .map(([, , url, footerLabel]) => socialLink(url, `${footerLabel} →`)).join("<br>");
  add("about", `<div class="page-content about-details">
    <section class="grid content-grid about-row">
      <h2>锐驰全球经销网络</h2>
      <div class="about-list">
        <p class="about-network-intro">${intro("锐驰全球经销网络")}</p>
        ${[["海外门店", 6], ["国内门店", 2]].map(([name, count]) => `
          <details class="about-stores">
            <summary class="info-row"><span>${name}</span><span class="about-stores-meta"><span>111家</span><span class="stores-expand">展开 ↓</span><span class="stores-collapse">收起 ↑</span></span></summary>
            ${repeat(count, () => '<p class="info-row about-store"><span>门店编号</span><span>地址信息地址信息地址信息地址信息，001001</span></p>')}
          </details>`).join("")}
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
      <a class="about-enquiry" data-view="template" data-title="咨询表单"><strong>咨询表单</strong><span>→</span></a>
      <h2>关注锐驰</h2>
      <div class="about-list">
        ${socialChannels.map(([label, account, url], index) => {
          const profile = `${index ? image("二维码", { ratio: "1", className: "social-qr" }) : ""}<span class="social-account">@${account}</span>`;
          return `<div class="info-row"><span>${label}</span><div>${url ? socialLink(url, profile) : profile}</div></div>`;
        }).join("")}
      </div>
    </section>
  </div>`);

  add("exhibitions", `<div class="indexed-body">
    ${section("exhibition", "事件", `<div class="wire-cards two">${storyCards("事件", 8, "exhibitions-line-1", true)}</div>`)}
    ${section("case", "案例", `<div class="wire-cards two">${storyCards("案例", 8, "exhibitions-line-1", true)}</div>`)}
  </div>`);

  const creatorTags = ["产品", "建筑", "平面", "文化", "展览"];
  const creatorAssignments = ["0,1","0","0","0","0,1","1","1","1","1","2","3","3","3","3","3,4","3,4","4","4","4"];
  const campusTags = ["北京园区", "嘉兴园区"];
  const creatorGrid = (key, count) => `<div class="creator-grid">
    ${repeat(count, index => {
      const panel = `creator-${key}-${index + 1}`;
      const projects = repeat(2, () => `<div class="wire-card">${image("项目缩略图", { ratio: "330 / 214" })}<span>项目名称</span></div>`);
      const tags = key === "all" ? creatorAssignments[index].split(",").map(i => creatorTags[i]) : [];
      const studio = key === "residency";
      return `<article class="creator-entry${studio ? " studio-entry" : ""}" data-card-tags="${tags.join(",")}">
        <button type="button" class="wire-card creator-toggle" aria-expanded="false" aria-controls="${panel}">
          ${image(`${studio ? "工作室肖像<br>点击后下方展开详情" : "创作者肖像<br>点击右侧展开详情"}`, { ratio: "1", asset: studio ? undefined : "creators-line-1", className: studio ? "studio-portrait" : "" })}
          <span class="creator-caption"><span data-creator-label>${studio ? "工作室名称，下方展开 ↓" : "创作者，右侧展开"}</span>${tags.map(tag => `<span class="creator-card-tag">${tag}</span>`).join("")}</span>
        </button>
        <div class="creator-expansion" id="${panel}" hidden>
          <p class="creator-bio">${studio ? "工作室简介，具体内容根据实际需求进行调整。".repeat(5) : biography}</p>
          ${studio ? "" : tags.includes("产品") ? catalogCard("合作产品", "creators-line-1") : `<div class="creator-projects">${projects}</div>`}
        </div>
      </article>`;
    })}
  </div>`;
  add("creators", `<div class="indexed-body">
    ${section("product", "创作者", `<p class="creator-intro">${intro("创作者").repeat(2)}</p>${creatorGrid("all", creatorAssignments.length)}`)}
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
      if (!button.closest(".studio-entry")) {
        button.querySelector(".wire-image span").innerHTML = expanded
          ? "创作者肖像<br>点击收回"
          : "创作者肖像<br>点击右侧展开详情";
      }
      button.querySelector("[data-creator-label]").textContent = button.closest(".studio-entry")
        ? (expanded ? "工作室名称，收起 ↑" : "工作室名称，下方展开 ↓")
        : (expanded ? "创作者，收起" : "创作者，右侧展开");
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
    if (toggle.closest(".studio-entry")) return;
    for (const child of panel?.children || []) {
      child.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }],
        { ...timing, delay: 110, fill: "backwards" });
    }
  });

  const campusProfiles = (heading, name, count = 2) => `<div class="campus-row came-profile-row">
    <h2>${heading}</h2>
    <div>${repeat(count, index => `<details name="came-campus-profiles">
      <summary><span>${name} ${index + 1}</span><span class="came-profile-open">点击展开简介 ↓</span><span class="came-profile-close">收起↑</span></summary>
      <div class="came-profile-detail">
        ${image("工作室肖像", { ratio: "1", className: "came-profile-portrait" })}
        <p>${"工作室简介，具体内容根据实际需求进行调整。".repeat(5)}</p>
      </div>
    </details>`)}</div>
  </div>`;

  add("campus", `<div class="indexed-body">
    ${section("beijing", "锐驰北京研发园区", `
      <p class="indexed-note">${intro("锐驰北京研发园区").repeat(2)}</p>
      ${image("锐驰北京研发园区头图<br>轮播，点击跳转园区地图图文", { asset: "campus-line-1", preview: "map", className: "campus-cover" })}
      <div class="campus-row"><h2>园区地图</h2>${image("园区地图<br>点击放大", { ratio: "1", asset: "campus-line-1", preview: "map" })}</div>
      <div class="campus-row campus-contact"><h2>联系方式</h2><div>
        <div class="info-row"><span>线上预约</span><a data-view="template" data-title="线上预约">点击跳转 →</a></div>
        <div class="info-row"><span>现场预约</span><a data-view="template" data-title="现场预约">点击跳转 →</a></div>
        <details>
          <summary class="info-row"><span>如何抵达</span><span class="arrival-closed">点击展开 ↓</span><span class="arrival-open">点击收起 ↑</span></summary>
          <div class="campus-arrival">${[["自驾导航", "自驾抵达"], ["公交出行", "公交出行"], ["地铁换乘", "地铁换乘"]].map(([label, method], index) => `<p><span>${index + 1}</span><span>${label}</span><span>一段关于${method}方式的文案信息，具体内容根据实际需求进行调整。</span></p>`).join("")}</div>
        </details>
      </div></div>`)}
    ${section("jiaxing", "锐驰嘉兴超级工厂", `<p class="indexed-note">${intro("锐驰嘉兴超级工厂").repeat(2)}</p>${image("锐驰嘉兴超级工厂头图<br>轮播，点击跳转园区画廊", { asset: "campus-line-1", preview: "gallery", className: "campus-cover" })}`)}
    ${section("events", "园区活动", `<div class="wire-cards three">${sampleDates(9).map((date, index) => {
      const tag = campusTags[index % campusTags.length];
      return `<article data-card-tags="${tag}">
        <button type="button" class="wire-card" data-preview="event" data-title="园区活动名称">
          ${image("活动海报/缩略图<br>点击跳转园区活动图文画廊", { ratio: "3 / 4", asset: "campus-line-1" })}
          <span class="campus-event-caption"><span>园区活动名称</span><span class="creator-card-tag">${tag}</span></span>
          ${cardDate(date)}
        </button>
      </article>`; }).join("")}</div>`)}
    ${section("residency", "驻地计划", `<p class="indexed-note">${intro("驻地计划").repeat(2)}</p>${image("驻地计划头图", { className: "campus-cover residency-cover" })}${creatorGrid("residency", 16)}`)}
    ${section("came-campus", "came camp)us(", `
      <p class="indexed-note">${intro("came camp)us(").repeat(2)}</p>
      ${campusProfiles("驻地联合发起方", "发起工作室名称")}
      ${campusProfiles("came camp)us(<br>第1期参与者", "参与者名称", 7)}
      <div class="campus-row">
        <h2>came camp)us(<br>第0期 展览</h2>
        ${image("展览图片<br>点击跳转展览图文画廊", { preview: "event", title: "came camp)us( 第0期 展览", asset: "campus-line-1", ratio: "1" })}
      </div>`)}
  </div>`);


  for (const section of document.querySelectorAll(".academy-extract")) {
    const buttons = [...section.querySelectorAll("[data-extract]")];
    const copy = section.querySelector("[data-extract-copy]");
    const slideCount = copy ? 3 : buttons.length;
    let current = 0;
    function select(index) {
      current = index;
      const visual = section.querySelector(".wire-image");
      visual.classList.toggle("alternate-cover", index % 2 === 1);
      if (copy) visual.toggleAttribute("data-third-slide", index === 2);
      buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
      if (copy) copy.textContent = `F&文档摘录文字片段 ${index + 1}，`.repeat(5) + "对应上方图片变化。";
    }
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => select(index));
      button.addEventListener("pointerenter", event => { if (event.pointerType === "mouse") select(index); });
    });
    select(0);
    window.setInterval(() => {
      if (!document.hidden && !section.closest("main").hidden && !section.matches(":hover, :focus-within") &&
          !document.querySelector(".content-preview").open && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        select((current + 1) % slideCount);
      }
    }, 3600);
  }

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

  const systemGallery = document.querySelector(".system-gallery");
  const systemThumbs = [...systemGallery.querySelectorAll("[data-image]")];
  let exhibitionSlide = 0;
  window.setInterval(() => {
    if (document.hidden || document.querySelector("#system").hidden ||
        document.querySelector(".content-preview").open ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!systemGallery.querySelector(".thumbs").matches(":hover, :has(:focus-visible)")) {
      const current = systemThumbs.findIndex(thumb => thumb.getAttribute("aria-pressed") === "true");
      selectSystemSlide(systemThumbs[(current + 1) % systemThumbs.length]);
    }
    const image = document.querySelector(".system-exhibition-image");
    if (!image.matches(":hover, :focus")) {
      exhibitionSlide = (exhibitionSlide + 1) % 3;
      image.dataset.slideIndex = String(exhibitionSlide);
    }
  }, 3600);

  const academyCover = document.querySelector("#academy .section-cover");
  const academyNames = document.querySelector(".academy-cover-names");
  function selectAcademyCover(index) {
    academyCover.classList.toggle("alternate-cover", index === 1);
    academyNames.dataset.active = String(index + 1);
  }
  [...academyNames.children].forEach((link, index) => {
    link.addEventListener("pointerenter", event => {
      if (event.pointerType === "mouse") selectAcademyCover(index);
    });
    link.addEventListener("focus", () => selectAcademyCover(index));
  });
  const rotatingCovers = document.querySelectorAll("#academy .section-cover, #campus [data-section=beijing], #campus [data-section=jiaxing]");
  const visibleCovers = new Set();
  const coverObserver = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visibleCovers.add(target);
      else visibleCovers.delete(target);
    }
  }, { threshold: 0.25 });
  document.addEventListener("DOMContentLoaded", () => {
    rotatingCovers.forEach(cover => coverObserver.observe(cover === academyCover ? cover : cover.querySelector(".campus-cover")));
  }, { once: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.setInterval(() => {
    if (document.hidden || reducedMotion.matches || document.querySelector(".content-preview").open || document.querySelector(".nav[data-expanded]")) return;
    for (const cover of visibleCovers) {
      if (cover === academyCover) {
        if (!academyNames.matches(":hover, :focus-within")) selectAcademyCover(academyNames.dataset.active === "1" ? 1 : 0);
      } else {
        const current = Number(cover.dataset.campusSlide || 0);
        cover.dataset.campusSlide = String((current + 1) % 3);
      }
    }
  }, 3600);
})();
