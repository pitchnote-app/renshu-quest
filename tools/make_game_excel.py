"""アプリの「項目を分けてあるもの」（能力・階級・職業・スキル・二つ名・称号・練習メニュー・ショップなど）を
Excel の一覧表にする。アプリ（app.js）から直接読み取るので、アプリを直したら実行し直せば最新になる。
使い方: python tools/make_game_excel.py   → docs/ゲームデータ一覧.xlsx
（Node.js と openpyxl が必要：pip install openpyxl）
"""
import io, json, os, subprocess, tempfile
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'docs', 'ゲームデータ一覧.xlsx')
FONT = 'Meiryo'
NAVY, GOLD, LINE = '1B2A4A', 'F5B301', 'C9D1E2'
TIER_FILL = {'金スキル': 'FFF1B8', '技スキル': 'DCEBFF', '心がまえ': 'DDF7E6'}


def load():
    tmp = os.path.join(tempfile.gettempdir(), 'rq_game.json')
    subprocess.run(['node', os.path.join(ROOT, 'tools', 'export_game_data.js'), ROOT, tmp], check=True)
    return json.load(io.open(tmp, encoding='utf-8'))


thin = Side(style='thin', color=LINE)
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)


def sheet(wb, title, note, headers, rows, widths, fills=None):
    ws = wb.create_sheet(title)
    ws.sheet_view.showGridLines = False
    ws['A1'] = title
    ws['A1'].font = Font(name=FONT, size=14, bold=True, color=NAVY)
    ws['A2'] = note
    ws['A2'].font = Font(name=FONT, size=9, color='6B7A99')
    r0 = 4
    for j, h in enumerate(headers, 1):
        c = ws.cell(row=r0, column=j, value=h)
        c.font = Font(name=FONT, size=10, bold=True, color='FFFFFF')
        c.fill = PatternFill('solid', fgColor=NAVY)
        c.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        c.border = BORDER
    for i, row in enumerate(rows):
        for j, v in enumerate(row, 1):
            c = ws.cell(row=r0 + 1 + i, column=j, value=v)
            c.font = Font(name=FONT, size=10)
            c.alignment = Alignment(vertical='top', wrap_text=True, horizontal='center' if isinstance(v, (int, float)) else 'left')
            c.border = BORDER
            f = fills(i, j, v) if fills else None
            if f:
                c.fill = PatternFill('solid', fgColor=f)
            elif i % 2:
                c.fill = PatternFill('solid', fgColor='F6F8FC')
    for j, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(j)].width = w
    ws.freeze_panes = ws.cell(row=r0 + 1, column=1)
    ws.auto_filter.ref = f'A{r0}:{get_column_letter(len(headers))}{r0 + len(rows)}'
    ws.row_dimensions[r0].height = 30
    return ws, len(rows)


def main():
    d = load()
    wb = Workbook()
    toc = wb.active
    toc.title = '目次'
    made = []

    def add(title, desc, *a, **k):
        ws, n = sheet(wb, title, desc, *a, **k)
        made.append((title, desc, n))

    stat_cat = {'phy': '体', 'tec': '技', 'iq': '頭'}
    add('能力', '9つの能力。練習すると上がる。年齢によって伸びやすい能力（のびどき・経験×1.5）がある',
        ['ID', '能力', '分類'], [[s['id'], s['name'], stat_cat.get(s['g'], s['g'])] for s in d['stats']], [14, 18, 10])
    add('のびどき', '年齢ごとの伸びやすい能力（この能力が中心の練習は経験×1.5）',
        ['年齢', '伸びやすい能力'], [[k, '・'.join(v)] for k, v in d['boost'].items()], [14, 50])

    add('階級・練習場所・部屋', '8段階。レベルが届くと同時に「昇格」：階級・練習場所・部屋がそろって上がる。部屋が広いほど飾れる数が多い',
        ['段階', 'レベル', '階級', '階級の色', '練習場所', '部屋', '飾れる数'],
        [[i + 1, s['lv'], s['rank'], s['col'], s['stage'], s['room'], s['cap']] for i, s in enumerate(d['stages'])],
        [7, 8, 16, 11, 20, 22, 10],
        fills=lambda i, j, v: d['stages'][i]['col'].lstrip('#') if j == 4 else None)

    add('場所のライバル', '練習場所ごとのライバル。その場所で練習を重ね、決まった能力が届くと勝利（🪙200・トロフィー）',
        ['段階', '練習場所', 'ライバル', '必要な練習回数', '必要な能力', '目標', '登場のお話', '勝ったときのお話'],
        [[i + 1, s['stage'], s['rival'], s['need'], s['stat'], s['v'], s['intro'], s['win']] for i, s in enumerate(d['stages'])],
        [7, 16, 24, 10, 10, 8, 50, 50])

    grades = [['S', '90〜99', 'ダイヤ'], ['A', '80〜89', 'プラチナ'], ['B', '70〜79', 'ゴールド'], ['C', '60〜69', 'シルバー'],
              ['D', '55〜59', 'ブロンズ'], ['E', '50〜54', 'ブロンズ'], ['F', '45〜49', 'ノーマル'], ['G', '40〜44', 'ノーマル']]
    add('能力ランク', '能力の数値（40〜99）を S〜G の8段階で表示。色はメダルと同じ。二つ名（能力の分野）もこの段階で上がる',
        ['ランク', '能力の数値', 'メダルの色', '二つ名の段階'], [g + [8 - i] for i, g in enumerate(grades)], [10, 14, 14, 12])
    add('熟練度メダル', '同じ練習メニューを続けた回数で上がるメダル。ゴールド以上は部屋の壁に飾られる',
        ['メダル', '必要な回数'], [[m, n] for m, n in zip(d['medals'], d['mastery'])], [14, 12])

    add('職業', '職業に合った能力が伸びやすくなる（基本職×1.1・上級職×1.25）。上級職は条件を満たすと転職できる',
        ['職業', '略称', '種類', '伸びやすい能力', '転職の条件'],
        [[j['name'], j['short'], '上級職' if j['up'] else '基本職', 'すべての能力' if j['all'] else ('・'.join(j['stats']) or '特になし'), j['how'] or '—'] for j in d['jobs']],
        [20, 8, 10, 32, 36],
        fills=lambda i, j, v: 'FFF1B8' if j == 3 and v == '上級職' else None)

    add('個人技スキル', '練習を続けたり能力を上げたりすると習得。札の色：金＝とくに難しい技／技＝ふつうの技／心がまえ',
        ['札の色', 'スキル', '習得の条件'], [[k['tier'], k['name'], k['how']] for k in d['skills']], [12, 22, 46],
        fills=lambda i, j, v: TIER_FILL.get(d['skills'][i]['tier']) if j <= 2 else None)

    steps = d['nickSteps']
    add('二つ名', f'14分野×8段階。能力の分野は能力ランク（G〜S）で、練習の分野はその練習の回数（{"・".join(map(str, steps))}回）で上がる',
        ['分野', '上がり方'] + [f'{i + 1}段階' for i in range(8)],
        [[n['name'], n['by']] + n['t'] for n in d['nicks']], [16, 30] + [16] * 8)

    add('称号', '条件を満たすともらえる称号。カードに1つ表示できる（コイン+30）',
        ['', '称号', '条件'], [[t['ic'], t['name'], t['how']] for t in d['titles']], [5, 22, 40])

    add('練習メニュー', f'全{len(d["menus"])}種類。★＝むずかしさ、◎○△＝その能力の上がりやすさ',
        ['グループ', '練習メニュー', 'むずかしさ', '上がる能力', '記録できるもの'],
        [[m['grp'], m['name'], '★' * m['lv'], m['gain'], m['rec'] or '—'] for m in d['menus']], [18, 28, 10, 40, 26])

    chest = set(d['chest'])
    add('ショップ', 'コインで交換できるアイテム。価格「非売品」は宝箱でだけ手に入る。持っているボール・スパイク・ユニフォームは部屋に飾られる',
        ['種類', 'ID', 'アイテム', '価格（コイン）', '入手方法'],
        [[s['cat'], s['id'], s['name'], s['price'] if s['price'] >= 0 else '非売品',
          '宝箱（レア）' if s['id'] in chest else ('最初から' if s['price'] == 0 else ('月間ロード・特典' if s['price'] < 0 else 'ショップ'))] for s in d['shop']],
        [12, 8, 22, 12, 18])

    add('週替わりライバル', '毎週1体。決まった練習の記録で倒す（100 EXP・🪙150）。目標は倒すたびに少しずつ上がる',
        ['', 'ライバル', '練習', '最初の目標'], [[b['ic'], b['name'], b['menu'], f"{b['def']}{b['unit']}{' 以内' if b['lower'] else ' 以上'}"] for b in d['bosses']],
        [5, 20, 24, 16])
    add('デイリークエスト', '毎日この中から3つ出る。1つ30 EXP・🪙20、3つ全部で🪙50ボーナス',
        ['クエスト'], [[q['t']] for q in d['qpool']], [40])
    add('キャラクター', 'イラストのキャラ（選ぶだけ）。成長8段階の絵がそろっているかどうか',
        ['ID', '名前', '性別', '成長8段階の絵'],
        [[a['id'], a['name'], '男の子' if a['sex'] == 'm' else '女の子',
          'あり' if all(os.path.exists(os.path.join(ROOT, 'img', 'chars', f"{a['id']}_{k}.webp")) for k in range(1, 9)) else 'まだ'] for a in d['avatars']],
        [12, 16, 10, 16],
        fills=lambda i, j, v: ('DDF7E6' if v == 'あり' else 'FFE3E3') if j == 4 else None)

    # 目次
    toc.sheet_view.showGridLines = False
    toc['A1'] = f'れんしゅうクエスト　ゲームデータ一覧（ver {d["version"]}）'
    toc['A1'].font = Font(name=FONT, size=16, bold=True, color=NAVY)
    toc['A2'] = 'アプリ（app.js）から自動で作った一覧です。作り直すとき：python tools/make_game_excel.py'
    toc['A2'].font = Font(name=FONT, size=9, color='6B7A99')
    for j, h in enumerate(['シート', '内容', '件数'], 1):
        c = toc.cell(row=4, column=j, value=h)
        c.font = Font(name=FONT, size=10, bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor=NAVY); c.border = BORDER
        c.alignment = Alignment(horizontal='center')
    for i, (t, desc, n) in enumerate(made):
        c = toc.cell(row=5 + i, column=1, value=t)
        c.hyperlink = f"#'{t}'!A1"; c.font = Font(name=FONT, size=10, color='1F6BFF', underline='single'); c.border = BORDER
        c2 = toc.cell(row=5 + i, column=2, value=desc); c2.font = Font(name=FONT, size=10); c2.alignment = Alignment(wrap_text=True, vertical='top'); c2.border = BORDER
        c3 = toc.cell(row=5 + i, column=3, value=n); c3.font = Font(name=FONT, size=10); c3.alignment = Alignment(horizontal='center', vertical='top'); c3.border = BORDER
    toc.column_dimensions['A'].width = 22; toc.column_dimensions['B'].width = 80; toc.column_dimensions['C'].width = 8
    wb.save(OUT)
    print('作りました:', os.path.relpath(OUT, ROOT), f'（{len(made)}シート）')


if __name__ == '__main__':
    main()
