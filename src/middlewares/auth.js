export const auth = (next) => {
    const isAuthenticated = !!localStorage.getItem('access-token');
    if (!isAuthenticated) {
        next({ name: 'login' });
        return false
    }
    next();
    return true
}