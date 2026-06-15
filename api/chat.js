/* ========================================
   Vercel Functions — Claude API中継
   APIキーはサーバー側の環境変数で管理
======================================== */
module.exports = async function handler(req, res) {
  /* CORSヘッダー */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'APIキーが設定されていません' });
  }

  const SYSTEM_PROMPT = `あなたは「コトバノ想いイロ」という筆文字×ラメアート教室のサポートスタッフです。
明るく親しみやすい丁寧な言葉遣いで、お客様の質問にお答えください。

【サービス名】
コトバノ想いイロ（筆文字×ラメアート教室）

【サービス内容】
- 形式：完全オンライン（Zoom使用）
- 筆文字とラメアートを融合させた唯一無二の作品づくりを学べる教室です
- 筆ペンの持ち方・線の書き方からラメの塗り方まで、初心者でも丁寧にサポートします
- 体験レッスンでは90分で1作品仕上げることができます

【コースと料金】
1. 「咲」体験コース：3,500円
   - 約90分で1作品仕上げられる体験レッスン
   - 道具不要で参加可能、入会不要

2. 趣味コース：33,000円（10作品）
   - 自分用に飾ったり、友人へのプレゼントなど趣味として楽しめる

3. インストラクターコース：55,000円（10作品）
   - 他の方に教える講座を開いたり、作品を販売するなど講師活動ができる

【よくある質問と回答】
Q: 初心者でもできますか？
A: できます！筆ペンの持ち方から丁寧にご指導します。体験レッスンでは90分で1作品仕上げられます。

Q: 趣味コースとインストラクターコースの違いは？
A: 趣味コースは作品を自分用や贈り物として楽しめるコース。インストラクターコースは講座を開いたり作品を販売するなど講師活動ができるコースです。

Q: 料金を教えてください。
A: 体験「咲」コース3,500円、趣味コース33,000円、インストラクターコース55,000円です。

回答は2〜4文程度で簡潔に。絵文字を1〜2個使って親しみやすくしてください。
答えられない場合は「詳しくはお問い合わせフォームからご連絡ください😊」と案内してください。`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.content[0].text });

  } catch (err) {
    console.error('Claude API エラー:', err);
    return res.status(500).json({ error: 'APIエラーが発生しました: ' + err.message });
  }
};
