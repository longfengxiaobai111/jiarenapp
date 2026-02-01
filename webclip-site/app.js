(() => {
  const app = document.getElementById("app");
  if (!app) return;

  const getScreen = (name) => app.querySelector(`.screen[data-screen="${name}"]`);
  const allScreens = () => Array.from(app.querySelectorAll(".screen[data-screen]"));

  const setActive = (name) => {
    for (const el of allScreens()) {
      el.classList.toggle("is-active", el.dataset.screen === name);
    }
    history.replaceState(null, "", `#${name}`);
  };

  const initial = (() => {
    const hash = (location.hash || "").replace("#", "").trim();
    return ["home", "handle", "query", "tools"].includes(hash) ? hash : "home";
  })();

  setActive(initial);

  app.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const el = target.closest("[data-nav]");
    if (!el) return;
    const nav = el.getAttribute("data-nav");
    if (!nav) return;
    if (!getScreen(nav)) return;
    setActive(nav);
  });

  window.addEventListener("hashchange", () => {
    const hash = (location.hash || "").replace("#", "").trim();
    if (getScreen(hash)) setActive(hash);
  });

  const siteUrlEl = document.getElementById("site-url");
  if (siteUrlEl) {
    const url = `${location.origin}/webclip-site/`;
    siteUrlEl.textContent = url;
  }

  const statusEl = document.getElementById("pwa-status");
  const installBtn = document.getElementById("pwa-install");
  let deferredPrompt = null;

  if (statusEl) statusEl.textContent = "未触发安装事件";

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (statusEl) statusEl.textContent = "可安装（已捕获安装事件）";
    if (installBtn) installBtn.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    if (statusEl) statusEl.textContent = "已安装";
    if (installBtn) installBtn.hidden = true;
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) {
        if (statusEl) statusEl.textContent = "当前浏览器未提供安装事件";
        return;
      }
      deferredPrompt.prompt();
      try {
        await deferredPrompt.userChoice;
      } finally {
        deferredPrompt = null;
        installBtn.hidden = true;
      }
    });
  }
})();
