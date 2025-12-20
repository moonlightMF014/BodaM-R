// ====== FECHA DE BODA (AJÚSTALA SI QUIERES) ======
// Viernes 01 de mayo de 2026
const weddingDate = new Date("2026-05-01T15:30:00"); // hora ejemplo

// ====== COUNTDOWN ======
const elDays  = document.getElementById("cdDays");
const elHours = document.getElementById("cdHours");
const elMins  = document.getElementById("cdMins");
const elSecs  = document.getElementById("cdSecs");

function pad(n){ return String(n).padStart(2, "0"); }

function updateCountdown(){
  if(!elDays) return;

  const now = new Date();
  let diff = weddingDate.getTime() - now.getTime();

  if(diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  elDays.textContent = String(days);
  elHours.textContent = pad(hours);
  elMins.textContent = pad(mins);
  elSecs.textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ====== MÚSICA ======
const btn = document.getElementById("musicBtn");
const audio = document.getElementById("bgm");

function setBtnLabel(isPlaying){
  btn.textContent = isPlaying ? "⏸ Música" : "▶ Música";
  btn.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
}

if(btn && audio){
  setBtnLabel(false);

  btn.addEventListener("click", async () => {
    try{
      if(audio.paused){
        await audio.play();
        setBtnLabel(true);
      }else{
        audio.pause();
        setBtnLabel(false);
      }
    }catch(e){
      // En algunos móviles, si el usuario no interactuó “bien”, play puede fallar.
      console.warn("No se pudo reproducir:", e);
      setBtnLabel(false);
    }
  });

  audio.addEventListener("pause", () => setBtnLabel(false));
  audio.addEventListener("play",  () => setBtnLabel(true));
}

// ====== FORM (modo prueba: guarda en localStorage) ======
const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");

function setStatus(msg){
  if(statusEl) statusEl.textContent = msg;
}

if(form){
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("rsvp_last", JSON.stringify(data));
    setStatus("¡Gracias! Tu confirmación se registró.");
    form.reset();
  });
}
