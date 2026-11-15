(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.PF_SPELLING = api;
})(this, function () {
  const TYPOS = {
    eys: 'eyes',
    eyse: 'eyes',
    eyees: 'eyes',
    har: 'hair',
    hiar: 'hair',
    smil: 'smile',
    gril: 'girl',
    grinning: 'grinning',
    womna: 'woman',
    womn: 'woman',
    beautifull: 'beautiful',
    beatiful: 'beautiful',
    beutiful: 'beautiful',
    beautful: 'beautiful',
    portait: 'portrait',
    portriat: 'portrait',
    potrait: 'portrait',
    portait: 'portrait',
    cinamatic: 'cinematic',
    cinemtic: 'cinematic',
    cinematc: 'cinematic',
    photorealstic: 'photorealistic',
    photorealitsic: 'photorealistic',
    photorealstic: 'photorealistic',
    detalied: 'detailed',
    detialed: 'detailed',
    detailled: 'detailed',
    detaild: 'detailed',
    maseterpiece: 'masterpiece',
    masterpeice: 'masterpiece',
    masterpice: 'masterpiece',
    heterocromia: 'heterochromia',
    heterochromiya: 'heterochromia',
    cybperunk: 'cyberpunk',
    cyberpuk: 'cyberpunk',
    cyberpnk: 'cyberpunk',
    cyperpunk: 'cyberpunk',
    ligthing: 'lighting',
    lightnig: 'lightning',
    lightening: 'lightning',
    bakground: 'background',
    backround: 'background',
    backgroud: 'background',
    backgound: 'background',
    seperate: 'separate',
    recieve: 'receive',
    occuring: 'occurring',
    teh: 'the',
    adn: 'and',
    taht: 'that',
    wiht: 'with',
    frmo: 'from',
    citie: 'city',
    citiy: 'city',
    forrest: 'forest',
    forrests: 'forests',
    closeup: 'close-up',
    dont: 'dont',
    haor: 'hair',
    vaginia: 'vagina',
    vigina: 'vagina',
    vagena: 'vagina',
    peniz: 'penis',
    pennis: 'penis',
    pusy: 'pussy',
    pussi: 'pussy',
    puussy: 'pussy',
    clitorus: 'clitoris',
    clitories: 'clitoris',
    dildoe: 'dildo',
    vibrater: 'vibrator',
    masterbation: 'masturbation',
    masterbating: 'masturbating',
    orgasam: 'orgasm',
    orgasim: 'orgasm',
    nippel: 'nipple',
    nippels: 'nipples',
    brest: 'breast',
    brests: 'breasts',
    lingere: 'lingerie',
    lingeri: 'lingerie',
    lingeire: 'lingerie',
    pantys: 'panties',
    dogystyle: 'doggystyle',
    doggiestyle: 'doggystyle',
    cunilingus: 'cunnilingus',
    cunnilingis: 'cunnilingus',
    felatio: 'fellatio',
    fuking: 'fucking',
    cuming: 'cumming',
    cremepie: 'creampie',
    scisoring: 'scissoring',
  };

  const WORDS = [
    'eyes', 'eye', 'hair', 'hairstyle', 'smile', 'smiling', 'grin', 'pose', 'posing',
    'lighting', 'light', 'lights', 'lightning', 'forest', 'forests', 'woods', 'city', 'cities',
    'cyberpunk', 'portrait', 'portraits', 'hand', 'hands', 'rain', 'night', 'beach', 'armor',
    'dress', 'flower', 'flowers', 'mountain', 'mountains', 'cafe', 'street', 'dragon', 'sword',
    'kimono', 'wolf', 'neon', 'temple', 'sky', 'ocean', 'sea', 'background', 'backdrop',
    'close', 'detailed', 'sharp', 'focus', 'upper', 'body', 'full', 'wide', 'shot', 'side',
    'rim', 'moody', 'atmosphere', 'cinematic', 'natural', 'photorealistic', 'beautiful', 'beauty',
    'woman', 'women', 'man', 'men', 'girl', 'girls', 'boy', 'boys', 'person', 'people',
    'face', 'skin', 'lips', 'eyelashes', 'iris', 'catchlights', 'heterochromia', 'glowing',
    'fantasy', 'dramatic', 'soft', 'window', 'golden', 'hour', 'mist', 'fog', 'path', 'trees',
    'autumn', 'moonlight', 'studio', 'blush', 'confident', 'laughing', 'subtle', 'standing',
    'sitting', 'leaning', 'looking', 'viewer', 'masterpiece', 'aesthetic', 'score', 'source',
    'anime', 'pony', 'realistic', 'photo', 'photograph', 'image', 'scene', 'camera', 'slow',
    'push', 'tracking', 'medium', 'handheld', 'angle', 'backlight', 'shadow', 'reflections',
    'wet', 'pavement', 'signage', 'alley', 'rooftop', 'skyline', 'crowd', 'market', 'intricate',
    'braid', 'bob', 'ribbon', 'wind', 'highlight', 'tears', 'sad', 'magic', 'blue', 'green',
    'red', 'black', 'white', 'silver', 'blonde', 'brown', 'pink', 'purple', 'orange', 'yellow',
    'gold', 'short', 'long', 'messy', 'shiny', 'dynamic', 'action', 'relaxed', 'shoulder',
    'perspective', 'depth', 'field', 'bokeh', 'simple', 'blurred', 'nature', 'gradient',
    'outdoors', 'indoors', 'sunlit', 'dense', 'clearing', 'dark', 'falling', 'leaves',
    'futuristic', 'steam', 'lanterns', 'subject', 'expression', 'clothing', 'outfit', 'shirt',
    'skirt', 'jacket', 'coat', 'hat', 'gloves', 'boots', 'shoes', 'walking', 'running',
    'kneeling', 'lying', 'room', 'from', 'with', 'and', 'the', 'that', 'this', 'her', 'his',
    'she', 'hair', 'flowing', 'sparkling', 'extreme', 'macro', 'shallow', 'color', 'colour',
    'highly', 'fine', 'detail', 'quality', 'best', 'very', 'looking', 'upper', 'solo',
    'character', 'freckles', 'ear', 'ears', 'nose', 'mouth', 'teeth', 'closed', 'open',
    'warm', 'cool', 'low', 'high', 'front', 'back', 'behind', 'over', 'under', 'into',
    'street', 'alley', 'market', 'crowd', 'rainy', 'night', 'quiet', 'calm', 'rich',
    'surface', 'environment', 'clear', 'air', 'view', 'corner', 'overhead', 'vast', 'scale',
    'establishing', 'drift', 'orbit', 'tilt', 'dolly', 'steady', 'subtle', 'motion', 'beat',
    'five', 'second', 'shot', 'shots', 'lens', 'focus', 'sharp', 'crisp', 'natural',
    'window', 'practical', 'late', 'afternoon', 'morning', 'evening', 'sunset', 'sunrise',
    'holding', 'wearing', 'standing', 'sitting', 'walking', 'looking', 'smiling', 'woman',
    'silver', 'platinum', 'auburn', 'crimson', 'scarlet', 'emerald', 'violet', 'azure',
    'armor', 'armour', 'dress', 'gown', 'robe', 'cloak', 'cape', 'scarf', 'jewelry',
    'necklace', 'earrings', 'tattoo', 'tattoos', 'muscle', 'slim', 'tall', 'petite',
    'adult', 'portrait', 'landscape', 'vertical', 'cinematic', 'photoreal', 'anime',
    'illustration', 'painted', 'painterly', 'digital', 'render', 'rendering', 'octane',
    'unreal', 'film', 'grain', 'bokeh', 'dof', 'foreground', 'middleground', 'background',
    'curly', 'wavy', 'bangs', 'ponytail', 'twintails', 'braided', 'silky', 'glossy',
    'eyeliner', 'makeup', 'lipstick', 'elegant', 'mysterious', 'serene', 'intense',
    'gentle', 'fierce', 'sunlight', 'volumetric', 'haze', 'leather', 'silk', 'lace',
    'velvet', 'denim', 'helmet', 'crown', 'shield', 'wings', 'horns', 'tail', 'scales',
    'feathers', 'claws', 'desert', 'castle', 'shrine', 'storm', 'thunder', 'sunset',
    'sunrise', 'dawn', 'dusk', 'spring', 'summer', 'winter', 'cherry', 'blossom',
    'petals', 'garden', 'meadow', 'river', 'lake', 'waterfall', 'bridge', 'classroom',
    'library', 'bedroom', 'kitchen', 'throne', 'palace', 'ruins', 'lantern', 'candle',
    'firelight', 'embers', 'smoke', 'dust', 'particles', 'wink', 'gaze', 'profile',
    'seductive', 'confident', 'freckled', 'porcelain', 'sunlit', 'overcast', 'foggy',
    'misty', 'rainy', 'snowy', 'windy', 'looking', 'sparkling', 'detailed', 'beautiful',
    'stealth', 'masturbating', 'masturbation', 'discreet', 'discreetly', 'fingering',
    'clothed', 'clothes', 'thigh', 'thighs', 'climax', 'orgasm', 'stroking', 'tabletop', 'waist',
    'legs', 'windows', 'call', 'place', 'adults',
    'nipple', 'nipples', 'hips', 'hip', 'moles', 'mole', 'piercings', 'piercing',
    'scars', 'scar', 'birthmarks', 'birthmark', 'stomach', 'shoulders', 'navel',
    'dimples', 'dimple', 'pubic', 'cheeks', 'cheek', 'thick', 'toned', 'narrow',
    'flat', 'broad', 'trimmed', 'star', 'flag',
  ];

  const KEEP = [
    'angel', 'angle', 'form', 'from', 'mana', 'rose', 'pale', 'male', 'tale', 'care',
    'case', 'cast', 'last', 'fast', 'fact', 'band', 'land', 'sand', 'kind', 'mind',
    'find', 'soul', 'role', 'bark', 'wind', 'note', 'nose', 'hand', 'then', 'than',
    'them', 'they', 'this', 'that', 'with', 'have', 'were', 'been', 'what', 'when',
    'your', 'just', 'only', 'over', 'into', 'also', 'very', 'back', 'open', 'will',
    'want', 'here', 'home', 'well', 'make', 'made', 'come', 'came', 'take', 'like',
    'look', 'down', 'away', 'even', 'much', 'many', 'most', 'more', 'less', 'both',
    'does', 'done', 'going', 'other', 'these', 'those', 'about', 'which', 'would',
    'could', 'should', 'where', 'while', 'after', 'before', 'again', 'still', 'never',
    'first', 'water', 'right', 'might', 'small', 'large', 'great', 'young', 'left',
    'side', 'their', 'there', 'three', 'under', 'each', 'some', 'such', 'been',
    'post', 'shop', 'hail', 'cost', 'wood', 'mood', 'talk', 'gate', 'hard',
    'hare', 'desk', 'show',
    'slime', 'kemono', 'scalie', 'bear', 'shark', 'elephant', 'moth', 'duck', 'reindeer',
    'eladrin', 'shadar', 'duergar', 'svirfneblin', 'firbolg', 'goliath', 'bugbear', 'hobgoblin', 'gnoll',
    'tabaxi', 'leonin', 'harengon', 'aarakocra', 'kenku', 'owlin', 'tortle', 'locathah', 'grung', 'loxodon',
    'catfolk', 'foxfolk', 'wolffolk', 'serpentfolk', 'birdfolk', 'ratfolk', 'ravenfolk', 'lizardfolk', 'dragonborn',
    'yuan', 'medusa', 'gorgon', 'drider', 'rakshasa', 'triton', 'merfolk', 'cecaelia', 'selkie', 'undine', 'nereid',
    'hamadryad', 'oread', 'sylph', 'faun', 'changeling', 'genasi', 'ifrit', 'djinn', 'marid', 'efreet',
    'cambion', 'nephilim', 'valkyrie', 'dhampir', 'revenant', 'banshee', 'dullahan', 'jiangshi', 'tengu',
    'nekomata', 'kirin', 'alraune', 'onna', 'myconid', 'plasmoid', 'warforged', 'kalashtar', 'illithid',
    'githyanki', 'githzerai', 'vedalken', 'jotun', 'cyclops', 'ettin', 'tiefling', 'aasimar', 'kitsune',
    'kobold', 'drow', 'lamia', 'naga', 'succubus', 'incubus', 'golem', 'flayer', 'kreen', 'scylla', 'sphinx',
    'cleaning', 'clean', 'leaning', 'leans', 'lies', 'moist', 'anima', 'hazel', 'helmut', 'overbust', 'beta',
    'curvy', 'latex', 'grinding', 'grind', 'moaning', 'moan', 'moans', 'striking', 'setting',
  ];

  const EXPLICIT = [
    'pussy', 'pussies', 'vagina', 'vaginas', 'vaginal', 'penis', 'penises', 'clit', 'clits',
    'clitoris', 'clitoral', 'dildo', 'dildos', 'vibrator', 'vibrators', 'nude', 'nudes', 'naked',
    'topless', 'bottomless', 'anal', 'anus', 'oral', 'fuck', 'fucks', 'fucked', 'fucking',
    'cock', 'cocks', 'boob', 'boobs', 'tits', 'nipple', 'nipples', 'breast', 'breasts',
    'areola', 'areolas', 'areolae', 'labia', 'vulva', 'cleavage', 'lingerie', 'panties', 'panty',
    'thong', 'thongs', 'orgasm', 'orgasms', 'orgasming', 'masturbation', 'masturbating',
    'groaning', 'panting', 'thrusting', 'thrust', 'thrusts', 'penetration', 'penetrating',
    'fingering', 'scissoring', 'tribadism', 'cunnilingus', 'fellatio', 'doggystyle', 'missionary',
    'cowgirl', 'spooning', 'paizuri', 'facesitting', 'strapon', 'handjob', 'blowjob', 'deepthroat',
    'pegging', 'creampie', 'cumshot', 'cumming', 'squirting', 'squirt', 'squirts', 'semen', 'precum',
    'saliva', 'sucking', 'licking', 'stroking', 'spanking', 'bondage', 'shibari', 'gagged',
    'horny', 'erotic', 'explicit', 'nsfw', 'intercourse', 'futanari', 'hentai', 'ahegao',
    'faceless', 'hetero', 'yuri', 'erect', 'erection', 'foreskin', 'testicles', 'testicle',
    'scrotum', 'shaft', 'glans', 'asshole', 'butthole', 'buttplug', 'plugs', 'riding', 'spreading',
    'inserting', 'insertion', 'groping', 'dripping', 'soaked', 'afterglow', 'lactation',
    'impregnation', 'bukkake', 'gangbang', 'threesome', 'lesbian', 'ecchi', 'yaoi', 'blindfold',
    'tentacle', 'tentacles', 'rimming', 'titfuck', 'titjob', 'footjob', 'boobjob', 'prone',
    'obscured', 'kneels', 'climaxing',
  ];

  const NOT_A_TARGET = new Set([
    'from', 'with', 'that', 'this', 'them', 'they', 'have', 'were', 'been', 'your',
    'just', 'only', 'over', 'into', 'also', 'very', 'back', 'open', 'then', 'than',
    'what', 'when', 'some', 'such', 'will', 'want', 'here', 'home', 'well', 'make',
    'made', 'come', 'came', 'take', 'like', 'look', 'down', 'away', 'even', 'much',
    'many', 'most', 'more', 'less', 'both', 'does', 'done', 'going', 'other', 'these',
    'those', 'about', 'which', 'would', 'could', 'should', 'where', 'while', 'after',
    'before', 'again', 'still', 'never', 'first', 'water', 'right', 'might', 'small',
    'large', 'great', 'young', 'left', 'side', 'their', 'there', 'three', 'under',
    'each', 'form', 'mana', 'pale', 'male', 'tale', 'care', 'case', 'cast', 'last',
    'fast', 'fact', 'band', 'land', 'sand', 'kind', 'mind', 'find', 'soul', 'role',
    'bark', 'note', 'wind', 'post', 'shop', 'hail', 'cost', 'wood', 'mood',
    'talk', 'gate', 'hard', 'hare', 'desk', 'show',
    'slime', 'kemono', 'scalie', 'bear', 'shark', 'elephant', 'moth', 'duck', 'reindeer',
    'eladrin', 'shadar', 'duergar', 'svirfneblin', 'firbolg', 'goliath', 'bugbear', 'hobgoblin', 'gnoll',
    'tabaxi', 'leonin', 'harengon', 'aarakocra', 'kenku', 'owlin', 'tortle', 'locathah', 'grung', 'loxodon',
    'catfolk', 'foxfolk', 'wolffolk', 'serpentfolk', 'birdfolk', 'ratfolk', 'ravenfolk', 'lizardfolk', 'dragonborn',
    'yuan', 'medusa', 'gorgon', 'drider', 'rakshasa', 'triton', 'merfolk', 'cecaelia', 'selkie', 'undine', 'nereid',
    'hamadryad', 'oread', 'sylph', 'faun', 'changeling', 'genasi', 'ifrit', 'djinn', 'marid', 'efreet',
    'cambion', 'nephilim', 'valkyrie', 'dhampir', 'revenant', 'banshee', 'dullahan', 'jiangshi', 'tengu',
    'nekomata', 'kirin', 'alraune', 'onna', 'myconid', 'plasmoid', 'warforged', 'kalashtar', 'illithid',
    'githyanki', 'githzerai', 'vedalken', 'jotun', 'cyclops', 'ettin', 'tiefling', 'aasimar', 'kitsune',
    'kobold', 'drow', 'lamia', 'naga', 'succubus', 'incubus', 'golem', 'flayer', 'kreen', 'scylla', 'sphinx',
  ]);

  const LEXICON = new Set(WORDS.concat(KEEP, EXPLICIT).map(function (word) { return word.toLowerCase(); }));
  Object.keys(TYPOS).forEach(function (key) { LEXICON.add(String(TYPOS[key]).toLowerCase()); });

  const BY_LETTER = {};
  LEXICON.forEach(function (word) {
    if (word.length < 4 || word.indexOf('-') >= 0 || NOT_A_TARGET.has(word)) return;
    const letter = word.charAt(0);
    if (!BY_LETTER[letter]) BY_LETTER[letter] = [];
    BY_LETTER[letter].push(word);
  });

  function correctText(text) {
    const changes = [];
    const seen = {};
    const corrected = String(text || '').replace(/[A-Za-z]+/g, function (word) {
      const fixed = correctToken(word);
      if (fixed === word) return word;
      const note = word + ' → ' + fixed;
      if (!seen[note]) {
        seen[note] = true;
        changes.push(note);
      }
      return fixed;
    });
    return { text: corrected, changes: changes };
  }

  function correctToken(original) {
    const lower = original.toLowerCase();
    if (lower.length < 3) return original;
    if (TYPOS[lower] && TYPOS[lower] !== lower) return applyCase(original, TYPOS[lower]);
    if (LEXICON.has(lower)) return original;
    const collapsed = lower.replace(/([a-z])\1{2,}/g, '$1');
    if (collapsed !== lower && LEXICON.has(collapsed)) return applyCase(original, collapsed);
    if (lower.length < 4) return original;
    const bucket = BY_LETTER[lower.charAt(0)] || [];
    let best = null;
    let ties = 0;
    for (let i = 0; i < bucket.length; i++) {
      const candidate = bucket[i];
      if (!adjacentSwap(lower, candidate)) continue;
      if (!best) {
        best = candidate;
        ties = 1;
      } else if (candidate !== best) {
        ties += 1;
      }
    }
    if (!best || ties !== 1) return original;
    return applyCase(original, best);
  }

  function adjacentSwap(typed, word) {
    if (typed.length !== word.length) return false;
    let found = false;
    for (let i = 0; i < typed.length; i++) {
      if (typed.charAt(i) === word.charAt(i)) continue;
      if (found || i >= typed.length - 1) return false;
      if (typed.charAt(i) !== word.charAt(i + 1) || typed.charAt(i + 1) !== word.charAt(i)) return false;
      found = true;
      i += 1;
    }
    return found;
  }

  function applyCase(original, fixed) {
    if (original.length > 2 && original === original.toUpperCase()) return fixed.toUpperCase();
    if (original.charAt(0) === original.charAt(0).toUpperCase()) {
      return fixed.charAt(0).toUpperCase() + fixed.slice(1);
    }
    return fixed;
  }

  return { correctText: correctText };
});
