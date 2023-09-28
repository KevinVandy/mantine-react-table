# Contributing to Mantine React Table

<a href="http://makeapullrequest.com" target="_blank">
  <img alt="" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>

## Suggesting New Features or Bug Fixes

Before making large PRs, you may want to discuss your proposals in either the [Discord Contributing Channel](https://discord.gg/5wqyRx6fnm), the [GitHub Discussions](https://github.com/KevinVandy/mantine-react-table/discussions) page, or the [GitHub Issues](https://github.com/KevinVandy/mantine-react-table/issues) page.

## Running the project locally

This project uses PNPM and a TurboRepo with 2 projects.

- The library itself in `/packages/mantine-react-table` which also contains a storybook site for local development
- The docs site in `/apps/mantine-react-table-docs`

### 1. Fork and Clone the project

Create your own fork, clone, and then make a feature/bugfix branch off of `main`. Branch name does not really matter.

### 2. Install Dependencies

```bash
pnpm i
```

### 3. Run the project(s)

#### Run the Storybook for Local Development

```bash
pnpm storybook
```

The Storybook site will open on `port 6006` by default.

#### Run the Docs for Local Development

```bash
pnpm docs:dev
```

The Docs site will open on `port 3000` by default.

> Note: If you are contributing a new locale and are trying to test it in the docs site, you will need to run `pnpm lib:build-locales` and then `pnpm docs:dev` before it can be imported.

#### Fully Build the Library

```bash
pnpm lib:build
```

> Note: After building the library, if you are running the docs site locally, it will use the compiled output of the dist folder. This can be annoying if you are trying to test changes to the library in the docs site itself. Just delete the `/dist` folder to test lib changes in the docs site.

## Library Code Style Guide

1. All styles should be written in `.module.css` files with a file name that matches the `component.tsx` file name.
2. All dynamic styles should be handed with CSS variables (`__vars` prop)
3. CSS variables should be named `--mrt-<component/element-name>-<property-name>` (e.g. `--mrt-tbody-display`) in order to avoid name collisions with elements down the tree.
4. Class names in `.module.css` files don't really matter since they get compiled away, but just use all lowercase and hyphenated (e.g. `table-cell`). Just use `.root` for the root element, and use other names that make sense for sub-elements.
5. All major elements in internal MRT components should have an `mrt-<component/element-name>` class name (e.g. `mrt-table-body-cell`).
6. Always use the `clsx` utility to assign class names to elements. Always allow for `mantine*Props.className` to be passed in and merged with the internal class names. For example 
```tsx
className={clsx('mrt-table-body', classes.root, tableBodyProps.className)}`
```
7. When assigning `__vars`, don't forget to spread `...mantine*Props.__vars` in order to allow for external variables to be passed in and merged with internal variables. For example
```tsx
__vars={{
  '--mrt-table-body-cell-padding': '10px',
  ...tableBodyProps?.__vars,
}}
```