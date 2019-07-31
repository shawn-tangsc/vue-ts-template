declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.gif' {
  export const gif: any
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'node.extend'

// TODO: remove this part after vue-count-to has its typescript file
declare module 'jsencrypt/bin/jsencrypt'
