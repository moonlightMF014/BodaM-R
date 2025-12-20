// ====== FECHA DE BODA (AJÚSTALA SI QUIERES) ======
// Viernes 01 de mayo de 2026
const weddingDate = new Date("2026-05-01T15:30:00"); // hora ejemplo

// ====== COUNTDOWN ======
const elDays = document.getElementById("cdDays");
const elHours = document.getElementById("cdHours");
const elMins = document.getElementById("cdMins");
const elSecs = document.getElementById("cdSecs");

function pad(n){ return String(n).padStart(2, "0"); }

function updateCountdown(){
  const now = new Date();
  let diff = weddingDate - now;

  if(diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if(elDays) elDays.textContent = days;
  if(elHours) elHours.textContent = pad(hours);
  if(elMins) elMins.textContent = pad(mins);
  if(elSecs) elSecs.textContent = pad(secs);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ====== MÚSICA (se activa solo al tocar, por políticas del navegador) ======
const musicBtn = document.getElementById("musicBtn");
const bgm = document.getElementById("bgm");

let isPlaying = false;

async function toggleMusic(){
  if(!bgm) return;

  try{
    if(!isPlaying){
      await bgm.play();
      isPlaying = true;
      if(musicBtn) musicBtn.innerHTML = "⏸ Pausar";
    }else{
      bgm.pause();
      isPlaying = false;
      if(musicBtn) musicBtn.innerHTML = "▶ Música";
    }
  }catch(err){
    console.log("No se pudo reproducir:", err);
  }
}

if(musicBtn) musicBtn.addEventListener("click", toggleMusic);

// ====== FORM RSVP (demo) ======
const form = document.getElementById("rsvpForm");
if(form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const name = (document.getElementById("name")?.value || "").trim();
    const guests = (document.getElementById("guests")?.value || "0").trim();
    const attending = document.querySelector("input[name='attending']:checked")?.value || "si";

    alert(`¡Gracias ${name || "!"} \nAsistencia: ${attending.toUpperCase()} \nAcompañantes: ${guests}`);

    form.reset();
  });
}
