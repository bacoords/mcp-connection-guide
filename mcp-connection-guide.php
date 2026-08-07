<?php
/**
 * Plugin Name:       MCP Connection Guide
 * Plugin URI:        https://github.com/WordPress/mcp-adapter
 * Description:       Adds a guided WordPress MCP setup flow to the Connectors screen.
 * Version:           0.1.0
 * Requires at least: 7.1
 * Requires PHP:      7.4
 * Author:            Brian Coords
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:       mcp-connection-guide
 *
 * @package MCP_Connection_Guide
 */

namespace MCP_Connection_Guide;

defined( 'ABSPATH' ) || exit;

const CONNECTOR_ID = 'wordpress-mcp';
const MODULE_ID    = 'mcp-connection-guide';

/**
 * Register the MCP guide as a non-credential connector.
 *
 * The connector renders its own setup experience in JavaScript. Its generated
 * Application Password belongs to the current WordPress user and is never
 * stored in the Connectors settings registry.
 *
 * @param \WP_Connector_Registry $registry Connector registry.
 */
function register_connector( $registry ) {
	if ( ! $registry instanceof \WP_Connector_Registry || $registry->is_registered( CONNECTOR_ID ) ) {
		return;
	}

	$registry->register(
		CONNECTOR_ID,
		array(
			'name'           => __( 'WordPress MCP', 'mcp-connection-guide' ),
			'description'    => __( 'Connect Codex or Claude to this site through the WordPress MCP Adapter.', 'mcp-connection-guide' ),
			'type'           => 'developer_tool',
			'authentication' => array(
				'method' => 'none',
			),
		)
	);
}
add_action( 'wp_connectors_init', __NAMESPACE__ . '\\register_connector' );

/**
 * Register the script module used by the custom connector renderer.
 */
function register_assets() {
	if ( ! function_exists( 'wp_register_script_module' ) ) {
		return;
	}

	$script_path = __DIR__ . '/assets/connector.mjs';

	wp_register_script_module(
		MODULE_ID,
		plugins_url( 'assets/connector.mjs', __FILE__ ),
		array(
			array(
				'id'     => '@wordpress/connectors',
				'import' => 'static',
			),
		),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : '0.1.0'
	);
}
add_action( 'init', __NAMESPACE__ . '\\register_assets', 30 );

/**
 * Make the guide an explicit boot dependency of the Connectors page.
 *
 * The module is also enqueued below so it executes, rather than only being
 * included in the page's import map and module preload list.
 *
 * @param array<int, array<string, string>> $dependencies Boot dependencies.
 * @return array<int, array<string, string>>
 */
function add_boot_dependency( $dependencies ) {
	foreach ( $dependencies as $dependency ) {
		if ( isset( $dependency['id'] ) && MODULE_ID === $dependency['id'] ) {
			return $dependencies;
		}
	}

	$dependencies[] = array(
		'id'     => MODULE_ID,
		'import' => 'static',
	);

	return $dependencies;
}
add_filter( 'options-connectors-wp-admin_boot_dependencies', __NAMESPACE__ . '\\add_boot_dependency' );

/**
 * Determine whether the current admin request is for the Connectors screen.
 *
 * @return bool
 */
function is_connectors_screen() {
	$screen = get_current_screen();
	if ( $screen && 'options-connectors' === $screen->id ) {
		return true;
	}

	// This covers the plugin-hosted version used while the screen was developed.
	$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	return 'options-connectors-wp-admin' === $page;
}

/**
 * Enqueue the renderer and its small set of screen-specific styles.
 */
function enqueue_assets() {
	if ( ! is_connectors_screen() || ! function_exists( 'wp_enqueue_script_module' ) ) {
		return;
	}

	wp_enqueue_script_module( MODULE_ID );

	$style_path = __DIR__ . '/assets/connector.css';
	wp_enqueue_style(
		MODULE_ID,
		plugins_url( 'assets/connector.css', __FILE__ ),
		array( 'wp-components' ),
		file_exists( $style_path ) ? (string) filemtime( $style_path ) : '0.1.0'
	);
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_assets', 20 );

/**
 * Supply essential, current-user setup data to the script module.
 *
 * @param array<string, mixed> $data Existing module data.
 * @return array<string, mixed>
 */
function get_script_module_data( $data ) {
	$user       = wp_get_current_user();
	$site_name  = get_bloginfo( 'name' );
	$site_host  = (string) wp_parse_url( home_url( '/' ), PHP_URL_HOST );
	$server_key = sanitize_title( $site_host ? $site_host : $site_name );

	$app_passwords_available = function_exists( 'wp_is_application_passwords_available' )
		&& wp_is_application_passwords_available()
		&& wp_is_application_passwords_available_for_user( $user );

	$data['guide'] = array(
		'adapterAvailable'      => class_exists( '\\WP\\MCP\\Core\\McpAdapter' ),
		'adapterReleaseUrl'     => 'https://github.com/WordPress/mcp-adapter/releases/latest',
		'appPasswordsAvailable' => $app_passwords_available,
		'canCreateAppPassword'  => $user->exists()
			&& current_user_can( 'create_app_password', $user->ID ),
		'createPasswordPath'    => '/wp/v2/users/me/application-passwords',
		'endpoint'              => rest_url( 'mcp/mcp-adapter-default-server' ),
		'profileUrl'            => admin_url( 'profile.php#application-passwords-section' ),
		'serverName'            => 'wordpress-' . ( $server_key ? $server_key : 'site' ),
		'siteName'              => $site_name,
		'username'              => $user->user_login,
	);

	return $data;
}
add_filter( 'script_module_data_' . MODULE_ID, __NAMESPACE__ . '\\get_script_module_data' );
