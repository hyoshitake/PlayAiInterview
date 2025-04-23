// 基本的なExpressアプリケーションの設定
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.FRONTEND_PORT || 3000;

// 静的ファイルの提供
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules')); // Font Awesome等のnode_modulesへのアクセスを許可
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.send('AI問診システムへようこそ！');
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
