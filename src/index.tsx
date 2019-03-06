import * as React from 'react';

interface IPaginationProps {
  items: any[];
  initialPage?: number;
  itemsPerPage: number;
}

interface IReducerState {
  currentItems: any[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: any[];
  itemsPerPage: number;
  maxPages: number;
  nextPage: number;
  previousPage: number;
}

export const getInitialState = (props: IPaginationProps) => {
  const { items, initialPage = 1, itemsPerPage } = props;

  if (itemsPerPage <= 0) {
    throw new Error('itemsPerPage must be > 0');
  }

  const maxPages = Math.ceil(items.length / itemsPerPage);
  const currentPage = clamp(initialPage, 1, maxPages);
  const currentItems = getCurrentItems(items, currentPage, itemsPerPage);
  const [previousPage, nextPage] = getBoundingPages(currentPage, maxPages);
  const hasNextPage = nextPage !== maxPages;
  const hasPreviousPage = previousPage >= 1 && currentPage !== 1;

  return {
    currentItems,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    items,
    itemsPerPage,
    maxPages,
    nextPage,
    previousPage,
  };
};

/**
 * Prevents a number from going out of bounds
 */
const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

const getBoundingPages = (currentPage: number, maxPages: number) => {
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(currentPage + 1, maxPages);

  return [previousPage, nextPage];
};

const getCurrentItems = (
  items: any[],
  currentPage: number,
  itemsPerPage: number
) => {
  return [...items].splice((currentPage - 1) * itemsPerPage, itemsPerPage);
};

export const reducer = (state: IReducerState, action: any) => {
  const { items, itemsPerPage, maxPages } = state;
  let currentPage = state.currentPage;

  switch (action.type) {
    case 'next': {
      currentPage = clamp(state.currentPage + 1, 1, maxPages);
      break;
    }
    case 'previous': {
      currentPage = clamp(state.currentPage - 1, 1, maxPages);
      break;
    }
    case 'set': {
      currentPage = clamp(action.currentPage, 1, maxPages);
      break;
    }
    case 'reset': {
      return Object.assign(state, getInitialState(action.initialState));
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  const [previousPage, nextPage] = getBoundingPages(currentPage, maxPages);
  const currentItems = getCurrentItems(items, currentPage, itemsPerPage);
  const hasNextPage = nextPage <= maxPages && currentPage !== maxPages;
  const hasPreviousPage = previousPage >= 1 && currentPage !== 1;

  return Object.assign({}, state, {
    currentItems,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage
  });
};

const usePagination = (props: IPaginationProps) => {
  const initialState = React.useMemo(() => getInitialState(props), [
    props.items
  ]);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onNextPage = React.useCallback(() => dispatch({ type: 'next' }), []);

  const onPreviousPage = React.useCallback(
    () => dispatch({ type: 'previous' }),
    []
  );

  const onResetPage = React.useCallback(
    () => dispatch({ type: 'reset', initialState: props }),
    []
  );

  const setCurrentPage = React.useCallback(
    (currentPage) => dispatch({ type: 'set', currentPage }),
    []
  );

  return {
    onNextPage,
    onPreviousPage,
    dispatch,
    onResetPage,
    setCurrentPage,
    ...state
  };
};

export default usePagination;
