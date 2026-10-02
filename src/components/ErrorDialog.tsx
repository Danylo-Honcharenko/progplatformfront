import BadRequestDialog from "@/components/BadRequestDialog.tsx";
import NetworkErrorDialog from "@/components/NetworkErrorDialog.tsx";
import NotAuthorizedDialog from "@/components/NotAuthorizedDialog.tsx"
import {JSX, useEffect, useState} from "react";
import {ErrorType} from "@/type/ErrorType.ts";
import ServerErrorDialog from "@/components/ServerErrorDialog.tsx";
import {DialogProps} from "@/props/Props.ts";

type ErrorStatusCodes = {
    status: number;
    Dialog: ({open, onClose}: DialogProps) => JSX.Element;
};

type Error = {
    code: string;
    Dialog: ({open, onClose, description}: DialogProps) => JSX.Element;
    statusCodes: ErrorStatusCodes[];
};

const processError: Error[] = [
    {
        code: "ERR_BAD_REQUEST",
        Dialog: BadRequestDialog,
        statusCodes: [
            {
                status: 401,
                Dialog: NotAuthorizedDialog
            }
        ]
    },
    {
        code: "ERR_BAD_RESPONSE",
        Dialog: ServerErrorDialog,
        statusCodes: []
    },
    {
        code: "ERR_NETWORK",
        Dialog: NetworkErrorDialog,
        statusCodes: []
    }
];

type Props = {
    errors: (ErrorType | undefined)[];
};

const ErrorDialog = ({errors}: Props) => {

    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

    const [foundError] = errors.filter((error) => error !== undefined && error.code !== undefined);

    useEffect(() => {
        setOpenErrorDialog(true);
    }, [foundError]);

    if (foundError) {
        const errorComponent = processError.find((error) => error.code === foundError.code);
        if (errorComponent) {
            const errComponent = errorComponent.statusCodes.find((statusCode) => statusCode.status === foundError.status);

            return errComponent ?
                <errComponent.Dialog
                    open={openErrorDialog}
                    onClose={() => setOpenErrorDialog(false)}
                    description={getErrorDescription(foundError)}
                /> :
                <errorComponent.Dialog
                    open={openErrorDialog}
                    onClose={() => setOpenErrorDialog(false)}
                    description={getErrorDescription(foundError)}
                />;
        }

        return <BadRequestDialog
            open={openErrorDialog}
            onClose={() => setOpenErrorDialog(false)}
            description={getErrorDescription(foundError)}
        />;
    }
};

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

export default ErrorDialog;