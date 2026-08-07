/* eslint-disable @wordpress/no-unsafe-wp-apis -- The WordPress 7.1 Connectors API is experimental. */
import apiFetch from '@wordpress/api-fetch';
import { Button, ExternalLink, Notice } from '@wordpress/components';
import {
	__experimentalConnectorItem as ConnectorItem,
	__experimentalRegisterConnector as registerConnector,
} from '@wordpress/connectors';
import { Fragment, useState } from '@wordpress/element';

import './style.scss';

const dataContainer = document.querySelector(
	'script[id="wp-script-module-data-@mcp-connection-guide/connector"]'
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

	return (
		<Button
			variant="secondary"
			size="compact"
			onClick={async () => {
				await copyText(value);
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			}}
		>
			{copied ? copiedLabel : copyLabel}
		</Button>
	);
}

function StatusBadge({ available }) {
	return (
		<span
			className={`mcp-guide__badge mcp-guide__badge--${
				available ? 'available' : 'missing'
			}`}
		>
			{available ? 'Adapter available' : 'Adapter needed'}
		</span>
	);
}

function Step({ number, title, children }) {
	return (
		<section className="mcp-guide__step">
			<div className="mcp-guide__step-number" aria-hidden="true">
				{number}
			</div>
			<div className="mcp-guide__step-content">
				<h3>{title}</h3>
				{children}
			</div>
		</section>
	);
}

function AdapterStep() {
	return (
		<Step number="1" title="Check the MCP Adapter">
			{guide.adapterAvailable ? (
				<Fragment>
					<p>The MCP Adapter is already available on this site.</p>
					<code className="mcp-guide__endpoint">
						{guide.endpoint}
					</code>
				</Fragment>
			) : (
				<p>
					The MCP Adapter was not found.{' '}
					<ExternalLink href={guide.adapterReleaseUrl}>
						Download it from the official GitHub releases
					</ExternalLink>
					, install it using your normal plugin workflow, and return
					here.
				</p>
			)}
		</Step>
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
		return (
			<p className="mcp-guide__muted">
				Install or enable an MCP Adapter provider before creating a
				credential.
			</p>
		);
	}

	if (!guide.appPasswordsAvailable || !guide.canCreateAppPassword) {
		return (
			<Notice status="warning" isDismissible={false}>
				Application Passwords are not available for this account or
				environment.{' '}
				<a href={guide.profileUrl}>Review your profile settings.</a>
			</Notice>
		);
	}

	const active = clients.find((client) => client.id === activeClient);

	if (!credential) {
		return (
			<Fragment>
				<p>
					Create a separate, revocable Application Password for{' '}
					{active.label}. The secret is returned only once.
				</p>
				{error && (
					<Notice status="error" isDismissible={false}>
						{error}
					</Notice>
				)}
				<Button
					variant="primary"
					disabled={isGenerating}
					isBusy={isGenerating}
					accessibleWhenDisabled
					onClick={onGenerate}
				>
					{isGenerating
						? 'Generating…'
						: `Generate for ${active.label}`}
				</Button>
			</Fragment>
		);
	}

	const config = buildConfig(activeClient, credential);

	return (
		<Fragment>
			<Notice status="success" isDismissible={false}>
				The credential is ready. Copy it now; WordPress will not show
				this password again after you leave this page.
			</Notice>
			<div className="mcp-guide__credential">
				<div>
					<span className="mcp-guide__label">Username</span>
					<code>{guide.username}</code>
				</div>
				<CopyButton value={guide.username} />
				<div>
					<span className="mcp-guide__label">
						Application Password
					</span>
					<code>{credential.password}</code>
				</div>
				<CopyButton value={credential.password} />
			</div>
			<p className="mcp-guide__client-description">
				{active.description}
			</p>
			<div className="mcp-guide__code-block">
				<pre>
					<code>{config}</code>
				</pre>
				<div className="mcp-guide__code-action">
					<CopyButton value={config} copyLabel="Copy configuration" />
				</div>
			</div>
			<p className="mcp-guide__revoke">
				Finished? You can rename or revoke this credential at any time
				from <a href={guide.profileUrl}>your WordPress profile</a>.
			</p>
		</Fragment>
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
			const response = await apiFetch({
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

	return (
		<div className="mcp-guide__setup">
			<AdapterStep />
			<Step number="2" title="Choose a client and create its credential">
				<div
					className="mcp-guide__tabs"
					role="tablist"
					aria-label="MCP clients"
				>
					{clients.map((client) => (
						<button
							key={client.id}
							type="button"
							role="tab"
							aria-selected={activeClient === client.id}
							className={
								activeClient === client.id ? 'is-active' : ''
							}
							onClick={() => setActiveClient(client.id)}
						>
							{client.label}
							{credentials[client.id] && (
								<span
									className="mcp-guide__tab-ready"
									aria-label="Credential ready"
								>
									✓
								</span>
							)}
						</button>
					))}
				</div>
				<div className="mcp-guide__tabpanel" role="tabpanel">
					<CredentialPanel
						activeClient={activeClient}
						credential={credentials[activeClient]}
						onGenerate={generatePassword}
						isGenerating={generatingClient === activeClient}
						error={errors[activeClient]}
					/>
				</div>
			</Step>
		</div>
	);
}

function McpConnector(props) {
	const [expanded, setExpanded] = useState(false);

	return (
		<ConnectorItem
			className="connector-item--wordpress-mcp mcp-guide"
			logo={
				<div className="mcp-guide__logo" aria-hidden="true">
					MCP
				</div>
			}
			name={props.name}
			description={props.description}
			actionArea={
				<div className="mcp-guide__actions">
					<StatusBadge available={guide.adapterAvailable} />
					<Button
						variant={expanded ? 'tertiary' : 'secondary'}
						size="compact"
						onClick={() => setExpanded((value) => !value)}
						aria-expanded={expanded}
					>
						{expanded ? 'Hide setup' : 'Set up'}
					</Button>
				</div>
			}
		>
			{expanded && <SetupGuide />}
		</ConnectorItem>
	);
}

registerConnector('wordpress-mcp', {
	render: McpConnector,
});
