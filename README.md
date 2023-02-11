# create-query

A library for the excellent [zustand](https://www.npmjs.com/package/zustand) state management library for React to simplify the fetching of data.

### Installation

For npm:
```
npm i @bitmetro/create-query
```

For yarn:
```
yarn add @bitmetro/create-query
```

### Usage

Create a fetch hook by passing your fetch function into `createQuery`:

```ts
import { createQuery } from '@bitmetro/create-query';

const useFetchCustomer = createQuery(
  async (id: string): Customer => {
    const res = await fetch('...');
    return await res.json();
  }
);
```

Get the request function, fetch status and return value:
```ts
const MyComponent = ({ customerId }) => {
  const {
    request,  // (id: string) => Promise<Customer>
    status,   // 'fetching' | 'success' | 'error' | undefined
    value,    // Customer | null
    error     // any
  } = useFetchCustomer();

  useEffect(() => {
    request(customerId);
  }, [customerId]);

  return (
    <div>
      {status === 'success' && (
        <p>Hello {customer?.name}</p>
      )}
    </div>
  )
}
```

The types of `request` and `value` are inferred from the function you pass in.

You can also rename the returned values from the hook:
```ts
const [getCustomer, customer] = useFetchCustomer(s => [s.request, s.value]);
```
