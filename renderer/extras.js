(function () {
  const STORAGE_KEY = 'promptforge.extras.v1';
  const MENUS = [
    {
      id: 'hair',
      label: 'Hairstyle',
      keys: ['hair', 'hairstyle', 'ponytail', 'pigtail', 'braid', 'braided', 'bangs', 'bob', 'pixie', 'curly', 'curls', 'wavy', 'blonde', 'brunette', 'redhead', 'twintails', 'undercut', 'mohawk', 'bun'],
      options: [
        ['Long wavy hair', 'long wavy hair'],
        ['Long straight hair', 'long straight hair'],
        ['Short bob', 'short bob haircut'],
        ['Pixie cut', 'pixie cut'],
        ['High ponytail', 'high ponytail'],
        ['Braided hair', 'braided hair'],
        ['Curly hair', 'curly hair'],
        ['Twin tails', 'twin tails'],
        ['Messy bun', 'messy bun'],
        ['Hair over one eye', 'hair over one eye'],
        ['Wet hair', 'wet hair'],
      ],
    },
    {
      id: 'expression',
      label: 'Expression',
      keys: ['smile', 'smiling', 'grin', 'laugh', 'laughing', 'frown', 'angry', 'sad', 'wink', 'blush', 'blushing', 'serious', 'expression', 'surprised', 'crying', 'smirk', 'pout', 'calm'],
      options: [
        ['Soft smile', 'a soft smile'],
        ['Wide smile', 'a wide smile'],
        ['Laughing', 'laughing'],
        ['Serious', 'a serious expression'],
        ['Surprised', 'a surprised expression'],
        ['Wink', 'a wink'],
        ['Biting lip', 'biting the lip'],
        ['Calm', 'a calm expression'],
        ['Angry', 'an angry expression'],
        ['Blushing', 'blushing'],
        ['Eyes closed', 'eyes closed'],
      ],
    },
    {
      id: 'background',
      label: 'Background',
      keys: ['background', 'backdrop'],
      options: [
        ['Soft studio', 'soft studio background'],
        ['Dark studio', 'dark studio background'],
        ['White backdrop', 'plain white backdrop'],
        ['Gray backdrop', 'plain gray backdrop'],
        ['Window light', 'a background of window light'],
        ['Colored light', 'a background washed in one colored light'],
        ['Blurred room', 'a blurred room behind the subject'],
      ],
    },
    {
      id: 'scenery',
      label: 'Scenery',
      keys: ['forest', 'beach', 'city', 'street', 'bedroom', 'kitchen', 'garden', 'rooftop', 'bathroom', 'office', 'scenery', 'landscape', 'hotel', 'park', 'alley', 'outdoors', 'indoor', 'mountain', 'ocean'],
      options: [
        ['Bedroom', 'in a bedroom'],
        ['Forest', 'in a forest'],
        ['City street', 'on a city street'],
        ['Beach', 'on a beach'],
        ['Rooftop', 'on a rooftop'],
        ['Bathroom', 'in a bathroom'],
        ['Kitchen', 'in a kitchen'],
        ['Rainy street', 'on a rainy street'],
        ['Garden', 'in a garden'],
        ['Office', 'in an office'],
        ['Hotel room', 'in a hotel room'],
        ['Car', 'in a car'],
      ],
    },
    {
      id: 'action',
      label: 'Action',
      keys: ['walking', 'running', 'dancing', 'reaching', 'turning', 'drinking', 'stretching', 'waving', 'jumping', 'climbing', 'kicking'],
      options: [
        ['Walking', 'walking'],
        ['Sitting down', 'sitting down'],
        ['Turning', 'turning toward the viewer'],
        ['Reaching', 'reaching forward'],
        ['Dancing', 'dancing'],
        ['Leaning in', 'leaning in'],
        ['Looking back', 'looking back'],
        ['Holding a cup', 'holding a cup'],
        ['Stretching', 'stretching'],
      ],
    },
    {
      id: 'wardrobe',
      label: 'Wardrobe',
      keys: ['wearing', 'clothes', 'clothing', 'dress', 'shirt', 'skirt', 'outfit', 'nude', 'naked', 'lingerie', 'jacket', 'suit', 'robe', 'jeans', 'swimsuit', 'underwear', 'costume', 'coat', 'pants', 'bra', 'panties', 'wardrobe'],
      options: [
        ['Casual clothes', 'wearing casual clothes'],
        ['Evening dress', 'wearing an evening dress'],
        ['Lingerie', 'wearing lingerie'],
        ['Fully nude', 'fully nude'],
        ['Oversized shirt', 'wearing an oversized shirt'],
        ['Leather jacket', 'wearing a leather jacket'],
        ['Swimwear', 'wearing swimwear'],
        ['Robe', 'wearing a robe'],
        ['Suit', 'wearing a suit'],
        ['Sportswear', 'wearing sportswear'],
      ],
    },
    {
      id: 'pose',
      label: 'Pose',
      keys: ['pose', 'standing', 'sitting', 'seated', 'kneeling', 'lying', 'leaning', 'crouching'],
      options: [
        ['Weight on one leg', 'standing, weight on one leg'],
        ['Sitting on a chair', 'sitting on a chair'],
        ['Hands on hips', 'hands on hips'],
        ['Arms crossed', 'arms crossed'],
        ['One hand in hair', 'one hand in the hair'],
        ['Kneeling', 'kneeling'],
        ['Lying on one side', 'lying on one side'],
        ['Mid step', 'one foot forward'],
        ['Leaning on a wall', 'leaning on a wall'],
        ['Legs crossed', 'seated with legs crossed'],
      ],
    },
    {
      id: 'sexual-pose',
      label: 'Sexual pose',
      keys: ['arched', 'all fours', 'straddling', 'bent over', 'hips raised', 'knees apart', 'sexual pose'],
      options: [
        ['Arched on a bed', 'an adult kneeling on a bed, back arched, looking back'],
        ['On all fours', 'an adult on all fours, looking back'],
        ['On the back', 'an adult lying on the back, knees bent'],
        ['Bent forward', 'an adult bent forward, looking back'],
        ['Knees apart', 'an adult seated, knees apart'],
        ['Against a wall', 'an adult standing against a wall, one knee bent'],
        ['Straddling a chair', 'an adult straddling a chair'],
        ['Hips raised', 'an adult lying down, hips raised'],
      ],
    },
    {
      id: 'sex-scene',
      label: 'Sex scene',
      keys: ['sex', 'fucking', 'intercourse', 'missionary', 'cowgirl', 'doggy', 'doggystyle', 'oral', 'blowjob', 'handjob', 'penetration', 'vaginal', 'anal'],
      options: [
        ['Missionary', 'two adults having sex, missionary'],
        ['Cowgirl', 'two adults having sex, cowgirl'],
        ['From behind', 'two adults having sex, from behind'],
        ['Oral', 'an adult kneeling, oral sex'],
        ['Hand between the thighs', 'an adult, one hand between the thighs'],
        ['Standing together', 'two adults having sex, standing, one leg lifted'],
      ],
    },
    {
      id: 'style',
      label: 'Artist style',
      match: 'selected',
      keys: [],
      options: [
        ['Anime', 'anime illustration'],
        ['Semi-realistic', 'semi-realistic'],
        ['Photoreal', 'photoreal'],
        ['Painterly', 'painterly'],
        ['Watercolor', 'watercolor'],
        ['Ink', 'ink drawing'],
        ['Oil paint', 'oil painting'],
        ['Cel shaded', 'cel shading'],
        ['Art nouveau', 'art nouveau'],
        ['Comic', 'comic ink'],
        ['Ukiyo-e', 'ukiyo-e'],
        ['Impressionist', 'impressionist painting'],
        ['Fashion photo', 'fashion editorial'],
        ['Film noir', 'film noir'],
        ['Pastel', 'soft pastel'],
        ['Baroque', 'baroque painting'],
        ['Sketch', 'pencil sketch'],
        ['3D render', '3d render'],
      ],
    },
    {
      id: 'artist',
      label: 'Artist',
      match: 'selected',
      keys: [],
      options: [
        ['WLOP', 'in the style of WLOP', 'wlop', 'Illustration'],
        ['Sakimichan', 'in the style of Sakimichan', 'sakimichan', 'Illustration'],
        ['Artgerm', 'in the style of Artgerm', 'artgerm', 'Illustration'],
        ['Rossdraws', 'in the style of Rossdraws', 'rossdraws', 'Illustration'],
        ['Guweiz', 'in the style of Guweiz', 'guweiz', 'Illustration'],
        ['Wanke', 'in the style of Wanke', 'wanke', 'Illustration'],
        ['Ciloranko', 'in the style of Ciloranko', 'ciloranko', 'Illustration'],
        ['Modare', 'in the style of Modare', 'modare', 'Illustration'],
        ['Sciamano240', 'in the style of Sciamano240', 'sciamano240', 'Illustration'],
        ['Nixeu', 'in the style of Nixeu', 'nixeu', 'Illustration'],
        ['Ilya Kuvshinov', 'in the style of Ilya Kuvshinov', 'ilya_kuvshinov', 'Illustration'],
        ['Loish', 'in the style of Loish', 'loish', 'Illustration'],
        ['Krenz Cushart', 'in the style of Krenz Cushart', 'krenz_cushart', 'Illustration'],
        ['Atey Ghailan', 'in the style of Atey Ghailan', 'atey_ghailan', 'Illustration'],
        ['Alphonse Mucha', 'in the style of Alphonse Mucha', 'alphonse_mucha', 'Painting'],
        ['Gustav Klimt', 'in the style of Gustav Klimt', 'gustav_klimt', 'Painting'],
        ['John William Waterhouse', 'in the style of John William Waterhouse', 'john_william_waterhouse', 'Painting'],
        ['John Singer Sargent', 'in the style of John Singer Sargent', 'john_singer_sargent', 'Painting'],
        ['J.C. Leyendecker', 'in the style of J.C. Leyendecker', 'jc_leyendecker', 'Painting'],
        ['Norman Rockwell', 'in the style of Norman Rockwell', 'norman_rockwell', 'Painting'],
        ['Frank Frazetta', 'in the style of Frank Frazetta', 'frank_frazetta', 'Painting'],
        ['Brom', 'in the style of Brom', 'brom', 'Painting'],
        ['Moebius', 'in the style of Moebius', 'moebius', 'Painting'],
        ['Yoshitaka Amano', 'in the style of Yoshitaka Amano', 'yoshitaka_amano', 'Painting'],
        ['Range Murata', 'in the style of Range Murata', 'range_murata', 'Painting'],
        ['Peter Lindbergh', 'in the style of Peter Lindbergh', 'peter_lindbergh', 'Photography'],
        ['Helmut Newton', 'in the style of Helmut Newton', 'helmut_newton', 'Photography'],
        ['Annie Leibovitz', 'in the style of Annie Leibovitz', 'annie_leibovitz', 'Photography'],
        ['Steve McCurry', 'in the style of Steve McCurry', 'steve_mccurry', 'Photography'],
        ['Tim Walker', 'in the style of Tim Walker', 'tim_walker', 'Photography'],
      ],
    },
  ];

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function saveSaved(values) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }

  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function plain(text) {
    return String(text || '').toLowerCase().replace(/_/g, ' ');
  }

  function hasAny(text, keys) {
    const source = plain(text);
    return keys.some(function (key) {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '[ _]+');
      return new RegExp('(?:^|[^a-z])' + escaped + '(?:[^a-z]|$)', 'i').test(source);
    });
  }

  function formatPhrase(text, format) {
    if (format === 'danbooru') {
      return text.split(',').map(function (part) {
        return part.trim().replace(/\s+/g, '_');
      }).filter(Boolean).join(', ');
    }
    return text;
  }

  function keysFor(menu, phrase, tag) {
    if (menu.match !== 'selected') return menu.keys;
    const raw = String(tag || phrase || '').toLowerCase().replace(/_/g, ' ').trim();
    const skip = { the: 1, and: 1, with: 1, from: 1, style: 1, of: 1, in: 1, for: 1 };
    const words = raw.split(/[^a-z0-9]+/).filter(function (word) {
      return word.length > 2 && !skip[word];
    });
    return words.length ? [raw].concat(words) : [raw];
  }

  function selectedAdds(input) {
    const adds = [];
    MENUS.forEach(function (menu) {
      const select = document.getElementById('extra-' + menu.id);
      if (!select || !select.value) return;
      const option = menu.options.find(function (item) { return item[1] === select.value; });
      const phrase = option ? option[1] : select.value;
      const tag = option && option[2] ? option[2] : '';
      const keys = keysFor(menu, phrase, tag);
      if (hasAny(input, keys)) return;
      adds.push({
        id: menu.id,
        label: menu.label,
        keys: keys,
        text: phrase,
        tag: tag,
      });
    });
    return adds;
  }

  function renderAdd(add, format) {
    if (add.tag && format !== 'natural') {
      return format === 'danbooru' ? add.tag.replace(/\s+/g, '_') : add.tag.replace(/_/g, ' ');
    }
    return formatPhrase(add.text, format);
  }

  function apply(prompts, input, format) {
    const adds = selectedAdds(input);
    if (!adds.length) return { prompts: prompts, notes: [] };
    const used = {};
    const next = (prompts || []).map(function (prompt) {
      const parts = [];
      adds.forEach(function (add) {
        if (hasAny(prompt, add.keys)) return;
        parts.push(renderAdd(add, format));
        used[add.label] = true;
      });
      if (!parts.length) return prompt;
      const body = String(prompt || '').replace(/\s+$/, '');
      return body ? body.replace(/[.\s]*$/, '') + ', ' + parts.join(', ') : parts.join(', ');
    });
    const labels = Object.keys(used);
    return {
      prompts: next,
      notes: labels.length ? ['Added ' + labels.join(', ') + ' from the variation menus'] : [],
    };
  }

  function renderMenu(menu, saved) {
    const options = ['<option value="">None</option>'];
    let group = '';
    menu.options.forEach(function (option) {
      const nextGroup = option[3] || '';
      if (nextGroup !== group) {
        if (group) options.push('</optgroup>');
        if (nextGroup) options.push('<optgroup label="' + escapeHtml(nextGroup) + '">');
        group = nextGroup;
      }
      const selected = saved[menu.id] === option[1] ? ' selected' : '';
      options.push('<option value="' + escapeHtml(option[1]) + '"' + selected + '>' + escapeHtml(option[0]) + '</option>');
    });
    if (group) options.push('</optgroup>');
    return '<label class="extra-field"><span>' + escapeHtml(menu.label) + '</span><select id="extra-' + menu.id + '">' + options.join('') + '</select></label>';
  }

  function init() {
    if (document.getElementById('extra-modal')) return;
    const saved = loadSaved();
    const modal = document.createElement('div');
    modal.id = 'extra-modal';
    modal.className = 'character-modal';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="character-dialog" role="dialog" aria-labelledby="extra-title">',
      '<div class="character-head"><h2 id="extra-title">More variations</h2>',
      '<button type="button" class="text-btn" id="extra-close">Close</button></div>',
      '<p class="extra-note">A choice is added when you generate, and only when that idea is not already in the prompt you typed.</p>',
      '<div id="extra-bar" class="extra-bar">',
      MENUS.map(function (menu) { return renderMenu(menu, saved); }).join(''),
      '</div>',
      '<div class="extra-actions"><button type="button" class="generate" id="extra-generate">Generate another set</button></div>',
      '</div>',
    ].join('');
    document.body.appendChild(modal);
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.hidden = true;
    });
    document.getElementById('extra-close').addEventListener('click', function () { modal.hidden = true; });
    document.getElementById('extra-generate').addEventListener('click', function () {
      const input = document.getElementById('prompt-input');
      if (!input || !input.value.trim()) return;
      document.dispatchEvent(new CustomEvent('promptforge:more-variations'));
    });
    modal.addEventListener('change', function () {
      const values = {};
      MENUS.forEach(function (menu) {
        const select = document.getElementById('extra-' + menu.id);
        if (select && select.value) values[menu.id] = select.value;
      });
      saveSaved(values);
    });
    function open() { modal.hidden = false; }
    window.PromptForgeExtras.open = open;
  }

  window.PromptForgeExtras = { apply: apply, menus: MENUS, open: function () {} };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
