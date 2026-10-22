import {ModuleModel} from "@/type/model/ModuleModel.ts";
import {ModuleService} from "@/services/ModuleService.ts";
import useRequest from "@/hooks/useRequest.tsx";

const NO_MODULES: ModuleModel[] = [];

const useModule = (courseId: string | undefined) => {

    const {data, error, loading} = useRequest(
        () => new ModuleService().getModulesByCourseId(courseId!),
        [courseId],
        courseId !== undefined
    );

    return {
        loadingModules: loading,
        modules: data?.data.modules ?? NO_MODULES,
        modulesError: error,
    };
};

export default useModule;
