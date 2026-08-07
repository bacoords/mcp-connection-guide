var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package-external:@wordpress/api-fetch
var require_api_fetch = __commonJS({
  "package-external:@wordpress/api-fetch"(exports, module) {
    module.exports = window.wp.apiFetch;
  }
});

// package-external:@wordpress/components
var require_components = __commonJS({
  "package-external:@wordpress/components"(exports, module) {
    module.exports = window.wp.components;
  }
});

// package-external:@wordpress/element
var require_element = __commonJS({
  "package-external:@wordpress/element"(exports, module) {
    module.exports = window.wp.element;
  }
});

// vendor-external:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "vendor-external:react/jsx-runtime"(exports, module) {
    module.exports = window.ReactJSXRuntime;
  }
});

// packages/connector/build-module/index.mjs
var import_api_fetch = __toESM(require_api_fetch(), 1);
var import_components = __toESM(require_components(), 1);
var import_element = __toESM(require_element(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
import {
  __experimentalConnectorItem as ConnectorItem,
  __experimentalRegisterConnector as registerConnector
} from "@wordpress/connectors";
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='3101dbdfdb']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "3101dbdfdb");
  style.appendChild(document.createTextNode(".mcp-guide__logo{background:#f0f6fc;border:1px solid #c3c4c7;border-radius:8px;color:#135e96;display:grid;font-size:11px;font-weight:700;height:48px;letter-spacing:.06em;place-items:center;width:48px}.mcp-guide__actions{align-items:center;display:flex;gap:10px}.mcp-guide__badge{align-items:center;border-radius:999px;display:inline-flex;font-size:12px;font-weight:500;min-height:24px;padding:0 9px;white-space:nowrap}.mcp-guide__badge--available{background:#edfaef;color:#116329}.mcp-guide__badge--missing{background:#fcf0f1;color:#8a2424}.mcp-guide__setup{display:grid;gap:24px;padding-top:4px}.mcp-guide__step{display:grid;gap:12px;grid-template-columns:28px minmax(0,1fr)}.mcp-guide__step-number{background:#1e1e1e;border-radius:50%;color:#fff;display:grid;font-size:13px;font-weight:600;height:28px;place-items:center;width:28px}.mcp-guide__step-content h3{font-size:14px;line-height:1.4;margin:3px 0 8px}.mcp-guide__step-content p{margin:0 0 12px}.mcp-guide__endpoint{background:#f6f7f7;border:1px solid #ddd;border-radius:4px;display:block;max-width:100%;overflow-x:auto;padding:8px 10px;white-space:nowrap}.mcp-guide__client-description,.mcp-guide__muted,.mcp-guide__revoke{color:#50575e}.mcp-guide__tabs{border-bottom:1px solid #dcdcde;display:flex;gap:4px;margin-top:4px}.mcp-guide__tabs button{background:transparent;border:1px solid transparent;border-bottom-color:#dcdcde;color:#2c3338;cursor:pointer;font:inherit;margin:0 0 -1px;padding:8px 12px;position:relative}.mcp-guide__tabs button:hover{color:var(--wp-admin-theme-color,#2271b1)}.mcp-guide__tabs button:focus-visible{outline:2px solid var(--wp-admin-theme-color,#2271b1);outline-offset:-2px;z-index:1}.mcp-guide__tabs button.is-active{background:#fff;border-color:#dcdcde #dcdcde #fff;color:var(--wp-admin-theme-color,#2271b1);font-weight:600}.mcp-guide__tab-ready{color:#008a20;margin-left:6px}.mcp-guide__tabpanel{padding-top:16px}.mcp-guide__tabpanel .components-notice{margin:0 0 16px}.mcp-guide__credential{align-items:center;display:grid;gap:10px 16px;grid-template-columns:minmax(0,1fr) auto;margin-bottom:18px}.mcp-guide__credential>div{display:grid;gap:3px;min-width:0}.mcp-guide__credential code{overflow-wrap:anywhere}.mcp-guide__label{color:#50575e;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.mcp-guide__code-block{background:#1e1e1e;border-radius:5px;color:#f0f0f0;margin-top:10px;position:relative}.mcp-guide__code-block pre{margin:0;overflow-x:auto;padding:16px 16px 60px;white-space:pre}.mcp-guide__code-block code{background:transparent;color:inherit;font-size:12px}.mcp-guide__code-action{bottom:10px;position:absolute;right:10px}.mcp-guide__revoke{font-size:12px;margin-top:12px!important}@media (max-width:782px){.mcp-guide__actions{justify-content:space-between;width:100%}.mcp-guide__tabs{overflow-x:auto}.mcp-guide__tabs button{white-space:nowrap}}"));
  document.head.appendChild(style);
}
var dataContainer = document.querySelector(
  'script[id="wp-script-module-data-@mcp-connection-guide/connector"]'
);
var moduleData = {};
if (dataContainer instanceof window.HTMLScriptElement) {
  try {
    moduleData = JSON.parse(dataContainer.text);
  } catch {
  }
}
var guide = moduleData.guide || {};
var clients = [
  {
    id: "codex",
    label: "Codex",
    description: "Run one command in a terminal. Codex CLI, the IDE extension, and the desktop app share this MCP configuration."
  },
  {
    id: "claude-code",
    label: "Claude Code",
    description: "Add the server to your user-scoped Claude Code configuration."
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    description: "Merge this entry into your Claude Desktop MCP configuration file, then restart Claude Desktop."
  }
];
function shellQuote(value) {
  return `'${String(value).split("'").join(`'"'"'`)}'`;
}
function buildConfig(clientId, credential) {
  const env = {
    WP_API_URL: guide.endpoint,
    WP_API_USERNAME: guide.username,
    WP_API_PASSWORD: credential.password
  };
  if (clientId === "codex") {
    return [
      `codex mcp add ${guide.serverName}`,
      `  --env WP_API_URL=${shellQuote(env.WP_API_URL)}`,
      `  --env WP_API_USERNAME=${shellQuote(env.WP_API_USERNAME)}`,
      `  --env WP_API_PASSWORD=${shellQuote(env.WP_API_PASSWORD)}`,
      "  -- npx -y @automattic/mcp-wordpress-remote@latest"
    ].join(" \\\n");
  }
  if (clientId === "claude-code") {
    return [
      "claude mcp add --transport stdio --scope user",
      `  --env WP_API_URL=${shellQuote(env.WP_API_URL)}`,
      `  --env WP_API_USERNAME=${shellQuote(env.WP_API_USERNAME)}`,
      `  --env WP_API_PASSWORD=${shellQuote(env.WP_API_PASSWORD)}`,
      `  ${guide.serverName} -- npx -y @automattic/mcp-wordpress-remote@latest`
    ].join(" \\\n");
  }
  return JSON.stringify(
    {
      mcpServers: {
        [guide.serverName]: {
          command: "npx",
          args: ["-y", "@automattic/mcp-wordpress-remote@latest"],
          env
        }
      }
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
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
function CopyButton({ value, copyLabel = "Copy", copiedLabel = "Copied" }) {
  const [copied, setCopied] = (0, import_element.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Button,
    {
      variant: "secondary",
      size: "compact",
      onClick: async () => {
        await copyText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      children: copied ? copiedLabel : copyLabel
    }
  );
}
function StatusBadge({ available }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: `mcp-guide__badge mcp-guide__badge--${available ? "available" : "missing"}`,
      children: available ? "Adapter available" : "Adapter needed"
    }
  );
}
function Step({ number, title, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "mcp-guide__step", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mcp-guide__step-number", "aria-hidden": "true", children: number }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mcp-guide__step-content", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
      children
    ] })
  ] });
}
function AdapterStep() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, { number: "1", title: "Check the MCP Adapter", children: guide.adapterAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_element.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The MCP Adapter is already available on this site." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "mcp-guide__endpoint", children: guide.endpoint })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
    "The MCP Adapter was not found.",
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.ExternalLink, { href: guide.adapterReleaseUrl, children: "Download it from the official GitHub releases" }),
    ", install it using your normal plugin workflow, and return here."
  ] }) });
}
function CredentialPanel({
  activeClient,
  credential,
  onGenerate,
  isGenerating,
  error
}) {
  if (!guide.adapterAvailable) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mcp-guide__muted", children: "Install or enable an MCP Adapter provider before creating a credential." });
  }
  if (!guide.appPasswordsAvailable || !guide.canCreateAppPassword) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_components.Notice, { status: "warning", isDismissible: false, children: [
      "Application Passwords are not available for this account or environment.",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: guide.profileUrl, children: "Review your profile settings." })
    ] });
  }
  const active = clients.find((client) => client.id === activeClient);
  if (!credential) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_element.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "Create a separate, revocable Application Password for",
        " ",
        active.label,
        ". The secret is returned only once."
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Notice, { status: "error", isDismissible: false, children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.Button,
        {
          variant: "primary",
          disabled: isGenerating,
          isBusy: isGenerating,
          accessibleWhenDisabled: true,
          onClick: onGenerate,
          children: isGenerating ? "Generating…" : `Generate for ${active.label}`
        }
      )
    ] });
  }
  const config = buildConfig(activeClient, credential);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_element.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Notice, { status: "success", isDismissible: false, children: "The credential is ready. Copy it now; WordPress will not show this password again after you leave this page." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mcp-guide__credential", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mcp-guide__label", children: "Username" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: guide.username })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: guide.username }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mcp-guide__label", children: "Application Password" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: credential.password })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: credential.password })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mcp-guide__client-description", children: active.description }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mcp-guide__code-block", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: config }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mcp-guide__code-action", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: config, copyLabel: "Copy configuration" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "mcp-guide__revoke", children: [
      "Finished? You can rename or revoke this credential at any time from ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: guide.profileUrl, children: "your WordPress profile" }),
      "."
    ] })
  ] });
}
function SetupGuide() {
  const [activeClient, setActiveClient] = (0, import_element.useState)("codex");
  const [credentials, setCredentials] = (0, import_element.useState)({});
  const [generatingClient, setGeneratingClient] = (0, import_element.useState)(null);
  const [errors, setErrors] = (0, import_element.useState)({});
  const generatePassword = async () => {
    const client = clients.find((item) => item.id === activeClient);
    setGeneratingClient(activeClient);
    setErrors((current) => ({ ...current, [activeClient]: "" }));
    try {
      const response = await (0, import_api_fetch.default)({
        path: guide.createPasswordPath,
        method: "POST",
        data: {
          name: `WordPress MCP — ${client.label} — ${guide.siteName}`
        }
      });
      if (!response.password) {
        throw new Error(
          "WordPress did not return the new Application Password."
        );
      }
      setCredentials((current) => ({
        ...current,
        [activeClient]: {
          password: response.password,
          uuid: response.uuid
        }
      }));
    } catch (requestError) {
      setErrors((current) => ({
        ...current,
        [activeClient]: requestError?.message || "The Application Password could not be created."
      }));
    } finally {
      setGeneratingClient(null);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mcp-guide__setup", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterStep, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, { number: "2", title: "Choose a client and create its credential", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "mcp-guide__tabs",
          role: "tablist",
          "aria-label": "MCP clients",
          children: clients.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeClient === client.id,
              className: activeClient === client.id ? "is-active" : "",
              onClick: () => setActiveClient(client.id),
              children: [
                client.label,
                credentials[client.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "span",
                  {
                    className: "mcp-guide__tab-ready",
                    "aria-label": "Credential ready",
                    children: "✓"
                  }
                )
              ]
            },
            client.id
          ))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mcp-guide__tabpanel", role: "tabpanel", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        CredentialPanel,
        {
          activeClient,
          credential: credentials[activeClient],
          onGenerate: generatePassword,
          isGenerating: generatingClient === activeClient,
          error: errors[activeClient]
        }
      ) })
    ] })
  ] });
}
function McpConnector(props) {
  const [expanded, setExpanded] = (0, import_element.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ConnectorItem,
    {
      className: "connector-item--wordpress-mcp mcp-guide",
      logo: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mcp-guide__logo", "aria-hidden": "true", children: "MCP" }),
      name: props.name,
      description: props.description,
      actionArea: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mcp-guide__actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { available: guide.adapterAvailable }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Button,
          {
            variant: expanded ? "tertiary" : "secondary",
            size: "compact",
            onClick: () => setExpanded((value) => !value),
            "aria-expanded": expanded,
            children: expanded ? "Hide setup" : "Set up"
          }
        )
      ] }),
      children: expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupGuide, {})
    }
  );
}
registerConnector("wordpress-mcp", {
  render: McpConnector
});
//# sourceMappingURL=index.js.map
