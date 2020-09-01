export interface Composite {
  clone(): Composite
  cleanCircularReferences(): void
  getChildren(): Composite[]
  setChildren(children: Composite[]): void
  createElement(): Element
}
