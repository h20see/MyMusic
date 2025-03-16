<?php
// 设定模式：'local' 或 'remote'
$mode = 'local'; // 修改此处以选择模式

$songs = [];

if ($mode === 'local') {
    // 模式 1: 读取本地目录下的音频文件
    $musicDir = './music'; // 使用相对路径
    if (is_dir($musicDir)) {
        $files = scandir($musicDir);
        foreach ($files as $file) {
            if (preg_match('/\.(mp3|flac|wav|ogg)$/i', $file)) {
                $fileName = pathinfo($file, PATHINFO_FILENAME);
                list($artist, $title) = explode(' - ', $fileName, 2);
                $songs[] = [
                    'url' => "$musicDir/$file",
                    'artist' => $artist,
                    'title' => $title
                ];
            }
        }
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
    // 无效模式（理论上不会触发，因为模式是硬编码的）
    http_response_code(500);
    echo json_encode(['error' => 'Invalid mode configured in the script.']);
    exit;
}

// 返回 JSON 格式的歌曲列表
header('Content-Type: application/json');
echo json_encode($songs);
?>