# PromptForge

Desktop app for writing ComfyUI prompts. Type a word or paste a prompt, pick a local model, and copy a prompt in that model's format.

PromptForge opens its own window. It does not run a website, and prompt text stays on this PC.

## Run

```powershell
npm install
npm start
```

A desktop shortcut named PromptForge points at the same app after the first setup on this machine.

## What it does

- Searchable image and video model list, with the daily ComfyUI models first
- Danbooru, Gelbooru, or natural language, chosen from the model
- Automatic spelling fixes, then a prompt cleanup: tag order, shorthand, filler, and a light cue when the prompt has none
- Single-word variations, and paste-to-optimize for a full prompt
- Ultra variation: on a full prompt, an extra card keeps the scene and adds a few implied details
- Quality tags and negative prompt toggles
- Character templates: save a description (age, gender, race, hair, eyes, face, makeup, nails, skin, body, breasts, ass, vagina, penis, clothing, style) and insert it in the current format
- Camera angles and lenses: insert the angle or lens in natural language or tags
- Negative builder: category checkboxes, custom tags, and saved presets, merged into the model negative
- More variations: another set from the same prompt, with a different light and framing
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
