const scrollContainer = document.querySelector('main');
const navigationLinks = [...document.querySelectorAll('header .navbar-link')];
const navigationSections = navigationLinks.map((link) => ({
  link,
  section: document.getElementById(link.hash.slice(1)),
})).filter(({ section }) => section && scrollContainer.contains(section));

function updateActiveNavigation() {
  const visibleSections = navigationSections
    .filter(({ section }) => section.getClientRects().length > 0)
    .map((entry) => ({ ...entry, top: entry.section.getBoundingClientRect().top }))
    .sort((first, second) => first.top - second.top);

  if (!visibleSections.length) return;

  const internalScroll = /auto|scroll/.test(getComputedStyle(scrollContainer).overflowY);
  const marker = internalScroll
    ? scrollContainer.getBoundingClientRect().top + scrollContainer.clientHeight * 0.3
    : window.innerHeight * 0.3;
  let activeSection = visibleSections[0];

  for (const entry of visibleSections) {
    if (entry.top <= marker) activeSection = entry;
  }

  const scroller = internalScroll ? scrollContainer : document.scrollingElement;
  const atBottom = scroller.scrollTop > 0
    && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
  if (atBottom) activeSection = visibleSections[visibleSections.length - 1];

  for (const link of navigationLinks) {
    const active = link === activeSection.link;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let navigationFrame = null;
function scheduleNavigationUpdate() {
  if (navigationFrame !== null) return;
  navigationFrame = requestAnimationFrame(() => {
    navigationFrame = null;
    updateActiveNavigation();
  });
}

scrollContainer.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('hashchange', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);

const navigationResizeObserver = new ResizeObserver(scheduleNavigationUpdate);
navigationResizeObserver.observe(scrollContainer);
navigationSections.forEach(({ section }) => navigationResizeObserver.observe(section));
updateActiveNavigation();
