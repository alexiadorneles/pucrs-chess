type Store<Attributes> = { [key in keyof Attributes]: Attributes[keyof Attributes] }

export interface ControlAttribute<T> {
  control: T
}

export class Model<Attributes> {
  private store: Store<Attributes> = {} as Store<Attributes>
  public set<T extends keyof Attributes, V extends Attributes[T]>(key: T, value: V): void {
    this.store[key] = value
  }

  public get<T extends keyof Attributes, V extends Attributes[T]>(key: T): V {
    return this.store[key] as V
  }
}
