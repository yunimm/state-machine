import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import GitHubUserProfile from './components/GitHubUserProfile'
import './style/style.css'

const GITHUB_URL = 'https://api.github.com/users'

// const fetchUser = (username) => {
//   return fetch(`${GITHUB_URL}/${username}`).then(response => response.json());
//   // .then(blob => blob.json())
//   // .then(data => {
//   //   console.log('in?');
//   //   if (data.message) {
//   //     throw new Error(data.message); // 拋出錯誤以觸發 onError
//   //   }
//   //   return data;
//   // })
//   // .catch(error => {
//   //   console.error(error);
//   //   throw error; // 確保錯誤被拋出以觸發 onError
//   // });
// };

const userProfileMachine = createMachine({
  id: 'userProfile',
  initial: 'idle',
  context: {
    username: 'mojombo',
    user: null,
    error: null,
    data: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      invoke: {
        id: 'getUser',
        src: "getStatistics",
        onDone: {
          target: 'success',
          actions: assign({ user: (event) => event.data }),
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (event) => event.data }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
    actors: {
      getStatistics: (context, event) =>
        fetchUser(context.username)
    }
  },
})

export const machine = createMachine(
  {
    context: {
      users: null,
      error: null,
      data: null,
    },
    id: "users",
    initial: "idle",
    states: {
      idle: {
        on: {
          FETCH: [
            {
              target: "loading",
              actions: [],
            },
          ],
        },
      },
      loading: {
        invoke: {
          input: {},
          src: "fetchUsers",
          onDone: [
            {
              target: "success",
              actions: [
                {
                  type: "assignUsers",
                },
              ],
              meta: {},
            },
          ],
          onError: [
            {
              target: "error",
              actions: [
                {
                  type: "assignError",
                },
              ],
              meta: {},
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
              meta: {},
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      assignUsers: assign({ users: (_, event) => event.data }),
      assignError: assign({ error: (_, event) => event.data }),
    },
    actors: {
      fetchUsers: async () => {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      },
    },
  },
);

export default function App() {
  const [current, send] = useMachine(machine)

  useEffect(() => {
    send({
      type: 'FETCH'
    });
  }, [send]);
  // if (current.matches('loading')) {
  //   return <span>Loading...</span>
  // }
  // if (current.matches('idle')) {
  //   return <span>idle...</span>
  // }

  // if (current.matches('loading') || current.matches('idle')) {
  //   return <span>Loading...</span>
  // }

  return (
    <>
      <p>{current.value}</p>
      <GitHubUserProfile user={current.context.user} />
    </>
  )
}
