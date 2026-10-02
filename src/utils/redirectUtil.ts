const roleHome: Record<string, string> = {
    ROLE_USER: "/panel",
    ROLE_ADMIN: "/panel",
};

export const redirectTo = (userRole: 'ROLE_USER' | 'ROLE_ADMIN') => roleHome[userRole] ?? "/panel";