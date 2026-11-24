"""
PC幅の背景写真（public/backdrop.webp, 1920x1080）を hero.webp から作る。
左側はぼかした写真（メニューの文字を読みやすく）、右側に人物をそのまま置き、境目はぼかしてなじませる。
使い方: python3 brands/omijuku/tools/make-backdrop.py
"""
from pathlib import Path

from PIL import Image, ImageFilter

pub = Path(__file__).resolve().parent.parent / 'public'
W, H = 1920, 1080
src = Image.open(pub / 'hero.webp').convert('RGB')

# 背景：画面いっぱいに広げて強くぼかす
scale = max(W / src.width, H / src.height)
bg = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
top = round((bg.height - H) * 0.25)
bg = bg.crop((0, top, W, top + H)).filter(ImageFilter.GaussianBlur(36))

# 人物：高さを画面に合わせて右側へ。左端は横向きのグラデーションでなじませる
ph = src.resize((round(src.width * H / src.height), H), Image.LANCZOS)
x0 = W - ph.width - 60
mask = Image.new('L', ph.size, 255)
fade = 260
for x in range(fade):
    a = round(255 * (x / fade) ** 1.6)
    for y in range(ph.height):
        mask.putpixel((x, y), a)
bg.paste(ph, (x0, 0), mask)

bg.save(pub / 'backdrop.webp', quality=80)
print(pub / 'backdrop.webp', bg.size)
