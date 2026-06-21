import { Fragment, type ReactNode } from "react";

// Minimal markdown-lite renderer: paragraphs, **bold**, *italic*, `code`.
function inline(text: string, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) parts.push(<Fragment key={`${keyBase}-t${i}`}>{text.slice(last, m.index)}</Fragment>);
    const tok = m[0];
    if (tok.startsWith("**")) parts.push(<strong key={`${keyBase}-b${i}`}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`")) parts.push(<code key={`${keyBase}-c${i}`}>{tok.slice(1, -1)}</code>);
    else parts.push(<em key={`${keyBase}-i${i}`}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
    i++;
  }
  if (last < text.length) parts.push(<Fragment key={`${keyBase}-t${i}`}>{text.slice(last)}</Fragment>);
  return parts;
}

export function MarkdownLite({ text }: { text: string }) {
  const paras = text.split(/\n\n+/);
  return (
    <div className="prose-lite">
      {paras.map((p, i) => (
        <p key={i}>{inline(p, `p${i}`)}</p>
      ))}
    </div>
  );
}
