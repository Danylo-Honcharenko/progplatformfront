const roleHome: Record<string, string> = {
    ROLE_USER: "/panel",
    ROLE_ADMIN: "/panel",
};

export const redirectTo = (userRole: string) => roleHome[userRole] ?? "/panel";