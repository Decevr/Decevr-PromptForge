(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.PromptForgeScenes = api;
})(this, function () {
  const SOLO = [
    {
      natural: 'An adult woman is lying nude on a bed with her thighs spread and pushes two fingers inside her vagina while rubbing her clit.',
      tags: '1girl, solo, adult, nude, on bed, spread legs, fingering, pussy, female masturbation',
    },
    {
      natural: 'An adult woman kneels nude on a bed and fucks herself with a dildo pushed inside her vagina.',
      tags: '1girl, solo, adult, nude, on bed, kneeling, dildo, vaginal, masturbation',
    },
    {
      natural: 'An adult woman stands nude in a shower with one hand on her breast and the other hand rubbing her pussy.',
      tags: '1girl, solo, adult, nude, shower, breast grab, pussy, masturbation',
    },
    {
      natural: 'An adult woman sits nude on a chair with her legs spread and her fingers inside her vagina.',
      tags: '1girl, solo, adult, nude, sitting, chair, spread legs, fingering, pussy',
    },
    {
      natural: 'An adult woman is lying nude on her back with her knees up and holds a vibrator on her clit.',
      tags: '1girl, solo, adult, nude, lying, vibrator, clit, masturbation',
    },
    {
      natural: 'An adult woman bends nude over a bed and reaches back to finger her wet pussy.',
      tags: '1girl, solo, adult, nude, bent over, fingering, pussy, from behind',
    },
    {
      natural: 'An adult woman is lying nude with her hips raised and slides a dildo inside her vagina from behind.',
      tags: '1girl, solo, adult, nude, hips up, dildo, vaginal, sex toy',
    },
    {
      natural: 'An adult woman stands nude against a wall with one leg lifted and rubs her clit.',
      tags: '1girl, solo, adult, nude, against wall, standing, masturbation, pussy',
    },
  ];

  const MALE = [
    {
      natural: 'An adult woman is on her hands and knees on a bed while an adult male partner fucks her from behind with his penis inside her vagina in doggystyle and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, doggystyle, sex from behind, on bed, faceless male, penetration',
    },
    {
      natural: 'An adult woman is lying on her back on a bed while an adult male partner fucks her in missionary with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, missionary, on bed, faceless male, penetration',
    },
    {
      natural: 'An adult woman rides an adult male partner on a bed in cowgirl with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, cowgirl position, girl on top, on bed, faceless male, penetration',
    },
    {
      natural: 'An adult woman stands bent forward while an adult male partner fucks her from behind with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, standing sex, sex from behind, faceless male, penetration',
    },
    {
      natural: 'An adult woman is lying flat on a bed while an adult male partner fucks her in prone bone with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, prone bone, sex from behind, on bed, faceless male, penetration',
    },
    {
      natural: 'An adult woman is folded back on a bed while an adult male partner fucks her in a mating press with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, mating press, folded, on bed, faceless male, penetration',
    },
    {
      natural: 'An adult woman is on her hands and knees while an adult male partner fucks her ass with his penis inside her ass in anal doggystyle and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, anal, penis, doggystyle, sex from behind, faceless male, penetration',
    },
    {
      natural: 'An adult woman is lying on her side while an adult male partner fucks her in spooning with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, spooning, sex from behind, faceless male, penetration',
    },
    {
      natural: 'An adult woman kneels and sucks an adult male partner with his penis in her mouth and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, fellatio, penis, oral, faceless male',
    },
    {
      natural: 'An adult woman sits on the edge of a bed while an adult male partner stands and fucks her with his penis inside her vagina and only his face is out of frame or obscured.',
      tags: '1girl, 1boy, hetero, adult, nude, sex, vaginal, penis, standing sex, on bed, faceless male, penetration',
    },
  ];

  const FEMALE = [
    {
      natural: 'An adult woman is on her hands and knees on a bed while an adult female partner fucks her from behind with a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, doggystyle, sex from behind, on bed, penetration',
    },
    {
      natural: 'An adult woman is lying on her back on a bed while an adult female partner fucks her in missionary with a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, missionary, on bed, penetration',
    },
    {
      natural: 'An adult woman rides an adult female partner on a bed with a strap-on and the strap-on penis is inside her vagina in cowgirl.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, cowgirl position, girl on top, on bed, penetration',
    },
    {
      natural: 'An adult woman is lying nude with an adult female partner and they scissor with their pussies pressed together.',
      tags: '2girls, yuri, adult, nude, tribadism, scissoring, pussy',
    },
    {
      natural: 'An adult woman is lying nude on a bed while an adult female partner licks her pussy with her mouth on her clit.',
      tags: '2girls, yuri, adult, nude, cunnilingus, oral, pussy, on bed',
    },
    {
      natural: 'An adult woman is lying nude with her thighs spread while an adult female partner pushes two fingers inside her vagina.',
      tags: '2girls, yuri, adult, nude, fingering, pussy, spread legs',
    },
    {
      natural: 'An adult woman stands bent forward while an adult female partner fucks her from behind with a strap-on and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, standing sex, sex from behind, penetration',
    },
    {
      natural: 'An adult woman is lying flat on a bed while an adult female partner fucks her with a strap-on in prone bone and the strap-on penis is inside her vagina.',
      tags: '2girls, yuri, adult, nude, sex, vaginal, strap-on, prone bone, sex from behind, penetration',
    },
  ];

  const SCENES = { solo: SOLO, male: MALE, female: FEMALE };

  function roll(kind, format, index) {
    const list = SCENES[kind] || SOLO;
    const pick = index == null ? Math.floor(Math.random() * list.length) : (Number(index) % list.length);
    const scene = list[pick];
    if (format === 'natural') return scene.natural;
    return scene.tags;
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
