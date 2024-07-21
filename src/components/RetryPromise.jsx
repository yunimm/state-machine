import { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { assign, fromPromise, setup } from 'xstate'

const GITHUB_URL = 'https://dog.ceo/api/breeds/image/random'
const MAX_RETRIES = 3
const machine = setup({
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
        const response = await fetch(`${GITHUB_URL}`);
        const data = await response.json();
        return data;
      });
    })
  },
}).createMachine({
  context: {
    retries: 0,
    response: null,
  },
  id: 'retry-promise',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: [
          {
            target: 'trying',
          },
        ],
      },
    },
    trying: {
      invoke: {
        src: 'fetchData',
        onDone: [
          {
            target: 'success',
            actions: assign({ response: ({ event }) => event.output }),
          },
        ],
        onError: [
          {
            target: 'retrying',
            actions: assign({
              retries: ({ context, event }) => context.retries + 1,
            }),
          },
        ],
      },
    },
    success: {
      type: 'final',
    },
    retrying: {
      always: [
        {
          target: 'failed',
          guard: ({ context, event }) => context.retries >= MAX_RETRIES,
        },
        {
          target: 'trying',
        },
      ],
    },
    failed: {
      type: 'final',
    },
  },
})

const imgStyle = {
  maxWidth: "100%",
  height: "auto",
  maxHeight: "300px",
  marginBottom: "1rem"
}
export default function App() {
  const [current, send] = useMachine(machine)

  useEffect(() => {
    send({
      type: 'START'
    });
  }, [send]);

  const renderContent = () => {
    if (current.value === 'success') {
      return <img style={imgStyle} src={current.context.response.message} />;
    } else if (current.context.retries === 3) {
      return <span>fail</span>;
    } else {
      return <span>Fetching...</span>;
    }
  };


  return (
    <>
      <span>模擬RetryPromise</span>
      <p>retries: {current.context.retries}</p>
      <p>status:{current.value}</p>
      {renderContent()}
    </>
  )
}
