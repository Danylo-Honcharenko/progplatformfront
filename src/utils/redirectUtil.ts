type RedirectUtil = {
    url: string;
    roles: string[];
};

const permissionRedirectUrl: RedirectUtil[] = [
    { url: "/panel", roles: ["ROLE_USER", "ROLE_ADMIN"] },
];

export const redirectTo = (userRole: string, redirectToUrl: string) => {
    const permissionRedirectObject = permissionRedirectUrl.find(({url, roles}) => url === redirectToUrl && roles.includes(userRole));
    if (!permissionRedirectObject) throw new Error("Неможливо перенаправити користувача на сторінку. Не знайдено відповідності ролі до маршруту!");
    return redirectToUrl;
}