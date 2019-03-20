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
export declare const getInitialState: (props: IPaginationProps) => {
    currentItems: any[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: any[];
    itemsPerPage: number;
    maxPages: number;
    nextPage: number;
    previousPage: number;
};
export declare const reducer: (state: IReducerState, action: any) => IReducerState & {
    currentItems: any[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: any[];
    itemsPerPage: number;
    maxPages: number;
    nextPage: number;
    previousPage: number;
};
declare const usePagination: (props: IPaginationProps) => {
    currentItems: any[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: any[];
    itemsPerPage: number;
    maxPages: number;
    nextPage: number;
    previousPage: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
    dispatch: React.Dispatch<any>;
    onResetPage: () => void;
    setCurrentPage: (currentPage: any) => void;
};
export default usePagination;
