import { setup, assign, fromPromise } from 'xstate';
import { useMachine } from '@xstate/react'

const cacheMachine = setup({
  actions: {
    assignKey: assign({
      key: ({ event }) => event.key
    }),
    assignData:
      assign({
        data: ({ event }) => event.output
      })
    ,
    updateCache: assign({
      cache: ({ context }) => ({
        ...context.cache,
        [context.key]: context.data
      })
    })
  },
  guards: {
    isCached: ({ context }) => context.key != null && context.key in context.cache
  },
  actors: {
    fetchData: fromPromise(async () => {
      return new Promise((resolve, reject) => {
        const number = Math.random();
        const isSuccess = number > 0.5;

        setTimeout(() => {
          if (isSuccess) {
            resolve('Data fetched successfully');
          } else {
            reject('Fetch error');
          }
        }, 1000);

      }).then(async () => {
        const response = 'data2'
        return response
      });
    })
  }
}).createMachine({
  id: 'cache',
  initial: 'idle',
  context: {
    key: null,
    data: null,
    cache: {
      key1: 'data1',
    }
  },
  states: {
    idle: {
      on: {
        REQUEST: {
          target: 'checkingCache',
          actions: 'assignKey'
        }
      }
    },
    checkingCache: {
      always: [
        { target: 'cacheHit', guard: 'isCached' },
        { target: 'cacheMiss' }
      ]
    },
    cacheHit: {
      entry: assign({
        data: ({ context }) => context.cache[context.key]
      }),
      always: 'done'
    },
    cacheMiss: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'updatingCache',
          actions: 'assignData'
        },
        onError: 'error'
      }
    },
    updatingCache: {
      entry: 'updateCache',
      always: 'done'
    },
    done: {
      type: 'final'
    },
    error: {
      on: {
        RETRY: 'checkingCache'
      }
    }
  }
});
export default function Cache() {
  const [state, send] = useMachine(cacheMachine);

  const handleRequest = (key) => {
    send({ type: 'REQUEST', key });
  };

  const handleRetry = () => {
    send({ type: "RETRY" });
  };

  return (
    <div>
      <h1>Cache Example</h1>
      <button className="border m-2" onClick={() => handleRequest('key1')}>Request Key1 has cache data</button>
      <button className="border m-2" onClick={() => handleRequest('key2')}>Request Key2</button>
      {state.matches('error') && (
        <button onClick={handleRetry}>Retry</button>
      )}
      <p>Current State: {JSON.stringify(state.value)}</p>
      <p>Current Key: {state.context.key}</p>
      <p>Data: {JSON.stringify(state.context.data)}</p>
      <p>Cache: {JSON.stringify(state.context.cache, null, 2)}</p>
    </div>
  );
}