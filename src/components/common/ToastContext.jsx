import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext({ pushToast: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushToast = (toast) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, tone: "info", ...toast }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3200);
  };

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-16 z-50 flex w-[320px] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-xl border border-border-default bg-background-elevated p-4 shadow-lg"
          >
            <p className="text-small-1 font-semibold text-text-primary">
              {toast.title}
            </p>
            {toast.message ? (
              <p className="mt-1 text-small-1 text-text-secondary">
                {toast.message}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
