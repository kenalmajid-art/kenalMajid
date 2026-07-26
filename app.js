let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

// Setup Musik
const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;
  
  currentTime.innerHTML = '00:00';
  
  // Mengambil durasi setelah audio dimuat
  music.addEventListener('loadedmetadata', () => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  });
}

setMusic(0);

// Format Waktu (Menit : Detik)
const formatTime = (time) => {
  if (isNaN(time)) return "00 : 00";
  let min = Math.floor(time / 60);
  if (min < 10) min = `0${min}`;
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = `0${sec}`;
  return `${min} : ${sec}`;
}

// Play / Pause Toggle
const playMusic = () => {
  music.play().then(() => {
    playBtn.classList.remove('pause');
    disk.classList.add('play');
  }).catch(err => {
    console.log("Autoplay dicegah oleh browser:", err);
  });
}

const pauseMusic = () => {
  music.pause();
  playBtn.classList.add('pause');
  disk.classList.remove('play');
}

playBtn.addEventListener('click', () => {
  if (music.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

// Sync Seek Bar & Current Time
setInterval(() => {
  if (!music.paused) {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) >= Math.floor(seekBar.max) && seekBar.max > 0) {
      forwardBtn.click();
    }
  }
}, 500);

seekBar.addEventListener('input', () => {
  music.currentTime = seekBar.value;
  currentTime.innerHTML = formatTime(music.currentTime);
});

// Tombol Next & Previous
forwardBtn.addEventListener('click', () => {
  currentMusic = (currentMusic >= songs.length - 1) ? 0 : currentMusic + 1;
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener('click', () => {
  currentMusic = (currentMusic <= 0) ? songs.length - 1 : currentMusic - 1;
  setMusic(currentMusic);
  playMusic();
});
