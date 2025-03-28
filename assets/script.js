const audio = new Audio();
audio.volume = 0.2;
let isPlaying = false;
let currentTrackIndex = 0;
let songs = [];

// ✅ 从 `music.json` 获取歌曲列表
async function loadMusicDirectory() {
    try {
        const response = await fetch('./music.json'); // 读取 JSON
        songs = await response.json();
        renderSongList();
        if (songs.length > 0) {
            loadTrack(currentTrackIndex);
        }
    } catch (error) {
        console.error('加载音乐列表失败:', error);
    }
}

// 🎵 渲染歌曲列表
function renderSongList() {
    const songList = document.getElementById('songList');
    songList.innerHTML = songs
        .map((song, index) =>
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

// 🎵 播放指定歌曲
function playTrack(index) {
    currentTrackIndex = index;
    loadTrack(index);
    audio.play();
    isPlaying = true;
    document.getElementById('playBtn').innerHTML = '❚❚';
    renderSongList();
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

// ✅ 页面加载时执行
document.addEventListener("DOMContentLoaded", loadMusicDirectory);
