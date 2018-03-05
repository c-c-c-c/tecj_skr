＊こちらは、2017年9月生の卒業制作です。

＊フォルダ構成
ブラウザから呼ばれるものは、public配下に入っています。
public/index.html
public/handspinner.html
の２ページです。

＊local環境でご覧になる場合の注意
cross origin のブラウザエラーが出ますので、ローカルサーバーを立ち上げるか、chromeをターミナルから以下オプションをつけて実行することで正しく見ることができます。
sudo /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args -allow-file-access-from-files

*トップページの動画
こちらはyoutubeにアップしたものをiframeで読み込んでいるので、素材も納品します。
public/movie/tecj_hero_movie.mov

*git hub
c-c-c-c/tecj


——
# Usage
Install dependency packages.

```
npm install
```

That's it all. just hit bellow to build sass/js in `src/` directory.

```
npm run build
```

To watch file change.

```
npm run watch
```

