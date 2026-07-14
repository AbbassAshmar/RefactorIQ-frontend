import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


export default function SecurityCenterTabBar({
    tabs = [],
    queryKey = 'tabView',
    defaultTab = null,
    actions = null,
    isSubTab = false,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get(queryKey);
    const isValidTab = tabs.some((tab) => tab.key === currentTab);
    const activeTab = isValidTab ? currentTab : defaultTab;

    useEffect(() => {
        if (!activeTab || currentTab === activeTab) return;
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set(queryKey, activeTab);
            return next;
        }, { replace: true });
    }, [activeTab, currentTab, queryKey, setSearchParams]);

    function handleTabClick(tabKey) {
        if (tabKey === activeTab) return;
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set(queryKey, tabKey);
            if (!isSubTab) next.delete('subTabView');
            return next;
        });
    }

    return (
        <div className={`flex min-w-0 items-center justify-between ${isSubTab ? 'border-b' : 'border-b-2'} border-border`}>
            <div className="flex min-w-0" role="tablist" aria-label="Page views">
                {tabs.map((tab) => {
                    const active = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => handleTabClick(tab.key)}
                            className={[
                                'relative m-0 border-0 bg-transparent px-4 py-3 transition-colors',
                                isSubTab ? 'text-small-1' : 'text-body',
                                active ? 'text-brand-primary' : 'text-text-primary',
                                'hover:bg-background-hover hover:underline',
                                'after:pointer-events-none after:absolute after:inset-x-0 after:bg-transparent after:content-[\'\']',
                                isSubTab ? 'after:bottom-[-1px] after:h-px' : 'after:bottom-[-2px] after:h-0.5',
                                active ? 'after:z-10 after:bg-brand-primary' : '',
                            ].join(' ')}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            {actions ? <div className="mr-4 flex min-w-0 items-center">{actions}</div> : null}
        </div>
    );
}
