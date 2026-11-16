(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.PromptForgeScenes = api;
})(this, function () {
  const RACES = [
    { race: 'Black', skin: ['brown', 'deep brown', 'dark brown', 'rich brown'] },
    { race: 'East Asian', skin: ['fair', 'light', 'light olive', 'warm beige'] },
    { race: 'White', skin: ['fair', 'light', 'rosy fair', 'light tan'] },
    { race: 'Latina', skin: ['tan', 'olive', 'light brown', 'golden brown'] },
    { race: 'South Asian', skin: ['brown', 'deep brown', 'olive', 'warm brown'] },
    { race: 'Middle Eastern', skin: ['olive', 'tan', 'golden', 'light brown'] },
    { race: 'mixed race', skin: ['fair', 'tan', 'brown', 'olive', 'light brown'] },
  ];
  const AGES = [21, 23, 24, 25, 26, 27, 28, 30, 32, 34, 36, 38, 40, 42];
  const HAIR_COLORS = ['black', 'dark brown', 'brown', 'auburn', 'red', 'copper', 'blonde', 'platinum blonde', 'silver'];
  const HAIR_STYLES = ['long straight', 'long wavy', 'very long straight', 'shoulder length wavy', 'short', 'curly', 'tight curly', 'braided', 'in a high ponytail', 'in a messy bun', 'in a bob'];
  const EYES = ['blue', 'green', 'brown', 'amber', 'gray', 'hazel', 'dark brown', 'light blue', 'light green'];
  const FACES = ['a round face', 'a heart shaped face', 'a long face', 'soft facial features', 'sharp cheekbones', 'defined cheekbones'];
  const LIPS = ['full lips', 'soft lips', 'thin lips', 'defined lips'];
  const LIPSTICK = ['', '', 'red lipstick', 'dark lipstick', 'nude lipstick'];
  const BODIES = ['slim', 'athletic', 'curvy', 'hourglass', 'thick', 'soft', 'tall'];
  const BREASTS = ['small breasts', 'medium breasts', 'large breasts', 'very large breasts'];
  const WAISTS = ['a narrow waist', 'a slim waist', 'a soft waist'];
  const HIPS = ['narrow hips', 'wide hips', 'full hips'];
  const THIGHS = ['slim thighs', 'thick thighs', 'toned thighs'];
  const ASSES = ['round ass', 'full ass', 'toned ass', 'small ass'];
  const NIPPLES = ['pink nipples', 'brown nipples', 'dark nipples', 'pale nipples'];
  const PUBIC = ['shaved', 'trimmed', 'covered in natural pubic hair'];
  const FRECKLES = ['', '', '', 'Light freckles cross her nose.', 'Freckles cover her cheeks.', 'Freckles dust her shoulders.'];
  const MARKS = ['', '', '', 'A small mole sits near her mouth.', 'She has a navel piercing.', 'She has a nipple piercing.', 'She has ear piercings.', 'A small tattoo marks her hip.', 'A fine line tattoo marks her shoulder.', 'A floral tattoo marks her thigh.'];
  const MALE_BUILDS = ['a lean build', 'a muscular build', 'a broad chest', 'a thick build'];
  const MALE_SKIN = ['fair skin', 'tan skin', 'brown skin', 'deep brown skin', 'olive skin'];

  function choose(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function hairPhrase(color, style) {
    if (style.indexOf('in a ') === 0) return color + ' hair ' + style;
    return style + ' ' + color + ' hair';
  }

  function makeWoman(avoid) {
    let woman = null;
    let guard = 0;
    do {
      const group = choose(RACES);
      const color = choose(HAIR_COLORS);
      const style = choose(HAIR_STYLES);
      woman = {
        age: choose(AGES),
        race: group.race,
        skin: choose(group.skin),
        hair: hairPhrase(color, style),
        hairColor: color,
        eyes: choose(EYES),
        face: choose(FACES),
        lips: choose(LIPS),
        lipstick: choose(LIPSTICK),
        body: choose(BODIES),
        breasts: choose(BREASTS),
        waist: choose(WAISTS),
        hips: choose(HIPS),
        thighs: choose(THIGHS),
        ass: choose(ASSES),
        nipples: choose(NIPPLES),
        pubic: choose(PUBIC),
        freckles: choose(FRECKLES),
        mark: choose(MARKS),
      };
      guard += 1;
    } while (avoid && guard < 12 && woman.race === avoid.race && woman.hairColor === avoid.hairColor);
    return woman;
  }

  function portrait(woman) {
    const mouth = woman.lipstick ? woman.lips + ' and ' + woman.lipstick : woman.lips;
    const lines = [
      'A ' + woman.age + ' year old ' + woman.race + ' adult woman with ' + woman.hair + ' and ' + woman.eyes + ' eyes',
      'She has ' + woman.skin + ' skin and ' + woman.face + ' and ' + mouth,
      'Her figure is ' + woman.body + ' with ' + woman.breasts + ' and ' + woman.waist + ' and ' + woman.hips + ' and ' + woman.thighs + ' and a ' + woman.ass,
      'She has ' + woman.nipples,
      'Her pussy is ' + woman.pubic,
    ];
    let text = lines.join('. ') + '.';
    if (woman.freckles) text += ' ' + woman.freckles;
    if (woman.mark) text += ' ' + woman.mark;
    return text;
  }

  function portraitTags(woman) {
    const tags = [
      woman.age + ' years old',
      woman.race.toLowerCase(),
      woman.hair,
      woman.eyes + ' eyes',
      woman.skin + ' skin',
      woman.face,
      woman.lips,
      woman.body,
      woman.breasts,
      woman.waist,
      woman.hips,
      woman.thighs,
      woman.ass,
      woman.nipples,
      woman.pubic,
    ];
    if (woman.lipstick) tags.push(woman.lipstick);
    if (woman.freckles) tags.push(woman.freckles.replace(/\./g, ''));
    if (woman.mark) tags.push(woman.mark.replace(/\./g, ''));
    return tags.join(', ');
  }

  const SOLO = [
    {
      action: 'is lying nude on a bed with her thighs spread and pushes two fingers inside her vagina while rubbing her clit.',
      tags: '1girl, solo, adult, nude, on bed, spread legs, fingering, pussy, female masturbation',
    },
    {
      action: 'kneels nude on a bed and fucks herself with a dildo pushed inside her vagina.',
      tags: '1girl, solo, adult, nude, on bed, kneeling, dildo, vaginal, masturbation',
    },
    {
      action: 'stands nude in a shower with one hand on her breast and the other hand rubbing her pussy.',
      tags: '1girl, solo, adult, nude, shower, breast grab, pussy, masturbation',
    },
    {
      action: 'sits nude on a chair with her legs spread and her fingers inside her vagina.',
      tags: '1girl, solo, adult, nude, sitting, chair, spread legs, fingering, pussy',
    },
    {
      action: 'is lying nude on her back with her knees up and holds a vibrator on her clit.',
      tags: '1girl, solo, adult, nude, lying, vibrator, clit, masturbation',
    },
    {
      action: 'bends nude over a bed and reaches back to finger her wet pussy.',
      tags: '1girl, solo, adult, nude, bent over, fingering, pussy, from behind',
    },
    {
      action: 'is lying nude with her hips raised and slides a dildo inside her vagina from behind.',
      tags: '1girl, solo, adult, nude, hips up, dildo, vaginal, sex toy',
    },
    {
      action: 'stands nude against a wall with one leg lifted and rubs her clit.',
      tags: '1girl, solo, adult, nude, against wall, standing, masturbation, pussy',
    },
  ];

  const MALE = [
    {
      action: 'is on her hands and knees on a bed while an adult male partner with {body} fucks her from behind with his penis inside her vagina in doggystyle and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, doggystyle, sex from behind, on bed, faceless male, penetration',
    },
    {
      action: 'is lying on her back on a bed while an adult male partner with {body} fucks her in missionary with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, missionary, on bed, faceless male, penetration',
    },
    {
      action: 'rides an adult male partner with {body} on a bed in cowgirl with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, cowgirl position, girl on top, on bed, faceless male, penetration',
    },
    {
      action: 'stands bent forward while an adult male partner with {body} fucks her from behind with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, standing sex, sex from behind, faceless male, penetration',
    },
    {
      action: 'is lying flat on a bed while an adult male partner with {body} fucks her in prone bone with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, prone bone, sex from behind, on bed, faceless male, penetration',
    },
    {
      action: 'is folded back on a bed while an adult male partner with {body} fucks her in a mating press with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, mating press, folded, on bed, faceless male, penetration',
    },
    {
      action: 'is on her hands and knees while an adult male partner with {body} fucks her ass with his penis inside her ass in anal doggystyle and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, anal, penis, doggystyle, sex from behind, faceless male, penetration',
    },
    {
      action: 'is lying on her side while an adult male partner with {body} fucks her in spooning with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, spooning, sex from behind, faceless male, penetration',
    },
    {
      action: 'kneels and sucks an adult male partner with {body} and his penis is in her mouth and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, fellatio, penis, oral, faceless male',
    },
    {
      action: 'sits on the edge of a bed while an adult male partner with {body} stands and fucks her with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, standing sex, on bed, faceless male, penetration',
    },
  ];

  const FEMALE = [
    {
      partner: 'female',
      action: 'is on her hands and knees on a bed.',
      partnerAction: 'fucks her from behind with a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, doggystyle, sex from behind, on bed, penetration',
    },
    {
      partner: 'female',
      action: 'is lying on her back on a bed.',
      partnerAction: 'fucks her in missionary with a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, missionary, on bed, penetration',
    },
    {
      partner: 'female',
      action: 'rides on a bed in cowgirl.',
      partnerAction: 'is under her wearing a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, cowgirl position, girl on top, on bed, penetration',
    },
    {
      partner: 'female',
      action: 'is lying nude.',
      partnerAction: 'is lying with her and they scissor with their pussies pressed together.',
      tags: '2girls, yuri, adult, nude, tribadism, scissoring, pussy',
    },
    {
      partner: 'female',
      action: 'is lying nude on a bed.',
      partnerAction: 'licks her pussy with her mouth on her clit.',
      tags: '2girls, yuri, adult, nude, cunnilingus, oral, pussy, on bed',
    },
    {
      partner: 'female',
      action: 'is lying nude with her thighs spread.',
      partnerAction: 'pushes two fingers inside her vagina.',
      tags: '2girls, yuri, adult, nude, fingering, pussy, spread legs',
    },
    {
      partner: 'female',
      action: 'stands bent forward.',
      partnerAction: 'fucks her from behind with a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, standing sex, sex from behind, penetration',
    },
    {
      partner: 'female',
      action: 'is lying flat on a bed.',
      partnerAction: 'fucks her with a strap-on in prone bone and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, prone bone, sex from behind, penetration',
    },
  ];

  const SCENES = { solo: SOLO, male: MALE, female: FEMALE };

  function maleBody() {
    return choose(MALE_BUILDS) + ' and ' + choose(MALE_SKIN);
  }

  function roll(kind, format, index) {
    const list = SCENES[kind] || SOLO;
    const pick = index == null ? Math.floor(Math.random() * list.length) : (Number(index) % list.length);
    const scene = list[pick];
    const woman = makeWoman();
    const action = String(scene.action || '').replace('{body}', maleBody());
    if (format === 'natural') {
      if (scene.partner === 'female') {
        const other = makeWoman(woman);
        return portrait(woman) + ' She ' + action + ' The adult female partner is a different woman. ' + portrait(other) + ' The adult female partner ' + scene.partnerAction;
      }
      return portrait(woman) + ' She ' + action;
    }
    const look = portraitTags(woman);
    if (scene.partner === 'female') {
      const other = makeWoman(woman);
      return scene.tags + ', ' + look + ', second woman, ' + portraitTags(other);
    }
    return scene.tags + ', ' + look;
  }

  function activeFormat() {
    const select = document.getElementById('format-select');
    const override = select ? select.value : 'auto';
    if (override && override !== 'auto') return override;
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem('promptforge.v1') || '{}') || {};
    } catch (error) {
      saved = {};
    }
    const models = (window.PF_MODELS && window.PF_MODELS.models) || [];
    const model = models.find(function (item) { return item.id === saved.modelId; }) || models[0];
    return (model && model.preferredFormat) || 'natural';
  }

  function run(kind) {
    const input = document.getElementById('prompt-input');
    const form = document.getElementById('form');
    if (!input || !form) return;
    input.value = roll(kind, activeFormat());
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (typeof form.requestSubmit === 'function') form.requestSubmit();
    else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  function init() {
    const tools = document.getElementById('tool-bar');
    if (!tools || document.getElementById('scene-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'scene-bar';
    bar.className = 'scene-bar';
    bar.innerHTML = [
      '<span>Explicit scene</span>',
      '<button type="button" class="tool-btn" id="scene-solo">Solo female</button>',
      '<button type="button" class="tool-btn" id="scene-male">Male partner</button>',
      '<button type="button" class="tool-btn" id="scene-female">Female partner</button>',
    ].join('');
    tools.insertAdjacentElement('afterend', bar);
    bar.addEventListener('click', function (event) {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.id === 'scene-solo') run('solo');
      else if (button.id === 'scene-male') run('male');
      else if (button.id === 'scene-female') run('female');
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }

  return {
    roll: roll,
    counts: { solo: SOLO.length, male: MALE.length, female: FEMALE.length },
  };
});
