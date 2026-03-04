declare module 'marked-terminal' {
  import type { MarkedExtension } from 'marked';
  export default class TerminalRenderer {}
  export function markedTerminal(options?: object, highlightOptions?: object): MarkedExtension;
}
