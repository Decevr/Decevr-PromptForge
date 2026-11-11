(function () {
  const STORAGE_KEY = 'promptforge.extras.v1';

  function sexName(name) {
    return name ? name + ', ' : '';
  }

  function maleVaginal(pose, name) {
    return pose + ', an adult male partner fucking her, his penis inside her vagina, ' + sexName(name) + 'vaginal penetration visible, only his face out of frame or obscured';
  }

  function maleAnal(pose, name) {
    return pose + ', an adult male partner fucking her ass, his penis inside her ass, ' + sexName(name) + 'anal penetration visible, only his face out of frame or obscured';
  }

  function femaleVaginal(pose, name) {
    return pose + ', an adult female partner fucking her with a strap-on, the strap-on penis inside her vagina, ' + sexName(name) + 'vaginal penetration visible';
  }

  function femaleAnal(pose, name) {
    return pose + ', an adult female partner fucking her ass with a strap-on, the strap-on penis inside her ass, ' + sexName(name) + 'anal penetration visible';
  }

  const MENUS = [
    {
      id: 'hair',
      label: 'Hairstyle',
      keys: ['hair', 'hairstyle', 'ponytail', 'pigtail', 'braid', 'braided', 'braids', 'bangs', 'bob', 'pixie', 'curly', 'curls', 'wavy', 'waves', 'blonde', 'brunette', 'redhead', 'twintails', 'undercut', 'mohawk', 'bun', 'buns', 'afro', 'dreadlocks', 'mullet', 'buzz', 'cornrows', 'hime', 'slicked', 'ringlets', 'odango', 'locs'],
      options: [
        ['Long wavy hair', 'long wavy hair'],
        ['Long straight hair', 'long straight hair'],
        ['Very long hair', 'very long hair'],
        ['Beach waves', 'beach waves'],
        ['Loose curls', 'loose curls'],
        ['Short bob', 'short bob haircut'],
        ['Blunt bangs', 'blunt bangs'],
        ['Pixie cut', 'pixie cut'],
        ['Buzz cut', 'buzz cut'],
        ['Short crop', 'short crop'],
        ['High ponytail', 'high ponytail'],
        ['Low ponytail', 'low ponytail'],
        ['Side ponytail', 'side ponytail'],
        ['Side part', 'side part'],
        ['Braided hair', 'braided hair'],
        ['French braid', 'french braid'],
        ['Twin braids', 'twin braids'],
        ['Crown braid', 'crown braid'],
        ['Box braids', 'box braids'],
        ['Cornrows', 'cornrows'],
        ['Curly hair', 'curly hair'],
        ['Ringlets', 'ringlets'],
        ['Afro', 'afro'],
        ['Dreadlocks', 'dreadlocks'],
        ['Twin tails', 'twin tails'],
        ['Space buns', 'space buns'],
        ['Odango', 'odango hair buns'],
        ['Messy bun', 'messy bun'],
        ['High bun', 'high bun'],
        ['Half up', 'half up hair'],
        ['Hair over one eye', 'hair over one eye'],
        ['Slicked back', 'slicked back hair'],
        ['Mullet', 'mullet'],
        ['Wolf cut', 'wolf cut'],
        ['Hime cut', 'hime cut'],
        ['Mohawk', 'mohawk'],
        ['Shaved side', 'shaved side'],
        ['Wet hair', 'wet hair'],
      ],
    },
    {
      id: 'expression',
      label: 'Expression',
      keys: ['smile', 'smiling', 'grin', 'laugh', 'laughing', 'frown', 'angry', 'sad', 'wink', 'blush', 'blushing', 'serious', 'expression', 'surprised', 'crying', 'smirk', 'pout', 'calm', 'ahegao', 'tongue', 'sleepy', 'bored', 'seductive', 'tears', 'flustered', 'gaze'],
      options: [
        ['Soft smile', 'a soft smile'],
        ['Wide smile', 'a wide smile'],
        ['Shy smile', 'a shy smile'],
        ['Smirk', 'a smirk'],
        ['Grin', 'a grin'],
        ['Pout', 'a pout'],
        ['Laughing', 'laughing'],
        ['Serious', 'a serious expression'],
        ['Confident', 'a confident expression'],
        ['Surprised', 'a surprised expression'],
        ['Wink', 'a wink'],
        ['Biting lip', 'biting the lip'],
        ['Calm', 'a calm expression'],
        ['Angry', 'an angry expression'],
        ['Frown', 'a frown'],
        ['Blushing', 'blushing'],
        ['Flustered', 'flustered'],
        ['Eyes closed', 'eyes closed'],
        ['Sleepy', 'a sleepy expression'],
        ['Bored', 'a bored expression'],
        ['Seductive', 'a seductive smile'],
        ['Tongue out', 'tongue out'],
        ['Tears', 'tears in the eyes'],
        ['Half-lidded', 'half-lidded eyes'],
        ['Bedroom eyes', 'a heavy lidded gaze'],
        ['Looking away', 'looking away'],
        ['Side eye', 'a side eye'],
        ['Open mouth', 'mouth slightly open'],
        ['Soft gaze', 'a soft gaze'],
        ['Raised brow', 'one eyebrow raised'],
        ['Ahegao', 'an adult with an ahegao expression'],
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
        ['Black backdrop', 'plain black backdrop'],
        ['Seamless paper', 'a seamless paper backdrop'],
        ['Gradient', 'a soft gradient backdrop'],
        ['Bokeh', 'a bokeh background'],
        ['Neon wash', 'a neon background'],
        ['Smoke', 'a background of smoke'],
        ['Brick wall', 'a brick wall background'],
        ['Concrete', 'a concrete wall background'],
        ['Night sky', 'a night sky background'],
        ['Starfield', 'a starfield background'],
        ['Clear sky', 'a clear sky background'],
        ['City lights', 'a background of blurred city lights'],
        ['Spotlight', 'a spotlight background'],
        ['Halo light', 'a halo light background'],
        ['Red studio', 'a red studio background'],
        ['Blue studio', 'a blue studio background'],
        ['Gold backdrop', 'a gold backdrop'],
        ['Pastel backdrop', 'a pastel backdrop'],
        ['Floral', 'a floral backdrop'],
        ['Bookshelf blur', 'a blurred bookshelf background'],
      ],
    },
    {
      id: 'scenery',
      label: 'Scenery',
      keys: ['forest', 'beach', 'city', 'street', 'bedroom', 'kitchen', 'garden', 'rooftop', 'bathroom', 'office', 'scenery', 'landscape', 'hotel', 'park', 'alley', 'outdoors', 'indoor', 'mountain', 'ocean', 'balcony', 'pool', 'temple', 'castle', 'desert', 'snow', 'cafe', 'bar', 'nightclub', 'library', 'gym', 'warehouse', 'meadow', 'waterfall', 'spring', 'diner', 'stage', 'apartment', 'penthouse', 'ruins', 'market', 'harbor', 'cabin', 'cliff', 'bridge', 'subway', 'sauna', 'yacht', 'greenhouse', 'courtyard', 'shrine', 'loft', 'dojo', 'throne', 'garage', 'elevator', 'stairwell', 'restaurant', 'palace', 'concert', 'boat', 'train', 'workshop', 'ship', 'dressing'],
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
        ['Living room', 'in a living room'],
        ['Balcony', 'on a balcony'],
        ['Pool', 'beside a pool'],
        ['Temple', 'at a temple'],
        ['Castle hall', 'in a castle hall'],
        ['Desert', 'in a desert'],
        ['Snow field', 'in a snow field'],
        ['Cafe', 'in a cafe'],
        ['Bar', 'in a bar'],
        ['Nightclub', 'in a nightclub'],
        ['Library', 'in a library'],
        ['Gym', 'in a gym'],
        ['Warehouse', 'in a warehouse'],
        ['Meadow', 'in a meadow'],
        ['Waterfall', 'by a waterfall'],
        ['Hot spring', 'at a hot spring'],
        ['Diner', 'in a diner'],
        ['Stage', 'on a stage'],
        ['Apartment', 'in an apartment'],
        ['Penthouse', 'in a penthouse'],
        ['Ruins', 'in ancient ruins'],
        ['Market', 'in a market'],
        ['Harbor', 'at a harbor'],
        ['Cabin', 'in a cabin'],
        ['Cliff', 'on a cliff'],
        ['Bridge', 'on a bridge'],
        ['Subway', 'in a subway'],
        ['Sauna', 'in a sauna'],
        ['Yacht', 'on a yacht'],
        ['Greenhouse', 'in a greenhouse'],
        ['Courtyard', 'in a courtyard'],
        ['Shrine', 'at a shrine'],
        ['Loft', 'in a loft'],
        ['Dojo', 'in a dojo'],
        ['Throne room', 'in a throne room'],
        ['Ship corridor', 'in a ship corridor'],
        ['Parking garage', 'in a parking garage'],
        ['Elevator', 'in an elevator'],
        ['Stairwell', 'in a stairwell'],
        ['Restaurant', 'in a restaurant'],
        ['Palace', 'in a palace'],
        ['Alley', 'in an alley'],
        ['Park', 'in a park'],
        ['Mountain', 'on a mountain'],
        ['Ocean', 'by the ocean'],
        ['Dressing room', 'in a dressing room'],
        ['Workshop', 'in a painting workshop'],
        ['Concert', 'at a concert'],
        ['Boat', 'on a boat'],
        ['Train car', 'in a train car'],
      ],
    },
    {
      id: 'action',
      label: 'Action',
      keys: ['walking', 'running', 'dancing', 'reaching', 'turning', 'drinking', 'stretching', 'waving', 'jumping', 'climbing', 'kicking', 'reading', 'writing', 'swimming', 'cooking', 'sparring', 'driving', 'spinning', 'pockets', 'pointing'],
      options: [
        ['Walking', 'walking'],
        ['Running', 'running'],
        ['Sitting down', 'sitting down'],
        ['Turning', 'turning toward the viewer'],
        ['Reaching', 'reaching forward'],
        ['Dancing', 'dancing'],
        ['Leaning in', 'leaning in'],
        ['Looking back', 'looking back'],
        ['Holding a cup', 'holding a cup'],
        ['Stretching', 'stretching'],
        ['Waving', 'waving'],
        ['Jumping', 'jumping'],
        ['Climbing', 'climbing'],
        ['Kicking', 'kicking'],
        ['Reading', 'reading'],
        ['Writing', 'writing'],
        ['Swimming', 'swimming'],
        ['Cooking', 'cooking'],
        ['Sparring', 'sparring'],
        ['Driving', 'driving'],
        ['Spinning', 'spinning'],
        ['Hands in pockets', 'hands in pockets'],
        ['Pointing', 'pointing'],
        ['Opening a door', 'opening a door'],
        ['Pouring a drink', 'pouring a drink'],
      ],
    },
    {
      id: 'wardrobe',
      label: 'Wardrobe',
      keys: ['wearing', 'clothes', 'clothing', 'dress', 'shirt', 'skirt', 'outfit', 'nude', 'naked', 'jacket', 'suit', 'robe', 'jeans', 'swimsuit', 'costume', 'coat', 'pants', 'wardrobe', 'kimono', 'yukata', 'hoodie', 'armor', 'bikini', 'latex', 'gown', 'qipao', 'cape', 'cloak', 'towel', 'apron', 'boots', 'heels', 'tuxedo', 'sweater', 'sundress', 'gloves', 'topless', 'bottomless', 'bunny', 'blazer', 'trench', 'turtleneck'],
      options: [
        ['Casual clothes', 'wearing casual clothes'],
        ['Evening dress', 'wearing an evening dress'],
        ['Cocktail dress', 'wearing a cocktail dress'],
        ['Ball gown', 'wearing a ball gown'],
        ['Sundress', 'wearing a sundress'],
        ['Latex', 'wearing latex'],
        ['Sheer dress', 'wearing a sheer dress'],
        ['Bunny suit', 'wearing a bunny suit'],
        ['Fully nude', 'fully nude'],
        ['Topless', 'topless'],
        ['Bottomless', 'bottomless'],
        ['Naked from the waist', 'naked from the waist up'],
        ['Towel', 'wearing a towel'],
        ['Apron only', 'wearing only an apron'],
        ['Coat only', 'wearing a coat and nothing under it'],
        ['Oversized shirt', 'wearing an oversized shirt'],
        ['Open shirt', 'wearing an open shirt'],
        ['Wet shirt', 'a wet shirt clinging to the body'],
        ['Sweater', 'wearing an oversized sweater'],
        ['Hoodie', 'wearing a hoodie'],
        ['Turtleneck', 'wearing a turtleneck'],
        ['Leather jacket', 'wearing a leather jacket'],
        ['Leather pants', 'wearing leather pants'],
        ['Blazer', 'wearing a blazer'],
        ['Trench coat', 'wearing a trench coat'],
        ['Swimwear', 'wearing swimwear'],
        ['Bikini', 'wearing a bikini'],
        ['Robe', 'wearing a robe'],
        ['Silk robe', 'wearing a silk robe'],
        ['Suit', 'wearing a suit'],
        ['Tuxedo', 'wearing a tuxedo'],
        ['Sportswear', 'wearing sportswear'],
        ['Kimono', 'wearing a kimono'],
        ['Yukata', 'wearing a yukata'],
        ['Qipao', 'wearing a qipao'],
        ['Gothic dress', 'wearing a gothic dress'],
        ['Victorian dress', 'wearing a victorian dress'],
        ['Armor', 'wearing armor'],
        ['Fantasy armor', 'wearing fantasy armor'],
        ['Flight suit', 'wearing a flight suit'],
        ['Superhero suit', 'wearing a superhero suit'],
        ['Cape', 'wearing a cape'],
        ['Cloak', 'wearing a hooded cloak'],
        ['Boots', 'wearing boots'],
        ['High heels', 'wearing high heels'],
        ['Gloves', 'wearing gloves'],
      ],
    },
    {
      id: 'lingerie',
      label: 'Lingerie',
      keys: ['lingerie', 'bra', 'bralette', 'panties', 'thong', 'g-string', 'boyshorts', 'teddy', 'bodysuit', 'bodystocking', 'babydoll', 'chemise', 'negligee', 'slip', 'camisole', 'peignoir', 'corset', 'bustier', 'basque', 'girdle', 'waspie', 'cincher', 'garter', 'stockings', 'fishnet', 'fishnets', 'harness', 'pasties', 'crotchless', 'mesh', 'nightgown', 'wetlook', 'knickers'],
      options: [
        ['Lace bra', 'wearing lingerie, a lace bra'],
        ['Balconette bra', 'wearing lingerie, a balconette bra'],
        ['Plunge bra', 'wearing lingerie, a plunge bra'],
        ['Push-up bra', 'wearing lingerie, a push-up bra'],
        ['Demi bra', 'wearing lingerie, a demi bra'],
        ['Shelf bra', 'wearing lingerie, a shelf bra'],
        ['Strapless bra', 'wearing lingerie, a strapless bra'],
        ['Bralette', 'wearing lingerie, a bralette'],
        ['Longline bra', 'wearing lingerie, a longline bra'],
        ['Soft cup bra', 'wearing lingerie, a soft cup bra'],
        ['Strappy bra', 'wearing lingerie, a strappy bra'],
        ['Cupless bra', 'wearing lingerie, a cupless bra'],
        ['Sheer bra', 'wearing lingerie, a sheer bra'],
        ['Satin bra', 'wearing lingerie, a satin bra'],
        ['Underwire bra', 'wearing lingerie, an underwire bra'],
        ['Quarter-cup bra', 'wearing lingerie, a quarter-cup bra'],
        ['Cage bra', 'wearing lingerie, a cage bra'],
        ['Open-cup bra', 'wearing lingerie, an open-cup bra'],
        ['Lace panties', 'wearing lingerie, lace panties'],
        ['Thong', 'wearing lingerie, a thong'],
        ['G-string', 'wearing lingerie, a g-string'],
        ['Boyshorts', 'wearing lingerie, boyshorts'],
        ['High-waist panties', 'wearing lingerie, high-waist panties'],
        ['Cheeky panties', 'wearing lingerie, cheeky panties'],
        ['Crotchless panties', 'wearing lingerie, crotchless panties'],
        ['Sheer panties', 'wearing lingerie, sheer panties'],
        ['Satin panties', 'wearing lingerie, satin panties'],
        ['Lace thong', 'wearing lingerie, a lace thong'],
        ['V-string', 'wearing lingerie, a v-string'],
        ['Crotchless thong', 'wearing lingerie, a crotchless thong'],
        ['Pearl-string thong', 'wearing lingerie, a pearl-string thong'],
        ['French knickers', 'wearing lingerie, french knickers'],
        ['Tap pants', 'wearing lingerie, tap pants'],
        ['Lace set', 'wearing lingerie, a lace bra and matching panties'],
        ['Satin set', 'wearing lingerie, a satin bra and matching panties'],
        ['Satin bra and thong', 'wearing lingerie, a satin bra and thong'],
        ['Floral lace set', 'wearing lingerie, a floral lace bra and matching panties'],
        ['Sheer mesh set', 'wearing lingerie, a sheer mesh bra and panties'],
        ['Fishnet set', 'wearing lingerie, a fishnet bra and panties'],
        ['Wetlook set', 'wearing lingerie, a wetlook bra and panties'],
        ['Bra, panties, and garter', 'wearing lingerie, a bra, panties, and a garter belt'],
        ['Teddy', 'wearing lingerie, a one-piece teddy bodysuit'],
        ['Lace teddy', 'wearing lingerie, a one-piece lace teddy bodysuit'],
        ['Satin teddy', 'wearing lingerie, a one-piece satin teddy bodysuit'],
        ['Crotchless teddy', 'wearing lingerie, a one-piece crotchless teddy bodysuit'],
        ['Cupless teddy', 'wearing lingerie, a one-piece cupless teddy bodysuit'],
        ['High-cut teddy', 'wearing lingerie, a one-piece high-cut teddy bodysuit'],
        ['Teddy with garters', 'wearing lingerie, a one-piece teddy bodysuit with garter straps'],
        ['Latex teddy', 'wearing lingerie, a one-piece latex teddy bodysuit'],
        ['Lace bodysuit', 'wearing lingerie, a lace bodysuit'],
        ['Sheer bodysuit', 'wearing lingerie, a sheer bodysuit'],
        ['Crotchless bodysuit', 'wearing lingerie, a crotchless bodysuit'],
        ['Satin bodysuit', 'wearing lingerie, a satin bodysuit'],
        ['Mesh bodysuit', 'wearing lingerie, a mesh bodysuit'],
        ['Strappy bodysuit', 'wearing lingerie, a strappy bodysuit'],
        ['Cutout bodysuit', 'wearing lingerie, a cutout bodysuit'],
        ['Crotchless lace bodysuit', 'wearing lingerie, a crotchless lace bodysuit'],
        ['Bodystocking', 'wearing lingerie, a bodystocking'],
        ['Fishnet bodystocking', 'wearing lingerie, a fishnet bodystocking'],
        ['Crotchless fishnet bodystocking', 'wearing lingerie, a crotchless fishnet bodystocking'],
        ['Babydoll', 'wearing lingerie, a short sheer babydoll slip'],
        ['Lace babydoll', 'wearing lingerie, a short lace babydoll slip'],
        ['Chemise', 'wearing lingerie, a chemise'],
        ['Silk chemise', 'wearing lingerie, a silk chemise'],
        ['Lace chemise', 'wearing lingerie, a lace chemise'],
        ['Satin chemise', 'wearing lingerie, a satin chemise'],
        ['Negligee', 'wearing lingerie, a negligee'],
        ['Satin slip', 'wearing lingerie, a satin slip'],
        ['Sheer nightgown', 'wearing lingerie, a sheer nightgown'],
        ['Camisole set', 'wearing lingerie, a camisole and panties'],
        ['Peignoir', 'wearing lingerie, a peignoir robe'],
        ['Lace robe', 'wearing lingerie, a lace robe'],
        ['Satin short robe', 'wearing lingerie, a short satin robe'],
        ['Sheer robe', 'wearing lingerie, a sheer robe'],
        ['Silk robe', 'wearing lingerie, a silk robe'],
        ['Corset', 'wearing lingerie, a corset'],
        ['Overbust corset', 'wearing lingerie, an overbust corset'],
        ['Underbust corset', 'wearing lingerie, an underbust corset'],
        ['Lace-up corset', 'wearing lingerie, a lace-up corset'],
        ['Cupless corset', 'wearing lingerie, a cupless corset'],
        ['Corset and thong', 'wearing lingerie, a corset and thong'],
        ['Bustier', 'wearing lingerie, a bustier'],
        ['Bustier and thong', 'wearing lingerie, a bustier and thong'],
        ['Basque', 'wearing lingerie, a basque corset'],
        ['Merry widow', 'wearing lingerie, a merry widow corset with garter straps'],
        ['Garter belt', 'wearing lingerie, a garter belt'],
        ['Garter and stockings', 'wearing lingerie, a garter belt and stockings'],
        ['Garter stockings set', 'wearing lingerie, a garter belt, stockings, and panties'],
        ['Thigh-high stockings', 'wearing lingerie, thigh-high stockings'],
        ['Lace-top stockings', 'wearing lingerie, lace-top stockings'],
        ['Seamed stockings', 'wearing lingerie, seamed stockings'],
        ['Fishnet stockings', 'wearing lingerie, fishnet stockings'],
        ['Hold-ups', 'wearing lingerie, hold-up stockings'],
        ['Waspie', 'wearing lingerie, a waspie belt'],
        ['Waist cincher', 'wearing lingerie, a waist cincher'],
        ['Strappy harness', 'wearing lingerie, a strappy body harness'],
        ['Body harness', 'wearing lingerie, a body harness'],
        ['Strappy panty harness', 'wearing lingerie, a strappy panty harness'],
        ['Pasties and thong', 'wearing lingerie, pasties and a thong'],
      ],
    },
    {
      id: 'pose',
      label: 'Pose',
      keys: ['pose', 'standing', 'sitting', 'seated', 'kneeling', 'lying', 'leaning', 'crouching', 'squatting', 'squat', 'reclining', 'contrapposto', 'overhead', 'twisting', 'curled'],
      options: [
        ['Weight on one leg', 'standing, weight on one leg'],
        ['Arms at sides', 'standing, arms at the sides'],
        ['Wide stance', 'a wide stance'],
        ['Contrapposto', 'contrapposto'],
        ['Hero stance', 'a grounded wide stance, chin level'],
        ['Crossed ankles', 'standing, ankles crossed'],
        ['On the toes', 'up on the toes'],
        ['Sitting on a chair', 'sitting on a chair'],
        ['Legs crossed', 'seated with legs crossed'],
        ['On the floor', 'seated on the floor'],
        ['On steps', 'seated on steps'],
        ['On a stool', 'perched on a stool'],
        ['Hands on hips', 'hands on hips'],
        ['Arms crossed', 'arms crossed'],
        ['Hands behind head', 'hands behind the head'],
        ['Hands clasped', 'hands clasped in front'],
        ['Arms overhead', 'arms overhead'],
        ['Arms open', 'arms open toward the viewer'],
        ['Chin on hand', 'chin resting on one hand'],
        ['One hand in hair', 'one hand in the hair'],
        ['One knee raised', 'one knee raised'],
        ['On one knee', 'on one knee'],
        ['Kneeling', 'kneeling'],
        ['Squatting', 'squatting'],
        ['Crouching', 'crouching'],
        ['Lying on one side', 'lying on one side'],
        ['On the stomach', 'lying on the stomach'],
        ['Curled up', 'curled on one side'],
        ['Reclining', 'reclining'],
        ['Mid step', 'one foot forward'],
        ['Leaning on a wall', 'leaning on a wall'],
        ['Doorframe', 'shoulder against a doorframe'],
        ['Back view', 'back view, looking over the shoulder'],
        ['Twisted waist', 'twisting at the waist'],
      ],
    },
    {
      id: 'sexual-pose',
      label: 'Sexual pose',
      keys: ['arched', 'all fours', 'straddling', 'bent over', 'hips raised', 'knees apart', 'sexual pose', 'thighs apart'],
      options: [
        ['Arched on a bed', 'an adult kneeling on a bed, back arched, looking back'],
        ['On all fours', 'an adult on all fours, looking back'],
        ['Hands and knees', 'an adult on hands and knees, back arched'],
        ['On the back', 'an adult lying on the back, knees bent'],
        ['Legs raised', 'an adult lying on the back, legs raised'],
        ['Thighs apart', 'an adult lying back, thighs apart'],
        ['On the stomach', 'an adult lying on the stomach, hips raised'],
        ['Bent forward', 'an adult bent forward, looking back'],
        ['Bent over a table', 'an adult bent over a table, looking back'],
        ['Knees apart', 'an adult seated, knees apart'],
        ['Edge of the bed', 'an adult seated on the edge of a bed, knees apart'],
        ['Against a wall', 'an adult standing against a wall, one knee bent'],
        ['Against a window', 'an adult standing against a window, chest forward'],
        ['Straddling a chair', 'an adult straddling a chair'],
        ['In a lap', 'an adult sitting in a lap'],
        ['Hips raised', 'an adult lying down, hips raised'],
        ['Presenting', 'an adult kneeling, chest down, hips raised'],
        ['One knee drawn up', 'an adult lying on one side, one knee drawn up'],
      ],
    },
    {
      id: 'sex-scene',
      label: 'Sex scene',
      keys: ['sex', 'fucking', 'intercourse', 'missionary', 'cowgirl', 'doggy', 'doggystyle', 'oral', 'blowjob', 'handjob', 'penetration', 'vaginal', 'anal', 'spooning', 'fingering', 'scissoring', 'grinding', 'sixty-nine', 'mating', 'nelson', 'wheelbarrow', 'facesitting', 'piledriver', 'lotus', 'strap-on', 'strapon', 'leapfrog', 'pretzel', 'amazon', 'paizuri', 'suspended'],
      options: [
        ['Missionary (Male)', maleVaginal('an adult woman lying on her back', 'missionary'), 'hetero, sex, vaginal, penis, missionary, penetration, faceless_male'],
        ['Missionary (Female)', femaleVaginal('an adult woman lying on her back', 'missionary'), 'yuri, sex, vaginal, strap-on, missionary, penetration'],
        ['Mating press (Male)', maleVaginal('an adult woman folded back', 'mating press'), 'hetero, sex, vaginal, penis, mating_press, folded, penetration, faceless_male'],
        ['Mating press (Female)', femaleVaginal('an adult woman folded back', 'mating press'), 'yuri, sex, vaginal, strap-on, mating_press, penetration'],
        ['Legs up (Male)', maleVaginal('an adult woman on her back with her legs up', 'legs up'), 'hetero, sex, vaginal, penis, legs_up, missionary, penetration, faceless_male'],
        ['Legs up (Female)', femaleVaginal('an adult woman on her back with her legs up', 'legs up'), 'yuri, sex, vaginal, strap-on, legs_up, penetration'],
        ['Legs over shoulders (Male)', maleVaginal('an adult woman on her back with her legs over his shoulders', 'legs over shoulders'), 'hetero, sex, vaginal, penis, legs_up, folded, penetration, faceless_male'],
        ['Legs over shoulders (Female)', femaleVaginal('an adult woman on her back with her legs raised high', 'legs over shoulders'), 'yuri, sex, vaginal, strap-on, legs_up, penetration'],
        ['From behind (Male)', maleVaginal('an adult woman bent forward', 'sex from behind'), 'hetero, sex, vaginal, penis, sex_from_behind, penetration, faceless_male'],
        ['From behind (Female)', femaleVaginal('an adult woman bent forward', 'sex from behind'), 'yuri, sex, vaginal, strap-on, sex_from_behind, penetration'],
        ['Doggystyle (Male)', maleVaginal('an adult woman on her hands and knees', 'doggystyle'), 'hetero, sex, vaginal, penis, doggystyle, sex_from_behind, penetration, faceless_male'],
        ['Doggystyle (Female)', femaleVaginal('an adult woman on her hands and knees', 'doggystyle'), 'yuri, sex, vaginal, strap-on, doggystyle, sex_from_behind, penetration'],
        ['Doggystyle, chest down (Male)', maleVaginal('an adult woman face down and ass up', 'doggystyle, chest down'), 'hetero, sex, vaginal, penis, doggystyle, top-down_bottom-up, sex_from_behind, penetration, faceless_male'],
        ['Doggystyle, chest down (Female)', femaleVaginal('an adult woman face down and ass up', 'doggystyle, chest down'), 'yuri, sex, vaginal, strap-on, doggystyle, top-down_bottom-up, penetration'],
        ['Standing doggystyle (Male)', maleVaginal('an adult woman standing and bent forward', 'standing doggystyle'), 'hetero, sex, vaginal, penis, doggystyle, standing_sex, sex_from_behind, penetration, faceless_male'],
        ['Standing doggystyle (Female)', femaleVaginal('an adult woman standing and bent forward', 'standing doggystyle'), 'yuri, sex, vaginal, strap-on, doggystyle, standing_sex, penetration'],
        ['Anal doggystyle (Male)', maleAnal('an adult woman on her hands and knees', 'anal doggystyle'), 'hetero, sex, anal, penis, doggystyle, sex_from_behind, penetration, faceless_male'],
        ['Anal doggystyle (Female)', femaleAnal('an adult woman on her hands and knees', 'anal doggystyle'), 'yuri, sex, anal, strap-on, doggystyle, penetration'],
        ['Bent over (Male)', maleVaginal('an adult woman bent over', 'bent over, sex from behind'), 'hetero, sex, vaginal, penis, bent_over, sex_from_behind, penetration, faceless_male'],
        ['Bent over (Female)', femaleVaginal('an adult woman bent over', 'bent over, sex from behind'), 'yuri, sex, vaginal, strap-on, bent_over, sex_from_behind, penetration'],
        ['Bent over a table (Male)', maleVaginal('an adult woman bent over a table', 'bent over a table, sex from behind'), 'hetero, sex, vaginal, penis, bent_over, sex_from_behind, penetration, faceless_male'],
        ['Bent over a table (Female)', femaleVaginal('an adult woman bent over a table', 'bent over a table, sex from behind'), 'yuri, sex, vaginal, strap-on, bent_over, sex_from_behind, penetration'],
        ['Bent over the bed (Male)', maleVaginal('an adult woman bent over the bed', 'bent over the bed, sex from behind'), 'hetero, sex, vaginal, penis, bent_over, on_bed, sex_from_behind, penetration, faceless_male'],
        ['Bent over the bed (Female)', femaleVaginal('an adult woman bent over the bed', 'bent over the bed, sex from behind'), 'yuri, sex, vaginal, strap-on, bent_over, on_bed, penetration'],
        ['On hands and knees (Male)', maleVaginal('an adult woman on her hands and knees', 'sex from behind'), 'hetero, sex, vaginal, penis, all_fours, sex_from_behind, penetration, faceless_male'],
        ['On hands and knees (Female)', femaleVaginal('an adult woman on her hands and knees', 'sex from behind'), 'yuri, sex, vaginal, strap-on, all_fours, sex_from_behind, penetration'],
        ['Leapfrog (Male)', maleVaginal('an adult woman in a leapfrog', 'leapfrog, sex from behind'), 'hetero, sex, vaginal, penis, all_fours, sex_from_behind, penetration, faceless_male'],
        ['Leapfrog (Female)', femaleVaginal('an adult woman in a leapfrog', 'leapfrog, sex from behind'), 'yuri, sex, vaginal, strap-on, all_fours, sex_from_behind, penetration'],
        ['Prone (Male)', maleVaginal('an adult woman lying face down', 'prone, sex from behind'), 'hetero, sex, vaginal, penis, prone_bone, sex_from_behind, penetration, faceless_male'],
        ['Prone (Female)', femaleVaginal('an adult woman lying face down', 'prone, sex from behind'), 'yuri, sex, vaginal, strap-on, prone_bone, penetration'],
        ['Prone bone (Male)', maleVaginal('an adult woman lying flat', 'prone bone'), 'hetero, sex, vaginal, penis, prone_bone, sex_from_behind, penetration, faceless_male'],
        ['Prone bone (Female)', femaleVaginal('an adult woman lying flat', 'prone bone'), 'yuri, sex, vaginal, strap-on, prone_bone, penetration'],
        ['Pillow under hips (Male)', maleVaginal('an adult woman lying with a pillow under her hips', 'sex from behind'), 'hetero, sex, vaginal, penis, sex_from_behind, penetration, faceless_male'],
        ['Pillow under hips (Female)', femaleVaginal('an adult woman lying with a pillow under her hips', 'sex from behind'), 'yuri, sex, vaginal, strap-on, sex_from_behind, penetration'],
        ['Standing from behind (Male)', maleVaginal('an adult woman standing and bent forward', 'standing sex from behind'), 'hetero, sex, vaginal, penis, standing_sex, sex_from_behind, penetration, faceless_male'],
        ['Standing from behind (Female)', femaleVaginal('an adult woman standing and bent forward', 'standing sex from behind'), 'yuri, sex, vaginal, strap-on, standing_sex, sex_from_behind, penetration'],
        ['Against the wall from behind (Male)', maleVaginal('an adult woman against a wall', 'against a wall, sex from behind'), 'hetero, sex, vaginal, penis, against_wall, sex_from_behind, penetration, faceless_male'],
        ['Against the wall from behind (Female)', femaleVaginal('an adult woman against a wall', 'against a wall, sex from behind'), 'yuri, sex, vaginal, strap-on, against_wall, sex_from_behind, penetration'],
        ['On a couch (Male)', maleVaginal('an adult woman kneeling on a couch', 'sex from behind'), 'hetero, sex, vaginal, penis, sex_from_behind, penetration, faceless_male'],
        ['On a couch (Female)', femaleVaginal('an adult woman kneeling on a couch', 'sex from behind'), 'yuri, sex, vaginal, strap-on, sex_from_behind, penetration'],
        ['Cowgirl (Male)', maleVaginal('an adult woman riding an adult male partner', 'cowgirl'), 'hetero, sex, vaginal, penis, girl_on_top, cowgirl_position, penetration, faceless_male'],
        ['Cowgirl (Female)', femaleVaginal('an adult woman riding an adult female partner', 'cowgirl'), 'yuri, sex, vaginal, strap-on, girl_on_top, cowgirl_position, penetration'],
        ['Reverse cowgirl (Male)', maleVaginal('an adult woman facing away and riding an adult male partner', 'reverse cowgirl'), 'hetero, sex, vaginal, penis, girl_on_top, reverse_cowgirl_position, penetration, faceless_male'],
        ['Reverse cowgirl (Female)', femaleVaginal('an adult woman facing away and riding an adult female partner', 'reverse cowgirl'), 'yuri, sex, vaginal, strap-on, reverse_cowgirl_position, penetration'],
        ['Squatting on top (Male)', maleVaginal('an adult woman squatting over an adult male partner', 'squatting cowgirl'), 'hetero, sex, vaginal, penis, girl_on_top, squatting, penetration, faceless_male'],
        ['Squatting on top (Female)', femaleVaginal('an adult woman squatting over an adult female partner', 'squatting cowgirl'), 'yuri, sex, vaginal, strap-on, girl_on_top, squatting, penetration'],
        ['Amazon (Male)', maleVaginal('an adult woman pinning an adult male partner and riding him', 'amazon'), 'hetero, sex, vaginal, penis, girl_on_top, penetration, faceless_male'],
        ['Amazon (Female)', femaleVaginal('an adult woman pinning an adult female partner and riding her', 'amazon'), 'yuri, sex, vaginal, strap-on, girl_on_top, penetration'],
        ['Anal cowgirl (Male)', maleAnal('an adult woman riding an adult male partner', 'anal cowgirl'), 'hetero, sex, anal, penis, girl_on_top, cowgirl_position, penetration, faceless_male'],
        ['Anal cowgirl (Female)', femaleAnal('an adult woman riding an adult female partner', 'anal cowgirl'), 'yuri, sex, anal, strap-on, cowgirl_position, penetration'],
        ['Against a wall (Male)', maleVaginal('an adult woman against a wall with one leg lifted', 'standing sex'), 'hetero, sex, vaginal, penis, against_wall, standing_sex, penetration, faceless_male'],
        ['Against a wall (Female)', femaleVaginal('an adult woman against a wall with one leg lifted', 'standing sex'), 'yuri, sex, vaginal, strap-on, against_wall, standing_sex, penetration'],
        ['Standing, one leg up (Male)', maleVaginal('an adult woman standing with one leg lifted', 'standing sex'), 'hetero, sex, vaginal, penis, standing_sex, penetration, faceless_male'],
        ['Standing, one leg up (Female)', femaleVaginal('an adult woman standing with one leg lifted', 'standing sex'), 'yuri, sex, vaginal, strap-on, standing_sex, penetration'],
        ['Suspended (Male)', maleVaginal('an adult woman held up off the ground', 'suspended congress'), 'hetero, sex, vaginal, penis, standing_sex, suspended_congress, penetration, faceless_male'],
        ['Suspended (Female)', femaleVaginal('an adult woman held up off the ground', 'suspended congress'), 'yuri, sex, vaginal, strap-on, standing_sex, suspended_congress, penetration'],
        ['On a chair (Male)', maleVaginal('an adult woman sitting on a chair facing an adult male partner', 'sitting sex'), 'hetero, sex, vaginal, penis, sitting, penetration, faceless_male'],
        ['On a chair (Female)', femaleVaginal('an adult woman sitting on a chair facing an adult female partner', 'sitting sex'), 'yuri, sex, vaginal, strap-on, sitting, penetration'],
        ['Spooning (Male)', maleVaginal('an adult woman on her side', 'spooning, sex from behind'), 'hetero, sex, vaginal, penis, spooning, sex_from_behind, penetration, faceless_male'],
        ['Spooning (Female)', femaleVaginal('an adult woman on her side', 'spooning, sex from behind'), 'yuri, sex, vaginal, strap-on, spooning, sex_from_behind, penetration'],
        ['From the side (Male)', maleVaginal('an adult woman lying on her side', 'sex from the side'), 'hetero, sex, vaginal, penis, on_side, penetration, faceless_male'],
        ['From the side (Female)', femaleVaginal('an adult woman lying on her side', 'sex from the side'), 'yuri, sex, vaginal, strap-on, on_side, penetration'],
        ['Pretzel (Male)', maleVaginal('an adult woman twisted on her side', 'pretzel'), 'hetero, sex, vaginal, penis, penetration, faceless_male'],
        ['Pretzel (Female)', femaleVaginal('an adult woman twisted on her side', 'pretzel'), 'yuri, sex, vaginal, strap-on, penetration'],
        ['Lotus (Male)', maleVaginal('an adult woman sitting in the lap of an adult male partner face to face', 'lotus'), 'hetero, sex, vaginal, penis, sitting, penetration, faceless_male'],
        ['Lotus (Female)', femaleVaginal('an adult woman sitting in the lap of an adult female partner face to face', 'lotus'), 'yuri, sex, vaginal, strap-on, sitting, penetration'],
        ['Edge of the bed (Male)', maleVaginal('an adult woman on the edge of a bed', 'standing sex'), 'hetero, sex, vaginal, penis, standing_sex, on_bed, penetration, faceless_male'],
        ['Edge of the bed (Female)', femaleVaginal('an adult woman on the edge of a bed', 'standing sex'), 'yuri, sex, vaginal, strap-on, standing_sex, on_bed, penetration'],
        ['Lap (Male)', maleVaginal('an adult woman straddling the lap of an adult male partner', 'lap sex'), 'hetero, sex, vaginal, penis, girl_on_top, sitting, penetration, faceless_male'],
        ['Lap (Female)', femaleVaginal('an adult woman straddling the lap of an adult female partner', 'lap sex'), 'yuri, sex, vaginal, strap-on, girl_on_top, sitting, penetration'],
        ['Full nelson (Male)', maleVaginal('an adult woman held in a full nelson', 'full nelson'), 'hetero, sex, vaginal, penis, full_nelson, penetration, faceless_male'],
        ['Full nelson (Female)', femaleVaginal('an adult woman held in a full nelson', 'full nelson'), 'yuri, sex, vaginal, strap-on, full_nelson, penetration'],
        ['Wheelbarrow (Male)', maleVaginal('an adult woman held in a wheelbarrow', 'wheelbarrow, sex from behind'), 'hetero, sex, vaginal, penis, sex_from_behind, penetration, faceless_male'],
        ['Wheelbarrow (Female)', femaleVaginal('an adult woman held in a wheelbarrow', 'wheelbarrow, sex from behind'), 'yuri, sex, vaginal, strap-on, sex_from_behind, penetration'],
        ['Piledriver (Male)', maleVaginal('an adult woman folded under an adult male partner', 'piledriver'), 'hetero, sex, vaginal, penis, piledriver, penetration, faceless_male'],
        ['Piledriver (Female)', femaleVaginal('an adult woman folded under an adult female partner', 'piledriver'), 'yuri, sex, vaginal, strap-on, piledriver, penetration'],
        ['Anal (Male)', maleAnal('an adult woman lying on her back', 'anal'), 'hetero, sex, anal, penis, penetration, faceless_male'],
        ['Anal (Female)', femaleAnal('an adult woman lying on her back', 'anal'), 'yuri, sex, anal, strap-on, penetration'],
        ['Anal from behind (Male)', maleAnal('an adult woman bent forward', 'anal from behind'), 'hetero, sex, anal, penis, sex_from_behind, penetration, faceless_male'],
        ['Anal from behind (Female)', femaleAnal('an adult woman bent forward', 'anal from behind'), 'yuri, sex, anal, strap-on, sex_from_behind, penetration'],
        ['Anal missionary (Male)', maleAnal('an adult woman lying on her back', 'anal missionary'), 'hetero, sex, anal, penis, missionary, penetration, faceless_male'],
        ['Anal missionary (Female)', femaleAnal('an adult woman lying on her back', 'anal missionary'), 'yuri, sex, anal, strap-on, missionary, penetration'],
        ['Receiving oral (Male)', 'an adult woman lying back, an adult male partner licking her pussy, his mouth on her pussy, cunnilingus, only his face out of frame or obscured', 'hetero, cunnilingus, oral, faceless_male'],
        ['Receiving oral (Female)', 'an adult woman lying back, an adult female partner licking her pussy, her mouth on her pussy, cunnilingus', 'yuri, cunnilingus, oral'],
        ['Giving oral (Male)', 'an adult woman with an adult male partner penis in her mouth, sucking his penis, fellatio, only his face out of frame or obscured', 'hetero, fellatio, penis, oral, faceless_male'],
        ['Giving oral (Female)', 'an adult woman licking an adult female partner pussy, cunnilingus', 'yuri, cunnilingus, oral'],
        ['Handjob (Male)', 'an adult woman stroking an adult male partner penis with her hand, her hand on his penis, handjob, only his face out of frame or obscured', 'hetero, handjob, penis, faceless_male'],
        ['Handjob (Female)', 'an adult woman stroking a strap-on worn by an adult female partner with her hand, handjob', 'yuri, handjob, strap-on'],
        ['Paizuri (Male)', 'an adult woman with an adult male partner penis between her breasts, paizuri, only his face out of frame or obscured', 'hetero, paizuri, penis, faceless_male'],
        ['Paizuri (Female)', 'an adult woman with a strap-on worn by an adult female partner between her breasts, paizuri', 'yuri, paizuri, strap-on'],
        ['Sixty-nine (Male)', 'an adult woman and an adult male partner in a sixty-nine, his penis in her mouth and his mouth on her pussy, only his face out of frame or obscured', 'hetero, 69, fellatio, cunnilingus, penis, faceless_male'],
        ['Sixty-nine (Female)', 'an adult woman and an adult female partner in a sixty-nine, each mouth on the other pussy', 'yuri, 69, cunnilingus'],
        ['Facesitting (Male)', 'an adult woman sitting on the face of an adult male partner, his mouth on her pussy, facesitting, his face obscured', 'hetero, facesitting, cunnilingus, faceless_male'],
        ['Facesitting (Female)', 'an adult woman sitting on the face of an adult female partner, that partner mouth on her pussy, facesitting', 'yuri, facesitting, cunnilingus'],
        ['Fingering (Male)', 'an adult male partner fingering an adult woman, his fingers inside her vagina, fingering, only his face out of frame or obscured', 'hetero, fingering, faceless_male'],
        ['Fingering (Female)', 'an adult female partner fingering an adult woman, her fingers inside her vagina, fingering', 'yuri, fingering'],
        ['Scissoring (Female)', 'an adult woman and an adult female partner scissoring, their pussies pressed together', 'yuri, tribadism'],
        ['After (Male)', 'an adult woman lying with an adult male partner after sex, bodies still together, only his face out of frame or obscured', 'hetero, after_sex, faceless_male'],
        ['After (Female)', 'an adult woman lying with an adult female partner after sex, bodies still together', 'yuri, after_sex'],
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
        ['American comic', 'american comic'],
        ['Manga', 'manga'],
        ['Ligne claire', 'ligne claire'],
        ['Painted comic', 'painted comic cover'],
        ['Noir comic', 'noir comic'],
        ['Halftone', 'halftone comic'],
        ['Graphic novel', 'graphic novel'],
        ['European comic', 'european comic'],
        ['Pinup', 'pinup illustration'],
        ['Airbrush', 'airbrush'],
        ['Screen tone', 'screen tone'],
        ['Concept art', 'concept art'],
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
        ['Hajime Sorayama', 'in the style of Hajime Sorayama', 'hajime_sorayama', 'Illustration'],
        ['Jim Lee', 'in the style of Jim Lee', 'jim_lee', 'Comics'],
        ['Alex Ross', 'in the style of Alex Ross', 'alex_ross', 'Comics'],
        ['Todd McFarlane', 'in the style of Todd McFarlane', 'todd_mcfarlane', 'Comics'],
        ['Frank Miller', 'in the style of Frank Miller', 'frank_miller', 'Comics'],
        ['Mike Mignola', 'in the style of Mike Mignola', 'mike_mignola', 'Comics'],
        ['Adam Hughes', 'in the style of Adam Hughes', 'adam_hughes', 'Comics'],
        ['J. Scott Campbell', 'in the style of J. Scott Campbell', 'j_scott_campbell', 'Comics'],
        ['Frank Cho', 'in the style of Frank Cho', 'frank_cho', 'Comics'],
        ['Peach Momoko', 'in the style of Peach Momoko', 'peach_momoko', 'Comics'],
        ['Bruce Timm', 'in the style of Bruce Timm', 'bruce_timm', 'Comics'],
        ['Jack Kirby', 'in the style of Jack Kirby', 'jack_kirby', 'Comics'],
        ['Steve Ditko', 'in the style of Steve Ditko', 'steve_ditko', 'Comics'],
        ['John Buscema', 'in the style of John Buscema', 'john_buscema', 'Comics'],
        ['John Romita Jr.', 'in the style of John Romita Jr.', 'john_romita_jr', 'Comics'],
        ['Neal Adams', 'in the style of Neal Adams', 'neal_adams', 'Comics'],
        ['Travis Charest', 'in the style of Travis Charest', 'travis_charest', 'Comics'],
        ['Joe Madureira', 'in the style of Joe Madureira', 'joe_madureira', 'Comics'],
        ['Greg Capullo', 'in the style of Greg Capullo', 'greg_capullo', 'Comics'],
        ['Esad Ribic', 'in the style of Esad Ribic', 'esad_ribic', 'Comics'],
        ['Fiona Staples', 'in the style of Fiona Staples', 'fiona_staples', 'Comics'],
        ['Jen Bartel', 'in the style of Jen Bartel', 'jen_bartel', 'Comics'],
        ['Joelle Jones', 'in the style of Joelle Jones', 'joelle_jones', 'Comics'],
        ['Bryan Hitch', 'in the style of Bryan Hitch', 'bryan_hitch', 'Comics'],
        ['Geof Darrow', 'in the style of Geof Darrow', 'geof_darrow', 'Comics'],
        ['Bill Sienkiewicz', 'in the style of Bill Sienkiewicz', 'bill_sienkiewicz', 'Comics'],
        ['Dave McKean', 'in the style of Dave McKean', 'dave_mckean', 'Comics'],
        ['Enki Bilal', 'in the style of Enki Bilal', 'enki_bilal', 'Comics'],
        ['Milo Manara', 'in the style of Milo Manara', 'milo_manara', 'Comics'],
        ['Paolo Serpieri', 'in the style of Paolo Serpieri', 'paolo_serpieri', 'Comics'],
        ['Guido Crepax', 'in the style of Guido Crepax', 'guido_crepax', 'Comics'],
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
    {
      id: 'atmosphere',
      label: 'Atmosphere',
      match: 'selected',
      keys: [],
      options: [
        ['Golden hour', 'at golden hour'],
        ['Blue hour', 'at blue hour'],
        ['Night', 'at night'],
        ['Midday', 'at midday'],
        ['Overcast', 'under an overcast sky'],
        ['Fog', 'in fog'],
        ['Rain', 'in the rain'],
        ['Snowfall', 'in falling snow'],
        ['Candlelight', 'by candlelight'],
        ['Neon glow', 'in neon glow'],
        ['Storm', 'in a storm'],
        ['Dusty air', 'in dusty air'],
      ],
    },
    {
      id: 'color',
      label: 'Color',
      match: 'selected',
      keys: [],
      options: [
        ['Warm grade', 'warm grade'],
        ['Cool grade', 'cool grade'],
        ['Teal and orange', 'teal and orange'],
        ['Monochrome', 'monochrome'],
        ['Muted palette', 'muted palette'],
        ['Vivid palette', 'vivid palette'],
        ['Pastel palette', 'pastel palette'],
        ['High contrast', 'punched contrast'],
      ],
    },
    {
      id: 'motion',
      label: 'Motion',
      videoOnly: true,
      keys: ['thrusting', 'thrust', 'thrusts', 'grinding', 'grind', 'bouncing', 'bounce', 'rocking', 'bobbing', 'stroking', 'strokes', 'pounding', 'twerking', 'swaying', 'pulsing', 'fingering', 'riding', 'gyrating', 'clenching', 'twitching', 'in and out'],
      options: [
        ['Slow thrusts', 'two adults thrusting slowly'],
        ['Deep thrusts', 'two adults thrusting deep'],
        ['Fast thrusts', 'two adults thrusting fast'],
        ['Hard thrusts', 'two adults thrusting hard'],
        ['Shallow thrusts', 'two adults, shallow thrusts'],
        ['Pounding', 'two adults pounding'],
        ['Long strokes', 'two adults, long strokes'],
        ['In and out', 'two adults moving in and out'],
        ['Hip snaps', 'two adults thrusting, hips snapping forward'],
        ['Pulling closer', 'two adults pulling closer with each thrust'],
        ['Held and thrusting', 'two adults, one held in place while the other thrusts'],
        ['Hip rolls', 'an adult rolling their hips'],
        ['Circular hips', 'an adult moving their hips in a circle'],
        ['Grinding', 'two adults grinding together'],
        ['Slow grind', 'two adults grinding slowly'],
        ['Side grind', 'two adults grinding side to side'],
        ['Bouncing', 'an adult bouncing'],
        ['Riding', 'two adults, one riding, rising and falling'],
        ['Rocking', 'two adults rocking together'],
        ['Swaying hips', 'an adult swaying their hips'],
        ['Up and down', 'an adult moving up and down'],
        ['Body wave', 'an adult rolling a wave through their body'],
        ['Pulsing', 'an adult pulsing their hips'],
        ['Gyrating', 'an adult gyrating their hips'],
        ['Twerking', 'an adult twerking'],
        ['Clenching', 'an adult clenching and releasing'],
        ['Twitching', 'an adult hips twitching after each thrust'],
        ['Oral bobbing', 'an adult bobbing during oral sex'],
        ['Hand stroking', 'an adult stroking with one hand'],
        ['Fingering', 'an adult fingering, fingers moving'],
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

  function cleanDetail(text) {
    return String(text || '').replace(/[,_]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function readDetail(menuId) {
    const color = document.getElementById('extra-' + menuId + '-color');
    const pattern = document.getElementById('extra-' + menuId + '-pattern');
    return {
      color: color ? cleanDetail(color.value) : '',
      pattern: pattern ? cleanDetail(pattern.value) : '',
    };
  }

  function articleFor(word) {
    return /^[aeiou]/i.test(String(word || '').trim()) ? 'an' : 'a';
  }

  function paintClothing(phrase, color, pattern, already) {
    if (/^(fully nude|topless|bottomless|naked)\b/i.test(String(phrase || '').trim())) return phrase;
    const bits = [];
    [color, pattern].forEach(function (word) {
      const clean = cleanDetail(word);
      if (!clean) return;
      if (already && already(clean)) return;
      if (hasAny(phrase, [clean])) return;
      bits.push(clean);
    });
    if (!bits.length) return phrase;
    const extra = bits.join(' ');
    const article = articleFor(bits[0]);
    let match = phrase.match(/^(wearing only )(a|an) (.+)$/i);
    if (match) return match[1] + article + ' ' + extra + ' ' + match[3];
    match = phrase.match(/^(wearing )(a|an) (.+)$/i);
    if (match) return match[1] + article + ' ' + extra + ' ' + match[3];
    match = phrase.match(/^(wearing )(.+)$/i);
    if (match) return match[1] + extra + ' ' + match[2];
    match = phrase.match(/^(a|an) (.+)$/i);
    if (match) return article + ' ' + extra + ' ' + match[2];
    return extra + ' ' + phrase;
  }

  function selectedAdds(input, category) {
    const adds = [];
    MENUS.forEach(function (menu) {
      if (menu.videoOnly && category !== 'video') return;
      const select = document.getElementById('extra-' + menu.id);
      if (!select || !select.value) return;
      const option = menu.options.find(function (item) { return item[1] === select.value; });
      const phrase = option ? option[1] : select.value;
      const tag = option && option[2] ? option[2] : '';
      const keys = keysFor(menu, phrase, tag);
      if (hasAny(input, keys)) return;
      const clothing = menu.id === 'wardrobe' || menu.id === 'lingerie';
      const detail = clothing ? readDetail(menu.id) : { color: '', pattern: '' };
      adds.push({
        id: menu.id,
        label: menu.label,
        keys: keys,
        text: phrase,
        tag: tag,
        clothing: clothing,
        color: detail.color,
        pattern: detail.pattern,
      });
    });
    return adds;
  }

  function renderAdd(add, format) {
    if (add.tag && format !== 'natural') {
      if (format === 'danbooru') {
        return add.tag.split(',').map(function (part) {
          return part.trim().replace(/\s+/g, '_');
        }).filter(Boolean).join(', ');
      }
      return add.tag.replace(/_/g, ' ');
    }
    return formatPhrase(add.text, format);
  }

  function apply(prompts, input, format, category) {
    const adds = selectedAdds(input, category);
    if (!adds.length) return { prompts: prompts, notes: [] };
    const used = {};
    const next = (prompts || []).map(function (prompt) {
      const sexParts = [];
      const restParts = [];
      adds.forEach(function (add) {
        if (hasAny(prompt, add.keys)) return;
        const text = add.clothing
          ? paintClothing(add.text, add.color, add.pattern, function (word) {
            return hasAny(String(input || '') + '\n' + String(prompt || ''), [word]);
          })
          : add.text;
        const rendered = renderAdd({ text: text, tag: add.tag }, format);
        if (add.id === 'sex-scene') sexParts.push(rendered);
        else restParts.push(rendered);
        used[add.label] = true;
      });
      if (!sexParts.length && !restParts.length) return prompt;
      let body = String(prompt || '').replace(/\s+$/, '').replace(/[.\s]*$/, '');
      if (sexParts.length) body = body ? sexParts.join(', ') + ', ' + body : sexParts.join(', ');
      if (restParts.length) body = body ? body + ', ' + restParts.join(', ') : restParts.join(', ');
      return body;
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
    const hint = menu.videoOnly ? ' title="Added only for video models"' : '';
    const field = '<label class="extra-field"' + hint + '><span>' + escapeHtml(menu.label) + '</span><select id="extra-' + menu.id + '">' + options.join('') + '</select></label>';
    if (menu.id !== 'wardrobe' && menu.id !== 'lingerie') return field;
    return '<div class="extra-clothing">' + field + renderDetail(menu.id, 'Color', saved) + renderDetail(menu.id, 'Pattern', saved) + '</div>';
  }

  function renderDetail(menuId, label, saved) {
    const kind = label.toLowerCase();
    const value = saved[menuId + label] || '';
    return '<label class="extra-field extra-detail"><span>' + escapeHtml(label) + '</span><input type="text" id="extra-' + menuId + '-' + kind + '" value="' + escapeHtml(value) + '" placeholder="Type a ' + kind + '" autocomplete="off" spellcheck="false"></label>';
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
      '<p class="extra-note">A choice is added when you generate, and only when that idea is not already in the prompt you typed. Color and pattern are typed beside Wardrobe and Lingerie and added to that clothing only. A sex scene is placed at the start of the prompt and names the sex act. On a male partner sex scene, his face is out of frame or obscured. Motion is added only for a video model.</p>',
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
    function persistExtras() {
      const values = {};
      MENUS.forEach(function (menu) {
        const select = document.getElementById('extra-' + menu.id);
        if (select && select.value) values[menu.id] = select.value;
      });
      ['wardrobe', 'lingerie'].forEach(function (id) {
        const detail = readDetail(id);
        if (detail.color) values[id + 'Color'] = detail.color;
        if (detail.pattern) values[id + 'Pattern'] = detail.pattern;
      });
      saveSaved(values);
    }
    modal.addEventListener('change', persistExtras);
    modal.addEventListener('input', persistExtras);
    function open() { modal.hidden = false; }
    window.PromptForgeExtras.open = open;
  }

  window.PromptForgeExtras = { apply: apply, menus: MENUS, open: function () {} };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
