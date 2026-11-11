(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined' && window.PF_VARIATIONS) {
    window.PF = api.createEngine(window.PF_VARIATIONS.concepts);
  }
})(this, function () {
  const STOP = new Set([
    'a', 'an', 'the', 'of', 'with', 'and', 'in', 'on', 'at', 'to', 'for',
    'from', 'into', 'over', 'under', 'her', 'his', 'their', 'its', 'is',
    'are', 'was', 'be', 'as', 'by', 'or', 'very', 'really',
  ]);

  const LIGHT_PHRASES = [
    'soft natural light',
    'soft practical lighting',
    'dramatic side light',
    'soft window light',
    'warm low light',
    'dramatic backlight',
    'cool rim light',
    'cinematic lighting',
    'dramatic lighting',
    'natural lighting',
    'soft lighting',
    'rim lighting',
    'natural light',
    'golden hour',
    'window light',
    'rim light',
  ];

  const CUES = {
    lighting: {
      'tag-heavy': ['dramatic lighting', 'soft lighting', 'rim lighting'],
      descriptive: ['dramatic side light', 'soft window light', 'warm low light'],
      cinematic: ['dramatic backlight', 'soft practical lighting', 'cool rim light'],
    },
    framing: {
      'tag-heavy': ['close-up', 'upper body', 'wide shot'],
      descriptive: ['tight close-up', 'waist-up portrait', 'wide environmental framing'],
      cinematic: ['slow push-in', 'medium close-up', 'wide establishing shot'],
    },
  };

  function createEngine(concepts) {
    function generate(opts) {
      const original = String(opts.input || '').trim();
      if (!original) return { error: 'Type a word or paste a prompt.' };
      const model = opts.model;
      if (!model) return { error: 'Pick a model.' };
      const notes = [];
      let input = original;
      if (opts.correctSpelling !== false) {
        const spelling = getSpelling();
        if (spelling) {
          const fixed = spelling.correctText(input);
          input = fixed.text;
          fixed.changes.forEach(function (change) { notes.push(change); });
        }
      }
      const format = !opts.formatOverride || opts.formatOverride === 'auto'
        ? model.preferredFormat
        : opts.formatOverride;
      const mode = isShort(input) ? 'short' : 'optimize';
      if (opts.improvePrompt !== false && mode === 'optimize') {
        const improved = improveLongInput(input, model);
        input = improved.text;
        improved.notes.forEach(function (note) { notes.push(note); });
      }
      const variationOffset = Math.max(0, Number(opts.variationOffset) || 0);
      let prompts = mode === 'short'
        ? expandShort(input, model, format, variationOffset)
        : optimizeLong(input, model, format, variationOffset);
      let ultraAdded = [];
      if (mode === 'optimize' && prompts[0]) {
        const ultra = makeUltraVariation(prompts[0], format);
        if (ultra) {
          prompts.push(ultra.prompt);
          ultraAdded = ultra.added;
          notes.push('Ultra variation adds ' + ultra.added.join(', '));
        }
      }
      if (opts.addQuality) prompts = prompts.map(function (prompt) {
        return applyQuality(prompt, model, format);
      });
      if (opts.ultraDetailed) {
        const detailed = prompts.map(function (prompt) {
          return applyUltra(prompt, model, format);
        });
        if (detailed.some(function (prompt, index) { return prompt !== prompts[index]; })) {
          notes.push('Added ultra detailed');
        }
        prompts = detailed;
      }
      prompts = unique(prompts);
      let ultraIndex = -1;
      if (ultraAdded.length) {
        prompts.forEach(function (prompt, index) {
          if (ultraAdded.every(function (detail) { return hasPhrase(prompt, detail); })) ultraIndex = index;
        });
      }
      if (opts.improvePrompt !== false && mode === 'optimize') {
        if (prompts[1] && prompts[1] !== prompts[0]) notes.push('Suggestion 2 changes the lighting');
        if (prompts[2] && prompts[2] !== prompts[0]) notes.push('Suggestion 3 changes the framing');
      }
      const negative = opts.includeNegative
        ? mergeNegative(model.negativeTemplate, opts.negativeExtra)
        : '';
      if (variationOffset) notes.push('Variation set ' + (variationOffset + 1));
      if (opts.includeNegative && String(opts.negativeExtra || '').trim()) notes.push('Added custom negative');
      return {
        mode: mode,
        format: format,
        prompts: prompts,
        ultraIndex: ultraIndex,
        negative: negative,
        notes: notes,
        settingsLine: settingsLine(model),
        estimates: prompts.map(function (prompt) {
          return estimate(prompt, format, model);
        }),
      };
    }

    function expandShort(input, model, format, offset) {
      const concept = matchConcept(concepts, input);
      const style = model.variationStyle || 'descriptive';
      const source = concept || genericConcept(input);
      const seeds = pickBank(source, style).slice(0, 6);
      return seeds.map(function (seed, index) {
        const rendered = renderSeed(seed, input, format);
        const prompt = personalize(rendered, input, concept, format);
        if (!offset) return prompt;
        return addMoreVariation(prompt, format, index, offset);
      });
    }

    function optimizeLong(input, model, format, offset) {
      const source = detectFormat(input);
      const style = model.variationStyle || 'descriptive';
      let base;
      if (format === 'natural') {
        base = source === 'tags' ? tagsToProse(input) : cleanupProse(input);
      } else {
        base = source === 'tags' ? normalizeTags(input, format) : proseToTags(input, format);
      }
      const skip = offset || 0;
      return [
        base,
        replaceOrAddCue(base, format, style, 'lighting', skip),
        replaceOrAddCue(base, format, style, 'framing', skip),
      ];
    }

    return { generate: generate };
  }

  function getSpelling() {
    if (typeof window !== 'undefined' && window.PF_SPELLING) return window.PF_SPELLING;
    if (typeof require === 'function') {
      try {
        return require('./data/spelling');
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  const SHORT_TAGS = {
    cu: 'close-up',
    ecu: 'extreme close-up',
    closeup: 'close-up',
    'close up': 'close-up',
    bkg: 'background',
    bg: 'background',
    fg: 'foreground',
    dof: 'depth of field',
  };

  const TAG_BUCKETS = [
    { rank: 0, re: /^(?:[1-6](?:girl|girls|boy|boys|woman|women|man|men)|solo|duo|trio)$/i },
    { rank: 2, re: /\b(?:hair|eyes|eye|skin|face|freckles|lips|ears|ear|nose)\b/i },
    { rank: 3, re: /\b(?:smile|grin|smirk|blush|expression|looking|tears|crying)\b/i },
    { rank: 5, re: /\b(?:standing|sitting|pose|posing|walking|running|leaning|kneeling|lying)\b/i },
    { rank: 6, re: /\b(?:background|indoors|outdoors|city|forest|room|street|beach|sky|night|rain|snow|temple|cafe|ocean|mountain)\b/i },
    { rank: 7, re: /\b(?:lighting|light|sunlight|moonlight|neon|shadow|backlight|rim)\b/i },
    { rank: 8, re: /\b(?:close-up|closeup|portrait|wide shot|upper body|full body|from side|from above|from below)\b/i },
    { rank: 4, re: /\b(?:dress|shirt|skirt|armor|armour|clothes|outfit|kimono|jacket|coat|hat|gloves|boots|shoes|gown)\b/i },
  ];

  function improveLongInput(input, model) {
    if (detectFormat(input) === 'tags') return improveTagInput(input, model);
    return improveProse(input, model);
  }

  function improveTagInput(input, model) {
    const notes = [];
    const tags = splitTags(input).map(function (tag) {
      let next = tag.replace(/\s+/g, ' ').trim();
      const count = next.replace(/^([1-6])\s+(girl|girls|boy|boys|woman|women|man|men)$/i, function (_all, number, word) {
        const compact = number + word.toLowerCase();
        notes.push(next + ' → ' + compact);
        return compact;
      });
      next = count;
      const key = next.replace(/_/g, ' ').toLowerCase();
      if (SHORT_TAGS[key]) {
        notes.push(next + ' → ' + SHORT_TAGS[key]);
        next = SHORT_TAGS[key];
      }
      return next;
    }).filter(Boolean);

    const seen = {};
    const deduped = [];
    tags.forEach(function (tag) {
      const key = keyOf(tag);
      if (seen[key]) return;
      seen[key] = true;
      deduped.push(tag);
    });
    if (deduped.length !== tags.length) notes.push('Removed duplicate tags');

    const ordered = deduped.map(function (tag, index) {
      return { tag: tag, index: index, rank: tagRank(tag) };
    }).sort(function (a, b) {
      if (a.rank !== b.rank) return a.rank - b.rank;
      return a.index - b.index;
    }).map(function (item) { return item.tag; });

    if (ordered.join(' | ') !== deduped.join(' | ')) notes.push('Reordered tags');

    if (!ordered.some(function (tag) { return hasLight(tag); })) {
      const added = lightCue(model);
      ordered.push(added);
      notes.push('Added ' + added);
    }

    return { text: ordered.join(', '), notes: unique(notes) };
  }

  function tagRank(tag) {
    const plain = String(tag || '').replace(/_/g, ' ');
    for (let i = 0; i < TAG_BUCKETS.length; i++) {
      if (TAG_BUCKETS[i].re.test(plain)) return TAG_BUCKETS[i].rank;
    }
    return 4;
  }

  function improveProse(input, model) {
    const notes = [];
    let text = String(input || '').replace(/\s+/g, ' ').trim();
    text = text.replace(/^(positive prompt|prompt)\s*:\s*/i, function () {
      notes.push('Removed the prompt label');
      return '';
    }).trim();
    const withoutFiller = text.replace(/\b(very|really|basically|actually|literally)\b/gi, ' ');
    if (withoutFiller !== text) {
      notes.push('Removed filler words');
      text = withoutFiller;
    }
    const withoutDupes = text.replace(/\b([A-Za-z]+)(?:\s+\1\b)+/gi, '$1');
    if (withoutDupes !== text) {
      notes.push('Removed repeated words');
      text = withoutDupes;
    }
    text = text.replace(/\s+/g, ' ').trim();
    text = stripLeadIn(text, notes);
    const withoutThere = text.replace(/^(?:there is|there are|this is)\s+/i, '');
    if (withoutThere !== text) {
      if (notes.indexOf('Started on the subject') < 0) notes.push('Started on the subject');
      text = withoutThere;
    }
    text = stripLeadIn(text, notes);
    const articles = fixArticles(text);
    if (articles !== text) {
      notes.push('Fixed a/an');
      text = articles;
    }
    text = text.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
    if (!hasLight(text)) {
      const cue = lightCue(model);
      text = text.replace(/[.\s]*$/, '') + ', ' + cue;
      notes.push('Added ' + cue);
    }
    if (text && /[a-z]/.test(text.charAt(0))) text = text.charAt(0).toUpperCase() + text.slice(1);
    return { text: text, notes: unique(notes) };
  }

  function stripLeadIn(text, notes) {
    const next = text.replace(/^(?:this is\s+)?(?:a\s+|an\s+)?(?:picture|photo|image|rendering|drawing)\s+of\s+/i, '');
    if (next !== text && notes.indexOf('Started on the subject') < 0) notes.push('Started on the subject');
    return next;
  }

  function lightCue(model) {
    const style = model && model.variationStyle;
    if (style === 'cinematic') return 'cinematic lighting';
    if (style === 'tag-heavy') return 'soft lighting';
    return 'soft natural light';
  }

  function hasLight(text) {
    return /\b(light|lighting|sunlight|moonlight|neon|shadow|backlit|backlight|golden hour|window light|rim light)\b/i.test(text);
  }

  function fixArticles(text) {
    return text.replace(/\b(a|an)\s+([A-Za-z]+)/gi, function (full, article, word) {
      const next = needsAn(word) ? 'an' : 'a';
      if (article.toLowerCase() === next) return article + ' ' + word;
      const cased = article.charAt(0) === article.charAt(0).toUpperCase()
        ? next.charAt(0).toUpperCase() + next.slice(1)
        : next;
      return cased + ' ' + word;
    });
  }

  function needsAn(word) {
    const lower = word.toLowerCase();
    if (/^(hour|honest|honor)/.test(lower)) return true;
    if (/^(uni|one|use|ufo|euro)/.test(lower)) return false;
    return /^[aeiou]/.test(lower);
  }

  function isShort(input) {
    if (input.includes(',') || input.includes('\n')) return false;
    const words = input.trim().split(/\s+/).filter(Boolean);
    return words.length <= 5 && input.trim().length <= 48;
  }

  function detectFormat(input) {
    const commas = (input.match(/,/g) || []).length;
    const words = input.trim().split(/\s+/).filter(Boolean);
    if (commas >= 2) return 'tags';
    if (commas >= 1 && words.length <= 14 && !/[.]/.test(input)) return 'tags';
    return 'natural';
  }

  function matchConcept(concepts, input) {
    const n = input.trim().toLowerCase();
    let best = null;
    let score = 0;
    concepts.forEach(function (concept) {
      concept.aliases.forEach(function (alias) {
        const a = alias.toLowerCase();
        let s = 0;
        if (n === a) s = 1000 + a.length;
        else if (a.length >= 3 && hasWord(n, a)) s = 500 + a.length;
        if (s > score) {
          score = s;
          best = concept;
        }
      });
    });
    return best;
  }

  function hasWord(input, alias) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(?:^|\\s)' + escaped + '(?:\\s|$)', 'i').test(input);
  }

  function genericConcept(phrase) {
    const placeWords = ['city', 'forest', 'beach', 'mountain', 'street', 'cafe', 'room', 'sky', 'ocean', 'lake', 'desert', 'village', 'castle', 'night', 'background', 'landscape', 'alley', 'temple', 'garden', 'river', 'field', 'sea'];
    const n = phrase.toLowerCase();
    const place = placeWords.some(function (word) {
      return n === word || n.endsWith(' ' + word);
    });
    return {
      id: null,
      aliases: [],
      tags: place
        ? [
          ['wide shot', '{subject}', 'establishing shot', 'atmospheric'],
          ['path', '{subject}', 'depth', 'soft lighting'],
          ['detailed background', '{subject}', 'cinematic lighting'],
          ['from above', '{subject}', 'vast scale', 'moody'],
          ['foreground detail', '{subject}', 'shallow depth of field'],
          ['night', '{subject}', 'rim lighting', 'quiet mood'],
        ]
        : [
          ['close-up', '{subject}', 'detailed', 'sharp focus'],
          ['portrait', '{subject}', 'soft lighting', 'upper body'],
          ['full body', '{subject}', 'dynamic angle', 'dramatic lighting'],
          ['wide shot', '{subject}', 'detailed background', 'depth of field'],
          ['from side', '{subject}', 'rim lighting', 'moody atmosphere'],
          ['cinematic lighting', '{subject}', 'high detail'],
        ],
      natural: place
        ? [
          'Wide view of {subject}, clear air, natural light, and rich background detail.',
          'A path through {subject}, layered depth, soft light, photorealistic.',
          '{subject} in golden hour, long shadows, atmospheric haze.',
          'Quiet corner of {subject}, foreground detail, shallow depth of field.',
          '{subject} at night, cool rim light, calm mood.',
          'Overhead view of {subject}, vast scale, natural color.',
        ]
        : [
          'Close-up of {subject}, sharp detail, soft natural light, photorealistic.',
          'A portrait centered on {subject}, gentle lighting and shallow depth of field.',
          '{subject} under dramatic side light, rich color and fine surface detail.',
          'Full view of {subject}, clear environment, cinematic lighting.',
          '{subject} at night with rim light and a quiet mood.',
          'Wide shot of {subject}, atmospheric depth, natural color, sharp focus.',
        ],
      cinematic: place
        ? [
          'Wide establishing shot of {subject}, slow drift forward, late light, subtle motion in the scene.',
          'Tracking shot through {subject}, steady camera, atmospheric depth.',
          'Slow pan across {subject}, golden hour, gentle movement in the scene.',
          'Low moving shot inside {subject}, foreground parallax, soft light.',
          'Night shot of {subject}, slow push-in, cool rim light, five second beat.',
          'Aerial drift over {subject}, wide lens, natural color, calm camera.',
        ]
        : [
          'Close-up of {subject}, slow push-in, soft window light, subtle motion.',
          'Medium shot of {subject}, camera slowly orbits, warm practical lighting.',
          'Wide shot of {subject}, gentle movement, late afternoon light, steady camera.',
          'Handheld close shot of {subject}, shallow focus, small natural movement.',
          'Low-angle shot of {subject}, dramatic backlight, slow tilt up.',
          'Tracking shot of {subject}, steady camera, cinematic lighting, five second beat.',
        ],
    };
  }

  function pickBank(concept, style) {
    if (style === 'cinematic' && concept.cinematic && concept.cinematic.length) return concept.cinematic;
    if (style === 'descriptive' && concept.natural && concept.natural.length) return concept.natural;
    if (style === 'tag-heavy' && concept.tags && concept.tags.length) return concept.tags;
    return concept.tags || concept.natural || concept.cinematic || [];
  }

  function renderSeed(seed, phrase, format) {
    if (Array.isArray(seed)) {
      const tags = seed.map(function (tag) {
        return String(tag).split('{subject}').join(phrase);
      });
      if (format === 'natural') return tagsToSentence(tags);
      return joinTags(tags.map(function (tag) {
        return formatTagToken(tag, format);
      }));
    }
    const text = String(seed).split('{subject}').join(phrase);
    if (format === 'natural') return text;
    return proseToTags(text, format);
  }

  function personalize(prompt, input, concept, format) {
    const phrase = input.trim();
    if (!phrase || prompt.toLowerCase().includes(phrase.toLowerCase())) return prompt;
    if (format === 'natural') {
      if (!concept) return phrase + '. ' + prompt;
      const aliases = concept.aliases.slice().sort(function (a, b) {
        return b.length - a.length;
      });
      for (let i = 0; i < aliases.length; i++) {
        const escaped = aliases[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('\\b' + escaped + '\\b', 'i');
        if (re.test(prompt)) return prompt.replace(re, phrase);
      }
      return phrase + '. ' + prompt;
    }
    const tag = formatTagToken(phrase, format);
    if (splitTags(prompt).some(function (part) { return keyOf(part) === keyOf(tag); })) return prompt;
    return tag + ', ' + prompt;
  }

  function applyQuality(prompt, model, format) {
    const tags = model.qualityTags || [];
    if (!tags.length) return prompt;
    if (format === 'natural') {
      const extra = tags.filter(function (tag) {
        return !hasPhrase(prompt, tag);
      });
      if (!extra.length) return prompt;
      return prompt.replace(/[.\s]*$/, '') + ', ' + extra.join(', ');
    }
    const kill = {};
    tags.forEach(function (tag) { kill[keyOf(tag)] = true; });
    const parts = splitTags(prompt).filter(function (part) {
      return !kill[keyOf(part)];
    });
    return tags.concat(parts).join(', ');
  }

  const ULTRA_RULES = [
    {
      match: function (hay) { return /\b(forest|woods|jungle|grove)\b/.test(hay) && /\b(night|midnight)\b/.test(hay); },
      details: [
        { text: 'moonlight through the trees', unless: /\b(sunlight|daylight|golden hour|noon|neon)\b/ },
        { text: 'wet leaves', unless: /\bdry\b/ },
        { text: 'mist', unless: /\b(mist|fog)\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(forest|woods|jungle|grove)\b/.test(hay) && /\b(day|sunny|morning|noon|sunlight)\b/.test(hay); },
      details: [
        { text: 'dappled sunlight', unless: /\b(night|moonlight|neon)\b/ },
        { text: 'soft undergrowth', unless: /\bundergrowth\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(forest|woods|jungle|grove)\b/.test(hay) && !/\b(night|midnight|day|sunny|noon)\b/.test(hay); },
      details: [
        { text: 'tall trees', unless: /\btrees\b/ },
        { text: 'forest floor', unless: /\bforest floor\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(city|street|alley)\b/.test(hay) && /\b(rain|raining|rainy)\b/.test(hay); },
      details: [
        { text: 'wet pavement', unless: /\b(dry|wet pavement)\b/ },
        { text: 'reflections', unless: /\breflection/ },
      ],
    },
    {
      match: function (hay) { return /\b(city|street|alley)\b/.test(hay) && /\b(night|midnight)\b/.test(hay); },
      details: [
        { text: 'neon reflections', unless: /\bneon\b/ },
        { text: 'distant windows', unless: /\bwindows\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(rain|raining|rainy)\b/.test(hay); },
      details: [
        { text: 'wet surfaces', unless: /\b(dry|wet)\b/ },
        { text: 'droplets', unless: /\b(droplet|drop of rain)\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(night|midnight)\b/.test(hay) && !/\b(sunlight|daylight|noon)\b/.test(hay); },
      details: [
        { text: 'moonlight', unless: /\b(moonlight|sunlight|neon)\b/ },
        { text: 'deep shadows', unless: /\bshadow/ },
      ],
    },
    {
      match: function (hay) { return /\b(portrait|close-up|close up|smile)\b/.test(hay); },
      details: [
        { text: 'shallow depth of field', unless: /\bdepth of field\b/ },
        { text: 'soft background', unless: /\bbackground\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(ballroom|gown|ball gown)\b/.test(hay); },
      details: [
        { text: 'warm light', unless: /\b(neon|moonlight)\b/ },
        { text: 'polished floor', unless: /\bfloor\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(beach|ocean|sea|shore)\b/.test(hay); },
      details: [
        { text: 'soft horizon', unless: /\bhorizon\b/ },
        { text: 'sea breeze', unless: /\bbreeze\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(snow|snowy)\b/.test(hay); },
      details: [
        { text: 'falling snow', unless: /\bfalling snow\b/ },
        { text: 'cold air', unless: /\bcold\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(sunset|sunrise|golden hour)\b/.test(hay); },
      details: [
        { text: 'long shadows', unless: /\bshadow/ },
        { text: 'warm sky', unless: /\bsky\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(cafe|kitchen|bedroom|indoors|indoor)\b/.test(hay); },
      details: [
        { text: 'ambient interior light', unless: /\b(moonlight|sunlight|neon)\b/ },
        { text: 'quiet room', unless: /\bquiet\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(mountain|mountains)\b/.test(hay); },
      details: [
        { text: 'distant peaks', unless: /\bpeaks\b/ },
        { text: 'clear air', unless: /\bclear air\b/ },
      ],
    },
    {
      match: function (hay) { return /\b(temple|shrine)\b/.test(hay); },
      details: [
        { text: 'lantern light', unless: /\blantern\b/ },
        { text: 'quiet atmosphere', unless: /\bquiet\b/ },
      ],
    },
    {
      match: function (hay) { return /\bdesert\b/.test(hay); },
      details: [
        { text: 'warm haze', unless: /\bhaze\b/ },
        { text: 'long shadows', unless: /\bshadow/ },
      ],
    },
  ];

  function makeUltraVariation(prompt, format) {
    const hay = prompt.toLowerCase().replace(/_/g, ' ');
    const added = [];
    ULTRA_RULES.forEach(function (rule) {
      if (added.length >= 4 || !rule.match(hay)) return;
      rule.details.forEach(function (detail) {
        if (added.length >= 4) return;
        if (detail.unless && detail.unless.test(hay)) return;
        if (hasPhrase(prompt, detail.text)) return;
        if (added.some(function (item) { return item.indexOf(detail.text) >= 0 || detail.text.indexOf(item) >= 0; })) return;
        added.push(detail.text);
      });
    });
    if (!added.length) {
      [{ text: 'rich surface detail', unless: /\bsurface detail\b/ }, { text: 'cohesive atmosphere', unless: /\batmosphere\b/ }].forEach(function (detail) {
        if (added.length >= 2) return;
        if (detail.unless.test(hay) || hasPhrase(prompt, detail.text)) return;
        added.push(detail.text);
      });
    }
    if (!added.length) return null;
    return { prompt: appendDetails(prompt, format, added), added: added };
  }

  function appendDetails(prompt, format, details) {
    if (format === 'natural') {
      const trimmed = String(prompt || '').replace(/\s+$/, '');
      const punct = /[.!?]$/.test(trimmed) ? trimmed.slice(-1) : '';
      const body = (punct ? trimmed.slice(0, -1) : trimmed).replace(/[,\s]+$/, '');
      return body + ', ' + details.join(', ') + (punct || '.');
    }
    return prompt + ', ' + details.map(function (detail) {
      return formatTagToken(detail, format);
    }).join(', ');
  }

  function mergeNegative(template, extra) {
    const parts = [];
    const seen = {};
    function add(text) {
      String(text || '').split(',').forEach(function (part) {
        const tag = part.trim();
        if (!tag) return;
        const key = tag.toLowerCase().replace(/_/g, ' ');
        if (seen[key]) return;
        seen[key] = true;
        parts.push(tag);
      });
    }
    add(template);
    add(extra);
    return parts.join(', ');
  }

  const MORE_LIGHT = ['golden hour', 'cool rim light', 'studio lighting', 'moonlight', 'neon lighting'];
  const MORE_FRAME = ['low angle', 'from side', 'dutch angle', 'full body', 'over shoulder'];

  function addMoreVariation(prompt, format, index, offset) {
    const light = MORE_LIGHT[(index + offset) % MORE_LIGHT.length];
    const frame = MORE_FRAME[(index + offset) % MORE_FRAME.length];
    return appendCue(appendCue(prompt, format, light), format, frame);
  }

  function appendCue(prompt, format, phrase) {
    if (hasPhrase(prompt, phrase)) return prompt;
    if (format === 'natural') {
      const trimmed = String(prompt || '').replace(/\s+$/, '');
      const punct = /[.!?]$/.test(trimmed) ? trimmed.slice(-1) : '';
      const body = (punct ? trimmed.slice(0, -1) : trimmed).replace(/[,\s]+$/, '');
      return body + ', ' + phrase + punct;
    }
    return prompt + ', ' + formatTagToken(phrase, format);
  }

  function replaceOrAddCue(prompt, format, style, kind, skip) {
    const group = CUES[kind][style] || CUES[kind].descriptive;
    const present = group.find(function (cue) { return hasPhrase(prompt, cue); });
    const options = group.filter(function (cue) { return cue !== present && !hasPhrase(prompt, cue); });
    const next = options.length ? options[(skip || 0) % options.length] : null;
    if (!next) return prompt;
    if (present) {
      const swapped = swapPhrase(prompt, present, next, format);
      if (swapped) return swapped;
    }
    if (kind === 'lighting') {
      const existing = LIGHT_PHRASES.find(function (cue) { return hasPhrase(prompt, cue); });
      if (existing) {
        const swapped = swapPhrase(prompt, existing, next, format);
        if (swapped) return swapped;
      }
    }
    return addCue(prompt, format, style, kind);
  }

  function swapPhrase(prompt, present, next, format) {
    const pattern = phrasePattern(present);
    if (!pattern.test(prompt)) return null;
    const token = format === 'natural' ? next : formatTagToken(next, format);
    return prompt.replace(pattern, function (_full, lead) {
      return (lead || '') + token;
    });
  }

  function phrasePattern(phrase) {
    const words = String(phrase).toLowerCase().split(/[\s_]+/).filter(Boolean).map(function (word) {
      return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    return new RegExp('(^|[^A-Za-z0-9])' + words.join('[_ ]+') + '(?![A-Za-z0-9])', 'i');
  }

  function applyUltra(prompt, model, format) {
    if (hasPhrase(prompt, 'ultra detailed')) return prompt;
    const phrase = 'ultra detailed';
    if (format === 'natural') {
      const trimmed = String(prompt || '').replace(/\s+$/, '');
      const punct = /[.!?]$/.test(trimmed) ? trimmed.slice(-1) : '';
      const body = (punct ? trimmed.slice(0, -1) : trimmed).replace(/[,\s]+$/, '');
      return body + ', ' + phrase + punct;
    }
    const leads = {};
    (model.qualityTags || []).forEach(function (tag) { leads[keyOf(tag)] = true; });
    const parts = splitTags(prompt);
    let index = 0;
    while (index < parts.length && isLeadTag(parts[index], leads)) index += 1;
    parts.splice(index, 0, phrase);
    return parts.join(', ');
  }

  function isLeadTag(tag, leads) {
    const key = keyOf(tag);
    if (leads[key]) return true;
    return /^(?:score_\d+(?:_up)?|source_[a-z0-9]+|rating_[a-z]+)$/.test(key.replace(/ /g, '_'));
  }

  function addCue(prompt, format, style, kind) {
    const group = CUES[kind][style] || CUES[kind].descriptive;
    const missing = group.find(function (cue) {
      return !hasPhrase(prompt, cue);
    });
    if (!missing) return prompt;
    if (format === 'natural') {
      const trimmed = String(prompt || '').replace(/\s+$/, '');
      const punct = /[.!?]$/.test(trimmed) ? trimmed.slice(-1) : '';
      const body = (punct ? trimmed.slice(0, -1) : trimmed).replace(/[,\s]+$/, '');
      return body + ', ' + missing + punct;
    }
    return prompt + ', ' + formatTagToken(missing, format);
  }

  function tagsToSentence(tags) {
    const clean = tags.map(function (tag) {
      return String(tag).replace(/_/g, ' ');
    });
    const sentence = clean.join(', ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }

  function tagsToProse(text) {
    const tags = splitTags(text).map(stripWeight).map(function (tag) {
      return tag.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    }).filter(Boolean);
    if (!tags.length) return cleanupProse(text);
    const lead = tags.slice(0, 4).join(', ');
    const rest = tags.slice(4).join(', ');
    const sentence = rest ? lead + ', with ' + rest : lead;
    return cleanupProse(sentence.charAt(0).toUpperCase() + sentence.slice(1));
  }

  function cleanupProse(text) {
    let t = text.replace(/\s+/g, ' ').trim();
    t = t.replace(/\s+,/g, ',');
    if (!/[.!?]$/.test(t)) t += '.';
    return t;
  }

  function normalizeTags(text, format) {
    return joinTags(splitTags(text).map(function (tag) {
      return formatTagToken(tag, format);
    }));
  }

  function proseToTags(text, format) {
    const chunks = text.split(/[,.;\n]+/).map(function (chunk) {
      return chunk.trim();
    }).filter(Boolean);
    const tags = [];
    chunks.forEach(function (chunk) {
      const words = chunk.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(function (word) {
        return word && !STOP.has(word);
      });
      for (let i = 0; i < words.length; i += 3) {
        const part = words.slice(i, i + 3).join(' ');
        if (part) tags.push(part);
      }
    });
    return joinTags(tags.map(function (tag) {
      return formatTagToken(tag, format);
    }));
  }

  function formatTagToken(token, format) {
    let t = String(token || '').trim();
    if (!t) return '';
    const weight = t.match(/^\((.+):([0-9]*\.?[0-9]+)\)$/);
    if (weight) return '(' + formatTagToken(weight[1], format) + ':' + weight[2] + ')';
    if (format === 'danbooru') {
      return t.replace(/\s+/g, ' ').trim().toLowerCase().replace(/ /g, '_').replace(/_+/g, '_');
    }
    if (format === 'gelbooru') {
      if (/^(score_\d+(?:_up)?|source_[a-z0-9]+|rating_[a-z]+)$/i.test(t)) return t.toLowerCase();
      return t.replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    }
    return t.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function splitTags(text) {
    const parts = [];
    let buf = '';
    let depth = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '(') depth++;
      if (ch === ')' && depth > 0) depth--;
      if (ch === ',' && depth === 0) {
        if (buf.trim()) parts.push(buf.trim());
        buf = '';
        continue;
      }
      buf += ch;
    }
    if (buf.trim()) parts.push(buf.trim());
    return parts;
  }

  function stripWeight(token) {
    const match = token.match(/^\((.+):([0-9]*\.?[0-9]+)\)$/);
    return match ? match[1] : token;
  }

  function joinTags(tags) {
    const seen = {};
    const out = [];
    tags.forEach(function (tag) {
      const clean = String(tag || '').trim();
      if (!clean) return;
      const key = keyOf(clean);
      if (seen[key]) return;
      seen[key] = true;
      out.push(clean);
    });
    return out.join(', ');
  }

  function keyOf(tag) {
    return String(tag || '')
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/^\(+|\)+$/g, '')
      .replace(/:[0-9.]+$/, '')
      .trim();
  }

  function hasPhrase(prompt, phrase) {
    const hay = prompt.toLowerCase().replace(/_/g, ' ');
    const needle = phrase.toLowerCase().replace(/_/g, ' ');
    return hay.includes(needle);
  }

  function unique(list) {
    const seen = {};
    const out = [];
    list.forEach(function (item) {
      const text = String(item || '').trim();
      const key = text.toLowerCase();
      if (!text || seen[key]) return;
      seen[key] = true;
      out.push(text);
    });
    return out;
  }

  function settingsLine(model) {
    const settings = model.recommendedSettings || {};
    return 'Suggested: ' + settings.steps + ' steps • CFG ' + settings.cfg + ' • ' + settings.sampler;
  }

  function estimate(prompt, format, model) {
    if (format === 'natural') {
      const count = prompt.trim().split(/\s+/).filter(Boolean).length;
      const warn = count > (model.warnAt || 140);
      return {
        label: 'About ' + count + ' words' + (warn ? '. Long for this model.' : ''),
        warn: warn,
      };
    }
    const count = splitTags(prompt).length;
    const warn = count > (model.warnAt || 75);
    return {
      label: 'About ' + count + ' tags' + (warn ? '. Long for this model.' : ''),
      warn: warn,
    };
  }

  return { createEngine: createEngine };
});
