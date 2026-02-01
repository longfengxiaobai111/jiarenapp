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
    return ["home", "handle", "query"].includes(hash) ? hash : "home";
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
})();
