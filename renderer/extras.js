(function () {
  const STORAGE_KEY = 'promptforge.extras.v1';
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
      keys: ['wearing', 'clothes', 'clothing', 'dress', 'shirt', 'skirt', 'outfit', 'nude', 'naked', 'lingerie', 'jacket', 'suit', 'robe', 'jeans', 'swimsuit', 'underwear', 'costume', 'coat', 'pants', 'bra', 'panties', 'wardrobe', 'corset', 'bodysuit', 'kimono', 'yukata', 'hoodie', 'armor', 'bikini', 'latex', 'harness', 'fishnets', 'gown', 'qipao', 'cape', 'cloak', 'towel', 'apron', 'boots', 'heels', 'tuxedo', 'sweater', 'sundress', 'gloves', 'topless', 'bottomless', 'bunny', 'stockings', 'blazer', 'trench', 'turtleneck'],
      options: [
        ['Casual clothes', 'wearing casual clothes'],
        ['Evening dress', 'wearing an evening dress'],
        ['Cocktail dress', 'wearing a cocktail dress'],
        ['Ball gown', 'wearing a ball gown'],
        ['Sundress', 'wearing a sundress'],
        ['Lingerie', 'wearing lingerie'],
        ['Bra and panties', 'wearing a bra and panties'],
        ['Corset', 'wearing a corset'],
        ['Garter stockings', 'wearing stockings and a garter'],
        ['Bodysuit', 'wearing a bodysuit'],
        ['Bodystocking', 'wearing a bodystocking'],
        ['Harness', 'wearing a harness'],
        ['Fishnets', 'wearing fishnets'],
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
      keys: ['sex', 'fucking', 'intercourse', 'missionary', 'cowgirl', 'doggy', 'doggystyle', 'oral', 'blowjob', 'handjob', 'penetration', 'vaginal', 'anal', 'spooning', 'fingering', 'scissoring', 'grinding', 'sixty-nine'],
      options: [
        ['Missionary', 'two adults having sex, missionary'],
        ['Cowgirl', 'two adults having sex, cowgirl'],
        ['Reverse cowgirl', 'two adults having sex, reverse cowgirl'],
        ['From behind', 'two adults having sex, from behind'],
        ['On a chair', 'two adults having sex, one seated, the other straddling'],
        ['Against a wall', 'two adults having sex, standing against a wall'],
        ['Spooning', 'two adults having sex, spooning'],
        ['From the side', 'two adults having sex, lying on their sides'],
        ['Face to face', 'two adults having sex, facing each other, one riding'],
        ['Prone', 'two adults having sex, one lying face down'],
        ['Anal', 'two adults having sex, anal'],
        ['Oral', 'an adult kneeling, oral sex'],
        ['Sixty-nine', 'two adults, oral sex, sixty-nine'],
        ['Hand between the thighs', 'an adult, one hand between the thighs'],
        ['Fingering', 'an adult fingering'],
        ['Scissoring', 'two adults grinding together'],
        ['Standing together', 'two adults having sex, standing, one leg lifted'],
        ['After', 'two adults lying together after sex'],
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
