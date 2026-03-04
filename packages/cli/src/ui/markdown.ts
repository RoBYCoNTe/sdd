import { Marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

const marked = new Marked(markedTerminal());

export function renderMarkdown(md: string): string {
  return marked.parse(md) as string;
}
