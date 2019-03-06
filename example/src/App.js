import * as React from 'react';

import usePagination from 'use-pagination';

const App = () => {
  const pagination = usePagination({
    items: [1, 2, 3, 4, 5],
    itemsPerPage: 2
  });

  return (
    <div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
      <button onClick={pagination.onNextPage}>Next</button>
      <button onClick={pagination.onPreviousPage}>Back</button>
      <button onClick={pagination.onResetPage}>Reset</button>
    </div>
  );
};

export default App;
