#!/usr/bin/env bash
# Build + render one or more episodes end to end.
#   scripts/sitcom/make_episode.sh <topic-id> [<topic-id> ...]
# Output: public/videos/<topic>.mp4 and public/videos/posters/<topic>.jpg (+ out/<topic>/asr.txt QA report)
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd ../.. && pwd)"
export NODE_PATH="${NODE_PATH:-$(npm root -g)}"
python3 -c "import kokoro_onnx, soundfile, faster_whisper" 2>/dev/null || pip install -q kokoro-onnx soundfile faster-whisper
REL=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -s kokoro-v1.0.onnx ] || curl -sSL -o kokoro-v1.0.onnx "$REL/kokoro-v1.0.onnx"
[ -s voices-v1.0.bin ] || curl -sSL -o voices-v1.0.bin "$REL/voices-v1.0.bin"
mkdir -p "$ROOT/public/videos/posters"
for T in "$@"; do
  echo "=== $T: lint"; python3 lint_episode.py "episodes/$T.py"
  echo "=== $T: voices + timeline"; python3 build.py "episodes/$T.py" "out/$T"
  echo "=== $T: speech QA"; python3 asr.py "episodes/$T.py" > "out/$T/asr.txt" 2>/dev/null || echo "asr skipped"
  echo "=== $T: frames"; rm -f out/$T/part*.mp4; node render.mjs "out/$T" --workers "$(nproc)"
  echo "=== $T: encode"
  ffmpeg -y -loglevel error -f concat -safe 0 -i "out/$T/parts.txt" -i "out/$T/audio.wav" \
    -c:v copy \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 48000 -c:a aac -b:a 128k -movflags +faststart -shortest \
    "$ROOT/public/videos/$T.mp4"
  node render.mjs "out/$T" --poster "$ROOT/public/videos/posters/$T.jpg"
  rm -f out/$T/part*.mp4
  echo "=== $T: done $(du -h "$ROOT/public/videos/$T.mp4" | cut -f1) $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$ROOT/public/videos/$T.mp4")s"
done
