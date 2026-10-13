#!/usr/bin/env bash
# Join MP4 parts (intro + lesson + outro) into one video, re-encoded to the same size/fps/audio.
# Usage: bash join.sh final.mp4 part1.mp4 part2.mp4 [part3.mp4 ...]
set -e; out="$1"; shift; n=$#; [ $n -ge 2 ] || { echo "usage: join.sh out.mp4 a.mp4 b.mp4 ..."; exit 1; }
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$1"); H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$1")
args=(); f=""; i=0
for p in "$@"; do args+=(-i "$p")
  if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$p" | grep -q .; then a="[$i:a]aresample=48000,aformat=channel_layouts=stereo[a$i]"; else a="anullsrc=r=48000:cl=stereo,atrim=duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$p")[a$i]"; fi
  f+="[$i:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p,setsar=1[v$i];$a;"; i=$((i+1)); done
for ((k=0;k<n;k++)); do f+="[v$k][a$k]"; done; f+="concat=n=$n:v=1:a=1[v][a]"
ffmpeg -y -loglevel error "${args[@]}" -filter_complex "$f" -map "[v]" -map "[a]" -c:v libx264 -crf 20 -preset medium -c:a aac -b:a 192k -movflags +faststart "$out"
echo "joined → $out"
