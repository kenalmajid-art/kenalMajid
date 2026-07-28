// ==================================================
// PENGATURAN TANGGAL
// ==================================================

const startDate = new Date("2023-08-10T00:15:38");

// ==================================================
// ELEMEN DOM
// ==================================================

const layarLoading =
document.getElementById("layarLoading");

const barIsi =
document.getElementById("barIsi");

const nilaiPersen =
document.getElementById("nilaiPersen");

const kontenUtama =
document.getElementById("kontenUtama");

const mataKiri =
document.getElementById("mataKiri");

const mataKanan =
document.getElementById("mataKanan");

const textAwal =
document.getElementById("textAwal");

const openBtn =
document.getElementById("openBtn");

const openGalleryBtn =
document.getElementById("openGalleryBtn");

const openMusicBtn =
document.getElementById("openMusicBtn");

const envelope =
document.getElementById("envelope");

const closeLetter =
document.getElementById("closeLetter");

const closeGallery =
document.getElementById("closeGallery");

const closeMusic =
document.getElementById("closeMusic");

const homePage =
document.getElementById("homePage");

const galleryPage =
document.getElementById("galleryPage");

const musicPage =
document.getElementById("musicPage");

const heartsContainer =
document.getElementById("heartsContainer");

// ==================================================
// ELEMEN MUSIC PLAYER
// ==================================================

const music =
document.getElementById("music");

const disk =
document.getElementById("disk");

const spectrum =
document.getElementById("spectrum");

const ctx =
spectrum.getContext("2d");

const playButton =
document.getElementById("play");

const prevButton =
document.getElementById("prev");

const nextButton =
document.getElementById("next");

const songName =
document.getElementById("song-name");

const artistName =
document.getElementById("artist-name");

// ==================================================
// DAFTAR LAGU
// ==================================================

const songs = [

{
    name: "Havana",
    artist: "Camila Cabello",
    path: "song 1.mp3",
    cover: "cover1.png"
},

{
    name: "One Of The Girl",
    artist: "The Weeknd, JENNIE, Lily-Rose DEPP",
    path: "song 2.mp3",
    cover: "cover2.png"
},

{
    name: "Side To Side",
    artist: "Ariana Grande",
    path: "song 3.mp3",
    cover: "cover3.png"
},

{
    name: "Brooklyn Baby",
    artist: "Lana Del Rey",
    path: "song 4.mp3",
    cover: "cover4.png"
}

];

// ==================================================
// INDEX LAGU
// ==================================================

let currentSong = 0;

// ==================================================
// AUDIO CONTEXT
// ==================================================

let audioContext = null;

let analyser = null;

let source = null;

let dataArray = null;

let audioInitialized = false;

// ==================================================
// SETUP AUDIO
// ==================================================

function setupAudio() {

// Jangan membuat AudioContext
// lebih dari satu kali
if (audioInitialized) {
    return;
}


// Buat AudioContext
audioContext =
    new (
        window.AudioContext ||
        window.webkitAudioContext
    )();


// Buat analyser
analyser =
    audioContext.createAnalyser();


// Hubungkan audio element
// dengan Web Audio API
source =
    audioContext.createMediaElementSource(
        music
    );


// Hubungkan source ke analyser
source.connect(analyser);


// Hubungkan analyser ke speaker
analyser.connect(
    audioContext.destination
);


// Atur FFT
analyser.fftSize = 256;


// Jumlah data frekuensi
const bufferLength =
    analyser.frequencyBinCount;


// Array untuk menyimpan data
dataArray =
    new Uint8Array(
        bufferLength
    );


audioInitialized = true;

}

// ==================================================
// MEMILIH LAGU
// ==================================================

function setMusic(index) {

const song =
    songs[index];


// Ganti sumber audio
music.src =
    song.path;


// Ganti nama lagu
songName.textContent =
    song.name;


// Ganti nama artist
artistName.textContent =
    song.artist;


// Ganti cover piringan
disk.style.backgroundImage =
    `url("${song.cover}")`;

}

// ==================================================
// PLAY MUSIC
// ==================================================

async function playMusic() {

try {

    // Siapkan AudioContext
    setupAudio();


    // Jika AudioContext sedang suspend
    // aktifkan kembali
    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

    }


    // Putar musik
    await music.play();


    // Jalankan animasi piringan
    disk.classList.add(
        "playing"
    );


    // Ganti icon menjadi pause
    playButton.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

}

catch (error) {

    console.error(
        "Gagal memutar musik:",
        error
    );

}

}

// ==================================================
// PAUSE MUSIC
// ==================================================

function pauseMusic() {

// Hentikan audio
music.pause();


// Hentikan animasi piringan
disk.classList.remove(
    "playing"
);


// Kembalikan icon menjadi play
playButton.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}

// ==================================================
// PLAY / PAUSE
// ==================================================

playButton.addEventListener(
"click",
() => {

    if (
        music.paused
    ) {

        playMusic();

    }

    else {

        pauseMusic();

    }

}

);

// ==================================================
// NEXT SONG
// ==================================================

nextButton.addEventListener(
"click",
() => {

    // Tambahkan index lagu
    currentSong++;


    // Jika sudah sampai lagu terakhir
    // kembali ke lagu pertama
    if (
        currentSong >=
        songs.length
    ) {

        currentSong = 0;

    }


    // Ganti lagu
    setMusic(
        currentSong
    );


    // Langsung putar
    playMusic();

}

);

// ==================================================
// PREVIOUS SONG
// ==================================================

prevButton.addEventListener(
"click",
() => {

    // Kurangi index lagu
    currentSong--;


    // Jika index kurang dari 0
    // kembali ke lagu terakhir
    if (
        currentSong < 0
    ) {

        currentSong =
            songs.length - 1;

    }


    // Ganti lagu
    setMusic(
        currentSong
    );


    // Langsung putar
    playMusic();

}

);

// ==================================================
// OTOMATIS NEXT
// ==================================================

music.addEventListener(
"ended",
() => {

    // Pindah ke lagu berikutnya
    currentSong++;


    // Jika sudah sampai akhir
    // kembali ke lagu pertama
    if (
        currentSong >=
        songs.length
    ) {

        currentSong = 0;

    }


    // Ganti lagu
    setMusic(
        currentSong
    );


    // Putar lagu berikutnya
    playMusic();

}

);

// ==================================================
// AUDIO SPECTRUM
// ==================================================

function resizeCanvas() {

// Ambil ukuran visual canvas
const rect =
    spectrum.getBoundingClientRect();


// Device Pixel Ratio
const dpr =
    window.devicePixelRatio || 1;


// Atur ukuran internal canvas
spectrum.width =
    rect.width * dpr;

spectrum.height =
    rect.height * dpr;


// Sesuaikan sistem koordinat
// dengan ukuran visual canvas
ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
);

}

// ==================================================
// MENGGAMBAR AUDIO SPECTRUM
// ==================================================

function drawSpectrum() {

// Jalankan frame berikutnya
requestAnimationFrame(
    drawSpectrum
);


// Ambil ukuran visual canvas
const rect =
    spectrum.getBoundingClientRect();


const width =
    rect.width;

const height =
    rect.height;


// Bersihkan canvas
ctx.clearRect(
    0,
    0,
    width,
    height
);


// Jika audio belum siap
// jangan menggambar spectrum
if (
    !audioInitialized ||
    !analyser ||
    !dataArray
) {

    return;

}


// Ambil data frekuensi
analyser.getByteFrequencyData(
    dataArray
);


// Titik tengah canvas
const centerX =
    width / 2;

const centerY =
    height / 2;


// Radius awal spectrum
// Piringan berdiameter 150px
// sehingga radius 95px memberi jarak
const radius = 75;


// Jumlah bar spectrum
const bars =
    dataArray.length;


// Gambar setiap bar
for (
    let i = 0;
    i < bars;
    i++
) {

    // Nilai frekuensi
    const value =
        dataArray[i];


    // Tinggi bar
    // Minimal 2px agar tetap terlihat
    const barHeight =
        Math.max(
            value / 2,
            2
        );


    // Sudut setiap bar
    const angle =
        (
            i /
            bars
        )
        *
        Math.PI
        *
        2;


    // Titik awal garis
    const x1 =
        centerX
        +
        Math.cos(angle)
        *
        radius;


    const y1 =
        centerY
        +
        Math.sin(angle)
        *
        radius;


    // Titik akhir garis
    const x2 =
        centerX
        +
        Math.cos(angle)
        *
        (
            radius
            +
            barHeight
        );


    const y2 =
        centerY
        +
        Math.sin(angle)
        *
        (
            radius
            +
            barHeight
        );


    // Mulai menggambar
    ctx.beginPath();


    // Titik awal
    ctx.moveTo(
        x1,
        y1
    );


    // Titik akhir
    ctx.lineTo(
        x2,
        y2
    );


    // Warna spectrum
    ctx.strokeStyle =
        "#3399ff";


    // Ketebalan spectrum
    ctx.lineWidth =
        3;


    // Ujung garis membulat
    ctx.lineCap =
        "round";


    // Tampilkan garis
    ctx.stroke();

}

}

// ==================================================
// RESIZE CANVAS
// ==================================================

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

// Mulai animasi spectrum
drawSpectrum();

// ==================================================
// MULAI MUSIC PLAYER
// ==================================================

setMusic(
currentSong
);

// ==================================================
// LOADING SCREEN
// ==================================================

let persen = 0;

const prosesLoading =
setInterval(
() => {

        persen++;


        // Isi progress bar
        barIsi.style.width =
            persen + "%";


        // Tampilkan persen
        nilaiPersen.textContent =
            persen + "%";


        // Jika loading selesai
        if (
            persen === 100
        ) {

            clearInterval(
                prosesLoading
            );


            setTimeout(
                () => {

                    // Hilangkan loading screen
                    layarLoading.classList.add(
                        "selesai"
                    );


                    // Tampilkan konten utama
                    kontenUtama.style.display =
                        "block";

                },
                500
            );

        }

    },
    50
);

// ==================================================
// EFEK KEDIP MATA OTOMATIS
// ==================================================

function mataBerkedip() {

// Tutup mata
mataKiri.classList.add(
    "mata-tutup"
);

mataKanan.classList.add(
    "mata-tutup"
);


// Buka kembali mata
setTimeout(
    () => {

        mataKiri.classList.remove(
            "mata-tutup"
        );

        mataKanan.classList.remove(
            "mata-tutup"
        );

    },
    180
);


// Jadwalkan kedipan berikutnya
setTimeout(
    mataBerkedip,
    Math.random() *
    1000
    +
    1000
);

}

mataBerkedip();

// ==================================================
// BUKA SURAT
// ==================================================

openBtn.addEventListener(
"click",
() => {

    // Tampilkan surat
    envelope.classList.add(
        "open"
    );


    // Sembunyikan teks awal
    textAwal.style.display =
        "none";


    // Sembunyikan tombol
    openBtn.style.display =
        "none";

    openGalleryBtn.style.display =
        "none";

    openMusicBtn.style.display =
        "none";


    // Mulai countdown
    startCountdown();

}

);

// ==================================================
// TUTUP SURAT
// ==================================================

closeLetter.addEventListener(
"click",
() => {

    // Tutup surat
    envelope.classList.remove(
        "open"
    );


    // Tampilkan kembali menu
    setTimeout(
        () => {

            textAwal.style.display =
                "block";

            openBtn.style.display =
                "block";

            openGalleryBtn.style.display =
                "block";

            openMusicBtn.style.display =
                "block";

        },
        200
    );

}

);

// ==================================================
// BUKA GALERI
// ==================================================

openGalleryBtn.addEventListener(
"click",
() => {

    // Sembunyikan home
    homePage.classList.add(
        "hidden"
    );


    // Tampilkan gallery
    galleryPage.classList.add(
        "active"
    );


    // Pastikan music tertutup
    musicPage.classList.remove(
        "active"
    );

}

);

// ==================================================
// TUTUP GALERI
// ==================================================

closeGallery.addEventListener(
"click",
() => {

    // Tutup gallery
    galleryPage.classList.remove(
        "active"
    );


    // Kembali ke home
    setTimeout(
        () => {

            homePage.classList.remove(
                "hidden"
            );

        },
        300
    );

}

);

// ==================================================
// BUKA MUSIC PLAYER
// ==================================================

openMusicBtn.addEventListener(
"click",
() => {

    // Sembunyikan home
    homePage.classList.add(
        "hidden"
    );


    // Tutup gallery
    galleryPage.classList.remove(
        "active"
    );


    // Tampilkan music player
    musicPage.classList.add(
        "active"
    );

    setTimeOut(() => {
        resizeCanvas() ;
    }, 100) ; 

});

// ==================================================
// TUTUP MUSIC PLAYER
// ==================================================

closeMusic.addEventListener(
"click",
() => {

    // Tutup music page
    musicPage.classList.remove(
        "active"
    );


    // Hentikan musik
    // PERBAIKAN:
    // sebelumnya menggunakan pauseTrack()
    // padahal fungsi tersebut tidak ada
    pauseMusic();


    // Kembali ke home
    setTimeout(
        () => {

            homePage.classList.remove(
                "hidden"
            );

        },
        300
    );

}

);

// ==================================================
// HITUNG WAKTU BERSAMA
// ==================================================

function updateTimerText() {

// Waktu sekarang
const now =
    new Date();


// Selisih waktu
const diff =
    now -
    startDate;


// Jika tanggal belum tercapai
if (
    diff < 0
) {

    return;

}


// Hitung hari
const days =
    Math.floor(
        diff /
        (
            1000 *
            60 *
            60 *
            24
        )
    );


// Hitung jam
const hours =
    Math.floor(
        (
            diff %
            (
                1000 *
                60 *
                60 *
                24
            )
        )
        /
        (
            1000 *
            60 *
            60
        )
    );


// Hitung menit
const minutes =
    Math.floor(
        (
            diff %
            (
                1000 *
                60 *
                60
            )
        )
        /
        (
            1000 *
            60
        )
    );


// Hitung detik
const seconds =
    Math.floor(
        (
            diff %
            (
                1000 *
                60
            )
        )
        /
        1000
    );


// Tampilkan hari
document.getElementById(
    "days"
).innerText =
    String(
        days
    ).padStart(
        2,
        "0"
    );


// Tampilkan jam
document.getElementById(
    "hours"
).innerText =
    String(
        hours
    ).padStart(
        2,
        "0"
    );


// Tampilkan menit
document.getElementById(
    "minutes"
).innerText =
    String(
        minutes
    ).padStart(
        2,
        "0"
    );


// Tampilkan detik
document.getElementById(
    "seconds"
).innerText =
    String(
        seconds
    ).padStart(
        2,
        "0"
    );

}

// ==================================================
// COUNTDOWN INTERVAL
// ==================================================

let timerInterval;

function startCountdown() {

// Jangan membuat interval
// lebih dari satu
if (
    timerInterval
) {

    return;

}


// Jalankan langsung
updateTimerText();


// Update setiap detik
timerInterval =
    setInterval(
        updateTimerText,
        1000
    );

}

// ==================================================
// ANIMASI HATI MELAYANG
// ==================================================

function createHeart() {

// Buat element heart
const heart =
    document.createElement(
        "div"
    );


// Tambahkan class
heart.classList.add(
    "heart"
);


// Isi emoji
heart.innerHTML =
    "💙";


// Posisi horizontal random
heart.style.left =
    Math.random() *
    100
    +
    "%";


// Durasi animasi random
heart.style.animationDuration =
    (
        Math.random() *
        3
        +
        4
    )
    +
    "s";


// Ukuran random
heart.style.fontSize =
    (
        Math.random() *
        15
        +
        15
    )
    +
    "px";


// Masukkan ke container
heartsContainer.appendChild(
    heart
);


// Hapus setelah selesai
setTimeout(
    () => {

        heart.remove();

    },
    6000
);

}

// Buat heart setiap 300ms
setInterval(
createHeart,
300
);
