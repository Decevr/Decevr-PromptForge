# Decevr's PromptForge

Desktop app for writing ComfyUI prompts. Type a word or paste a prompt, pick a local model, and copy a prompt in that model's format.

Decevr's PromptForge opens its own window. It does not run a website, and prompt text stays on this PC.

## Run

```powershell
npm install
npm start
```

A desktop shortcut named Decevr's PromptForge points at the same app after the first setup on this machine.

## What it does

- Searchable image and video model list, with the daily ComfyUI models first
- Danbooru, Gelbooru, or natural language, chosen from the model
- Automatic spelling fixes, then a prompt cleanup: tag order, shorthand, filler, and a light cue when the prompt has none
- Single-word variations, and paste-to-optimize for a full prompt
- Ultra variation: on a full prompt, an extra card keeps the scene and adds a few implied details
- Random prompt creation: another card builds a full scene from your keywords. `1girl` or `1boy` becomes one random adult, 21 or older
- Character templates can save a random female or male adult from the Characters panel
- Quality tags and negative prompt toggles
- Character templates: save a description (age, gender, race, hair, eyes, face, lips, makeup, nails, skin, freckles, moles, scars, birthmarks, piercings, tattoos, body, breasts, nipple color, ass, hips, waist, stomach, thighs, shoulders, back, arms, hands, feet, vagina, penis, pubic hair, clothing, style) and insert it in the current format
- Camera angles, lenses, and stealth shots: insert the angle, lens, or stealth scene in natural language or tags. Stealth shots describe an adult act and do not name a camera
- Negative builder: category checkboxes, custom tags, and saved presets, merged into the model negative
- More variations opens a panel. Generate another set is inside that panel. The menus add a hairstyle, expression, background, scenery, action, wardrobe, lingerie, pose, sexual pose, sex scene, artist style, artist, atmosphere, color grade, or, on a video model, a sexual motion only when one is selected and that idea is not already in the typed prompt. The artist list includes illustration, comics, painting, and photography. Artist names are written as a style phrase in natural language and as the artist tag on Danbooru and Gelbooru
- Searchable history
- Copy on every prompt, Copy All, and selectable prompt text
- Weight helper: select text, then apply `(tag:1.2)`
- Suggested steps, CFG, and sampler under each result
- Local history, starred favorites, and text or JSON export
- Ctrl+Enter generates

## Models and concepts

Edit `renderer/data/models.js` to add a model. Each entry has `preferredFormat`, `qualityTags`, `negativeTemplate`, `variationStyle`, and `recommendedSettings`.

Concept expansions live in `renderer/data/variations.js`. An unknown word still gets framing, light, and mood variations from the engine.

## Check

```powershell
npm run check
```

## Pack

`npm run pack` writes two files in `release`. `Decevr's PromptForge Setup 0.1.0.exe` is the installer. It adds a Start menu shortcut, a desktop shortcut, and an uninstaller, and it lets the person choose the folder. `Decevr's PromptForge.exe` is the portable app.
