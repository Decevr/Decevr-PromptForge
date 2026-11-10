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
      const input = String(opts.input || '').trim();
      if (!input) return { error: 'Type a word or paste a prompt.' };
      const model = opts.model;
      if (!model) return { error: 'Pick a model.' };
      const format = !opts.formatOverride || opts.formatOverride === 'auto'
        ? model.preferredFormat
        : opts.formatOverride;
      const mode = isShort(input) ? 'short' : 'optimize';
      let prompts = mode === 'short'
        ? expandShort(input, model, format)
        : optimizeLong(input, model, format);
      if (opts.addQuality) prompts = prompts.map(function (prompt) {
        return applyQuality(prompt, model, format);
      });
      prompts = unique(prompts);
      const negative = opts.includeNegative ? (model.negativeTemplate || '') : '';
      return {
        mode: mode,
        format: format,
        prompts: prompts,
        negative: negative,
        settingsLine: settingsLine(model),
        estimates: prompts.map(function (prompt) {
          return estimate(prompt, format, model);
        }),
      };
    }

    function expandShort(input, model, format) {
      const concept = matchConcept(concepts, input);
      const style = model.variationStyle || 'descriptive';
      const source = concept || genericConcept(input);
      const seeds = pickBank(source, style).slice(0, 6);
      return seeds.map(function (seed) {
        const rendered = renderSeed(seed, input, format);
        return personalize(rendered, input, concept, format);
      });
    }

    function optimizeLong(input, model, format) {
      const source = detectFormat(input);
      const style = model.variationStyle || 'descriptive';
      let base;
      if (format === 'natural') {
        base = source === 'tags' ? tagsToProse(input) : cleanupProse(input);
      } else {
        base = source === 'tags' ? normalizeTags(input, format) : proseToTags(input, format);
      }
      return [
        base,
        addCue(base, format, style, 'lighting'),
        addCue(base, format, style, 'framing'),
      ];
    }

    return { generate: generate };
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

  function addCue(prompt, format, style, kind) {
    const group = CUES[kind][style] || CUES[kind].descriptive;
    const missing = group.find(function (cue) {
      return !hasPhrase(prompt, cue);
    });
    if (!missing) return prompt;
    if (format === 'natural') return prompt.replace(/[.\s]*$/, '') + ', ' + missing;
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
