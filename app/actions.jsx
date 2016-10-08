export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}

export const VisibilityFilters = [
    {value: 'ALL', label: 'all'},
    {value: 'READ', label: 'read'},
    {value: 'UNREAD', label: 'unread'},
]