export function roleHomePath(role) {
	switch (role) {
		case 'admin':
			return '/admin/overview';
		case 'client':
			return '/dashboard/overview';
		default:
			return '/login';
	}
}
