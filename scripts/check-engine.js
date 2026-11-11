const { models } = require('../renderer/data/models');
const { concepts } = require('../renderer/data/variations');
const { createEngine } = require('../renderer/engine');

const engine = createEngine(concepts);
let failed = 0;

function assert(condition, message) {
  if (condition) return;
  failed += 1;
  console.error('FAIL: ' + message);
}

const illus = models.find((model) => model.id === 'illustrious');
const flux = models.find((model) => model.id === 'flux1');
const wan = models.find((model) => model.id === 'wan22-14b');
const pony = models.find((model) => model.id === 'pony');

const empty = engine.generate({ input: '   ', model: illus });
assert(empty.error, 'empty input returns an error');

const eyes = engine.generate({
  input: 'eyes',
  model: illus,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: true,
});
assert(eyes.prompts.length >= 5, 'eyes on Illustrious returns several variations');
assert(eyes.prompts[0].includes('close-up'), 'first Illustrious eyes prompt has close-up');
assert(eyes.prompts[0].includes('sparkling_eyes'), 'Danbooru uses sparkling_eyes');
assert(eyes.prompts[0].startsWith('masterpiece, best quality, very aesthetic'), 'quality tags stay literal and lead');
assert(eyes.negative.includes('bad hands'), 'anime negative is included');
assert(eyes.prompts[1].includes('heterochromia'), 'second variation is heterochromia');
assert(eyes.settingsLine.includes('CFG 5.5'), 'settings line is present');

const gel = engine.generate({
  input: 'eyes',
  model: illus,
  formatOverride: 'gelbooru',
  addQuality: false,
  includeNegative: false,
});
assert(gel.prompts[0].includes('sparkling eyes'), 'Gelbooru keeps spaces');
assert(!gel.prompts[0].includes('sparkling_eyes'), 'Gelbooru does not force underscores');

const fluxEyes = engine.generate({
  input: 'eyes',
  model: flux,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
});
assert(/extreme close-up/i.test(fluxEyes.prompts[0]), 'Flux eyes prompt is a sentence');
assert(!fluxEyes.prompts[0].includes('masterpiece'), 'Flux does not get anime quality tags');
assert(fluxEyes.negative === '', 'negative stays off when the toggle is off');

const ponyEyes = engine.generate({
  input: 'eyes',
  model: pony,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: true,
});
assert(
  ponyEyes.prompts[0].startsWith('score_9, score_8_up, score_7_up, source_anime'),
  'Pony score tags lead',
);

const city = engine.generate({
  input: 'cyberpunk city',
  model: wan,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(/cyberpunk/i.test(city.prompts[0]), 'Wan keeps the cyberpunk subject');
assert(/camera|shot|push|drift|tracking/i.test(city.prompts[0]), 'Wan variation includes a camera cue');

const pasted = engine.generate({
  input: '1girl, blue eyes, smile, standing, rain, neon city, looking at viewer',
  model: illus,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
});
assert(pasted.mode === 'optimize', 'comma prompt is optimized instead of expanded');
assert(pasted.prompts[0].includes('masterpiece'), 'optimized tag prompt gains quality tags');
assert(pasted.prompts[0].includes('blue_eyes'), 'optimized Danbooru uses blue_eyes');
assert(pasted.prompts.length >= 2, 'optimize returns alternates');

const prose = engine.generate({
  input: 'A woman with silver hair standing in the rain on a neon street, cinematic lighting, shallow depth of field',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(prose.mode === 'optimize', 'a full sentence is optimized');
assert(!prose.prompts[0].includes('_'), 'Flux optimize stays in prose');
assert(/silver hair|woman/i.test(prose.prompts[0]), 'Flux optimize keeps the subject');

const golden = engine.generate({
  input: 'golden eyes',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(/golden eyes/i.test(golden.prompts[0]), 'specific phrase is woven into the variation');

const typo = engine.generate({
  input: 'eys',
  model: illus,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
});
assert(typo.prompts[0].includes('sparkling_eyes'), 'misspelled eys still finds the eyes variations');
assert(typo.notes.some((note) => /eys → eyes/i.test(note)), 'spelling note reports eys → eyes');

const literal = engine.generate({
  input: 'eys',
  model: illus,
  formatOverride: 'auto',
  correctSpelling: false,
  improvePrompt: false,
  addQuality: false,
  includeNegative: false,
});
assert(!literal.prompts[0].includes('sparkling_eyes'), 'spelling stays off when the toggle is off');

const messyTags = engine.generate({
  input: 'beatiful, 1 girl, smile, rain, blue eys',
  model: illus,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
});
assert(messyTags.prompts[0].includes('1girl'), 'count tags are joined');
assert(messyTags.prompts[0].includes('blue_eyes'), 'eye typo inside a tag prompt is fixed');
assert(messyTags.prompts[0].includes('beautiful'), 'beatiful is corrected');
assert(messyTags.prompts[0].indexOf('1girl') < messyTags.prompts[0].indexOf('rain'), 'subject tags come before the setting');
assert(messyTags.notes.some((note) => /beatiful → beautiful/i.test(note)), 'tag spelling is listed');

const messyProse = engine.generate({
  input: 'really a picture of a woman standing in the the rain',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(/^A woman standing in the rain/i.test(messyProse.prompts[0]), 'prose starts on the subject');
assert(!/really|picture of|the the/i.test(messyProse.prompts[0]), 'filler and repeated words are gone');
assert(/soft natural light/i.test(messyProse.prompts[0]), 'a light cue is added when the prompt has none');
assert(messyProse.notes.some((note) => /filler/i.test(note)), 'filler removal is listed');
assert(messyProse.prompts.length >= 3, 'a long prompt makes three suggestions');
assert(/dramatic side light/i.test(messyProse.prompts[1]), 'suggestion 2 swaps the lighting');
assert(!/soft natural light/i.test(messyProse.prompts[1]), 'suggestion 2 does not keep the original light');
assert(/tight close-up/i.test(messyProse.prompts[2]), 'suggestion 3 changes the framing');
assert(messyProse.notes.some((note) => /Suggestion 2 changes the lighting/.test(note)), 'lighting suggestion is noted');
assert(messyProse.notes.some((note) => /Suggestion 3 changes the framing/.test(note)), 'framing suggestion is noted');

const spelling = require('../renderer/data/spelling');
function corrected(word) {
  return spelling.correctText(word).text;
}
assert(corrected('protrait') === 'portrait', 'protrait corrects to portrait');
assert(corrected('beuatiful') === 'beautiful', 'beuatiful corrects to beautiful');
assert(corrected('haor') === 'hair', 'haor corrects to hair');
assert(corrected('eeys') === 'eyes', 'eeys corrects to eyes');
assert(corrected('backgorund') === 'background', 'backgorund corrects to background');
assert(corrected('post') === 'post', 'post stays post');
assert(corrected('shop') === 'shop', 'shop stays shop');
assert(corrected('angel') === 'angel', 'angel stays angel');
assert(corrected('form') === 'form', 'form stays form');

assert(messyTags.prompts.length >= 3, 'tag prompt keeps three suggestions');
assert(/dramatic_lighting/i.test(messyTags.prompts[1]), 'tag suggestion 2 swaps in dramatic lighting');
assert(/close-up/i.test(messyTags.prompts[2]), 'tag suggestion 3 adds a new framing');
assert(messyTags.prompts[1] !== messyTags.prompts[0], 'tag lighting suggestion differs');
assert(messyTags.prompts[2] !== messyTags.prompts[0], 'tag framing suggestion differs');

const detailed = engine.generate({
  input: 'golden eyes',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
  ultraDetailed: true,
});
assert(detailed.prompts.every((prompt) => /ultra detailed/i.test(prompt)), 'ultra detailed is added to every natural prompt');
assert(detailed.notes.some((note) => /ultra detailed/i.test(note)), 'ultra detailed is noted');

const ponyDetailed = engine.generate({
  input: 'eyes',
  model: pony,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
  ultraDetailed: true,
});
assert(
  ponyDetailed.prompts[0].startsWith('score_9, score_8_up, score_7_up, source_anime, ultra detailed'),
  'ultra detailed follows the Pony score tags',
);

const plain = engine.generate({
  input: 'golden eyes',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(!/ultra detailed/i.test(plain.prompts[0]), 'ultra detailed stays off unless asked');

const customNeg = engine.generate({
  input: 'eyes',
  model: illus,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: true,
  negativeExtra: 'watermark, extra people, blurry',
});
assert(customNeg.negative.includes('extra people'), 'custom negative tags are added');
assert(customNeg.negative.includes('bad hands'), 'model negative stays');
assert((customNeg.negative.match(/watermark/gi) || []).length === 1, 'duplicate negative tags are removed');
assert(customNeg.notes.some((note) => /custom negative/i.test(note)), 'custom negative is noted');

const more = engine.generate({
  input: 'eyes',
  model: illus,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
  variationOffset: 1,
});
assert(more.prompts[0] !== eyes.prompts[0], 'another variation set changes the first prompt');
assert(/golden hour|cool rim light|studio lighting|moonlight|neon/i.test(more.prompts.join(' ')), 'another set adds a new light cue');
assert(more.notes.some((note) => /Variation set 2/.test(note)), 'variation set is noted');

const forest = engine.generate({
  input: 'a woman standing in the forest at night',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(forest.ultraIndex > 0, 'full prompt has an ultra variation index');
assert(/moonlight through the trees/i.test(forest.prompts[forest.ultraIndex]), 'ultra variation adds moonlight');
assert(/wet leaves/i.test(forest.prompts[forest.ultraIndex]), 'ultra variation adds wet leaves');
assert(/mist/i.test(forest.prompts[forest.ultraIndex]), 'ultra variation adds mist');
assert(!/wet leaves/i.test(forest.prompts[0]), 'the cleaned prompt stays without the extra details');
assert(forest.notes.some((note) => /Ultra variation adds/.test(note)), 'added details are noted');
assert(!/\b(girl|man|boy|another woman|2girls)\b/i.test(forest.prompts[forest.ultraIndex].replace(/woman/gi, '')), 'ultra variation does not add a person');

const dryForest = engine.generate({
  input: 'a woman standing in the dry forest at night',
  model: flux,
  formatOverride: 'auto',
  addQuality: false,
  includeNegative: false,
});
assert(!/wet leaves/i.test(dryForest.prompts[dryForest.ultraIndex]), 'dry scene does not gain wet leaves');

const tagForest = engine.generate({
  input: '1girl, standing, forest, night',
  model: illus,
  formatOverride: 'auto',
  addQuality: true,
  includeNegative: false,
});
assert(/moonlight_through_the_trees/.test(tagForest.prompts[tagForest.ultraIndex]), 'tag ultra variation uses underscores');
assert(tagForest.prompts[0].startsWith('masterpiece'), 'quality tags still lead the cleaned card');

if (failed) {
  console.error(failed + ' check(s) failed');
  process.exit(1);
}

console.log('engine checks passed');
console.log(eyes.prompts[0]);
console.log(fluxEyes.prompts[0]);
console.log(city.prompts[0]);
