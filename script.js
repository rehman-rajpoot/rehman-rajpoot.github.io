// ---------- Project Data (Edit Your Real Projects) ----------
const projectData = [
  {
    title: "Portfolio Site",
    description: "This personal site (design, dark mode, accessibility focus).",
    stack: ["HTML","CSS","JS"],
    tags: ["Accessible","Responsive"],
    code: "https://github.com/rehman-rajpoot/portfolio",
    demo: "#"
  },
  {
    title: "Weather App",
    description: "Fetches live OpenWeather data, city search, caching.",
    stack: ["JS","API"],
    tags: ["API","Async"],
    code: "https://github.com/rehman-rajpoot/weather-app",
    demo: "#"
  },
  {
    title: "Task Manager",
    description: "LocalStorage CRUD tasks with filters & stats.",
    stack: ["JavaScript"],
    tags: ["Productivity"],
    code: "https://github.com/rehman-rajpoot/task-manager",
    demo: "#"
  },
  {
    title: "UI Components",
    description: "Small component library (modals, tabs, toast).",
    stack: ["HTML","CSS","JS"],
    tags: ["Reusable"],
    code: "https://github.com/rehman-rajpoot/ui-kit",
    demo: "#"
  }
];

// ---------- Inject Projects ----------
const projectsEl = document.getElementById("projects");
if (projectsEl) {
  projectsEl.innerHTML = projectData.map(p => `
    <article class="card" tabindex="0">
      <div class="stack">${p.stack.join(" · ")}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="badges">
        ${p.tags.map(t => `<span class="badge">${t}</span>`).join("")}
      </div>
      <p style="margin-top:.4rem;">
        <a href="${p.demo}" target="_blank" rel="noopener">Demo</a> ·
        <a href="${p.code}" target="_blank" rel="noopener">Code</a>
      </p>
    </article>
  `).join("");
}

// ---------- Year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Contact Form (Client-side demo only) ----------
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = validate(data);
    resetErrors();
    if (Object.keys(errors).length) {
      for (const [field, msg] of Object.entries(errors)) {
        const el = form.querySelector(`.error[data-for="${field}"]`);
        if (el) el.textContent = msg;
      }
      return;
    }
    const status = form.querySelector(".form-status");
    status.textContent = "Sending...";
    // Fake send
    setTimeout(() => {
      status.textContent = "Message sent (demo). Integrate Formspree / Netlify forms for real.";
      form.reset();
    }, 900);
  });
}
function validate({ name, email, message }) {
  const errs = {};
  if (!name?.trim()) errs.name = "Required.";
  if (!message?.trim()) errs.message = "Message required.";
  if (!email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = "Invalid email.";
  return errs;
}
function resetErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

// ---------- Mobile Nav Toggle ----------
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navMenu.getAttribute("aria-expanded") === "true";
    navMenu.setAttribute("aria-expanded", String(!expanded));
    navToggle.setAttribute("aria-expanded", String(!expanded));
  });
}

// ---------- Theme Toggle ----------
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) document.documentElement.classList.add("dark");
  themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });
}