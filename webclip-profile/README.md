# WebClip 描述文件（.mobileconfig）

## 文件说明
- `install.mobileconfig`：不内嵌图标，最省事。iOS 会使用默认图标或网页图标。
- `install_with_icon.mobileconfig`：可内嵌图标，但需要你把 PNG 图标转 Base64 后填入 `REPLACE_WITH_BASE64_PNG`。

## 必须修改的字段
把文件里的 URL 改成你实际部署后的网页地址（HTTPS 推荐），例如：
- `https://your-domain.com/webclip-site/`
- `https://your-subdomain.ngrok-free.dev/webclip-site/`

需要改的地方：
- `<key>URL</key>` 下的 `<string>https://REPLACE_ME.example.com/webclip-site/</string>`

## 发给客户的方式（推荐）
1. 把 `install.mobileconfig` 上传到 HTTPS 下载地址（可与网页同站点）
2. 让客户用 iPhone 的 Safari 打开下载链接
3. 弹窗允许下载描述文件
4. 设置 → 已下载描述文件 → 安装

## 常见问题
- 微信里点不开/下载不了：让客户复制链接到 Safari 打开。
- 提示“未验证”：属于未签名描述文件的正常提示，仍可安装（若客户环境禁止未签名 profile，则需要证书签名）。
