import {CourseModel} from "@/type/model/CourseModel.ts";
import {Link} from "react-router-dom";

type Props = {
    course: CourseModel
}

const CourseCard = ({course}: Props) => {
    return (
        <Link to={`/course/${course.id}`}>
            <div
                className="flex justify-center items-center gap-6 p-5 shadow-md rounded-lg w-[250px] h-32 hover:shadow-lg">
                <h2 className="font-semibold text-xl">{course.name}</h2>
            </div>
        </Link>
    );
};

export default CourseCard;