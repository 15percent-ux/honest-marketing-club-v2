"""
funnel-kit のソースを Vercel にアップロードして本番デプロイする。
Vercel 側のプロジェクトに環境変数 BRAND=<ブランドid> を設定しておくこと（ビルドは Vercel 上で行われる）。
認証：手元のPCでは環境変数 VERCEL_TOKEN にトークンを入れて実行する（Claude のクラウド環境ではプロキシが自動で付与）。

使い方: python3 scripts/deploy-vercel.py <funnel-kitのパス> <teamId> <projectId> <プロジェクト名> [ブランドid]
（ブランドidを渡すと、brands/<id>/line-bot.ts があれば LINEボット（api/line.js）も作ってから送る）
"""
import hashlib, json, os, subprocess, sys
root, team, project, name = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
brand = sys.argv[5] if len(sys.argv) > 5 else None
if brand:
    subprocess.run(['node', 'scripts/build-line-bot.mjs'], cwd=root, env={**os.environ, 'BRAND': brand}, check=True)
API = 'https://api.vercel.com'
skip_dirs = {'node_modules', '.git', '.netlify', '.vercel'}
files = []
for dp, dns, fns in os.walk(root):
    dns[:] = [d for d in dns if d not in skip_dirs and not (dp == root and (d == 'dist' or d.startswith('dist-')))]
    for fn in fns:
        p = os.path.join(dp, fn)
        rel = os.path.relpath(p, root)
        data = open(p, 'rb').read()
        files.append((rel, hashlib.sha1(data).hexdigest(), len(data), p))

def curl(args, data_file=None, body=None):
    cmd = ['curl', '-sS', '-m', '60'] + args
    if os.environ.get('VERCEL_TOKEN'):  # 手元のPCで実行するときは環境変数でトークンを渡す
        cmd += ['-H', f"Authorization: Bearer {os.environ['VERCEL_TOKEN']}"]
    r = subprocess.run(cmd, input=body, capture_output=True)
    return r.stdout.decode(), r.stderr.decode()

for rel, sha, size, p in files:
    out, err = curl(['-X', 'POST', f'{API}/v2/files?teamId={team}', '-H', 'Content-Type: application/octet-stream',
                     '-H', f'x-vercel-digest: {sha}', '--data-binary', f'@{p}'])
    if out.strip() not in ('{}', '') and '"urls"' not in out:
        print('upload', rel, out[:200], err[:200])
print('uploaded', len(files), 'files')

payload = {
    'name': name,
    'project': project,
    'target': 'production',
    'files': [{'file': rel, 'sha': sha, 'size': size} for rel, sha, size, _ in files],
    'projectSettings': {'framework': 'vite', 'buildCommand': 'npm run build', 'outputDirectory': 'dist', 'installCommand': 'npm ci', 'nodeVersion': '22.x'},
    'meta': {'source': 'funnel-kit'},
}
out, err = curl(['-X', 'POST', f'{API}/v13/deployments?teamId={team}&skipAutoDetectionConfirmation=1', '-H', 'Content-Type: application/json', '--data-binary', '@-'], body=json.dumps(payload).encode())
d = json.loads(out)
if 'error' in d:
    print('ERROR', json.dumps(d['error'], ensure_ascii=False)[:800]); sys.exit(1)
print('deployment', d['id'], d.get('url'), d.get('readyState'))
