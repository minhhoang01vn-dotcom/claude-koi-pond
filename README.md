# Koi Pond

A look for the Claude desktop and mobile apps: jade pond water by day, moonlit water by night, koi-orange accents, and a slow scene of koi swimming beneath lily pads with ripples. The scene holds still for people who ask for reduced motion. The terminal and editors draw no look.

## Install

At the prompt of a Claude Code session:

```
/plugin install koi-pond --marketplace minhhoang01vn-dotcom/claude-koi-pond
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```bash
claude plugin install koi-pond --marketplace minhhoang01vn-dotcom/claude-koi-pond
```

### Cloud sessions

To have it in every cloud session of a repository, add this to that repository's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "claude-koi-pond": { "source": { "source": "github", "repo": "minhhoang01vn-dotcom/claude-koi-pond" } }
  },
  "enabledPlugins": { "koi-pond@claude-koi-pond": true }
}
```
