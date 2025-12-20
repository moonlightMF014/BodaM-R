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
  if(!elDays) return; // por si quitas esa sección

  const now = new Date();
  let diff = weddingDate - now;

  if(diff <= 0){
    elDays.textContent = "0";
    elHours.textContent = "00";
    elMins.textContent = "00";
    elSecs.textContent = "00";
    return;
  }

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

setInterval(updateCountdown, 1000);
updateCountdown();

// ====== MÚSICA ======
const musicBtn = document.getElementById("musicBtn");
const bgm = document.getElementById("bgm");

let isPlaying = false;

async function toggleMusic(){
  if(!bgm) return;

  try{
    if(!isPlaying){
      bgm.volume = 0.6;
      await bgm.play();
      isPlaying = true;
      musicBtn.textContent = "⏸ Música";
    }else{
      bgm.pause();
      isPlaying = false;
      musicBtn.textContent = "▶ Música";
    }
  }catch(err){
    // si el navegador bloquea algo, aquí cae (normal en iPhone sin interacción)
    console.log("No se pudo reproducir:", err);
  }
}

if(musicBtn) musicBtn.addEventListener("click", toggleMusic);

// ====== FORM RSVP ======
const form = document.getElementById("rsvpForm");
const status = document.getElementById("formStatus");

// 2 opciones:
// A) Enviar a Formspree (recomendado)
// B) Guardar local (solo en el dispositivo - no recomendado para RSVP real)
//
// Dejo por defecto "B (local)" para que no falle.
// Cuando me digas tu correo, te dejo el Formspree listo.

function setStatus(msg){
  if(status) status.textContent = msg;
}

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    console.log("RSVP:", data);

    // ✅ Modo local (solo para pruebas)
    localStorage.setItem("rsvp_last", JSON.stringify(data));
    setStatus("¡Gracias! Tu confirmación se registró (modo prueba).");

    form.reset();
  });
}
