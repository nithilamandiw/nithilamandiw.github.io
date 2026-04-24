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
