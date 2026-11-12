# Sitcom episodes — "Totally Raotional"

Animated, voiced sitcom episodes (one per topic) rendered to MP4. Original cast:
Tara (12, deadpan), Mum (deal hunter), Dad (self-described financial genius),
and Centi, the 100-eyed calculator monster who lives in the junk drawer.

Pipeline (all local, no paid APIs):

1. `episodes/<topic>.py` — the script: beats of dialogue, moods, camera shots, holo-board lines,
   SFX, freeze-frames, pause-challenges.
2. `build.py` — Kokoro neural TTS per line (cached), lip-sync envelopes, synthesized SFX +
   ukulele bed with ducking → `out/<topic>/audio.wav` + `timeline.json`.
3. `render.html` + `render.mjs` — Canvas renderer driven by `renderAt(t)`; Playwright renders
   every frame deterministically (4 workers) → x264.
4. `asr.py` — Whisper transcription of every line to catch mispronunciations before rendering.

```bash
cd scripts/sitcom
pip install kokoro-onnx soundfile faster-whisper
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
python3 build.py episodes/percentages.py out/percentages
python3 asr.py episodes/percentages.py            # optional QA
node render.mjs out/percentages --stills 10,60,120  # preview frames
node render.mjs out/percentages --workers 4
ffmpeg -f concat -safe 0 -i out/percentages/parts.txt -i out/percentages/audio.wav \
  -c:v copy -c:a aac -b:a 160k -movflags +faststart -shortest ../../public/videos/percentages-ep1.mp4
```

Writing tips learned on Ep 1: write numbers as words; say "zero point seven" (not "nought" —
it sounds like "not"); avoid "One. Percent…" (heard as "one percent").
