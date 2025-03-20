# My Music - 我的歌单

**PC端预览**

![pc](https://github.com/sunpma/MyMusic/blob/main/assets/1.jpg)

**移动端预览**

<img src="https://github.com/sunpma/MyMusic/blob/main/assets/2.png" width="30%" height="30%">


**说明**

格式支持：`mp3``flac``wav``ogg`

专辑封面：`/assets/album`目录存放封面，命名与音频文件一致，支持`jpg``png``webp`格式

编辑`music.php`文件选择媒体文件加载方式`local`或`remote`

方式一：

`local` 加载`music`文件夹内媒体文件（包含子文件夹）

方式二：

`remote` 读取远程直链地址

```
    // 模式 2: 读取远程直链地址
    $remoteUrls = [
        'https://localhost.com/卢冠廷 - 一生所爱.flac',
        'https://localhost.com/吴雨霏 - 吴哥窟.flac',
        'https://localhost.com/周杰伦 - 红尘客栈.mp3'
    ];
```
