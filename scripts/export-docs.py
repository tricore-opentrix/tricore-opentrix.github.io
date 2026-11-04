"""Optional migration helper; the website itself needs no Python or build step."""
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parent.parent

class Element:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(c if isinstance(c, str) else c.text() for c in self.children)

class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Element('document')
        self.stack = [self.root]
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:
            self.stack.append(node)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag: self.stack.pop()
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, text): self.stack[-1].children.append(text)

def find(node, test):
    if isinstance(node, str): return
    if test(node): yield node
    for child in node.children: yield from find(child, test)

def convert(node, page):
    if isinstance(node, str): return re.sub(r'\s+', ' ', node)
    tag = node.tag
    if tag in {'script','style','button','svg'}: return ''
    text = ''.join(convert(c, page) for c in node.children)
    if tag == 'pre': return '\n\n```text\n' + node.text().strip() + '\n```\n\n'
    if tag == 'code': return '`' + node.text().strip() + '`'
    if re.fullmatch('h[1-6]', tag): return '\n\n' + '#' * int(tag[1]) + ' ' + text.strip() + '\n\n'
    if tag in {'strong','b'}: return '**' + text.strip() + '**'
    if tag in {'em','i'}: return '*' + text.strip() + '*'
    if tag == 'br': return '  \n'
    if tag == 'a':
        href = node.attrs.get('href','')
        if not href: return text
        if not re.match(r'https?:|mailto:|#', href):
            href = urljoin('https://tricore-opentrix.github.io/' + page, href)
        return '[' + text.strip() + '](' + href + ')'
    if tag == 'img': return '![' + node.attrs.get('alt','') + '](' + node.attrs.get('src','') + ')'
    if tag in {'ul','ol'}:
        rows = [c for c in node.children if not isinstance(c,str) and c.tag == 'li']
        return '\n\n' + '\n'.join((str(i+1)+'. ' if tag=='ol' else '- ') + convert(c,page).strip().replace('\n',' ') for i,c in enumerate(rows)) + '\n\n'
    if tag == 'table':
        rows=[]
        for row in find(node, lambda n:n.tag=='tr'):
            cells=[convert(c,page).strip().replace('\n',' ').replace('|','\\|') for c in row.children if not isinstance(c,str) and c.tag in {'td','th'}]
            if cells: rows.append(cells)
        if not rows: return ''
        width=max(map(len,rows))
        rows=[r+['']*(width-len(r)) for r in rows]
        lines=['| '+' | '.join(r)+' |' for r in rows]
        lines.insert(1,'| '+' | '.join(['---']*width)+' |')
        return '\n\n'+'\n'.join(lines)+'\n\n'
    if tag in {'p','section','div','aside','blockquote','details'}: return '\n\n' + text.strip() + '\n\n'
    return text

def export():
    target = ROOT / 'export/dxos-docs'
    target.mkdir(parents=True, exist_ok=True)
    for source in sorted((ROOT/'docs').rglob('*.html')):
        page=source.relative_to(ROOT).as_posix()
        doc=Document(source.read_text(encoding='utf-8')).root
        article=next(find(doc,lambda n:'doc-article' in n.attrs.get('class','').split()),None)
        title=next(find(doc,lambda n:n.tag=='h1')).text()
        name='api.md' if source.parent.name=='api' else source.stem+'.md'
        content=convert(article,page) if article else ''
        content=re.sub(r'\n{3,}','\n\n',content).strip()
        header=f'# {title}\n\n> Bản xuất phục vụ review chuyển tài liệu, chưa phải tài liệu đã được merge bên repo sản phẩm.\n> Nguồn: [{page}](https://tricore-opentrix.github.io/{page}).\n> Đối chiếu README và CHANGELOG tại tag v0.1.0 trước khi mở PR; xem bảng rà soát kèm báo cáo.\n\n'
        (target/name).write_text(header+content+'\n',encoding='utf-8')
        print(f'{page} -> export/dxos-docs/{name}')

if __name__ == '__main__': export()
