import { Outlet } from 'react-router-dom';
import { UnauthenticatedNavbar } from '@/components/navbar';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-background-primary text-text-primary">
            <UnauthenticatedNavbar />

            <main className="min-h-[calc(100vh-3rem)]">
                <Outlet />
            </main>
        </div>
    );
}
