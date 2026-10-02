import {AlertCircleIcon, AlertTriangleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {ErrorType} from "@/type/ErrorType.ts";

type Props = {
    errors: (ErrorType | undefined)[];
};

const ContentErrorAlert = ({errors}: Props) => {
    const foundError = errors.find((error) => error?.code !== undefined);

    if (!foundError) return null;

    const isTimeout = foundError.code === "ETIMEDOUT";
    const isBadRequest = foundError.code === "ERR_BAD_REQUEST";

    if (isTimeout) {
        return (
            <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <AlertTriangleIcon />
                <AlertTitle>Сервер відповідає довше звичайного</AlertTitle>
            </Alert>
        );
    }

    const getErrorDescription = (error: ErrorType) => {
        const details = error.errorBody?.data.details;
        if (typeof details === "string") {
            return details;
        } else if (typeof details === "object") {
            return `${details.password} ${details.email}`;
        } else {
            return "Не вдалось обробити запит! Спробуйте ще раз!";
        }
    }

    if (isBadRequest) {
        return (
            <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <AlertTriangleIcon />
                <AlertTitle>Помилка запиту</AlertTitle>
                <AlertDescription>{getErrorDescription(foundError)}</AlertDescription>
            </Alert>
        );
    }


    return (
        <Alert variant="destructive" className="mt-4 max-w-md">
            <AlertCircleIcon />
            <AlertTitle>Помилка</AlertTitle>
            <AlertDescription>Спробуйте перезавантажити сторінку або зверніться до адміністратора</AlertDescription>
        </Alert>
    );
};

export default ContentErrorAlert;
