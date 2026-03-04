import { spawn } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { resolveAgentCommand } from './agent-defaults.js';

export interface AgentRunnerOptions {
  root: string;
  prompt: string;
  agent: string;
  agents?: Record<string, string>;
  onOutput?: (data: string) => void;
}

export async function runAgent(options: AgentRunnerOptions): Promise<number> {
  const { root, prompt, agent, agents, onOutput } = options;

  const template = resolveAgentCommand(agent, agents);
  if (!template) {
    throw new Error(`Unknown agent "${agent}". Available: ${Object.keys(agents ?? {}).join(', ') || 'claude, codex, opencode'}`);
  }

  // Write prompt to temp file (too large for CLI arg)
  const tmpFile = join(tmpdir(), `sdd-prompt-${randomBytes(6).toString('hex')}.md`);
  await writeFile(tmpFile, prompt, 'utf-8');

  // Replace $PROMPT_FILE with the temp file path in the command template
  const command = template.replace(/\$PROMPT_FILE/g, tmpFile);

  try {
    const exitCode = await new Promise<number>((resolve, reject) => {
      const child = spawn(command, {
        cwd: root,
        shell: true,
        stdio: onOutput ? ['inherit', 'pipe', 'pipe'] : 'inherit',
      });

      if (onOutput && child.stdout) {
        child.stdout.on('data', (data: Buffer) => onOutput(data.toString()));
      }
      if (onOutput && child.stderr) {
        child.stderr.on('data', (data: Buffer) => onOutput(data.toString()));
      }

      child.on('error', reject);
      child.on('close', (code) => resolve(code ?? 1));
    });

    return exitCode;
  } finally {
    await unlink(tmpFile).catch(() => {});
  }
}
