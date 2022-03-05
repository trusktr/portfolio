export function epsilon(value: any) {
	return Math.abs(value) < 0.000001 ? 0 : value
}

// TODO padd an options object to make it more clear what the args are.
export function observeChildren(target: any, onConnect: any, onDisconnect: any, skipTextNodes: any) {
	const childObserver = createChildObserver(onConnect, onDisconnect, skipTextNodes)
	childObserver.observe(target, {childList: true})
	return childObserver
}

// NOTE: If a child is disconnected then connected to the same parent in the
// same turn, then the onConnect and onDisconnect callbacks won't be called
// because the DOM tree will be back in the exact state as before (this is
// possible thanks to the logic associated with weightsPerTarget).
export function createChildObserver(onConnect: any, onDisconnect: any, skipTextNodes = false) {
	return new MutationObserver(changes => {
		const weightsPerTarget = new Map<any, Map<any, any>>()

		// We're just counting how many times each child node was added and
		// removed from the parent we're observing.
		for (let i = 0, l = changes.length; i < l; i += 1) {
			const change = changes[i]

			if (change.type != 'childList') continue

			let weights = weightsPerTarget.get(change.target)

			if (!weights) weightsPerTarget.set(change.target, (weights = new Map()))

			const {addedNodes} = change
			for (let l = addedNodes.length, i = 0; i < l; i += 1)
				weights.set(addedNodes[i], (weights.get(addedNodes[i]) || 0) + 1)

			const {removedNodes} = change
			for (let l = removedNodes.length, i = 0; i < l; i += 1)
				weights.set(removedNodes[i], (weights.get(removedNodes[i]) || 0) - 1)
		}

		// NOTE, the destructuring inside the for..of header currently doesn't
		// work due to a Buble bug, so we destructure inside the loop instead.
		// https://github.com/Rich-Harris/buble/issues/182
		// for (const [target, weights] of Array.from(weightsPerTarget)) {
		for (const entry of Array.from(weightsPerTarget)) {
			const [target, weights] = entry

			// for (const [node, weight] of Array.from(weights)) {
			for (const entry of Array.from(weights)) {
				const [node, weight] = entry

				if (skipTextNodes && (node instanceof Text || node instanceof Comment)) continue

				// If the number of times a child was added is greater than the
				// number of times it was removed, then the net result is that
				// it was added, so we call onConnect just once.
				if (weight > 0 && typeof onConnect == 'function') onConnect.call(target, node)
				// If the number of times a child was added is less than the
				// number of times it was removed, then the net result is that
				// it was removed, so we call onDisconnect just once.
				else if (weight < 0 && typeof onDisconnect == 'function') onDisconnect.call(target, node)

				// If the number of times a child was added is equal to the
				// number of times it was removed, then it was essentially left
				// in place, so we don't call anything.
			}
		}
	})
}

export function documentBody(): Promise<void> {
	return new Promise(resolve => {
		if (document.body) return resolve()

		const observer = new MutationObserver(() => {
			if (document.body) {
				resolve()
				observer.disconnect()
			}
		})

		observer.observe(document.documentElement, {childList: true})
	})
}

export function toRadians(degrees: number): number {
	return (degrees / 180) * Math.PI
}

export function toDegrees(radians: number): number {
	return (radians / Math.PI) * 180
}

/**
 * Execute the given `func`tion on the next micro "tick" of the JS engine.
 */
export function defer(func: () => unknown): Promise<unknown> {
	// "defer" is used as a semantic label for Promise.resolve().then
	return Promise.resolve().then(func)
}

export function thro(msg?: any): never {
	throw new Error(msg)
}

export function trim(s: string) {
	return s
		.split('\n')
		.map(s => s.trim())
		.join('\n')
}

export function dashCase(str: string) {
	return typeof str === 'string'
		? str.split(/([_A-Z])/).reduce((one, two, idx) => {
				const dash = !one || idx % 2 === 0 ? '' : '-'
				two = two === '_' ? '' : two
				return `${one}${dash}${two.toLowerCase()}`
		  })
		: str
}

export function empty(val: any): val is undefined | null {
	return val == null
}

// return a new array with unique items (duplicates removed)
export function unique<T>(array: T[]): T[] {
	return Array.from(new Set(array))
}

// return a new object with `properties` picked from `source`
export function pick<T extends object, K extends keyof T>(source: T, properties: K[]): Pick<T, K> {
	let result: any = {}

	properties.forEach(prop => {
		result[prop] = source[prop]
	})

	return result
}

export function identity(v: any) {
	return v
}
