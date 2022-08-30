let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
];

let nowPlaying = document.querySelector('.now-playing');
let musicCover = document.querySelector('.music-cover');
let musicTitle = document.querySelector('.music-title');
let musicArtist = document.querySelector('.music-artist');

let musicSlider = document.querySelector('.music-slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');

let prevTrack = document.querySelector('.music-prev');
let nextTrack = document.querySelector('.music-next');
let playPause = document.querySelector('.play-pause');

let volSlider = document.querySelector('.volume-slider');

let totalTracks = track_list.length;
let currentTrackIndex = 1;

let audio = document.createElement('audio');
audio.setAttribute('preload', 'metadata');

audio.addEventListener('timeupdate', tikTok);
audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('ended', next);

playPause.addEventListener('click', playPauseCurrentTrack);

prevTrack.addEventListener('click', prev);
nextTrack.addEventListener('click', next);

musicSlider.addEventListener('input', seekTo);

volSlider.addEventListener('input', updateVol);





setCurrentTrack();
playCurrentTrack();
setInitialVol();

function setCurrentTrack() {
  audio.src = track_list[currentTrackIndex].path;
  audio.load();
  nowPlaying.textContent = `Playing ${currentTrackIndex + 1} of ${totalTracks}`;
  musicCover.style.background = `url('${track_list[currentTrackIndex].image}')`;
  musicArtist.textContent = track_list[currentTrackIndex].artist;
  musicTitle.textContent = track_list[currentTrackIndex].name;
  currentTime.textContent = '00:00';
  musicSlider.value = 0;
}

function setInitialVol() {
  volSlider.value = 60;
  audio.volume = 0.6;
}

function updateDuration() {
  let mins = Math.floor(audio.duration / 60);
  if (mins < 10) {
    mins = '0' + mins.toString();
  }
  let seconds = Math.ceil(audio.duration % 60);
  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  }
  totalDuration.textContent = `${mins}:${seconds}`;
}


function playPauseCurrentTrack() {
  if (isPlaying) {
    pauseCurrentTrack();
  } else {
    playCurrentTrack();
  }
}

function playCurrentTrack() {
  isPlaying = true;
  audio.play();
  playPause.classList.remove('fa-play');
  playPause.classList.add('fa-pause');
}

function pauseCurrentTrack() {
  isPlaying = false;
  audio.pause();
  playPause.classList.remove('fa-pause');
  playPause.classList.add('fa-play');  
}

function tikTok() {
  let mins = Math.floor(audio.currentTime / 60);
  if (mins < 10) {
    mins = '0' + mins.toString();
  }
  let seconds = Math.ceil(audio.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  }
  currentTime.textContent = `${mins}:${seconds}`;
}

function next() {
  currentTrackIndex++;
  currentTrackIndex = currentTrackIndex % totalTracks;
  setCurrentTrack();
  playCurrentTrack();
}

function prev() {
  isPlaying = false;
  currentTrackIndex--;
  currentTrackIndex = currentTrackIndex < 0 ? 0 : currentTrackIndex;
  setCurrentTrack();
  playCurrentTrack();
}

function seekTo() {
  let newTime = musicSlider.value * audio.duration / 100;
  if (newTime == audio.duration) {
    newTime--;
  }
  audio.currentTime = newTime;
  tikTok();
}

function updateVol() {
  audio.volume = volSlider.value / 100;
}