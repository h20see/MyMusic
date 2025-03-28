const audio = new Audio();
audio.volume = 0.2; // 默认音量设置为 20%
let isPlaying = false;
let currentTrackIndex = 0;
let playMode = 'loop'; // 默认播放模式
let isMuted = false;

// ✅ 直接在前端定义歌曲列表（不依赖 PHP）
const songs = [
    { url: "./music/周杰伦 - 红尘客栈.mp3", artist: "周杰伦", title: "红尘客栈" },
    { url: "./music/卢冠廷 - 一生所爱.flac", artist: "卢冠廷", title: "一生所爱" },
    { url: "./music/吴雨霏 - 吴哥窟.mp3", artist: "吴雨霏", title: "吴哥窟" }
];

// ✅ 页面加载时渲染歌曲列表
document.addEventListener("DOMContentLoaded", () => {
    renderSongList();
    if (songs.length > 0) {
        loadTrack(currentTrackIndex);
    }
});

// 🎵 渲染歌曲列表
function renderSongList() {
    const songList = document.getElementById('songList');
    songList.innerHTML = songs
        .map(
            (song, index) =>
                `<li onclick="playTrack(${index})" class="${index === currentTrackIndex ? 'active' : ''}">${song.artist} - ${song.title}</li>`
        )
        .join('');
}

// 🎵 加载歌曲
function loadTrack(index) {
    const song = songs[index];
    audio.src = song.url;
    document.getElementById('artist').textContent = song.artist;
    document.getElementById('title').textContent = song.title;
}

// 🎵 播放/暂停
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playBtn').innerHTML = '►';
    } else {
        audio.play();
        document.getElementById('playBtn').innerHTML = '❚❚';
    }
    isPlaying = !isPlaying;
}

// 🎵 播放指定歌曲
function playTrack(index) {
    currentTrackIndex = index;
    loadTrack(index);
    audio.play();
    isPlaying = true;
    document.getElementById('playBtn').innerHTML = '❚❚';
    renderSongList();
}
