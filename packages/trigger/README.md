<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Primitives&background=tiles&project=trigger" alt="Solid Primitives trigger">
</p>

# @solid-primitives/trigger

[![turborepo](https://img.shields.io/badge/built%20with-turborepo-cc00ff.svg?style=for-the-badge&logo=turborepo)](https://turborepo.org/)
[![size](https://img.shields.io/bundlephobia/minzip/@solid-primitives/trigger?style=for-the-badge&label=size)](https://bundlephobia.com/package/@solid-primitives/trigger)
[![version](https://img.shields.io/npm/v/@solid-primitives/trigger?style=for-the-badge)](https://www.npmjs.com/package/@solid-primitives/trigger)
[![stage](https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolidjs-community%2Fsolid-primitives%2Fmain%2Fassets%2Fbadges%2Fstage-0.json)](https://github.com/solidjs-community/solid-primitives#contribution-process)

A set of primitives based on Solid signals, used to trigger computations.

- [`createTrigger`](#createTrigger) - Set listeners in reactive computations and then trigger them when you want.
- [`createTriggerCache`](#createTriggerCache) - A map of triggers cached by a key.
- [`createWeakTriggerCache`](#createWeakTriggerCache) - A weakmap of triggers cached by a weak key.

## Installation

```bash
npm install @solid-primitives/trigger
# or
yarn add @solid-primitives/trigger
```

## `createTrigger`

Set listeners in reactive computations and then trigger them when you want.

### How to use it

```ts
import { createTrigger } from "@solid-primitives/trigger";

const [track, dirty] = createTrigger();

createEffect(() => {
  track();
  // ...
});

// later
dirty();
```

## `createTriggerCache`

A map of triggers cached by a key.

### How to use it

`track` and `dirty` are called with a `key` so that each tracker will trigger an update only when his individual `key` would get marked as dirty.

```ts
import { createTriggerCache } from "@solid-primitives/trigger";

const { track, dirty } = createTriggerCache();

createEffect(() => {
  track(1);
  //  ...
});

// later
dirty(1);
// this won't cause an update:
dirty(2);
```

## `createWeakTriggerCache`

A weakmap of triggers cached by a weak key.

### How to use it

`track` and `dirty` are called with a `key` so that each tracker will trigger an update only when his individual `key` would get marked as dirty.

```ts
import { createWeakTriggerCache } from "@solid-primitives/trigger";

const { track, dirty } = createWeakTriggerCache();
const key = {};

createEffect(() => {
  track(key);
  //  ...
});

// later
dirty(key);
// this won't cause an update:
dirty({});
```

## Demo

TODO

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)
