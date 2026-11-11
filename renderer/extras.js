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

  function selectedAdds(input) {
    const adds = [];
    MENUS.forEach(function (menu) {
      const select = document.getElementById('extra-' + menu.id);
      if (!select || !select.value) return;
      if (hasAny(input, menu.keys)) return;
      const option = menu.options.find(function (item) { return item[1] === select.value; });
      adds.push({
        id: menu.id,
        label: menu.label,
        keys: menu.keys,
        text: option ? option[1] : select.value,
      });
    });
    return adds;
  }

  function apply(prompts, input, format) {
    const adds = selectedAdds(input);
    if (!adds.length) return { prompts: prompts, notes: [] };
    const used = {};
    const next = (prompts || []).map(function (prompt) {
      const parts = [];
      adds.forEach(function (add) {
        if (hasAny(prompt, add.keys)) return;
        parts.push(formatPhrase(add.text, format));
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

  function init() {
    const toolBar = document.getElementById('tool-bar');
    if (!toolBar || document.getElementById('extra-bar')) return;
    const saved = loadSaved();
    const bar = document.createElement('div');
    bar.id = 'extra-bar';
    bar.className = 'extra-bar';
    bar.innerHTML = MENUS.map(function (menu) {
      const options = ['<option value="">None</option>'].concat(menu.options.map(function (option) {
        const selected = saved[menu.id] === option[1] ? ' selected' : '';
        return '<option value="' + escapeHtml(option[1]) + '"' + selected + '>' + escapeHtml(option[0]) + '</option>';
      }));
      return '<label class="extra-field"><span>' + escapeHtml(menu.label) + '</span><select id="extra-' + menu.id + '">' + options.join('') + '</select></label>';
    }).join('');
    toolBar.insertAdjacentElement('afterend', bar);
    bar.addEventListener('change', function () {
      const values = {};
      MENUS.forEach(function (menu) {
        const select = document.getElementById('extra-' + menu.id);
        if (select && select.value) values[menu.id] = select.value;
      });
      saveSaved(values);
    });
  }

  window.PromptForgeExtras = { apply: apply, menus: MENUS };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
