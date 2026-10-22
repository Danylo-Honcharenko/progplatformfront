import {DependencyList, useEffect, useState} from "react";
import {parsError} from "@/utils/errorParser.ts";
import {ErrorType} from "@/type/ErrorType.ts";

const useRequest = <T, >(request: () => Promise<T>, deps: DependencyList, enabled = true) => {

    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(enabled);

    useEffect(() => {
        setData(undefined);
        setError(undefined);

        if (!enabled) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        request()
            .then((response) => {
                if (!cancelled) setData(response);
            })
            .catch((error) => {
                if (!cancelled) setError(parsError(error));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, enabled]);

    return {data, error, loading};
};

export default useRequest;
