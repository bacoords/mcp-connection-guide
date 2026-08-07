# Contributing

Thanks for helping improve MCP Connection Guide.

## Local setup

1. Use WordPress 7.1 or newer with this repository located in `wp-content/plugins/mcp-connection-guide`.
2. Run `npm install`, `composer install`, and `npm run build`.
3. Activate the plugin and open **Settings → Connectors**.

## Before submitting a change

Build the production assets and run the full quality suite:

```bash
npm test
```

Use `npm run dev` while editing the connector package and `npm run format` to apply the repository's JavaScript, SCSS, and PHP formatting rules. If distribution files change, also verify `npm run plugin-zip` produces an installable ZIP containing the generated runtime files selected by the `package.json` file allowlist.

Changes to the connector renderer should be tested with all three client tabs. Do not include a generated Application Password, browser cookie, or client configuration containing credentials in issues, screenshots, fixtures, or commits.

## Experimental API changes

The custom renderer uses experimental WordPress Connectors exports. If WordPress changes those exports, describe the supported WordPress version and the migration in both the pull request and `CHANGELOG.md`.
