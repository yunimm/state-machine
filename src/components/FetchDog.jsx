import { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { assign, fromPromise, setup } from 'xstate'
import './style/style.css'

const GITHUB_URL = 'https://dog.ceo/api/breeds/image/random'

const machine = setup({
  actors: {
    fetchUsers: fromPromise(async () => {
      const response = await fetch(`${GITHUB_URL}`).then(response => response.json());
      return response;
    })
  }
}).createMachine({
  context: {
    response: null,
    error: null,
  },
  id: "users",
  initial: "idle",
  states: {
    idle: {
      on: {
        FETCH: [
          {
            target: "loading",
          },
        ],
      },
    },
    loading: {
      invoke: {
        input: { userId: 'gustavocd' },
        src: "fetchUsers",
        onDone: [
          {
            target: "success",
            actions: assign({ response: ({ event }) => event.output }),
          },
        ],
        onError: [
          {
            target: "error",
            actions: assign({
              error: ({ event }) => ({
                status: event.error.status,
                code: event.error.code,
                message: event.error.message
              })
            }),
          },
        ],
      },
    },
    success: {
      on: {
        FETCH: [
          {
            target: "loading",
            actions: [],
          },
        ],
      },
    },
    error: {
      on: {
        FETCH: [
          {
            target: "loading",
            actions: [],
          },
        ],
      },
    },
  },
}
  ,);
export default function App() {
  const [current, send] = useMachine(machine)

  useEffect(() => {
    send({
      type: 'FETCH'
    });
  }, [send]);

  if (current.matches('loading') || current.matches('idle')) {
    return <span>Loading...</span>
  }

  return (
    <>
      <p>status:{current.value}</p>
      <img src={current.context.response.message} />
    </>
  )
}
