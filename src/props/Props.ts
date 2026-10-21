import {ErrorType} from "@/type/ErrorType.ts";

export type DialogProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
};

export type ErrorsProps = {
    errors: (ErrorType | undefined)[];
};
