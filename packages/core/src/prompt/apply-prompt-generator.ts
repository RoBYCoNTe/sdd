import type { Bug, ChangeRequest, StoryFile } from '../types.js';
import { getFileDiff } from '../git/git.js';

export function generateApplyPrompt(
  bugs: Bug[],
  changeRequests: ChangeRequest[],
  pendingFiles: StoryFile[],
  root: string
): string | null {
  if (bugs.length === 0 && changeRequests.length === 0 && pendingFiles.length === 0) {
    return null;
  }

  const sections: string[] = [];

  sections.push('# SDD Apply\n\nThis project uses Story Driven Development. Complete the tasks below in order.');

  // Bugs section
  if (bugs.length > 0) {
    const lines = [`## Open Bugs (${bugs.length})\n`];
    for (const bug of bugs) {
      lines.push(`### \`${bug.relativePath}\` — ${bug.frontmatter.title}\n`);
      lines.push(bug.body.trim());
      lines.push('');
    }
    sections.push(lines.join('\n'));
  }

  // Change Requests section
  if (changeRequests.length > 0) {
    const lines = [`## Pending Change Requests (${changeRequests.length})\n`];
    for (const cr of changeRequests) {
      lines.push(`### \`${cr.relativePath}\` — ${cr.frontmatter.title}\n`);
      lines.push(cr.body.trim());
      lines.push('');
    }
    sections.push(lines.join('\n'));
  }

  // Pending Files section
  if (pendingFiles.length > 0) {
    const lines = [`## Pending Files (${pendingFiles.length})\n`];
    for (const f of pendingFiles) {
      lines.push(`- \`${f.relativePath}\` — **${f.frontmatter.status}**`);
    }
    lines.push('');
    lines.push('Read each file listed above before implementing.');

    // Show git diff for changed files
    const changed = pendingFiles.filter((f) => f.frontmatter.status === 'changed');
    for (const f of changed) {
      const diff = getFileDiff(root, f.relativePath);
      if (diff) {
        lines.push('');
        lines.push(`### Changes in \`${f.relativePath}\`\n\n\`\`\`diff\n${diff}\n\`\`\``);
      }
    }

    sections.push(lines.join('\n'));
  }

  // Instructions
  const instructions = ['## Instructions\n'];

  if (bugs.length > 0) {
    instructions.push('1. Fix each open bug, then run `sdd mark-bug-resolved <file>` and commit');
  }
  if (changeRequests.length > 0) {
    instructions.push(`${bugs.length > 0 ? '2' : '1'}. Apply each CR to the documentation, then run \`sdd mark-cr-applied <file>\` and commit`);
  }
  if (pendingFiles.length > 0) {
    const step = (bugs.length > 0 ? 1 : 0) + (changeRequests.length > 0 ? 1 : 0) + 1;
    instructions.push(`${step}. Implement each pending file, then run \`sdd mark-synced <file>\` and commit`);
  }

  const lastStep = (bugs.length > 0 ? 1 : 0) + (changeRequests.length > 0 ? 1 : 0) + (pendingFiles.length > 0 ? 1 : 0) + 1;
  instructions.push(`${lastStep}. After each mark-* command, immediately commit: \`git add -A && git commit -m "sdd: <description>"\``);

  sections.push(instructions.join('\n'));

  return sections.join('\n\n');
}
