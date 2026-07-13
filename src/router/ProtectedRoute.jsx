import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { roleHomePath } from '@/router/roleHomePath';

function normalizeRoles(roles) {
    return roles.map((role) => role.toLowerCase());
}

export default function ProtectedRoute({ children, allowedRoles }) {
    const location = useLocation();
    const { isCheckingAuth, isAuthenticated, role } = useAuth();

    if (isCheckingAuth) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
        const normalizedAllowedRoles = normalizeRoles(allowedRoles);
        if (!normalizedAllowedRoles.includes(role)) {
            return <Navigate to={roleHomePath(role)} replace />;
        }
    }

    return children;
}
