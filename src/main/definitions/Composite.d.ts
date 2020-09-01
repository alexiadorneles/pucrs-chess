export interface Composite {
  cleanCircularReferences(): void
  getChildren(): Composite[]
  setChildren(children: Composite[]): void
  createElement(): Element
}
