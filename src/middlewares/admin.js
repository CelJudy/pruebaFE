export const admin = (next) => {
    const isAuthenticated = !!localStorage.getItem('access-token');
    if (!isAuthenticated) {
        next({ name: 'login' });
        return false
    }
    if (localStorage.getItem('role')!=1) {
        next({ name: '/' });
        return false
    }
    next();
    return true
}