import {useEffect, useState} from "react";
import {ModuleModel} from "@/type/model/ModuleModel.ts";
import {ModuleService} from "@/services/ModuleService.ts";
import {parsError} from "@/utils/errorParser.ts";
import {ErrorType} from "@/type/ErrorType.ts";

const useModule = (courseId: string | undefined) => {

    const [modules, setModules] = useState<ModuleModel[]>([]);
    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (courseId === undefined) return;
        const moduleService = new ModuleService();
        moduleService.getModulesByCourseId(courseId)
            .then((response) => setModules(response?.data.modules))
            .catch((error) => {
                const parsedError = parsError(error);
                setError(parsedError);
            })
            .finally(() => setLoading(false));
    }, [courseId]);

    return {
        loadingModules: loading,
        modules,
        modulesError: error,
    };
};

export default useModule;