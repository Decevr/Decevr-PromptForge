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

if (failed) {
  console.error(failed + ' check(s) failed');
  process.exit(1);
}

console.log('engine checks passed');
console.log(eyes.prompts[0]);
console.log(fluxEyes.prompts[0]);
console.log(city.prompts[0]);
