

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

document.addEventListener("DOMContentLoaded", () => {

  initHamburgerMenu();
  initSkillObserver();
  initProjektmenuToggle();
});

// === HAMBURGER-MENÜ TOGGLE ===
function initHamburgerMenu(){
   
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('menu-collapsed');
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !expanded);
    });
  }
}


function initSkillObserver(){

  // === SKILLBARS MIT INTERSECTION OBSERVER ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkill(entry.target)
        // Nur 1x animieren
        observer.unobserve(entry.target);
      }
    });
  },{
    // Sobald 50 % sichtbar
    threshold: 0.5
  });

  // Alle Balken beobachten
  document.querySelectorAll(".skill-fill").forEach(fill =>{
    observer.observe(fill);
  })
}


function animateSkill(fill){
  const percentText = fill.getAttribute("data-percent");
  const percent = parseInt(percentText);
  fill.style.width = percentText;
    
    
  // Skill-Level und Sterne bestimmen
  let stars =""
  let levelText = "";
  
  if (percent <= 20) {
    stars = "★☆☆☆☆";
    levelText = "Einsteiger";
  } else if (percent <= 40) {
    stars = "★★☆☆☆";
    levelText = "Basiswissen";
  } else if (percent <= 60) {
    stars = "★★★☆☆";
    levelText = "Fortgeschritten";
  } else if (percent <= 80) {
    stars = "★★★★☆";
    levelText = "Sehr gut";
  } else {
    stars = "★★★★★";
    levelText = "Experte";
  }
        
  // Container der einzelnen Skill-Zeile finden
  const skillDiv = fill.closest(".skill"); 
  
  // Wenn bereits ein info-Bereich existiert, nicht doppelt einfügen
  if(!skillDiv.querySelector(".skill-info")){
    // Skilname aus dem vorhandenen Label holen
    const labelElement = skillDiv.querySelector(".skill-label");
    const skillName = labelElement ? labelElement.textContent : "skill";
    
    // Neuen Container für Name + Level erzeugen
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("skill-info");
    
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("skill-label");
    nameSpan.textContent = skillName;
    
    const levelSpan = document.createElement("span");
    levelSpan.classList.add("skill-level");
    levelSpan.textContent = `${stars} (${levelText})`;
    
    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(levelSpan);
    
    // Alte Überschrift ersetzen oder ergänzen
    skillDiv.insertBefore(infoDiv, skillDiv.querySelector(".skill-bar"));
    
    // Optional: alte skill-label ausblenden (wenn doppelt)
    if(labelElement)
      labelElement.style.display = "none";
  }    
}

function initProjektmenuToggle() {
  const toggle = document.querySelector(".projektmenu-toggle");
  const submenu = document.querySelector(".submenu");

  if (!toggle || !submenu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    submenu.classList.toggle("hidden");
  });
}

    
  
  
  