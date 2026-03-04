export const DEFAULT_AGENTS: Record<string, string> = {
  claude: 'claude -p "$(cat $PROMPT_FILE)" --dangerously-skip-permissions --verbose',
  codex: 'codex -q "$(cat $PROMPT_FILE)"',
  opencode: 'opencode -p "$(cat $PROMPT_FILE)"',
};

export function resolveAgentCommand(
  name: string,
  configAgents?: Record<string, string>
): string | undefined {
  return configAgents?.[name] ?? DEFAULT_AGENTS[name];
}
