import { Component, For, Match, Switch } from 'solid-js'
import { createQuery, Provider as GraphQLProvider } from 'solid-urql'

import Layout from '~/components/layout'
import TodoList from '~/components/todo-list'
import TodoListCreate from '~/components/todo-list-create'
import { TodoListsDocument } from '~/graphql/schema'
import { urqlClient } from '~/graphql/urql'

const App: Component = () => {
  const [data, state] = createQuery({ query: TodoListsDocument })

  return (
    <Layout>
      <Switch>
        <Match when={state().fetching}>Loading...</Match>
        <Match when={state().error}>{JSON.stringify(state().error)}</Match>
        <Match when={data()?.todoListCollection}>
          <div class="flex gap-6">
            <For each={data()?.todoListCollection?.edges?.slice().reverse()}>
              {(list) => !!list?.node && <TodoList {...list.node} />}
            </For>
            <TodoListCreate />
          </div>
        </Match>
      </Switch>
    </Layout>
  )
}

const AppWithProviders: Component = () => {
  return (
    <GraphQLProvider value={urqlClient}>
      <App />
    </GraphQLProvider>
  )
}

export default AppWithProviders
