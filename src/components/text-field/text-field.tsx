import { TextFieldProps } from "@/components/text-field/text-field.props";
import { ErrorMessage, FieldHookConfig, useField } from "formik";

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
    const [field, meta] = useField(props);

    return (
        <div className="inline-block w-full">
            <label className={`inline-block w-full ${meta.touched && meta.error && "border-red-500 border-2 rounded"}`}>
                <input className={`input ${meta.touched && meta.error && "text-red-500"}`} {...props} {...field} />
            </label>
            <p className={"text-red-500"}>
                <ErrorMessage name={field.name} />
            </p>
        </div>

    )
}

export default TextField;