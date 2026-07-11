import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, TriangleAlert, X } from 'lucide-react';


const notificationStyles = {
    success: {
        border: 'border-t-success',
        icon: CheckCircle2,
        iconColor: 'text-success-text',
    },
    failure: {
        border: 'border-t-error',
        icon: TriangleAlert,
        iconColor: 'text-error-text',
    },
    warning: {
        border: 'border-t-warning',
        icon: TriangleAlert,
        iconColor: 'text-warning-text',
    },
};

function NotificationItem({ notification, dismiss }) {
    const style = notificationStyles[notification.type] ?? notificationStyles.warning;
    const Icon = style.icon;

    useEffect(() => {
        const timer = window.setTimeout(
            () => dismiss(notification.id),
            notification.duration ?? 5000,
        );
        return () => window.clearTimeout(timer);
    }, [dismiss, notification.duration, notification.id]);

    return (
        <article
            className={`pointer-events-auto rounded-sm border border-border border-t-2 ${style.border} bg-background-elevated px-3 py-3 shadow-lg`}
            role="status"
        >
            <div className="flex items-start gap-2">
                <Icon size={17} className={`mt-0.5 shrink-0 ${style.iconColor}`} />
                <div className="min-w-0 flex-1">
                    <h2 className="text-body font-medium text-text-primary">{notification.title}</h2>
                    <p className="mt-1 text-small-1 leading-relaxed text-text-secondary">{notification.message}</p>
                </div>
                <button
                    type="button"
                    onClick={() => dismiss(notification.id)}
                    className="shrink-0 rounded p-0.5 text-text-tertiary transition-colors hover:bg-background-hover hover:text-text-primary"
                    aria-label="Dismiss notification"
                >
                    <X size={15} />
                </button>
            </div>
        </article>
    );
}

export default function NotificationContainer({ notifications, dismiss }) {
    if (typeof document === 'undefined' || notifications.length === 0) return null;

    return createPortal(
        <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2">
            {notifications.map((notification) => {
                return (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        dismiss={dismiss}
                    />
                );
            })}
        </div>,
        document.body,
    );
}
