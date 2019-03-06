import { reducer, getInitialState } from './';

describe('usePagination', () => {
  it('sets initial state', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
    });

    expect(initialState.currentPage).toEqual(1);
    expect(initialState.nextPage).toEqual(2);
    expect(initialState.previousPage).toEqual(1);
    expect(initialState.maxPages).toEqual(3);
    expect(initialState.currentItems).toEqual([1, 2]);
    expect(initialState.hasNextPage).toEqual(true);
    expect(initialState.hasPreviousPage).toEqual(false);
  });

  it('goes to the next page', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
    });

    const state = reducer(initialState, { type: 'next' });

    expect(state.currentPage).toEqual(2);
    expect(state.nextPage).toEqual(3);
    expect(state.previousPage).toEqual(1);
    expect(state.currentItems).toEqual([3, 4]);
    expect(state.hasNextPage).toEqual(true);
    expect(state.hasPreviousPage).toEqual(true);
  });

  it('goes to the previous page', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
      initialPage: 2,
    });

    const state = reducer(initialState, { type: 'previous' });

    expect(state.currentPage).toEqual(1);
    expect(state.nextPage).toEqual(2);
    expect(state.previousPage).toEqual(1);
    expect(state.currentItems).toEqual([1, 2]);
    expect(state.hasNextPage).toEqual(true);
    expect(state.hasPreviousPage).toEqual(false);
  });

  it('won\'t go out of bounds (right)', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
      initialPage: 3,
    });

    const state = reducer(initialState, { type: 'next' });

    expect(state.currentPage).toEqual(3);
    expect(state.nextPage).toEqual(3);
    expect(state.previousPage).toEqual(2);
    expect(state.currentItems).toEqual([5]);
    expect(state.hasNextPage).toEqual(false);
    expect(state.hasPreviousPage).toEqual(true);
  });

  it('won\'t go out of bounds (left)', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
    });

    const state = reducer(initialState, { type: 'previous' });

    expect(state.currentPage).toEqual(1);
    expect(state.nextPage).toEqual(2);
    expect(state.previousPage).toEqual(1);
    expect(state.currentItems).toEqual([1, 2]);
    expect(state.hasNextPage).toEqual(true);
    expect(state.hasPreviousPage).toEqual(false);
  });

  it('jumps to a valid page', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
    });

    const state = reducer(initialState, { type: 'set', currentPage: 2 });

    expect(state.currentPage).toEqual(2);
    expect(state.nextPage).toEqual(3);
    expect(state.previousPage).toEqual(1);
    expect(state.currentItems).toEqual([3, 4]);
    expect(state.hasNextPage).toEqual(true);
    expect(state.hasPreviousPage).toEqual(true);
  });

  it('jumps to an invalid page but clamps', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
    });

    const state = reducer(initialState, { type: 'set', currentPage: 6 });

    expect(state.currentPage).toEqual(3);
    expect(state.nextPage).toEqual(3);
    expect(state.previousPage).toEqual(2);
    expect(state.currentItems).toEqual([5]);
    expect(state.hasNextPage).toEqual(false);
    expect(state.hasPreviousPage).toEqual(true);
  });

  it('returns the correct current items', () => {
    const initialState = getInitialState({
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
      initialPage: 2,
    });

    expect(initialState.currentItems).toEqual([3, 4]);
  });

  it('resets to the initial state', () => {
    const resetState = {
      items: [1, 2, 3, 4, 5],
      itemsPerPage: 2,
    };

    const initialState = getInitialState(resetState);

    let newState = reducer(initialState, { type: 'next' });
    newState = reducer(newState, { type: 'reset', initialState: resetState });

    expect(newState.currentItems).toEqual(initialState.currentItems);
  });
});
