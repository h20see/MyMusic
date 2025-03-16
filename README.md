# My Music - 我的歌单

**预览**
![pc](https://github.com/sunpma/MyMusic/blob/main/assets/1.jpg)
![move](https://github.com/sunpma/MyMusic/blob/main/assets/2.png)
<img align="right" width="720" src="https://github.com/sunpma/MyMusic/blob/main/assets/2.png"/>
移动端预览
[Demo 示例](https://suntl.com/other/music/)

**说明**
编辑 `music.php` 文件选择媒体文件加载方式 'local' 或 'remote'
方式一：
'local' - 加载 `music` 文件夹内媒体文件
方式二：
'remote' - 读取远程直链地址
```
    // 模式 2: 读取远程直链地址
    $remoteUrls = [
        'https://localhost.com/卢冠廷 - 一生所爱.flac',
        'https://localhost.com/吴雨霏 - 吴哥窟.flac',
        'https://localhost.com/周杰伦 - 红尘客栈.mp3'
    ];
```
