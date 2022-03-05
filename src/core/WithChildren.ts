import {observeChildren} from '../core/utils.js'

import {Constructor} from 'lowclass'
import type {PossibleCustomElement, PossibleCustomElementConstructor} from './PossibleCustomElement.js'

export function WithChildren<T extends Constructor<HTMLElement>>(Base: T) {
	return class WithChildren extends Constructor<PossibleCustomElement, PossibleCustomElementConstructor & T>(Base) {
		constructor(...args: any[]) {
			super(...args)

			this.#createObserver()
		}

		connectedCallback() {
			super.connectedCallback?.()
			this.#handleConnectedChildren()
			this.#createObserver()
		}

		disconnectedCallback() {
			super.disconnectedCallback?.()

			this.#destroyObserver()
		}

		childConnectedCallback?(_child: Element): void
		childDisconnectedCallback?(_child: Element): void

		#observer: MutationObserver | null = null

		#createObserver() {
			if (this.#observer) return

			// observeChildren returns a MutationObserver observing childList
			this.#observer = observeChildren(
				this,
				(child: Element) => {
					if (!this.isConnected) return
					this.childConnectedCallback && this.childConnectedCallback(child)
				},
				(child: Element) => {
					if (!this.isConnected) return
					this.childDisconnectedCallback && this.childDisconnectedCallback(child)
				},
				true,
			)
		}

		#destroyObserver() {
			if (!this.#observer) return
			this.#observer.disconnect()
			this.#observer = null
		}

		#handleConnectedChildren() {
			if (!this.isConnected) return

			for (let element = this.firstElementChild; element; element = element.nextElementSibling) {
				this.#handleConnectedChild(element)
			}
		}

		#handleConnectedChild(element: Element) {
			const elementIsUpgraded = element.matches(':defined')

			if (elementIsUpgraded) {
				this.childConnectedCallback?.(element)
			} else {
				customElements.whenDefined(element.tagName.toLowerCase()).then(() => {
					this.childConnectedCallback?.(element)
				})
			}
		}
	}
}
