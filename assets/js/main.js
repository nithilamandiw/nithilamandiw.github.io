const roles = ["CI/CD pipelines", "Telegram bots", "full-stack apps", "cloud automation", "VPS deployments", "REST API backends"];
let i = 0, c = 0, del = false;
const el = document.getElementById("role-word");
function type() {
    const word = roles[i];
    if (!del) {
        el.textContent = word.slice(0, ++c);
        if (c === word.length) { del = true; setTimeout(type, 1800); return; }
    } else {
        el.textContent = word.slice(0, --c);
        if (c === 0) { del = false; i = (i + 1) % roles.length; }
    }
    setTimeout(type, del ? 45 : 85);
}
type();


// --- New Interactive Features ---

// 1. Custom Cursor Follower
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects on clickables
    const hoverElements = document.querySelectorAll("a, button, .btn, .pill, .proj-card, .exp-card, .copy-btn");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "50px";
            cursorOutline.style.height = "50px";
            cursorOutline.style.backgroundColor = "rgba(14, 165, 233, 0.1)";
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "36px";
            cursorOutline.style.height = "36px";
            cursorOutline.style.backgroundColor = "transparent";
        });
    });
}

// 2. Glow Card Mouse Tracker (Spotlight Effect)
const glowCards = document.querySelectorAll(".glow-card");
glowCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// 3. Scroll Reveal Animations
const revealElements = document.querySelectorAll(".reveal");
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// 4. Navbar Background on Scroll
const navbar = document.getElementById("navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// 5. Copy Code Button Logic
const copyBtn = document.getElementById("copy-code-btn");
if (copyBtn) {
    copyBtn.addEventListener("click", () => {
        const codeText = document.querySelector(".code-body").innerText;
        navigator.clipboard.writeText(codeText).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="#10B981" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
}


// 6. tsParticles Background
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        background: {
            color: { value: "transparent" }
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "grab" },
                resize: true
            },
            modes: {
                push: { quantity: 3 },
                grab: { distance: 200, links: { opacity: 0.3 } }
            }
        },
        particles: {
            color: { value: ["#0EA5E9", "#7C3AED", "#10B981"] },
            links: {
                color: "#94A3B8",
                distance: 150,
                enable: true,
                opacity: 0.15,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 0.8,
                straight: false
            },
            number: {
                density: { enable: true, area: 800 },
                value: 40
            },
            opacity: {
                value: 0.5,
                animation: { enable: true, minimumValue: 0.2, speed: 1, sync: false }
            },
            shape: { type: "circle" },
            size: {
                value: { min: 1, max: 2.5 }
            }
        },
        detectRetina: true
    });
}

// 8. Terminal Easter Egg Logic
const terminalOverlay = document.getElementById("terminal-overlay");
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");
const termClose = document.getElementById("term-close");

function printTerm(text, className = "") {
    if(!terminalOutput) return;
    const div = document.createElement("div");
    div.innerHTML = text;
    if(className) div.className = className;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

const commands = {
    help: () => printTerm("Available commands: <br>- <span class='term-info'>whoami</span>: About me<br>- <span class='term-info'>projects</span>: List projects<br>- <span class='term-info'>contact</span>: Show contact info<br>- <span class='term-info'>clear</span>: Clear terminal<br>- <span class='term-info'>exit</span>: Close terminal"),
    whoami: () => printTerm("I am Nithila Thiranagama, an aspiring Cloud & DevOps Engineer passionate about automating everything.", "term-success"),
    projects: () => printTerm("Projects:<br>1. Telegram GDrive Bot (CI/CD, Python)<br>2. Cloud Infrastructure Automation (Terraform)<br>3. Microservices Deployment (Docker, K8s)"),
    contact: () => printTerm("Email: nithilamandiw@gmail.com<br>LinkedIn: /in/nithila-mandiw<br>GitHub: /nithilamandiw"),
    clear: () => { if(terminalOutput) terminalOutput.innerHTML = ""; },
    exit: () => { toggleTerminal(false); },
    sudo: () => printTerm("Nice try! You don't have root privileges here.", "term-error"),
};

function toggleTerminal(show) {
    if(!terminalOverlay || !terminalInput) return;
    if(show) {
        terminalOverlay.classList.add("active");
        setTimeout(() => terminalInput.focus(), 100);
    } else {
        terminalOverlay.classList.remove("active");
        terminalInput.blur();
    }
}

document.addEventListener("keydown", (e) => {
    if(!terminalOverlay) return;
    // Open with ` or Ctrl+K / Cmd+K
    if (e.key === "`" || ((e.ctrlKey || e.metaKey) && e.key === "k")) {
        e.preventDefault();
        const isActive = terminalOverlay.classList.contains("active");
        toggleTerminal(!isActive);
    }
    // Escape to close
    if (e.key === "Escape" && terminalOverlay.classList.contains("active")) {
        toggleTerminal(false);
    }
});

if (termClose) {
    termClose.addEventListener("click", () => toggleTerminal(false));
}

if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            const val = terminalInput.value.trim().toLowerCase();
            if (val) {
                printTerm(`<span class="prompt">nithila@devops:~$</span> ${val}`);
                if (commands[val]) {
                    commands[val]();
                } else {
                    printTerm(`bash: ${val}: command not found`, "term-error");
                }
            }
            terminalInput.value = "";
        }
    });
}
