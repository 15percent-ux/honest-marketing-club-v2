"""
backend/gas/Code.gs の CONFIG 部分を brands/<id>/gas.json の内容に差し替え、
そのまま Apps Script に貼り付けられる1ファイルを書き出す。

使い方: python3 scripts/build-gas.py <ブランドid>   → brands/<ブランドid>/apps-script.gs
"""
import json, os, re, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
brand = sys.argv[1]
cfg = json.load(open(os.path.join(root, 'brands', brand, 'gas.json'), encoding='utf-8'))
src = open(os.path.join(root, 'backend', 'gas', 'Code.gs'), encoding='utf-8').read()
block = re.compile(r'// ==== CONFIG START ====.*?// ==== CONFIG END ====', re.S)
if not block.search(src):
    sys.exit('Code.gs に CONFIG の目印が見つかりません')
config_js = (
    f'// ==== CONFIG START ====（brands/{brand}/gas.json から生成。直接書き換えてもよい）\n'
    f'const CONFIG = {json.dumps(cfg, ensure_ascii=False, indent=2)};\n'
    '// ==== CONFIG END ===='
)
out = os.path.join(root, 'brands', brand, 'apps-script.gs')
header = f'// 自動生成ファイル：python3 scripts/build-gas.py {brand}（元は backend/gas/Code.gs と brands/{brand}/gas.json）\n'
open(out, 'w', encoding='utf-8').write(header + block.sub(lambda _: config_js, src, count=1))
print(out)
