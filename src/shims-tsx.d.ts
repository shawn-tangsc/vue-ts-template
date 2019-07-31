import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface IElement extends VNode {}
    interface IElementClass extends Vue {}
    interface IIntrinsicElements {
      [elem: string]: any
    }
  }
}
