import { useState } from 'react';
import { SEARCH_QUERY_KEY } from '@/utils/constants';


export default function TableSearchBar({
    queryKey = SEARCH_QUERY_KEY,
    onSearch,
    placeholder = 'Search',
    ariaLabel = 'Search table',
}) {
    const [value, setValue] = useState('');

    function submitSearch(event) {
        event.preventDefault();
        onSearch?.({ [queryKey]: value.trim() });
    }

    return (
        <form onSubmit={submitSearch} className="w-full">
            <label className="sr-only" htmlFor={`table-search-${queryKey}`}>
                {ariaLabel}
            </label>
            <input
                id={`table-search-${queryKey}`}
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                aria-label={ariaLabel}
                className="w-full rounded border border-border bg-background px-3 py-2 text-body text-text-primary outline-none placeholder:text-text-tertiary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            />
        </form>
    );
}
