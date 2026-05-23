// Recipe data — primary recipe is スープカレー from the user's reference

window.RECIPE_SOUP_CURRY = {
  id: 'soup-curry',
  title: 'スープカレー',
  subtitle: '骨付き鶏もも肉でじっくり煮込む、芯まで温まる一皿',
  author: '橋本先生',
  date: '2026.2',
  servings: 5,
  time: { prep: '一晩', cook: '90分' },
  difficulty: '★★★',
  tags: ['汁物', 'スパイス', 'メイン', '作り置き'],
  category: 'メイン',
  note: '骨付き鶏もも肉 5本 1000gとして、1本230gが理想',
  rating: 4.8,
  reviews: 127,

  ingredients: [
    { group: '主材料', items: [
      { name: '恵那鶏 骨付きもも肉', amount: '5本（1本約300g）' },
      { name: '└ 水', amount: '750cc（モモ肉半量）', sub: true },
      { name: '└ 塩', amount: '22.5g（3%塩水）', sub: true },
      { name: '水', amount: '1ℓ' },
      { name: '昆布', amount: '10g' },
      { name: 'こめ油', amount: '20g' },
    ]},
    { group: 'ホールスパイス', items: [
      { name: 'クミンシード', amount: '5g' },
      { name: 'コリアンダーシード（砕く）', amount: '1.5g' },
      { name: 'フェネグリーク', amount: '1.5g' },
      { name: 'マスタードシード', amount: '2.5g' },
      { name: 'シナモンスティック', amount: '1本（2.5g）' },
    ]},
    { group: 'パウダースパイス', items: [
      { name: 'SBカレー粉', amount: '10g' },
      { name: 'チリパウダー', amount: '10g' },
    ]},
    { group: '香味野菜', items: [
      { name: 'にんにく', amount: '20g' },
      { name: '生姜', amount: '20g' },
      { name: '玉ねぎ', amount: '400g' },
    ]},
    { group: '煮込み調味料', items: [
      { name: 'あらごしトマト', amount: '1P（388g）' },
      { name: 'ナンプラー', amount: '30g' },
      { name: '本和香糖', amount: '20g' },
      { name: '粗塩', amount: '5g' },
    ]},
  ],

  prep: [
    '骨付き鶏もも肉は3%の塩水に浸し、一晩おく。水気を切り、オーブンシートを敷いた天板に並べ、250℃で15分焼く。',
    '1ℓの水に10gの昆布を浸し、極弱火＝60℃で60分程煮、昆布だしを取る。',
    'にんにくは皮をむいて芽を取り除き、みじん切りに。',
    '生姜は皮をこそげ落とし、みじん切りに。',
    '玉ねぎは、皮をむいて粗みじん切りに。',
  ],

  steps: [
    { title: 'ホールスパイスを炒める', body: '深鍋（ストウブラウンド24cm）にこめ油・ホールスパイスを入れて弱火でゆっくりと香りが出るまで炒める。', time: '5分', heat: '弱火' },
    { title: '香味野菜を加える', body: 'にんにく・生姜を加えて中火でゆっくりと、強い香りがまろやかになるまで炒める。', time: '3〜4分', heat: '中火' },
    { title: '玉ねぎをあめ色に', body: '玉ねぎを加えて強火にし、あめ色になるまでしっかりと炒める。', time: '15分', heat: '強火' },
    { title: 'パウダースパイス＋トマト', body: 'パウダースパイスを入れて軽く炒め、あらごしトマトを加え、軽く煮る。', time: '5分', heat: '中火' },
    { title: '出汁と鶏肉を加えて煮込む', body: '昆布出汁・煮込み調味料・焼き上がった骨付き鶏もも肉・肉汁と出汁昆布も加え、沸騰してから30分煮る。', time: '30分', heat: '沸騰→弱火' },
    { title: '一晩寝かせる', body: '火を止めて1〜2晩おく。', time: '1〜2晩', heat: 'オフ' },
    { title: '仕上げ', body: '再度火にかけて30分程、ほろりとお肉が柔らかくなるまで煮る。', time: '30分', heat: '弱火' },
  ],

  sides: {
    title: '付け合わせのお野菜',
    fried: ['牛蒡', '人参', 'かぼちゃ', 'ブロッコリー', '茄子', 'ししとう or ピーマン', 'パプリカ赤黄'],
    note: 'それぞれ下ごしらえし、素揚げする',
    egg: { name: '茹で卵', detail: '沸騰してから 6〜7分' },
  },

  rice: {
    title: '雑穀ごはん',
    items: [
      { name: '米', amount: '180g' },
      { name: '水', amount: '240cc' },
      { name: '雑穀', amount: '20g' },
    ],
    method: '米を洗米・浸水後、鍋に入れて水・雑穀を入れる。強火にかけ、沸騰してから5分程炊き、水分がなくなっていることを確認し、火を止めて5分〜蒸らす。',
  },

  plating: {
    title: '盛り付け',
    items: [
      { name: 'スープ（カレー）', amount: '200g' },
      { name: '雑穀ご飯', amount: '150g' },
      { name: '恵那鶏もも肉 1本', amount: '約300g' },
      { name: '付け合わせ野菜', amount: '約90g' },
    ],
    extras: ['お手拭き', 'スプーン', '手提げ袋'],
  },

  freezer: {
    title: '冷凍販売',
    items: [
      { name: '煮上がり鶏モモ肉', amount: '300g' },
      { name: 'スープカレー', amount: '300g' },
    ],
  },
};

window.RECIPE_LIST = [
  { id: 'soup-curry', title: 'スープカレー', kana: 'すーぷかれー', sub: '骨付き鶏もも肉でじっくり煮込む', tag: 'メイン', accent: 'shu', rating: 4.8, time: '90分＋一晩', author: '橋本先生', season: '冬', isNew: true, featured: true },
  { id: 'saba',       title: '鯖の味噌煮',       kana: 'さばのみそに',     sub: '生姜をきかせた、定番の煮付け',   tag: '魚',   accent: 'tea',  rating: 4.6, time: '25分', author: '橋本先生', season: '秋' },
  { id: 'nasu',       title: '焼き茄子の出汁びたし', kana: 'やきなすのだしびたし', sub: '昆布と削り節の一番だしで',    tag: '副菜', accent: 'moss', rating: 4.7, time: '20分＋冷やす', author: '橋本先生', season: '夏' },
  { id: 'tori',       title: '鶏団子と春菊の鍋',   kana: 'とりだんごのなべ',     sub: '寒い日に、生姜の効いた塩鍋',  tag: '鍋',   accent: 'sumi', rating: 4.9, time: '40分', author: '橋本先生', season: '冬' },
  { id: 'kakuni',     title: '豚の角煮',           kana: 'ぶたのかくに',     sub: '圧力鍋なしで、とろける食感',  tag: 'メイン', accent: 'shu',  rating: 4.5, time: '180分', author: '橋本先生', season: '通年' },
  { id: 'sansho',     title: '山椒の佃煮',         kana: 'さんしょうのつくだに', sub: '初夏の実山椒で、常備の一品', tag: '常備菜', accent: 'moss', rating: 4.4, time: '30分', author: '橋本先生', season: '初夏' },
  { id: 'oyakodon',   title: '親子丼',             kana: 'おやこどん',       sub: 'ふわとろ卵の、シンプル丼',    tag: '主食', accent: 'tea',  rating: 4.8, time: '15分', author: '橋本先生', season: '通年' },
  { id: 'goma',       title: '黒胡麻担々麺',       kana: 'くろごまたんたん',   sub: '芝麻醤たっぷり、痺れる一杯',  tag: '麺',   accent: 'sumi', rating: 4.7, time: '30分', author: '橋本先生', season: '通年' },
];
