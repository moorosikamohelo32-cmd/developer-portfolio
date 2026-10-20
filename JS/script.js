/* ========== EDIT HERE: your links and details ========== */
const CONFIG = {
  username: "YOUR_GITHUB_USERNAME",          // GitHub username (no URL)
  linkedin: "YOUR_LINKEDIN_LINK_HERE",       // full LinkedIn URL
  email:    "YOUR_EMAIL_HERE",               // e.g. name@example.com
  cv:       "YOUR_CV_FILE.pdf",              // put the PDF in the site root, same name
  roles:    ["Software Developer", "Problem Solver", "Database Builder", "Lifelong Learner"],
};
// Skills: add or remove entries. icon = devicon name (devicon.dev) or a path like "images/x.svg"
const SKILLS = {
  "Programming and web": [["HTML","html5"],["CSS","css3"],["JavaScript","javascript"],["Python","python"]],
  "Development": [["Git","git"],["GitHub","github"],["SQL","azuresqldatabase"],["REST APIs","fastapi"],["Database Development","postgresql"]],
  "Tools and platforms": [["VS Code","vscode"],["Power BI","powerbi"],["Microsoft Azure","azure"],["Draw.io","images/drawio.svg"]],
};
// Projects: copy a block to add another. Screenshots go in /projects/
const PROJECTS = [
  { name:"CertiFlow 365", image:"projects/certiflow.png",
    description:"A software and project management solution demonstrating application development, UI/UX design and documentation.",
    tech:["UI/UX","Documentation","Application design"],
    github:"YOUR_GITHUB_LINK_HERE", demo:"YOUR_LIVE_DEMO_LINK_HERE",
    overview:"Add a short overview of CertiFlow 365.", problem:"Describe the problem it solves.", solution:"Describe how your solution works.",
    contribution:"Describe what you personally built.", learned:"Describe what you learned.", screenshots:[] },
  { name:"Smart Campus", image:"projects/smart-campus.png",
    description:"A student management system concept covering students, facilitators, modules, marks and academic information.",
    tech:["SQL","Database design","Draw.io"],
    github:"YOUR_GITHUB_LINK_HERE", demo:"YOUR_LIVE_DEMO_LINK_HERE",
    overview:"Add a short overview of Smart Campus.", problem:"Describe the problem it solves.", solution:"Describe how your solution works.",
    contribution:"Describe what you personally built.", learned:"Describe what you learned.", screenshots:[] },
  { name:"Pixel Play", image:"projects/pixel-play.png",
    description:"A gaming-focused website built using HTML, CSS and JavaScript.",
    tech:["HTML","CSS","JavaScript"],
    github:"YOUR_GITHUB_LINK_HERE", demo:"YOUR_LIVE_DEMO_LINK_HERE",
    overview:"Add a short overview of Pixel Play.", problem:"Describe the problem it solves.", solution:"Describe how your solution works.",
    contribution:"Describe what you personally built.", learned:"Describe what you learned.", screenshots:[] },
];
const TIMELINE = [
  { title:"CTU Training Solutions: Software Development", date:"Current student, expected completion 2027", text:"Studying software development, databases and application building." },
  { title:"Hoerskool Westonaria", date:"Completed 2024", text:"Completed high school education." },
];
const EXTRAS = ["Internships","Freelance work","Certifications","Hackathons"]; // empty slots, shown as placeholders
/* ========== end of editable area ========== */

const $ = (s, r = document) => r.querySelector(s);
const isPlaceholder = v => !v || /^YOUR_/.test(v);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const icon = n => n.includes("/") ? n : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`;

// Links, CV, username
const links = { github:`https://github.com/${CONFIG.username}`, linkedin:CONFIG.linkedin, email:`mailto:${CONFIG.email}`, cv:CONFIG.cv };
const missing = { github:isPlaceholder(CONFIG.username), linkedin:isPlaceholder(CONFIG.linkedin), email:isPlaceholder(CONFIG.email), cv:isPlaceholder(CONFIG.cv) };
document.querySelectorAll("[data-link]").forEach(a => {
  const k = a.dataset.link;
  if (missing[k]) { a.setAttribute("aria-disabled","true"); a.classList.add("placeholder"); a.removeAttribute("href"); a.title = "Add your details in js/script.js"; }
  else a.href = links[k];
});
document.querySelectorAll("[data-text=username]").forEach(e => e.textContent = CONFIG.username);
if (!missing.github) { const g = $("#gh-graph"); g.src = `https://ghchart.rshah.org/6d5bff/${CONFIG.username}`; g.hidden = false; }
$("#year").textContent = new Date().getFullYear();

// Skills
$("#skills-grid").innerHTML = Object.entries(SKILLS).map(([cat, items]) =>
  `<div class="cat"><h3>${esc(cat)}</h3><div class="chips">${items.map(([n, i]) =>
  `<div class="chip"><img src="${esc(icon(i))}" alt="" width="26" height="26" loading="lazy" onerror="this.style.display='none'"><span>${esc(n)}</span></div>`).join("")}</div></div>`).join("");

// Projects (reusable card)
const linkBtn = (url, label) => isPlaceholder(url)
  ? `<span class="btn placeholder" aria-disabled="true" title="Add this link in js/script.js">${label}</span>`
  : `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`;
const fallback = n => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#16162a"/><text x="50%" y="50%" fill="#8b8bff" font-family="monospace" font-size="20" text-anchor="middle">${n}</text></svg>`)}`;
$("#project-grid").innerHTML = PROJECTS.map((p, i) => `
  <article class="card"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.name)}" width="640" height="400" loading="lazy" onerror="this.onerror=null;this.src='${fallback(esc(p.name))}'">
  <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>
  <ul class="tags">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
  <div class="actions">${linkBtn(p.github,"GitHub")}${linkBtn(p.demo,"Live Demo")}<button class="btn primary" data-i="${i}">View Project</button></div></div></article>`).join("");

// Project details modal
const modal = $("#modal");
$("#project-grid").addEventListener("click", e => {
  const b = e.target.closest("[data-i]"); if (!b) return;
  const p = PROJECTS[b.dataset.i];
  const sec = (h, t) => `<h4>${h}</h4><p>${esc(t)}</p>`;
  $("#m-body").innerHTML = `<h3 id="m-title">${esc(p.name)}</h3>${sec("Overview",p.overview)}${sec("Problem",p.problem)}${sec("Solution",p.solution)}
    <h4>Technologies</h4><ul class="tags">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    ${sec("My contribution",p.contribution)}${sec("What I learned",p.learned)}
    ${p.screenshots.map(s => `<img src="${esc(s)}" alt="${esc(p.name)} screenshot" loading="lazy">`).join("")}
    <div class="actions" style="margin-top:1.2rem">${linkBtn(p.github,"GitHub")}${linkBtn(p.demo,"Live Demo")}</div>`;
  modal.showModal();
});
$(".close").onclick = () => modal.close();
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// Timeline + optional slots
$("#timeline").innerHTML = TIMELINE.map(t => `<li><h3>${esc(t.title)}</h3><span>${esc(t.date)}</span><p>${esc(t.text)}</p></li>`).join("");
$("#extras").innerHTML = EXTRAS.map(x => `<div class="card empty"><h3>${esc(x)}</h3><p>Add yours in js/script.js</p></div>`).join("");

// Nav, theme
const menu = $("#menu"), burger = $(".burger");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
$(".theme").onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = t; try { localStorage.setItem("theme", t); } catch {} };

// Typing effect (static text if reduced motion)
const typed = $("#typed"); let r = 0, c = 0, del = false;
if (matchMedia("(prefers-reduced-motion:reduce)").matches) typed.textContent = CONFIG.roles[0];
else (function tick() {
  const w = CONFIG.roles[r]; c += del ? -1 : 1; typed.textContent = w.slice(0, c);
  let d = del ? 40 : 90;
  if (!del && c === w.length) { del = true; d = 1600; } else if (del && c === 0) { del = false; r = (r + 1) % CONFIG.roles.length; d = 400; }
  setTimeout(tick, d);
})();

// Contact form validation (opens the visitor's email app; no server needed)
const form = $("#form"), status = $("#status");
form.addEventListener("submit", e => {
  e.preventDefault(); let ok = true;
  [...form.elements].filter(f => f.name).forEach(f => {
    let m = "";
    if (!f.value.trim()) m = `Enter your ${f.name}.`;
    else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) m = "Enter a valid email address.";
    else if (f.name === "message" && f.value.trim().length < 10) m = "Write at least 10 characters.";
    $(`[data-for=${f.name}]`).textContent = m; f.setAttribute("aria-invalid", !!m); if (m) ok = false;
  });
  if (!ok) { form.querySelector("[aria-invalid=true]").focus(); status.textContent = "Fix the highlighted fields."; return; }
  if (missing.email) { status.textContent = "Set your email in CONFIG (js/script.js) to enable sending."; return; }
  const d = Object.fromEntries(new FormData(form));
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(`${d.message}\n\nFrom: ${d.name} (${d.email})`)}`;
  status.textContent = "Opening your email app to send the message.";
});
