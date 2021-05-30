/** @format */

export class ResizeWatcher {
  function = null
  protected height: number = 0
  protected width: number = 0
  private nodeToResize: Element
  private baseHeight: number = 0
  private baseWidth: number = 0
  private watchHeightAttribute: string | null = null
  private watchWidthAttribute: string | null = null
  private dualWatcher: ResizeWatcher | null = null
  private resizeFunc: () => void

  WatchResize = (node: Element): void => {
    this.height = node.clientHeight ? node.clientHeight : 0
    this.width = node.clientWidth ? node.clientHeight : 0
    this.resizeFunc()
  }

  ResetSize = (): void => {
    this.height = 0
    this.width = 0
    this.resizeFunc()
  }

  WatchMargin = (nodeToResize: Element) => {
    this.nodeToResize = nodeToResize
    this.resizeFunc = this.computeMargin
    this.resizeFunc()
  }

  WatchMinimal = (nodeToResize: Element) => {
    this.nodeToResize = nodeToResize
    this.resizeFunc = this.computeMinimal
    this.resizeFunc()
  }

  SetDualWatcher = (w: ResizeWatcher) => {
    this.dualWatcher = w
  }

  SetupWatcher = (
    baseHeight: number = 0,
    baseWidth: number = 0,
    heightWatchOn: string | null = null,
    widthWatchOn: string | null = null
  ): void => {
    this.baseHeight = baseHeight
    this.baseWidth = baseWidth
    this.watchHeightAttribute = heightWatchOn
    this.watchWidthAttribute = widthWatchOn
  }

  Size = (): [number, number] => {
    return [this.width, this.height]
  }

  private computeMargin = () => {
    let newAttributes: attributes[] = []
    let heightMargin = this.baseHeight
    let widthMargin = this.baseWidth

    if (this.dualWatcher != null) {
      let size = this.dualWatcher.Size()
      heightMargin = Math.max(size[1], heightMargin)
      widthMargin = Math.max(size[0], heightMargin)
    }

    if (this.watchHeightAttribute !== null) {
      newAttributes.push(new attributes(this.watchHeightAttribute, (this.height + heightMargin).toString() + 'px'))
    }

    if (this.watchWidthAttribute !== null) {
      newAttributes.push(new attributes(this.watchWidthAttribute, (this.width + widthMargin).toString() + 'px'))
    }

    if (newAttributes.length < 1) {
      return
    }

    this.nodeToResize.setAttribute(
      'style',
      attributes.Compute(attributes.MultipleFromString(this.nodeToResize.getAttribute('style')), newAttributes)
    )
  }

  private computeMinimal = () => {
    let newAttributes: attributes[] = []
    let minimalHeight = this.baseHeight
    let minimalWidth = this.baseWidth

    if (this.dualWatcher != null) {
      let size = this.dualWatcher.Size()
      minimalHeight = minimalHeight - size[1]
      minimalWidth = minimalWidth - size[0]
    }

    if (this.watchHeightAttribute !== null) {
      newAttributes.push(new attributes(this.watchHeightAttribute, (minimalHeight - this.height).toString() + 'px'))
    }

    if (this.watchWidthAttribute !== null) {
      newAttributes.push(new attributes(this.watchWidthAttribute, (minimalWidth - this.width).toString() + 'px'))
    }

    if (newAttributes.length < 1) {
      return
    }

    this.nodeToResize.setAttribute(
      'style',
      attributes.Compute(attributes.MultipleFromString(this.nodeToResize.getAttribute('style')), newAttributes)
    )
  }
}

class attributes {
  property: string
  value: string

  constructor(property: string, value: string) {
    this.property = property
    this.value = value
  }

  static FromString = (entry: string): attributes => {
    const splitted = entry.replace(/;$/, '').split(':')
    return new attributes(splitted[0], splitted[1])
  }

  static MultipleFromString = (entry: string | null): attributes[] => {
    let res: attributes[] = []

    if (!entry) {
      return res
    }

    const splitted = entry.replace(/;$/, '').split(';')
    splitted.forEach(singleEntry => res.push(attributes.FromString(singleEntry)))

    return res
  }

  static Compute = (base: attributes[], toAdd: attributes[]): string => {
    let res = ''
    base.forEach(attribute => {
      let idx = toAdd.findIndex(candidate => candidate.property == attribute.property)

      if (idx > -1) {
        attribute = toAdd[idx]
        toAdd.splice(idx, 1)
      }

      res += attribute.ToString()
    })

    toAdd.forEach(attribute => (res += attribute.ToString()))

    return res
  }

  ToString = (): string => {
    return this.property + ': ' + this.value + ';'
  }
}
