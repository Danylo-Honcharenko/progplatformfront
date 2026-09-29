import {useEffect, useState} from "react";
import {ModuleModel} from "@/type/model/ModuleModel.ts";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {ModuleService} from "@/services/ModuleService.ts";
import {baseErrorHandler} from "@/utils/errorHandler.ts";

const useModule = (courseId: string | undefined) => {

    const [modules, setModules] = useState<ModuleModel[]>([]);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (courseId === undefined) return;
        const moduleService = new ModuleService();
        moduleService.getModulesByCourseId(courseId)
            .then((response) => setModules(response?.data?.modules ? response.data.modules : []))
            .catch((error) => baseErrorHandler(error, setError))
            .finally(() => setLoading(false));
    }, [courseId]);

    return {
        loadingModules: loading,
        modules,
        modulesError: error,
    };
};

export default useModule;