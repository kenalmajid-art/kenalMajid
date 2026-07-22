// === PENGATURAN TANGGAL ===
const startDate = new Date("2023-08-10T00:15:38");

// === ELEMEN DOM ===
const layarLoading = document.getElementById('layarLoading');
const barIsi = document.getElementById('barIsi');
const nilaiPersen = document.getElementById('nilaiPersen');
const kontenUtama = document.getElementById('kontenUtama');
const mataKiri = document.getElementById('mataKiri');
const mataKanan = document.getElementById('mataKanan');
const textAwal = document.getElementById("textAwal");
const openBtn = document.getElementById("openBtn");
const openGalleryBtn = document.getElementById("openGalleryBtn");
const envelope = document.getElementById("envelope");
const closeLetter = document.getElementById("closeLetter");
const closeGallery = document.getElementById("closeGallery");
const homePage = document.getElementById("homePage");
const galleryPage = document.getElementById("galleryPage");
const heartsContainer = document.getElementById("heartsContainer"); //[span_3](start_span)[span_3](end_span)

let persen = 0;

// Fungsi Loading
const prosesLoading = setInterval(() => {
    persen++;
    barIsi.style.width = persen + '%';
    nilaiPersen.textContent = persen + '%';

    if(persen === 100) {
        clearInterval(prosesLoading);
        setTimeout(() => {
            layarLoading.classList.add('selesai');
            kontenUtama.style.display = 'block';
        }, 500);
    }
}, 50);

// Fungsi Efek Kedip Mata Otomatis
function mataBerkedip() {
    // Tutup mata
    mataKiri.classList.add('mata-tutup');
    mataKanan.classList.add('mata-tutup');

    // Buka mata lagi setelah 150ms
    setTimeout(() => {
        mataKiri.classList.remove('mata-tutup');
        mataKanan.classList.remove('mata-tutup');
    }, 180);

    // Jadwal kedip berikutnya secara acak (2-4 detik)
    setTimeout(mataBerkedip, Math.random() * 1000 + 1000);
}

// Mulai kedip mata saat halaman siap
mataBerkedip();



// === FUNGSI BUKA TUTUP ===
openBtn.addEventListener("click", () => {
    envelope.classList.add("open");
    textAwal.style.display = "none";
    openBtn.style.display = "none";
    openGalleryBtn.style.display = "none";
    startCountdown();
});

closeLetter.addEventListener("click", () => {
    envelope.classList.remove("open");
    setTimeout(() => {
        textAwal.style.display = "block";
        openBtn.style.display = "block";
        openGalleryBtn.style.display = "block";
    }, 200);
});

openGalleryBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    galleryPage.classList.add("active");
});

closeGallery.addEventListener("click", () => {
    galleryPage.classList.remove("active");
    setTimeout(() => {
        homePage.classList.remove("hidden");
    }, 300);
});

// === HITUNG WAKTU BERSAMA ===
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000); //[span_4](start_span)[span_4](end_span)

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0"); //[span_5](start_span)[span_5](end_span)
}

let timerInterval;
function startCountdown() {
  if (timerInterval) return;
  
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// === ANIMASI HATI MELAYANG ===
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💙";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
    heart.style.fontSize = (Math.random() * 15 + 15) + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300); 