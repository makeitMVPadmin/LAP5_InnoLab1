import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import ErrorIcon from "../../assets/images/error.svg"
import { Textarea } from "../../components/ui/textarea";

const textareaStyle = "min-h-40 w-full px-4 py-2 rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px] border-black bg-white placeholder:font-thin placeholder:font-poppins font-regular font-poppins"
const counterStyle = "block text-xs text-black text-right mt-1 font-bold"
const labelStyle = "block text-sm font-bold mb-1 text-MVP-black"
const inputStyle = "focus-visible:ring-0 focus:border-MVP-dark-blue h-12 w-full px-4 py-2 rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px] border-black bg-white placeholder:font-thin placeholder:font-poppins font-regular font-poppins"

const CustomInput = ({ type, errors, form, register, inputName, name, formValues, placeHolder }) => {
    return (
        <FormField
            name={inputName}
            control={form.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={labelStyle}>{name}*</FormLabel>
                    <FormControl>
                        {type === "Textarea" ?
                            <Textarea className={`${textareaStyle} ${errors ? 'border-MVP-red' : ""}`} placeholder={placeHolder}{...field}  {...register(`${inputName}`)} />
                            : <Input className={`${inputStyle} ${errors ? 'border-MVP-red' : ""}`} placeholder={placeHolder}{...field} {...register(`${inputName}`)} />
                        }
                    </FormControl>
                    <div className="flex justify-between">
                        <div className="flex gap-2 flex-1">
                            {errors && <img src={ErrorIcon} alt="error icon" className="h-4 w-4" />}
                            <FormMessage className="text-MVP-red flex items-center gap-2">
                                {errors?.message}
                            </FormMessage>
                        </div>
                        <span className={`${counterStyle} ${errors ? 'text-MVP-red' : ""}`}>{formValues ? formValues.length : 0}/{type === "Textarea" ? "500" : "80"} characters</span>
                    </div>
                </FormItem>
            )}
        />
    )
}

export default CustomInput