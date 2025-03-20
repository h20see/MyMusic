<?php
// 设定模式：'local' 或 'remote'
$mode = 'local';

$songs = [];

if ($mode === 'local') {
    // 模式 1: 读取本地目录下的音频文件（包括子文件夹）
    $musicDir = './music';
    
    function scanMusicDir($dir) {
        $songs = [];
        $files = scandir($dir);
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            
            $fullPath = "$dir/$file";
            
            if (is_dir($fullPath)) {
                // 递归扫描子文件夹
                $subSongs = scanMusicDir($fullPath);
                $songs = array_merge($songs, $subSongs);
            } elseif (preg_match('/\.(mp3|flac|wav|ogg)$/i', $file)) {
                $fileName = pathinfo($file, PATHINFO_FILENAME);
                list($artist, $title) = explode(' - ', $fileName, 2);
                $songs[] = [
                    'url' => $fullPath,
                    'artist' => $artist,
                    'title' => $title
                ];
            }
        }
        return $songs;
    }

    if (is_dir($musicDir)) {
        $songs = scanMusicDir($musicDir);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Local music directory not found']);
        exit;
    }
} elseif ($mode === 'remote') {
    // 模式 2: 读取远程直链地址
    $remoteUrls = [
        'https://localhost.com/卢冠廷 - 一生所爱.flac',
        'https://localhost.com/吴雨霏 - 吴哥窟.flac',
        'https://localhost.com/周杰伦 - 红尘客栈.mp3'
    ];

    foreach ($remoteUrls as $url) {
        $fileName = urldecode(pathinfo($url, PATHINFO_FILENAME));
        list($artist, $title) = explode(' - ', $fileName, 2);
        $songs[] = [
            'url' => $url,
            'artist' => $artist,
            'title' => $title
        ];
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid mode configured in the script.']);
    exit;
}

header('Content-Type: application/json');
echo json_encode($songs);
?>
