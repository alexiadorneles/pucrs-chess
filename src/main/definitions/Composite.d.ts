import { JSONObject } from './JSONObject'

export interface Composite {
  cleanCircularReferences(): void
  getJSON(): JSONObject
  getChildren(): Composite[]
  setChildren(children: Composite[]): void
  createElement(): Element
}
