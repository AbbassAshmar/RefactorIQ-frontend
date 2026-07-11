import { useCallback, useMemo, useState } from 'react';
import { NotificationContext } from '@/context/NotificationContext';
import NotificationContainer from '@/components/notifications/NotificationContainer';


export default function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const dismiss = useCallback((id) => {
        setNotifications((current) => current.filter((notification) => notification.id !== id));
    }, []);

    const notify = useCallback((type, input, message) => {
        const notification = typeof input === 'string'
            ? { title: input, message }
            : input;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setNotifications((current) => [
            ...current,
            {
                id,
                type,
                title: notification?.title ?? '',
                message: notification?.message ?? '',
                duration: notification?.duration ?? 5000,
            },
        ]);
        return id;
    }, []);

    const value = useMemo(() => ({
        notify,
        dismiss,
        success: (input, message) => notify('success', input, message),
        failure: (input, message) => notify('failure', input, message),
        error: (input, message) => notify('failure', input, message),
        warning: (input, message) => notify('warning', input, message),
        info: (input, message) => notify('warning', input, message),
    }), [dismiss, notify]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <NotificationContainer notifications={notifications} dismiss={dismiss} />
        </NotificationContext.Provider>
    );
}
