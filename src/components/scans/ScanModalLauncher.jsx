import { useCallback, useState } from 'react';
import { LoaderCircle, Pin, RadioTower } from 'lucide-react';
import { useSelectedScan } from '@/hooks';
import ScanSelectorModal from '@/components/scans/ScanSelectorModal';


export default function ScanModalLauncher({ isOpen: controlledIsOpen, onOpenChange }) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isControlled = typeof controlledIsOpen === 'boolean';
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    const { selectedScanId, selectScan, isSelectingLatest } = useSelectedScan();
    const setIsOpen = useCallback((nextValue) => {
        if (!isControlled) setInternalIsOpen(nextValue);
        onOpenChange?.(nextValue);
    }, [isControlled, onOpenChange]);
    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    function handleSelect(scan) {
        selectScan(scan);
        setIsOpen(false);
    }

    const shortId = selectedScanId ? selectedScanId.slice(0, 8) : null;

    return (
        <>
            <ScanSelectorModal
                isOpen={isOpen}
                onClose={closeModal}
                onSelectScan={handleSelect}
                selectedScanId={selectedScanId}
            />
            <div className={`flex min-w-0 items-center justify-between rounded text-brand-primary ${selectedScanId ? 'bg-brand-bg' : 'bg-transparent'}`}>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="flex min-w-0 flex-1 items-center gap-2 border-0 bg-transparent px-2 py-2 text-inherit hover:underline"
                >
                    <RadioTower className="h-4 w-4 shrink-0" />
                    <span className="max-w-56 truncate">
                        {isSelectingLatest ? 'Loading latest scan…' : selectedScanId ? `Scan (${shortId})` : 'Explore scans'}
                    </span>
                    {isSelectingLatest ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                </button>
                {selectedScanId ? (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        title="Change pinned scan"
                        aria-label="Change pinned scan"
                        className="flex items-center justify-center rounded-br rounded-tl border-0 bg-transparent px-2 py-2 text-inherit hover:bg-background-hover hover:text-brand-hover"
                    >
                        <Pin className="h-4 w-4 fill-current" />
                    </button>
                ) : null}
            </div>
        </>
    );
}
