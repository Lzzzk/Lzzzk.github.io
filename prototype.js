"use strict";

const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const engine = window.gsap;
const navMotion = { duration: 0.48, ease: "power3.inOut", overwrite: "auto" };
const statement = document.querySelector("#statement");
const hero = document.querySelector(".hero");
const heroBackground = document.querySelector(".hero-background");
const heroMessage = document.querySelector(".hero-message");
const controls = document.querySelector(".slide-controls");
const slideLabels = ["一", "二", "三", "四", "五"];
let activeSlide = -1;
let slideshow;

function showSlide(index) {
  if (activeSlide === index) return;
  activeSlide = index;
  const message = `锐驰品牌价值主张${slideLabels[index]}`;
  for (const [position, button] of [...controls.children].entries()) {
    button.setAttribute("aria-pressed", String(index === position));
  }
  engine?.killTweensOf([heroMessage, heroBackground]);
  statement.textContent = message;
  const opacity = index % 2;
  if (engine && !motion.matches) {
    engine.to(heroBackground, { opacity, duration: 0.8, ease: "power1.inOut" });
    engine.fromTo(heroMessage, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power1.out" });
  } else {
    heroBackground.style.opacity = opacity;
    heroMessage.style.opacity = "";
  }
}

function stopSlideshow() {
  window.clearInterval(slideshow);
}

function startSlideshow() {
  stopSlideshow();
  if (motion.matches || document.hidden || hero.hidden || controls.matches(":hover, :focus-within")) return;
  slideshow = window.setInterval(() => showSlide((activeSlide + 1) % slideLabels.length), 3200);
}

function makeButton(label) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  return button;
}

for (const [index] of slideLabels.entries()) {
  const button = makeButton(String(index + 1));
  button.setAttribute("aria-label", `首屏画面 ${index + 1}`);
  button.addEventListener("click", () => showSlide(index));
  button.addEventListener("pointerenter", event => {
    if (event.pointerType !== "touch") showSlide(index);
  });
  button.addEventListener("focus", () => showSlide(index));
  controls.append(button);
}

controls.addEventListener("pointerenter", stopSlideshow);
controls.addEventListener("pointerleave", startSlideshow);
controls.addEventListener("focusin", stopSlideshow);
controls.addEventListener("focusout", () => requestAnimationFrame(startSlideshow));
motion.addEventListener("change", startSlideshow);
document.addEventListener("visibilitychange", startSlideshow);
showSlide(0);
startSlideshow();

const products = ["全部", "沙发", "休闲椅", "餐桌", "餐椅", "书桌", "床", "柜子", "配品"];
const menus = {
  products,
  exhibitions: ["展览", "案例"],
  campus: ["锐驰北京\n研发园区", "锐驰嘉兴\n超级工厂", "园区活动", "驻地计划"],
  creators: ["产品", "建筑", "平面", "文化"],
};
const sectionKeys = {
  exhibitions: ["exhibition", "case"],
  campus: ["beijing", "jiaxing", "events", "residency"],
  creators: ["product", "architecture", "graphic", "culture"],
};

const filterList = document.querySelector(".filters");
const cardList = document.querySelector(".cards");
const status = document.querySelector("#filter-status");
const catalog = document.querySelector("#catalog");
const catalogCover = document.querySelector(".catalog-cover");
let activeCategory;
const sampleCategories = [...products.slice(1), "沙发", "休闲椅", "餐椅"];
for (const category of products.slice(1)) sampleCategories.push(...Array(8).fill(category));
const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
  <article class="card">
    <button type="button" class="catalog-card-button" data-preview="product">
    <span class="card-image">
      <img src="assets/card-line.svg" width="37.5" height="7.36396" alt="">
      <span>产品白底图<br>点击跳转详情页</span>
    </span>
    <span class="card-caption">产品名称，点击跳转详情页→</span>
    </button>
  </article>
`;

for (const category of sampleCategories) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.category = category;
  cardList.append(card);
}

for (const [index, category] of products.entries()) {
  const button = makeButton(category);
  button.className = "filter";
  if ([1, 3, 5, 7].includes(index)) button.classList.add("spaced");
  button.addEventListener("click", () => filterProducts(category));
  filterList.append(button);
}

function alignFilter(button, selected) {
  if (catalog.hidden) return;
  const rightEdge = filterList.clientWidth - button.offsetWidth;
  const narrow = window.matchMedia("(max-width: 720px)").matches;
  const x = selected && !narrow ? Math.max(0, rightEdge) : 0;
  if (engine && !motion.matches) {
    engine.to(button, { ...navMotion, x });
  } else {
    engine?.killTweensOf(button);
    button.style.transform = `translateX(${x}px)`;
  }
}

function filterProducts(category) {
  if (activeCategory !== category) {
    const color = category === "全部" ? "#dcdcdc" :
      (activeCategory === "全部" || catalogCover.dataset.shade !== "dark" ? "#bdbdbd" : "#dcdcdc");
    catalogCover.dataset.shade = color === "#bdbdbd" ? "dark" : "light";
    if (engine && !motion.matches && !catalog.hidden) {
      engine.to(catalogCover, { backgroundColor: color, duration: 0.8, overwrite: true });
    } else {
      catalogCover.style.backgroundColor = color;
    }
    activeCategory = category;
  }
  for (const button of filterList.children) {
    const selected = button.textContent === category;
    button.setAttribute("aria-pressed", String(selected));
    alignFilter(button, selected);
  }
  let count = 0;
  for (const card of cardList.children) {
    card.hidden = category !== "全部" && card.dataset.category !== category;
    if (!card.hidden) count++;
  }
  status.textContent = `${category}，${count} 件产品`;
  if (!catalog.hidden) revealContent([cardList]);
}

function revealContent(targets, delay = 0) {
  if (!engine || motion.matches || !targets.length) return;
  engine.killTweensOf(targets, "opacity");
  engine.fromTo(targets, { opacity: 0 }, {
    opacity: 1, delay,
    duration: 0.38, ease: "power2.out", clearProps: "opacity",
  });
}

function navigateTo(hash) {
  if (location.hash !== hash) history.pushState(null, "", new URL(hash, location.href));
  renderPage();
}

window.addEventListener("resize", () => {
  for (const button of filterList.children) {
    alignFilter(button, button.getAttribute("aria-pressed") === "true");
  }
});
filterProducts("全部");

const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav");
const submenu = document.querySelector("#submenu");
const submenuContent = submenu.querySelector(".submenu-content");
const menuButtons = [...nav.querySelectorAll("[data-menu]")];
let openedBy;

function closeMenu() {
  if (!openedBy) return;
  openedBy.setAttribute("aria-expanded", "false");
  openedBy = undefined;
  submenu.hidden = true;
  delete nav.dataset.expanded;
  document.documentElement.classList.remove("menu-open");
  document.querySelectorAll("main, #home").forEach(page => { page.inert = false; });
}

function openMenu(button) {
  closeMenu();
  openedBy = button;
  document.documentElement.classList.add("menu-open");
  document.querySelectorAll("main, #home").forEach(page => { page.inert = true; });
  button.setAttribute("aria-expanded", "true");
  nav.dataset.expanded = button.dataset.menu;
  submenuContent.className = `submenu-content ${button.dataset.menu}`;
  const items = menus[button.dataset.menu].map((label, index) => {
    if (button.dataset.menu !== "products") {
      const item = document.createElement("a");
      item.textContent = label;
      item.href = `#${button.dataset.menu}/${sectionKeys[button.dataset.menu][index]}`;
      item.addEventListener("click", event => {
        event.preventDefault();
        navigateTo(item.hash);
      });
      return item;
    }
    const item = makeButton(label);
    if (label === "全部") item.setAttribute("aria-label", "全部产品");
    item.addEventListener("click", () => {
      closeMenu();
      filterProducts(label);
      if (location.hash !== "#catalog") {
        navigateTo("#catalog");
        return;
      }
      window.scrollTo(0, 0);
      filterList.querySelector('[aria-pressed="true"]').focus({ preventScroll: true });
    });
    return item;
  });
  if (["products", "creators"].includes(button.dataset.menu)) {
    const heading = document.createElement("span");
    heading.className = "menu-heading";
    heading.textContent = button.dataset.menu === "creators" ? "创作者" : "产品";
    items.unshift(heading);
  }
  submenuContent.replaceChildren(...items);
  submenu.hidden = false;
}

for (const button of menuButtons) {
  button.addEventListener("click", () => {
    if (openedBy === button) closeMenu();
    else openMenu(button);
  });
}

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target) && !submenuContent.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !openedBy) return;
  const button = openedBy;
  closeMenu();
  button.focus();
});

const homepage = document.querySelector("#homepage");
const homeProducts = document.querySelector(".home-products");
const homeTrack = document.querySelector(".home-track");
const scenes = document.querySelector(".home-scenes");
const wordmark = hero.querySelector("h1");
const navBrand = nav.querySelector(".brand");
const pages = [catalog, ...document.querySelectorAll(".direct-page, .indexed-page")];

for (let index = 1; index <= 5; index++) {
  const scene = makeButton("");
  scene.className = "home-scene";
  scene.dataset.preview = "product";
  const line = document.createElement("img");
  line.src = `assets/home-line-${index === 1 ? 1 : 2}.svg`;
  line.alt = "";
  const caption = document.createElement("p");
  caption.append(document.createTextNode(`主线产品 ${index} 场景图`),
    document.createElement("br"), document.createTextNode("点击可跳转产品详情页"));
  scene.append(line, caption);
  scenes.append(scene);
}

const footer = catalog.querySelector(".footer").cloneNode(true);
footer.classList.add("grid");
homepage.append(footer);
for (const page of pages.slice(1)) page.append(footer.cloneNode(true));

const indexedNavigation = new Map();
for (const [pageId, keys] of Object.entries(sectionKeys)) {
  const page = document.getElementById(pageId);
  const sidebar = document.createElement("nav");
  sidebar.className = "index-sidebar";
  sidebar.setAttribute("aria-label", `${document.getElementById(pageId).getAttribute("aria-label")}子导航`);
  if (pageId === "creators") {
    const heading = document.createElement("p");
    heading.textContent = "创作者";
    sidebar.append(heading);
  }
  const entries = keys.map((key, index) => {
    const link = document.createElement("a");
    const label = document.createElement("span");
    link.href = `#${pageId}/${key}`;
    label.textContent = menus[pageId][index];
    link.append(label);
    link.addEventListener("click", event => {
      event.preventDefault();
      navigateTo(link.hash);
    });
    sidebar.append(link);
    return { key, link, label, section: page.querySelector(`[data-section="${key}"]`) };
  });
  const summary = document.createElement("p");
  summary.className = "sidebar-summary";
  summary.hidden = true;
  sidebar.append(summary);
  for (const entry of entries) {
    const copy = entry.section.querySelector(".indexed-note, .creator-intro");
    entry.summary = copy?.textContent || "";
    copy?.remove();
  }
  const layout = document.createElement("div");
  layout.className = "indexed-layout grid";
  layout.append(sidebar, page.querySelector(".indexed-body"));
  page.prepend(layout);
  indexedNavigation.set(page, { entries, summary });
}

const clamp = value => Math.max(0, Math.min(1, value));
let scheduled = false;
let currentPage;
let creatorEntryY;
const summaryTargets = new WeakMap();
const moveHomeTrack = engine?.quickTo(homeTrack, "x", { duration: 0.3, ease: "power2.out" });

function syncSummary(entries, summary, active, anchor, jumped = false) {
  let copy = "";
  if (currentPage.id === "creators") {
    if (creatorEntryY !== undefined && Math.abs(scrollY - creatorEntryY) > 100) creatorEntryY = undefined;
    if (creatorEntryY !== undefined) copy = entries[0].summary;
  } else if (active.summary) {
    // The link setup replaces cover buttons with anchors after the sidebar is built.
    const trigger = active.section.querySelector(active.key === "residency" ? ".creator-toggle" : ".campus-cover");
    const bounds = (trigger || active.section).getBoundingClientRect();
    const end = trigger
      ? bounds.bottom
      : Math.min(bounds.bottom, bounds.top + innerHeight - anchor);
    if (jumped || (bounds.top <= anchor && end > anchor)) copy = active.summary;
  }
  if ((summaryTargets.get(summary) || "") === copy) return;
  summaryTargets.set(summary, copy);
  engine?.killTweensOf(summary);
  function displayCopy() {
    summary.textContent = copy;
    summary.hidden = !copy;
    summary.setAttribute("aria-hidden", String(!copy));
    if (copy && engine && !motion.matches) {
      engine.fromTo(summary, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.46, ease: "power2.out", clearProps: "opacity,transform",
      });
    } else {
      summary.style.opacity = "";
      summary.style.transform = "";
    }
  }
  if (!summary.hidden && summary.textContent !== copy && engine && !motion.matches) {
    summary.setAttribute("aria-hidden", "true");
    engine.to(summary, { opacity: 0, duration: 0.22, ease: "power1.out", onComplete: displayCopy });
  } else displayCopy();
}

function syncSidebar(forceLayout = false, fromScroll = false, target) {
  const index = indexedNavigation.get(currentPage);
  if (!index) return;
  const { entries, summary } = index;
  const threshold = section => parseFloat(getComputedStyle(section).scrollMarginTop) + 2;
  const lead = fromScroll ? Math.min(320, Math.max(180, innerHeight * 0.25)) : 0;
  const currentAt = offset => entries.findLast(entry => {
    const start = threshold(entry.section);
    const activationLine = entry.key === "residency" && offset > 0
      ? Math.max(start + offset, innerHeight * 0.62)
      : start + offset;
    return entry.section.getBoundingClientRect().top <= activationLine;
  }) || entries[0];
  const selectedEntry = entries.find(entry => entry.section === target);
  const active = selectedEntry || currentAt(lead);
  for (const entry of entries) {
    const { link, label } = entry;
    const selected = entry === active;
    if (!forceLayout && selected === link.hasAttribute("aria-current")) continue;
    if (selected) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
    const x = selected ? Math.max(0, link.clientWidth - label.offsetWidth) : 0;
    if (engine && !motion.matches) {
      engine.to(label, { ...navMotion, x });
    } else {
      engine?.killTweensOf(label);
      label.style.transform = `translateX(${x}px)`;
    }
  }
  const visibleSection = selectedEntry || currentAt(0);
  syncSummary(entries, summary, visibleSection, threshold(visibleSection.section), Boolean(selectedEntry));
}

function updateScrollEffects() {
  scheduled = false;
  if (hero.hidden) {
    syncSidebar(false, true);
    return;
  }

  const heroHeight = hero.offsetHeight;
  const y = window.scrollY;
  const progress = clamp((y - heroHeight * 0.15) / (heroHeight * 0.49));
  const ease = progress * progress * (3 - 2 * progress);
  const active = progress >= 1;
  const headerOpacity = motion.matches ? Number(active) : clamp((progress - 0.72) / 0.28);
  header.style.setProperty("--nav-opacity", headerOpacity);
  header.inert = !active;
  header.toggleAttribute("data-travelling", !active);
  wordmark.style.visibility = active ? "hidden" : "";

  if (!motion.matches && !active) {
    const dock = navBrand.getBoundingClientRect();
    const copy = hero.querySelector(".hero-copy").getBoundingClientRect();
    const fontSize = parseFloat(getComputedStyle(wordmark).fontSize);
    const scale = 1 + (20 / fontSize - 1) * ease;
    const rise = (dock.top - copy.top) * ease;
    wordmark.style.transform = `translateY(${rise}px) scale(${scale})`;
  } else {
    wordmark.style.transform = "";
  }

  const gallery = homeProducts.getBoundingClientRect();
  const start = Math.min(innerHeight * 0.48, Math.max(110, innerHeight * 0.75 - gallery.height * 0.35));
  const end = -Math.min(innerHeight * 0.3, gallery.height * 0.3);
  const travel = Math.max(0, homeTrack.offsetWidth - homeProducts.clientWidth);
  const position = clamp((start - gallery.top) / (start - end));
  const distance = travel * position * position * (3 - 2 * position);
  if (motion.matches) {
    moveHomeTrack?.tween.pause();
    homeTrack.style.transform = "";
  } else if (moveHomeTrack) {
    moveHomeTrack(-distance);
  } else {
    homeTrack.style.transform = `translate3d(${-distance}px, 0, 0)`;
  }
}

function queueScrollEffects() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateScrollEffects);
}

function renderPage() {
  closeMenu();
  const [id, sectionId] = location.hash.slice(1).split("/");
  const visiblePage = pages.find(page => page.id === id);
  const enteringPage = currentPage !== visiblePage;
  currentPage = visiblePage;
  hero.hidden = homepage.hidden = Boolean(visiblePage);
  for (const page of pages) page.hidden = page !== visiblePage;
  if (!sectionId) window.scrollTo(0, 0);
  startSlideshow();
  if (visiblePage) {
    header.style.setProperty("--nav-opacity", 1);
    header.inert = false;
    header.removeAttribute("data-travelling");
    if (visiblePage === catalog) filterProducts(activeCategory);
    const target = [...visiblePage.querySelectorAll("[data-section]")].find(section => section.dataset.section === sectionId);
    target?.scrollIntoView({ block: "start" });
    if (enteringPage && id === "creators") {
      creatorEntryY = scrollY;
      const summary = indexedNavigation.get(visiblePage).summary;
      engine?.killTweensOf(summary);
      summaryTargets.delete(summary);
      summary.textContent = "";
      summary.hidden = true;
    }
    if (enteringPage) {
      for (const { link, label } of indexedNavigation.get(visiblePage)?.entries || []) {
        link.removeAttribute("aria-current");
        engine?.killTweensOf(label);
        if (engine) engine.set(label, { x: 0 });
        else label.style.transform = "";
      }
    }
    syncSidebar(false, false, target);
    if (visiblePage !== catalog) {
      if (enteringPage && !target && (id === "academy" || id === "system")) {
        revealContent([...visiblePage.querySelectorAll(".section-cover, .section-copy, .section-custom")], 0.18);
      } else {
        const content = visiblePage.querySelector(".indexed-body, .section-page");
        if (content && (enteringPage || target)) revealContent([content], indexedNavigation.has(visiblePage) ? navMotion.duration : 0);
      }
    }
  } else {
    updateScrollEffects();
  }
}

navBrand.addEventListener("click", event => {
  if (!hero.hidden) {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: motion.matches ? "instant" : "smooth" });
  }
});
history.scrollRestoration = "manual";
window.addEventListener("hashchange", renderPage);
window.addEventListener("scroll", queueScrollEffects, { passive: true });
window.addEventListener("resize", () => { syncSidebar(true, true); queueScrollEffects(); });
motion.addEventListener("change", () => { syncSidebar(true, true); queueScrollEffects(); });
renderPage();
