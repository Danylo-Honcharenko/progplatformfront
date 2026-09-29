import BadRequestDialog from "@/components/BadRequestDialog.tsx";
import ServerErrorDialog from "@/components/ServerErrorDialog.tsx";
import NotAuthorizedDialog from "@/components/NotAuthorizedDialog.tsx";

const errors = [
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
        Dialog: ServerErrorDialog,
        statusCodes: []
    }
];

type Props = {
    code: (string | undefined)[];
    statusCodes: (number | undefined)[];
};

const ErrorDialog = ({code, statusCodes}: Props) => {
    const filteredCodes = code ? code.filter((code) => !!code) : [];
    const filteredStatusCodes = statusCodes ? statusCodes.filter((statusCode) => !!statusCode) : [];

    if (filteredCodes.length != 0) {
        const errorComponent = errors.find((error) => error.code === code[0]);
        if (errorComponent && errorComponent.statusCodes.length > 0 && filteredStatusCodes.length != 0) {
            const errComponent = errorComponent.statusCodes.find((statusCode) => statusCode.status === filteredStatusCodes[0]);
            return errComponent ? <errComponent.Dialog /> : <errorComponent.Dialog />;
        }

        return errorComponent ? <errorComponent.Dialog /> : <BadRequestDialog />;
    }
};

export default ErrorDialog;