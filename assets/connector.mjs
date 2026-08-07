/* eslint-disable @wordpress/no-unsafe-wp-apis, import/no-unresolved -- The WordPress 7.1 Connectors API is experimental and supplied by Core at runtime. */
import {
	__experimentalConnectorItem as ConnectorItem,
	__experimentalRegisterConnector as registerConnector,
} from '@wordpress/connectors';

const { Button, ExternalLink, Notice } = window.wp.components;
const { createElement: el, Fragment, useState } = window.wp.element;

const dataContainer = document.querySelector(
	'script[id="wp-script-module-data-mcp-connection-guide"]'
);
let moduleData = {};
if (dataContainer instanceof window.HTMLScriptElement) {
	try {
		moduleData = JSON.parse(dataContainer.text);
	} catch {}
}

const guide = moduleData.guide || {};

const clients = [
	{
		id: 'codex',
		label: 'Codex',
		description:
			'Run one command in a terminal. Codex CLI, the IDE extension, and the desktop app share this MCP configuration.',
	},
	{
		id: 'claude-code',
		label: 'Claude Code',
		description:
			'Add the server to your user-scoped Claude Code configuration.',
	},
	{
		id: 'claude-desktop',
		label: 'Claude Desktop',
		description:
			'Merge this entry into your Claude Desktop MCP configuration file, then restart Claude Desktop.',
	},
];

function shellQuote(value) {
	return `'${String(value).split("'").join(`'"'"'`)}'`;
}

function buildConfig(clientId, credential) {
	const env = {
		WP_API_URL: guide.endpoint,
		WP_API_USERNAME: guide.username,
		WP_API_PASSWORD: credential.password,
	};

	if (clientId === 'codex') {
		return [
			`codex mcp add ${guide.serverName}`,
			`  --env WP_API_URL=${shellQuote(env.WP_API_URL)}`,
			`  --env WP_API_USERNAME=${shellQuote(env.WP_API_USERNAME)}`,
			`  --env WP_API_PASSWORD=${shellQuote(env.WP_API_PASSWORD)}`,
			'  -- npx -y @automattic/mcp-wordpress-remote@latest',
		].join(' \\\n');
	}

	if (clientId === 'claude-code') {
		return [
			'claude mcp add --transport stdio --scope user',
			`  --env WP_API_URL=${shellQuote(env.WP_API_URL)}`,
			`  --env WP_API_USERNAME=${shellQuote(env.WP_API_USERNAME)}`,
			`  --env WP_API_PASSWORD=${shellQuote(env.WP_API_PASSWORD)}`,
			`  ${guide.serverName} -- npx -y @automattic/mcp-wordpress-remote@latest`,
		].join(' \\\n');
	}

	return JSON.stringify(
		{
			mcpServers: {
				[guide.serverName]: {
					command: 'npx',
					args: ['-y', '@automattic/mcp-wordpress-remote@latest'],
					env,
				},
			},
		},
		null,
		2
	);
}

async function copyText(value) {
	if (window.navigator.clipboard && window.isSecureContext) {
		await window.navigator.clipboard.writeText(value);
		return;
	}

	const textarea = document.createElement('textarea');
	textarea.value = value;
	textarea.setAttribute('readonly', '');
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
}

function CopyButton({ value, copyLabel = 'Copy', copiedLabel = 'Copied' }) {
	const [copied, setCopied] = useState(false);

	return el(
		Button,
		{
			variant: 'secondary',
			size: 'compact',
			onClick: async () => {
				await copyText(value);
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			},
		},
		copied ? copiedLabel : copyLabel
	);
}

function StatusBadge({ available }) {
	return el(
		'span',
		{
			className: `mcp-guide__badge mcp-guide__badge--${
				available ? 'available' : 'missing'
			}`,
		},
		available ? 'Adapter available' : 'Adapter needed'
	);
}

function Step({ number, title, children }) {
	return el(
		'section',
		{ className: 'mcp-guide__step' },
		el(
			'div',
			{ className: 'mcp-guide__step-number', 'aria-hidden': true },
			number
		),
		el(
			'div',
			{ className: 'mcp-guide__step-content' },
			el('h3', null, title),
			children
		)
	);
}

function AdapterStep() {
	return el(
		Step,
		{ number: '1', title: 'Check the MCP Adapter' },
		guide.adapterAvailable
			? el(
					Fragment,
					null,
					el(
						'p',
						null,
						'The MCP Adapter is already available on this site.'
					),
					el(
						'code',
						{ className: 'mcp-guide__endpoint' },
						guide.endpoint
					)
				)
			: el(
					'p',
					null,
					'The MCP Adapter was not found. ',
					el(
						ExternalLink,
						{ href: guide.adapterReleaseUrl },
						'Download it from the official GitHub releases'
					),
					', install it using your normal plugin workflow, and return here.'
				)
	);
}

function CredentialPanel({
	activeClient,
	credential,
	onGenerate,
	isGenerating,
	error,
}) {
	if (!guide.adapterAvailable) {
		return el(
			'p',
			{ className: 'mcp-guide__muted' },
			'Install or enable an MCP Adapter provider before creating a credential.'
		);
	}

	if (!guide.appPasswordsAvailable || !guide.canCreateAppPassword) {
		return el(
			Notice,
			{ status: 'warning', isDismissible: false },
			'Application Passwords are not available for this account or environment. ',
			el('a', { href: guide.profileUrl }, 'Review your profile settings.')
		);
	}

	const active = clients.find((client) => client.id === activeClient);

	if (!credential) {
		return el(
			Fragment,
			null,
			el(
				'p',
				null,
				`Create a separate, revocable Application Password for ${active.label}. The secret is returned only once.`
			),
			error &&
				el(Notice, { status: 'error', isDismissible: false }, error),
			el(
				Button,
				{
					variant: 'primary',
					disabled: isGenerating,
					isBusy: isGenerating,
					accessibleWhenDisabled: true,
					onClick: onGenerate,
				},
				isGenerating ? 'Generating…' : `Generate for ${active.label}`
			)
		);
	}

	const config = buildConfig(activeClient, credential);

	return el(
		Fragment,
		null,
		el(
			Notice,
			{ status: 'success', isDismissible: false },
			'The credential is ready. Copy it now; WordPress will not show this password again after you leave this page.'
		),
		el(
			'div',
			{ className: 'mcp-guide__credential' },
			el(
				'div',
				null,
				el('span', { className: 'mcp-guide__label' }, 'Username'),
				el('code', null, guide.username)
			),
			el(CopyButton, { value: guide.username }),
			el(
				'div',
				null,
				el(
					'span',
					{ className: 'mcp-guide__label' },
					'Application Password'
				),
				el('code', null, credential.password)
			),
			el(CopyButton, { value: credential.password })
		),
		el(
			'p',
			{ className: 'mcp-guide__client-description' },
			active.description
		),
		el(
			'div',
			{ className: 'mcp-guide__code-block' },
			el('pre', null, el('code', null, config)),
			el(
				'div',
				{ className: 'mcp-guide__code-action' },
				el(CopyButton, {
					value: config,
					copyLabel: 'Copy configuration',
				})
			)
		),
		el(
			'p',
			{ className: 'mcp-guide__revoke' },
			'Finished? You can rename or revoke this credential at any time from ',
			el('a', { href: guide.profileUrl }, 'your WordPress profile'),
			'.'
		)
	);
}

function SetupGuide() {
	const [activeClient, setActiveClient] = useState('codex');
	const [credentials, setCredentials] = useState({});
	const [generatingClient, setGeneratingClient] = useState(null);
	const [errors, setErrors] = useState({});

	const generatePassword = async () => {
		const client = clients.find((item) => item.id === activeClient);
		setGeneratingClient(activeClient);
		setErrors((current) => ({ ...current, [activeClient]: '' }));

		try {
			const response = await window.wp.apiFetch({
				path: guide.createPasswordPath,
				method: 'POST',
				data: {
					name: `WordPress MCP — ${client.label} — ${guide.siteName}`,
				},
			});

			if (!response.password) {
				throw new Error(
					'WordPress did not return the new Application Password.'
				);
			}

			setCredentials((current) => ({
				...current,
				[activeClient]: {
					password: response.password,
					uuid: response.uuid,
				},
			}));
		} catch (requestError) {
			setErrors((current) => ({
				...current,
				[activeClient]:
					requestError?.message ||
					'The Application Password could not be created.',
			}));
		} finally {
			setGeneratingClient(null);
		}
	};

	return el(
		'div',
		{ className: 'mcp-guide__setup' },
		el(AdapterStep, null),
		el(
			Step,
			{ number: '2', title: 'Choose a client and create its credential' },
			el(
				'div',
				{
					className: 'mcp-guide__tabs',
					role: 'tablist',
					'aria-label': 'MCP clients',
				},
				clients.map((client) =>
					el(
						'button',
						{
							key: client.id,
							type: 'button',
							role: 'tab',
							'aria-selected': activeClient === client.id,
							className:
								activeClient === client.id ? 'is-active' : '',
							onClick: () => setActiveClient(client.id),
						},
						client.label,
						credentials[client.id] &&
							el(
								'span',
								{
									className: 'mcp-guide__tab-ready',
									'aria-label': 'Credential ready',
								},
								'✓'
							)
					)
				)
			),
			el(
				'div',
				{ className: 'mcp-guide__tabpanel', role: 'tabpanel' },
				el(CredentialPanel, {
					activeClient,
					credential: credentials[activeClient],
					onGenerate: generatePassword,
					isGenerating: generatingClient === activeClient,
					error: errors[activeClient],
				})
			)
		)
	);
}

function McpConnector(props) {
	const [expanded, setExpanded] = useState(false);

	return el(
		ConnectorItem,
		{
			className: 'connector-item--wordpress-mcp mcp-guide',
			logo: el(
				'div',
				{ className: 'mcp-guide__logo', 'aria-hidden': true },
				'MCP'
			),
			name: props.name,
			description: props.description,
			actionArea: el(
				'div',
				{ className: 'mcp-guide__actions' },
				el(StatusBadge, { available: guide.adapterAvailable }),
				el(
					Button,
					{
						variant: expanded ? 'tertiary' : 'secondary',
						size: 'compact',
						onClick: () => setExpanded((value) => !value),
						'aria-expanded': expanded,
					},
					expanded ? 'Hide setup' : 'Set up'
				)
			),
		},
		expanded && el(SetupGuide, null)
	);
}

registerConnector('wordpress-mcp', {
	render: McpConnector,
});
