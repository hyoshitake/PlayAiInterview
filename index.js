// 基本的なExpressアプリケーションの設定
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.FRONTEND_PORT || 3000;
const { OpenAI } = require('openai');

// OpenAI APIクライアントの設定
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
});

// 静的ファイルの提供
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules')); // Font Awesome等のnode_modulesへのアクセスを許可
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.send('AI問診システムへようこそ！');
});

// 会話ページへのルーティング
app.get('/conversation', (req, res) => {
  res.sendFile(__dirname + '/public/conversation.html');
});

// OpenAI APIエンドポイント
app.post('/api/openai', async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || !Array.isArray(input) || input.length === 0) {
      return res.status(400).json({ error: '有効な入力メッセージが必要です' });
    }

    console.log('OpenAI APIリクエスト:', input);

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: input
    });

    const response = completion.choices[0].message.content;
    console.log('OpenAI API応答:', response);

    res.json({ response });
  } catch (error) {
    console.error('OpenAI APIエラー:', error);
    res.status(500).json({ error: 'APIリクエスト中にエラーが発生しました', details: error.message });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
