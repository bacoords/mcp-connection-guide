# WordPress Connectors metadata stub

`@wordpress/connectors` is a private Gutenberg package and is not currently published to npm. `@wordpress/build` needs its package metadata and an import-resolvable entry point to classify it as a WordPress script module.

This stub mirrors the relevant fields from the Core package manifest. It is used only during linting and builds; the generated bundle keeps `@wordpress/connectors` external, and WordPress Core supplies the runtime implementation through its import map.
