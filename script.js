/* ========================================
   コトバノ想いイロ ホームページ スクリプト
======================================== */

/* ========================================
   ヒーロースライダー
======================================== */
function initSlider() {
  const slides    = document.querySelectorAll('.slide');
  const dotsWrap  = document.getElementById('sliderDots');
  const prevBtn   = document.getElementById('sliderPrev');
  const nextBtn   = document.getElementById('sliderNext');
  if (!slides.length || !dotsWrap) return;

  let current   = 0;
  let timer     = null;
  const INTERVAL = 5000; /* 5秒ごとに自動スライド */

  /* ドットを生成 */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    dot.setAttribute('aria-label', `スライド ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.slider-dot');

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  /* タッチスワイプ対応 */
  let touchStartX = 0;
  const slider = document.getElementById('heroSlider');
  slider?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider?.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  });

  /* 自動スライド開始 */
  resetTimer();
}

/* ========================================
   ハンバーガーメニュー（モバイル）
======================================== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  /* メニュー項目クリックで閉じる */
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* ========================================
   お問い合わせフォーム（送信処理）
======================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    /* 実際の送信処理はサーバーサイドで実装 */
    alert('お問い合わせありがとうございます！\n内容を確認の上、ご連絡いたします。');
    form.reset();
  });
}

/* ========================================
   チャットボット（Claude API）
======================================== */

/* FAQデータ（Claude APIへのシステムプロンプトで使用） */
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
   - 初めての方に最適

2. 趣味コース：33,000円（10作品）
   - 自分用に飾ったり、友人へのプレゼントなど趣味として楽しめる
   - 10作品を通じてしっかり技術を習得

3. インストラクターコース：55,000円（10作品）
   - 他の方に教える講座を開いたり、作品を販売するなど講師活動ができる
   - 趣味コースとの違いは「教える・売る」など講師としての活動が可能な点

【営業時間・お申し込み】
- お申し込み後に日時を個別相談して決定します
- まずはお問い合わせフォームからご連絡ください

【よくある質問と回答】
Q: 初心者でもできますか？
A: できます！筆ペンの持ち方、線の書き方、アート風に書くコツ、ラメの塗り方など、初めての方にも丁寧に寄り添って教えます。体験レッスンでは90分で1作品仕上げることができますよ。

Q: 趣味コースとインストラクターコースの違いは何ですか？
A: 趣味コースは、できた作品を自分用に飾ったり、お友達へのプレゼントとして楽しめるコースです。インストラクターコースは、他の方に教える講座を開いたり、自分の作品を販売するなど、講師活動ができるコースです。

Q: 料金を教えてください。
A: 体験レッスン「咲」コースが3,500円、趣味コース（10作品）が33,000円、インストラクターコース（10作品）が55,000円です。まずは体験レッスンからお気軽にどうぞ！

Q: 体験レッスンはありますか？
A: はい！「咲」体験コース（3,500円）をご用意しています。約90分で1作品仕上げられます。道具不要・入会不要でご参加いただけます。

Q: 道具は何が必要ですか？
A: 体験レッスンは道具不要で参加いただけます。正式入会後は必要な道具リストをお送りします。

Q: どこで受講できますか？
A: 完全オンライン（Zoom）での開催です。自宅から全国どこでもご参加いただけます。

回答は2〜4文程度で簡潔に。絵文字を1〜2個使って親しみやすくしてください。
答えられない場合は「詳しくはお問い合わせフォームからご連絡ください😊」と案内してください。`;

/* APIキーの設定（実際の運用では環境変数やバックエンドで管理） */
const CLAUDE_API_KEY = 'YOUR_API_KEY_HERE';

/* 会話履歴 */
let conversationHistory = [];

/* チャットUIの初期化 */
function initChat() {
  const toggle  = document.getElementById('chatToggle');
  const window_ = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const input   = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const badge   = document.getElementById('chatBadge');

  if (!toggle || !window_) return;

  /* ウィンドウ開閉 */
  toggle.addEventListener('click', () => {
    const isOpen = window_.classList.toggle('open');
    toggle.querySelector('.open-icon').style.display  = isOpen ? 'none'  : 'inline';
    toggle.querySelector('.close-icon').style.display = isOpen ? 'inline': 'none';
    if (isOpen && badge) badge.style.display = 'none';
  });

  closeBtn?.addEventListener('click', () => {
    window_.classList.remove('open');
    toggle.querySelector('.open-icon').style.display  = 'inline';
    toggle.querySelector('.close-icon').style.display = 'none';
  });

  /* クイック返信ボタン */
  document.querySelectorAll('.quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.dataset.q;
      sendMessage(question);
      /* ボタン群を非表示 */
      document.getElementById('quickReplies')?.remove();
    });
  });

  /* テキスト送信 */
  sendBtn?.addEventListener('click', () => handleSend());
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    document.getElementById('quickReplies')?.remove();
    sendMessage(text);
  }
}

/* メッセージ送信・表示 */
async function sendMessage(text) {
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  const typingEl = showTyping();

  try {
    const reply = await callClaudeAPI(conversationHistory);
    removeTyping(typingEl);
    appendMessage('bot', reply);
    conversationHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    removeTyping(typingEl);
    appendMessage('bot', 'すみません、エラーが発生しました。お問い合わせフォームからご連絡ください😊');
    console.error('Claude API エラー:', err);
  }
}

/* Claude APIの呼び出し */
async function callClaudeAPI(history) {
  /* APIキー未設定の場合はFAQモードで返答 */
  if (CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    return getFallbackAnswer(history[history.length - 1].content);
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: history,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

/* APIキー未設定時のフォールバック回答 */
function getFallbackAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes('料金') || q.includes('いくら') || q.includes('価格')) {
    return '体験レッスン「咲」コースが3,500円、趣味コース（10作品）が33,000円、インストラクターコース（10作品）が55,000円です💰 まずは体験レッスンからお気軽にどうぞ😊';
  }
  if (q.includes('コース') || q.includes('違い') || q.includes('趣味') || q.includes('インストラクター')) {
    return '趣味コースは作品を自分用や贈り物として楽しめるコース、インストラクターコースは講座を開いたり作品を販売するなど講師活動ができるコースです✦ どちらも10作品のカリキュラムです😊';
  }
  if (q.includes('体験') || q.includes('試し') || q.includes('初めて')) {
    return '「咲」体験コース（3,500円）をご用意しています✨ 約90分で1作品仕上げられます。道具不要・入会不要でお気軽にご参加ください😊';
  }
  if (q.includes('道具') || q.includes('準備') || q.includes('必要')) {
    return '体験レッスンは道具不要で参加いただけます✦ 正式入会後に必要な道具リストをお送りします。ご不明な点はお問い合わせください😊';
  }
  if (q.includes('オンライン') || q.includes('zoom') || q.includes('場所')) {
    return '完全オンライン（Zoom）で開催しています🌐 自宅から参加できるので、全国どこからでもOKです！スマホでの参加も可能ですよ😊';
  }
  if (q.includes('初心者') || q.includes('未経験') || q.includes('始め')) {
    return '初心者の方も大歓迎です✦ 筆ペンの持ち方から丁寧にご指導しますので安心してご参加ください😊 体験レッスンでは90分で1作品仕上げられますよ！';
  }

  return 'ご質問ありがとうございます😊 詳しくは下のお問い合わせフォームからご連絡ください。丁寧にご案内いたします✦';
}

/* ユーザー／ボットメッセージをDOMに追加 */
function appendMessage(type, text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const wrapper = document.createElement('div');
  wrapper.classList.add('message', type === 'bot' ? 'bot-message' : 'user-message');

  if (type === 'bot') {
    wrapper.innerHTML = `
      <span class="message-avatar">✦</span>
      <div class="message-bubble">${escapeHtml(text)}</div>
    `;
  } else {
    wrapper.innerHTML = `<div class="message-bubble">${escapeHtml(text)}</div>`;
  }

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

/* タイピングインジケーターの表示・非表示 */
function showTyping() {
  const container = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.classList.add('message', 'bot-message', 'typing-indicator');
  el.innerHTML = `
    <span class="message-avatar">✦</span>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return el;
}

function removeTyping(el) {
  el?.remove();
}

/* XSS対策のエスケープ */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

/* ========================================
   スクロールアニメーション
======================================== */
function initScrollAnimation() {
  const targets = document.querySelectorAll(
    '.course-card, .flow-step, .about-content, .section-header'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* 要素が見えたらフェードイン */
document.addEventListener('DOMContentLoaded', () => {
  /* visibleクラスのスタイルを動的に追加 */
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  initSlider();
  initHamburger();
  initContactForm();
  initChat();
  initScrollAnimation();
});
