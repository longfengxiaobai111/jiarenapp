# WebClip 静态网页

## 作用
- 给 iOS WebClip（描述文件）打开的全屏网页。
- 三页展示：主页/业务办理/业务查询，点击热区切换。

## 图片路径
网页默认直接引用仓库根目录的 `tupian` 文件夹图片：
- `../tupian/76d489dcd1863f930a6fd6634f441229.jpg`（主页）
- `../tupian/bc404a42f842de3459e889b64c3f58ae.jpg`（业务办理）
- `../tupian/027dc8c6ece6c63575d88df56dcc8597.jpg`（业务查询）

部署时请保持 `webclip-site/` 与 `tupian/` 在同一个网站根目录下（同级目录），否则图片会 404。

## 常见微调
- 热区位置：`style.css` 里的 `.hotspot--handle` / `.hotspot--query`
- 裁剪（上下不露状态栏/底部条）：`style.css` 里的 `--img-y-home` / `--img-y-handle` / `--img-y-query`
- 覆盖文本位置：`style.css` 里的 `.overlay--*` 段落

