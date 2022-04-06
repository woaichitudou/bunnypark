///
declare module 'react/jsx-runtime' {
  export default any
}

declare module 'querystringify' {
  export function parse (p: string): Record<string, any>
}

interface Window {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => Promise<void>
  }
}
