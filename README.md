# use-pagination

> React hook for data pagination

[![NPM](https://img.shields.io/npm/v/use-pagination.svg)](https://www.npmjs.com/package/use-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-pagination
```

## Usage

```tsx
import * as React from 'react'

import usePagination from 'use-pagination'

const App = () => {
  const pagination = usePagination({
    items: [1, 2, 3, 4, 5],
    itemsPerPage: 2,
  });

  return (
    <div>
      <pre>
        { JSON.stringify(pagination, null, 2 )}
      </pre>
      <button onClick={pagination.onNextPage}>Next<button>
      <button onClick={pagination.onPreviousPage}>Back<button>
      <button onClick={pagination.onResetPage}>Reset<button>
    </div>
  )
}
```

## License

MIT ©

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
