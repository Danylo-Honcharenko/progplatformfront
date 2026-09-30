export type DialogProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
};