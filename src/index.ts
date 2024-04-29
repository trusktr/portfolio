import './silence-solid.js'

export {
	$DEVCOMP,
	$PROXY,
	$TRACK,
	ErrorBoundary,
	For,
	Index,
	Match,
	Show,
	type SplitProps,
	Suspense,
	SuspenseList,
	Switch,
	batch,
	children,
	createComputed,
	createContext,
	createEffect,
	createMemo,
	createResource,
	createRoot,
	createSelector,
	createSignal,
	getListener,
	getOwner,
	indexArray,
	mapArray,
	mergeProps,
	on,
	onCleanup,
	onError,
	onMount,
	runWithOwner,
	splitProps,
	startTransition,
	untrack,
	useContext,
	useTransition,
} from 'solid-js'
export {render} from 'solid-js/web'
export {default as html} from 'solid-js/html'

export * from '@lume/element'

export * from './behaviors/index.js'
export * from './cameras/index.js'
export * from './core/index.js'
export * from './examples/index.js'
export * from './interaction/index.js'
export * from './layouts/index.js'
export * from './lights/index.js'
export * from './math/index.js'
export * from './meshes/index.js'
export * from './models/index.js'
export * from './renderers/index.js'
export * from './textures/index.js'
export * from './utils/index.js'
export * from './xyz-values/index.js'

export * from './defineElements.js'

export const version = '0.3.0-alpha.42'
