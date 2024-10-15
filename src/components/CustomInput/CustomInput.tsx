import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea";
import { STYLES } from "../../constants/styles";
import ErrorIcon from "../../assets/images/error.svg"
import { FieldError, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
    type: "Textarea" | "Input",
    errors?: FieldError | undefined,
    form: any,
    register: UseFormRegister<any>,
    inputName: string,
    name: string,
    formValues: string,
    placeHolder: string
}

const CustomInput: React.FC<CustomInputProps> = ({ type, errors, form, register, inputName, name, formValues, placeHolder }) => {
    return (
        <FormField
            name={inputName}
            control={form.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={STYLES.label}>{name}*</FormLabel>
                    <FormControl>
                        {type === "Textarea" ?
                            <Textarea className={`${STYLES.textareaStyle} ${errors ? 'border-MVP-red' : ""}`} placeholder={placeHolder}{...field}  {...register(`${inputName}`)} />
                            : <Input className={`${STYLES.input} ${errors ? 'border-MVP-red' : ""}`} placeholder={placeHolder}{...field} {...register(`${inputName}`)} />
                        }
                    </FormControl>
                    <div className="flex justify-between">
                        <div className="flex gap-2 flex-1">
                            {errors && <img src={ErrorIcon} alt="error icon" className="h-4 w-4" />}
                            <FormMessage className="text-MVP-red flex items-center gap-2">
                                {errors?.message}
                            </FormMessage>
                        </div>
                        <span className={`${STYLES.counterStyle} ${errors ? 'text-MVP-red' : ""}`}>{formValues ? formValues.length : 0}/{type === "Textarea" ? "500" : "80"} characters</span>
                    </div>
                </FormItem>
            )}
        />
    )
}

export default CustomInput