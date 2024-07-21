import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';
const fetchMachine = createMachine(
  {
    context: {
      users: null,
      error: null,
    },
    id: 'users',
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH: [
            {
              target: 'loading',
            },
          ],
        },
      },
      loading: {
        invoke: {
          src: 'fetchUsers',
          onDone: [
            {
              target: 'success',
              actions: assign({ users: (_, event) => event.data }),
            },
          ],
          onError: [
            {
              target: 'error',
              actions: assign({ error: (_, event) => event.data }),
            },
          ],
        },
      },
      success: {
        on: {
          FETCH: [
            {
              target: 'loading',
              actions: [],
            },
          ],
        },
      },
      error: {
        on: {
          FETCH: [
            {
              target: 'loading',
              actions: [],
            },
          ],
        },
      },
    },
  },
);
function Fetch() {
  const [state, send] = useMachine(fetchMachine, {
    // This is where we pass in the "fetchUsers" function that we
    // referenced in the machine configuration
    services: {
      fetchUsers: () => fetch('some-endpoint')
        .then((res) => res.json())
        // When we resolve the promise here, we'll trigger a state transition
        // to the "success" state
        .then((res) => Promise.resolve(res.data))
        .catch((err) =>
          // When we reject the promise here, we'll trigger a state transition
          // to the "error" state
          Promise.reject({
            status: err.response.status,
            data: err.response.data
          })
        )
    }
  });
  console.log({ state, send });
  const handleButtonClick = () => {
    send({ type: 'FETCH' })
  }
  return (
    <>
      <p>state-machine-Fetch</p>
      <p>state: {state.value}</p>
      <button onClick={handleButtonClick} type="button">FETCH</button>
    </>
  );
}

export default Fetch;
