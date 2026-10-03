const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarMobile = window.matchMedia("(max-width: 750px)");
const sidebarStorageKey = "sidebarCollapsed";

function updateSidebar() {
    const collapsed = localStorage.getItem(sidebarStorageKey) === "true" && !sidebarMobile.matches;
    const label = collapsed ? "Expandir menu" : "Recolher menu";

    document.body.classList.toggle("sidebar-collapsed", collapsed);
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute("aria-label", label);
    sidebarToggle.title = label;
    sidebarToggle.querySelector(".toggle-label").textContent = label;
}

sidebarToggle.addEventListener("click", function () {
    const collapsed = !document.body.classList.contains("sidebar-collapsed");
    localStorage.setItem(sidebarStorageKey, String(collapsed));
    updateSidebar();
});

sidebarMobile.addEventListener("change", updateSidebar);
updateSidebar();
