import { Composite } from './Composite'

export interface ReactiveItem {
  onClick(element: Event): void
}

export interface ReactiveComposite<T> extends Composite<T>, ReactiveItem {}
