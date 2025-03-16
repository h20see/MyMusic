const audio = new Audio();
audio.volume = 0.2; // 默认音量设置为 20%
let isPlaying = false;
let currentTrackIndex = 0;
let songs = [];
let playMode = 'loop'; // 默认模式为列表循环
let isMuted = false;

// 加载音乐目录
async function loadMusicDirectory() {
    try {
        const response = await fetch('./music.php'); // 使用相对路径
        songs = await response.json();
        renderSongList();
        if (songs.length > 0) {
            loadTrack(currentTrackIndex);
        }
    } catch (error) {
        console.error('Failed to load music directory:', error);
    }
}

// 渲染歌曲列表
function renderSongList() {
    const songList = document.getElementById('songList');
    songList.innerHTML = songs
        .map(
            (song, index) =>
                `<li onclick="playTrack(${index})" class="${index === currentTrackIndex ? 'active' : ''}">${song.artist} - ${song.title}</li>`
        )
        .join('');
}

// 加载指定歌曲
function loadTrack(index) {
    const song = songs[index];
    audio.src = song.url;
    document.getElementById('artist').textContent = song.artist;
    document.getElementById('title').textContent = song.title;
    loadCover();
}

// 加载随机封面图片
function loadCover() {
    const cover = document.getElementById('cover');
    const randomImage = `./assets/img/${Math.floor(Math.random() * 20) + 1}.jpg`;
    cover.style.backgroundImage = `url('${randomImage}')`;
}

// 播放指定歌曲
function playTrack(index) {
    currentTrackIndex = index;
    loadTrack(index); // 加载新歌曲
    audio.play(); // 直接播放
    isPlaying = true; // 更新播放状态
    document.getElementById('playBtn').innerHTML = '&#10074;&#10074;'; // 更新按钮图标
    renderSongList(); // 重新渲染播放列表
}

// 上一曲
function prevTrack() {
    if (playMode === 'shuffle') {
        currentTrackIndex = Math.floor(Math.random() * songs.length);
    } else if (playMode === 'single') {
        // 单曲循环，保持当前索引不变
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
    renderSongList(); // 更新播放列表
}

// 下一曲
function nextTrack() {
    if (playMode === 'shuffle') {
        currentTrackIndex = Math.floor(Math.random() * songs.length);
    } else if (playMode === 'single') {
        // 单曲循环，保持当前索引不变
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % songs.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
    renderSongList(); // 更新播放列表
}

// 播放/暂停
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playBtn').innerHTML = '&#9658;';
    } else {
        audio.play();
        document.getElementById('playBtn').innerHTML = '&#10074;&#10074;';
    }
    isPlaying = !isPlaying;
}

// 跳转进度
function seek(event) {
    const progressBar = document.querySelector('.progress__bar');
    const seekPosition = (event.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = seekPosition;
}

// 设置音量
function setVolume(volume) {
    audio.volume = volume;
    isMuted = volume === 0;
    updateVolumeIcon();
}

// 切换静音
function toggleMute() {
    isMuted = !isMuted;
    audio.volume = isMuted ? 0 : 1;
    document.getElementById('volume').value = isMuted ? 0 : 1;
    updateVolumeIcon();
}

// 更新音量图标
function updateVolumeIcon() {
    const icon = document.getElementById('volume-icon');
    if (isMuted) {
        icon.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
    } else if (audio.volume === 0) {
        icon.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
    } else {
        icon.setAttribute('d', 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z');
    }
}

// 设置播放模式
function setPlayMode(mode) {
    playMode = mode;
    document.getElementById('loopBtn').classList.remove('active');
    document.getElementById('shuffleBtn').classList.remove('active');
    document.getElementById('singleBtn').classList.remove('active');
    document.getElementById(`${mode}Btn`).classList.add('active');
}

// 更新进度条和时间
audio.addEventListener('timeupdate', () => {
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
    currentTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// 更新总时长
audio.addEventListener('loadedmetadata', () => {
    const duration = document.getElementById('duration');
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    duration.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// 处理歌曲播放结束事件
audio.addEventListener('ended', () => {
    if (playMode === 'loop') {
        // 列表循环：播放下一首
        currentTrackIndex = (currentTrackIndex + 1) % songs.length;
    } else if (playMode === 'shuffle') {
        // 随机播放：随机选择一首
        currentTrackIndex = Math.floor(Math.random() * songs.length);
    } else if (playMode === 'single') {
        // 单曲循环：重新播放当前歌曲
        currentTrackIndex = currentTrackIndex;
    }
    loadTrack(currentTrackIndex);
    audio.play();
    renderSongList(); // 更新播放列表
});

// 初始化加载音乐目录
loadMusicDirectory();

// 初始化音量滑块
document.getElementById('volume').value = 0.2; // 默认音量设置为 20%