import { createContext, ReactNode, useContext } from 'react';

export
function create_required_ctx<T>(name?: string) {
  const ctx = createContext<T | null>(null)
  return {
    Provider: (props: { value: T, children: ReactNode }) =>
      <ctx.Provider value={props.value}>
        {props.children}
      </ctx.Provider>
    ,
    useCTX: () => {
      const real_ctx = useContext(ctx)
      if (real_ctx === null)
        throw Error('Missing Context' + (
          name ? (': ' + name) : ''
        ))
      return real_ctx
    }
  }
}
