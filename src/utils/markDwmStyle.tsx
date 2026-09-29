import {ComponentProps} from "react";

type PProps = ComponentProps<"p">;
type H2Props = ComponentProps<"h2">;
type PREProps = ComponentProps<"pre">;
type ULProps = ComponentProps<"ul">;
type CODEProps = ComponentProps<"code">;

export const P = ({children, ...props}: PProps) => <p className="mt-2" {...props}>{children}</p>;
export const H2 = ({children, ...props}: H2Props) => <h2 className="mt-3 text-lg font-semibold" {...props}>{children}</h2>;
export const PRE = ({children, ...props}: PREProps) => <pre className="mt-4 mb-4 bg-neutral-50 rounded-lg p-3" {...props}>{children}</pre>;
export const UL = ({children, ...props}: ULProps) => <ul className="ml-7 list-disc" {...props}>{children}</ul>;
export const CODE = ({children, ...props}: CODEProps) => <code className="bg-neutral-50 rounded-lg" {...props}>{children}</code>;