// ═══════════════════════════════════════════
//  TEXT GENERATOR — Multi-lingual word lists
// ═══════════════════════════════════════════

const DATA = {
  en: {
    simple: {
      words: ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"],
      sentences: ["the quick brown fox jumps over the lazy dog.", "it is a good day to type fast.", "he is a good boy.", "she likes to play in the park."],
      paragraphs: ["The quick brown fox jumps over the lazy dog. It is a good day to type fast. He is a good boy and she likes to play in the park.", "Many people think that learning to type is hard, but it just takes practice."]
    },
    intermediate: {
      words: ["through", "between", "although", "against", "without", "however", "development", "information", "government", "important", "different", "because", "another", "country", "program", "question"],
      sentences: ["The quick brown fox jumps over the lazy dog while the slow turtle watches.", "Typing quickly requires muscle memory and consistent daily practice.", "Technology has changed the way we communicate and work."],
      paragraphs: ["Technology has changed the way we communicate and work. Typing quickly requires muscle memory and consistent daily practice. The quick brown fox jumps over the lazy dog while the slow turtle watches.", "In recent years, the development of new software has accelerated. However, it remains important to understand the basics."]
    },
    expert: {
      words: ["simultaneously", "characteristically", "unprecedented", "bureaucracy", "philosophical", "circumstances", "approximately", "enthusiastic", "sophisticated"],
      sentences: ["However, despite the unprecedented circumstances, the team managed to deliver the sophisticated software simultaneously.", "The philosophical debates surrounding modern bureaucracy are characteristically complex and multifaceted.", "Approximately eighty percent of the enthusiastic participants agreed with the proposal."],
      paragraphs: ["The philosophical debates surrounding modern bureaucracy are characteristically complex and multifaceted. Approximately eighty percent of the enthusiastic participants agreed with the proposal. However, despite the unprecedented circumstances, the team managed to deliver the sophisticated software simultaneously.", "In a sophisticated environment, the bureaucracy can act simultaneously as a shield and a sword. It is unprecedented how circumstances align."]
    }
  },
  ur: {
    simple: {
      words: ["ہے", "کہ", "کے", "میں", "اور", "کی", "یہ", "تو", "سے", "بھی", "کو", "نہیں", "جو", "تھا", "پر", "کر", "کیا", "ہیں", "ایک", "ہو", "وہ", "اس", "نے", "لیے", "ان", "تھے", "ہی", "کرنے", "کوئی", "ساتھ"],
      sentences: ["یہ ایک کتاب ہے۔", "وہ سکول جاتا ہے۔", "میں نے کھانا کھا لیا ہے۔", "علی اچھا لڑکا ہے۔"],
      paragraphs: ["یہ ایک کتاب ہے۔ وہ سکول جاتا ہے۔ میں نے کھانا کھا لیا ہے۔ علی اچھا لڑکا ہے۔", "آج موسم بہت اچھا ہے۔ ہم سب مل کر پارک جائیں گے۔"]
    },
    intermediate: {
      words: ["استعمال", "پاکستان", "معلومات", "حکومت", "پروگرام", "ضروری", "مختلف", "کیونکہ", "دوسرا", "طریقہ", "مسئلہ", "تعلیم"],
      sentences: ["پاکستان کا دارالحکومت اسلام آباد ہے۔", "ہمیں اپنی تعلیم پر توجہ دینی چاہیے۔", "یہ ایک بہت اہم مسئلہ ہے جس کا حل ضروری ہے۔"],
      paragraphs: ["پاکستان کا دارالحکومت اسلام آباد ہے۔ ہمیں اپنی تعلیم پر توجہ دینی چاہیے۔ یہ ایک بہت اہم مسئلہ ہے جس کا حل ضروری ہے۔", "انٹرنیٹ کے استعمال سے معلومات تک رسائی آسان ہو گئی ہے۔ مختلف موضوعات پر تحقیق کرنا اب مشکل نہیں رہا۔"]
    },
    expert: {
      words: ["خصوصیات", "ترقیاتی", "معیشت", "سائنسدانوں", "جمہوریت", "استحکام", "ٹیکنالوجی", "ماحولیاتی", "بین الاقوامی"],
      sentences: ["بین الاقوامی سطح پر ماحولیاتی تبدیلیوں پر تشویش کا اظہار کیا جا رہا ہے۔", "جمہوریت کے استحکام کے لیے ضروری ہے کہ عوام کو ان کے حقوق ملیں۔", "سائنسدانوں نے نئی ٹیکنالوجی کی مدد سے کئی پیچیدہ مسائل حل کیے ہیں۔"],
      paragraphs: ["بین الاقوامی سطح پر ماحولیاتی تبدیلیوں پر تشویش کا اظہار کیا جا رہا ہے۔ سائنسدانوں نے نئی ٹیکنالوجی کی مدد سے کئی پیچیدہ مسائل حل کیے ہیں۔ جمہوریت کے استحکام کے لیے ضروری ہے کہ عوام کو ان کے حقوق ملیں۔", "ملکی معیشت کو بہتر بنانے کے لیے ترقیاتی منصوبوں پر تیزی سے عمل درآمد کی ضرورت ہے۔ اس کے ساتھ ساتھ اندرونی و بیرونی استحکام بھی لازمی ہے۔"]
    }
  },
  sd: {
    simple: {
      words: ["آهي", "ته", "جو", "۾", "۽", "جي", "اهو", "آهن", "سان", "به", "کي", "نه", "جيڪو", "هو", "تي", "ڪري", "ڇا", "هڪ", "ٿي", "ان", "هن", "لاءِ", "اهي", "ڪيو", "ڪو"],
      sentences: ["هي هڪ ڪتاب آهي.", "هو اسڪول وڃي ٿو.", "مون ماني کاڌي آهي.", "علي سٺو ڇوڪرو آهي."],
      paragraphs: ["هي هڪ ڪتاب آهي. هو اسڪول وڃي ٿو. مون ماني کاڌي آهي. علي سٺو ڇوڪرو آهي.", "اڄ موسم تمام سٺي آهي. اسان سڀ ملي پارڪ وينداسين."]
    },
    intermediate: {
      words: ["استعمال", "پاڪستان", "معلومات", "حڪومت", "پروگرام", "ضروري", "مختلف", "ڇاڪاڻ", "ٻيو", "طريقو", "مسئلو", "تعليم"],
      sentences: ["پاڪستان جو گاديءَ جو هنڌ اسلام آباد آهي.", "اسان کي پنهنجي تعلیم تي ڌيان ڏيڻ گهرجي.", "هي هڪ تمام اهم مسئلو آهي جنهن جو حل ضروري آهي."],
      paragraphs: ["پاڪستان جو گاديءَ جو هنڌ اسلام آباد آهي. اسان کي پنهنجي تعلیم تي ڌيان ڏيڻ گهرجي. هي هڪ تمام اهم مسئلو آهي جنهن جو حل ضروري آهي.", "انٽرنيٽ جي استعمال سان معلومات تائين رسائي آسان ٿي وئي آهي."]
    },
    expert: {
      words: ["خصوصيتون", "ترقياتي", "معيشت", "سائنسدانن", "جمهوريت", "استحڪام", "ٽيڪنالاجي", "ماحولياتي", "بين الاقوامي"],
      sentences: ["بين الاقوامي سطح تي ماحولياتي تبديلين تي ڳڻتي جو اظهار ڪيو پيو وڃي.", "جمهوريت جي استحڪام لاءِ ضروري آهي ته عوام کي سندن حق ملن.", "سائنسدانن نئين ٽيڪنالاجي جي مدد سان ڪيترائي پيچيده مسئلا حل ڪيا آهن."],
      paragraphs: ["بين الاقوامي سطح تي ماحولياتي تبديلين تي ڳڻتي جو اظهار ڪيو پيو وڃي. سائنسدانن نئين ٽيڪنالاجي جي مدد سان ڪيترائي پيچيده مسئلا حل ڪيا آهن.", "ملڪي معيشت کي بهتر بڻائڻ لاءِ ترقياتي منصوبن تي تيزي سان عمل ڪرڻ جي ضرورت آهي."]
    }
  },
  ar: {
    simple: {
      words: ["في", "من", "على", "إلى", "أن", "التي", "عن", "هذا", "كان", "مع", "الذي", "كل", "لا", "أو", "هو", "ما", "هذه", "كما", "وقد", "لم", "ذلك", "بين", "بعد", "تم", "إن"],
      sentences: ["هذا كتاب.", "هو يذهب إلى المدرسة.", "لقد أكلت الطعام.", "علي ولد جيد."],
      paragraphs: ["هذا كتاب. هو يذهب إلى المدرسة. لقد أكلت الطعام. علي ولد جيد.", "الطقس جميل جدا اليوم. سنذهب جميعا إلى الحديقة معًا."]
    },
    intermediate: {
      words: ["استخدام", "معلومات", "الحكومة", "برنامج", "ضروري", "مختلف", "لأن", "آخر", "طريقة", "مشكلة", "التعليم", "المجتمع"],
      sentences: ["يجب علينا التركيز على تعليمنا بشكل أفضل.", "هذه مشكلة مهمة جدا ويجب حلها.", "التعليم هو أساس تطور المجتمع وتقدمه."],
      paragraphs: ["يجب علينا التركيز على تعليمنا بشكل أفضل. هذه مشكلة مهمة جدا ويجب حلها. التعليم هو أساس تطور المجتمع وتقدمه.", "مع استخدام الإنترنت، أصبح الوصول إلى المعلومات أسهل بكثير من قبل."]
    },
    expert: {
      words: ["التكنولوجيا", "الديمقراطية", "الاستقرار", "الاقتصاد", "الدولية", "البيئية", "العلماء", "خصائص", "تطوير"],
      sentences: ["على المستوى الدولي يتم التعبير عن القلق إزاء التغيرات البيئية.", "من أجل استقرار الديمقراطية من الضروري أن يحصل الناس على حقوقهم.", "لقد حل العلماء العديد من المشاكل المعقدة بمساعدة التكنولوجيا الجديدة."],
      paragraphs: ["على المستوى الدولي يتم التعبير عن القلق إزاء التغيرات البيئية. لقد حل العلماء العديد من المشاكل المعقدة بمساعدة التكنولوجيا الجديدة. من أجل استقرار الديمقراطية من الضروري أن يحصل الناس على حقوقهم.", "لتحسين الاقتصاد الوطني، من الضروري التنفيذ السريع لمشاريع التنمية المستدامة."]
    }
  }
};

/**
 * Generate a typing test string based on configuration.
 * @param {string} lang 'en', 'ur', 'sd', 'ar'
 * @param {string} difficulty 'simple', 'intermediate', 'expert'
 * @param {string} type 'timed', 'fixed', 'words', 'paragraph', 'real'
 * @param {number} durationOrLength length requirement in words
 * @returns {string} The text
 */
export function generateExercise(lang, difficulty, type, durationOrLength) {
  const langData = DATA[lang] || DATA['en'];
  const diffData = langData[difficulty] || langData['simple'];

  let result = [];
  
  if (type === 'words' || type === 'timed' || type === 'fixed') {
    // We generate a lot of words for timed/fixed.
    const wordCount = durationOrLength || 60;
    const list = diffData.words;
    for (let i = 0; i < wordCount; i++) {
      result.push(list[Math.floor(Math.random() * list.length)]);
    }
    return result.join(' ');
  } else if (type === 'paragraph' || type === 'real') {
    // For paragraphs or real-world, we string together paragraphs/sentences.
    const list = diffData.paragraphs;
    // Repeat to ensure enough text
    for (let i = 0; i < 3; i++) {
      result.push(list[Math.floor(Math.random() * list.length)]);
    }
    return result.join(' ');
  }
  
  return result.join(' ');
}

// Fallback for backwards compatibility if needed elsewhere
export function generateText(lang, wordCount = 30) {
  return generateExercise(lang, 'simple', 'words', wordCount);
}
