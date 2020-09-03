import { JSONObject } from './JSONObject'
import { Model } from './Model'

export interface BaseComposite {
  getParent(): BaseComposite
  cleanCircularReferences(): void
  getJSON(): JSONObject
  getChildren(): BaseComposite[]
  createElement(): Element
}

export interface Composite<T> extends BaseComposite {
  getModel(): Model<T>
}
