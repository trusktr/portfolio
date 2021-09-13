import {reactive} from '@lume/element'
import {Eventful} from '@lume/eventful'
import {DeclarativeBase} from './DeclarativeBase.js'

/**
 * @class TreeNode - The `TreeNode` class represents objects that are connected
 * to each other in parent-child relationships in a tree structure. A parent
 * can have multiple children, and a child can have only one parent.
 * @extends Eventful
 * @extends DeclarativeBase
 */
@reactive
export class TreeNode extends Eventful(DeclarativeBase) {
	/**
	 * @readonly
	 * @property {TreeNode | null} lumeParent - The LUME-specific parent of the
	 * current TreeNode. Each node in a tree can have only one parent. This is
	 * `null` if there is no parent when not connected into a tree, or if the
	 * parentElement while connected into a tree is not as LUME 3D element.
	 */
	get lumeParent(): TreeNode | null {
		if (this.parentElement instanceof TreeNode) return this.parentElement
		return null
	}

	/**
	 * @readonly
	 * @property {TreeNode[]} lumeChildren - An array of this element's
	 * LUME-specific children. This returns a new static array each time, so
	 * and modifying this array directly does not effect the state of the
	 * TreeNode. Use [TreeNode.append(child)](#append) and
	 * [TreeNode.removeChild(child)](#removechild) to modify a TreeNode's
	 * actual children.
	 */
	get lumeChildren(): TreeNode[] {
		return Array.prototype.filter.call(this.children, c => c instanceof TreeNode) as TreeNode[]
	}

	/**
	 * @readonly
	 * @property {number} lumeChildCount - The number of children this TreeNode has.
	 */
	get lumeChildCount(): number {
		return this.lumeChildren.length
	}
}
