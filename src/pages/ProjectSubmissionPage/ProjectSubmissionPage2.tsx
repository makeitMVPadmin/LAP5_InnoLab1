
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import ImageUploadZone from "../../components/ImageUploadZone/ImageUploadZone";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import CustomInput from "../../components/CustomInput/CustomInput";
import Clock from "../../assets/images/clock-type2.svg"
import CloseButton from "../../assets/images/Close.svg"
import ErrorIcon from "../../assets/images/error.svg"

const formSchema = z.object({
    teamName: z.string().min(1, { message: "Team name is required." }).max(80),
    techStack: z.string().min(1, { message: "Tech stack is required." }).max(80),
    designTools: z.string().min(1, { message: "Design tools are required." }).max(80),
    problemStatement: z.string().min(1, { message: "Problem statement is required." }).max(500),
    projectChallenge: z.string().min(1, { message: "Project challenge is required." }).max(500),
    designFeatures: z.string().min(1, { message: "Design features are required." }).max(500),
    designImpact: z.string().min(1, { message: "Design impact is required." }).max(500),
    nextSteps: z.string().min(1, { message: "Next steps are required." }).max(500),
    file: z.instanceof(File).refine((file) => !!file, {
        message: "File is required.",
    }),
    projectLinks: z.array(
        z.object({
            url: z.string().max(64, { message: "Project link url cannot exceed 64 characters." })
        })
    )
        .min(1, { message: "At least one project link is required." })
        .refine((links) => links[0]?.url?.length > 0, {
            message: "The first project link is required.",
            path: [0, 'url'],
        }),
    teamMembers: z
        .array(
            z.object({
                name: z.string().optional(),
                role: z.string().optional(),
            })
        )
        .refine(
            (members) => members.length > 0,
            { message: "At least one team member is required." }
        )
        .refine(
            (members) =>
                members.every(
                    (member) =>
                        (!member.name && !member.role) ||
                        (member.name && member.role)
                ),
            { message: "Each team member must have both a name and a role." }
        )
    ,
});



const ProjectSubmissionPage2 = () => {
    const [file, setFile] = useState(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "",
            techStack: "",
            designTools: "",
            problemStatement: "",
            projectChallenge: "",
            designFeatures: "",
            designImpact: "",
            nextSteps: "",
            file: null,
            projectLinks: [{ url: "" }],
            teamMembers: [{ name: "", role: "Software developer" }]
        },
    })

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = form
    const formValues = watch();

    const handleFileChange = (file) => {
        console.log("File selected:", file); // Debugging line
        setValue('file', file); // Set the file in form state
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);


    const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({
        control: form.control,
        name: "teamMembers",
    });

    const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
        control: form.control,
        name: "projectLinks",
    });

    const handleAddLink = () => {
        appendLink({ url: "" });
    };

    const handleDeleteLink = (index: number) => {
        removeLink(index)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("hi")
        console.log(formValues)
        console.log(values)
        console.log(file)
    }

    const handleAddMember = () => {
        appendMember({ name: '', role: '' });
    };

    const handleDeleteMember = (index: number) => {
        removeMember(index)
    }
    console.log("errors:", errors)


    const labelStyle = "block text-sm font-bold mb-1 text-MVP-black"
    const inputStyle = "focus-visible:ring-0 focus:border-MVP-dark-blue h-12 w-full px-4 py-2 rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px] border-black bg-white placeholder:font-thin placeholder:font-poppins font-regular font-poppins"


    return (
        <main className="font-gilroy">
            <DashboardNavbar />
            <section className="h-[3rem] bg-gray-500">
                <Link to="/hackathons" className="text-black text-sm inline-block mb-5">
                    ← Back
                </Link>
            </section>
            <section className="px-5 w-full md:w-9/12 max-w-[930px] md:m-auto">
                <h1 className="text-4xl font-gilroy font-bold mb-5 pt-14">Project Submission</h1>
                <div className="flex py-12 justify-end gap-2 items-center">
                    <img className="w-6	h-6" src={Clock} alt="clock icon" />
                    <p className="font-bold text-xl">Submission Ends In: 1h: 25m: 15s</p>
                </div>
                <Form {...form} >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Team Name */}
                        <CustomInput
                            errors={errors?.teamName}
                            form={form}
                            register={register}
                            inputName="teamName"
                            name="Team Name"
                            formValues={formValues.teamName}
                            placeHolder="Enter team name"
                            type="Input"
                        />
                        {/* Team Members */}
                        <div className="w-full">
                            <div className="flex">
                                <div className="flex w-full items-baseline gap-4">
                                    <FormLabel className="text-sm font-medium flex-1 ">Name</FormLabel>
                                    <FormLabel className="text-sm font-medium flex-1 ">Role</FormLabel>
                                </div>
                                <div className="min-w-10"></div>
                            </div>
                            {memberFields.map((member, index) => (
                                <div key={member.id} className="py-2 flex items-center ">
                                    <div className="flex gap-4 flex-1">
                                        <FormField
                                            name={`teamMembers.${index}.name`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            className={`${inputStyle} ${errors.teamMembers?.[index]?.name && "border-MVP-red"}`}
                                                            placeholder="Enter name"
                                                            {...field}
                                                            {...register(`teamMembers.${index}.name`)}
                                                        />
                                                    </FormControl>
                                                    {errors.teamMembers?.[index]?.name?.message && (
                                                        <div className="flex gap-2">
                                                            <img src={ErrorIcon} alt="error icon" className="h-4 w-4" />
                                                            <FormMessage className="text-MVP-red">
                                                                {errors.teamMembers?.[index]?.name?.message}
                                                            </FormMessage>
                                                        </div>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`teamMembers.${index}.role`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            setValue(`teamMembers.${index}.role`, value);
                                                            field.onChange(value);
                                                        }}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className={`${inputStyle} ${errors?.teamMembers?.[index]?.role?.message && "border-MVP-red"}`} >
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className={`font-gilroy font-bold rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px]  ${errors?.teamMembers?.[index]?.role ? 'border-MVP-red' : "border-black"}`}>
                                                            <SelectItem value="Software developer">Software Developer</SelectItem>
                                                            <SelectItem value="UX Designer">UX Designer</SelectItem>
                                                            <SelectItem value="Product Manager">Product Manager</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors?.teamMembers?.[index]?.role?.message && (
                                                        <div className="flex gap-2">
                                                            <img src={ErrorIcon} alt="error icon" className="h-4 w-4" />
                                                            <FormMessage className="text-MVP-red">
                                                                {errors.teamMembers?.[index].role?.message}
                                                            </FormMessage>
                                                        </div>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="min-w-10">
                                        {index > 0 && <button className="min-w-10 flex items-center justify-center" onClick={() => handleDeleteMember(index)} aria-label="delete button">
                                            <img src={CloseButton} className="h-3 w-3" alt="delete team member button" />
                                        </button>}
                                    </div>

                                </div>
                            ))}
                            {errors.teamMembers?.root?.message && (
                                <div className="flex items-center gap-2 text-MVP-red mb-2">
                                    <img src={ErrorIcon} alt="error icon" className="h-4 w-4" />
                                    <span>{errors.teamMembers.root.message}</span>
                                </div>
                            )}
                            <button
                                type="button"
                                className="mt-4 ml-auto flex items-center justify-center py-4 px-6 w-42 h-12 bg-MVP-light-blue border-[3px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-MVP-black rounded-[0.625rem] text-xl font-gilroy cursor-pointer"
                                aria-label="Add member"
                                onClick={handleAddMember}
                            >
                                <span>Add member</span>
                            </button>
                        </div>
                        {/* Tech Stack */}
                        <CustomInput
                            errors={errors?.techStack}
                            form={form}
                            register={register}
                            inputName="techStack"
                            name="Tech Stack"
                            formValues={formValues.techStack}
                            placeHolder="Enter Tech Stack"
                            type="Input"
                        />


                        {/* Design Tools */}
                        <CustomInput
                            errors={errors?.designTools}
                            form={form}
                            register={register}
                            inputName="designTools"
                            name="Design Tools"
                            formValues={formValues.designTools}
                            placeHolder="Enter Design Tools"
                            type="Input"
                        />
                        {/* Problem Statement */}
                        <CustomInput
                            errors={errors?.problemStatement}
                            form={form}
                            register={register}
                            inputName="problemStatement"
                            name="Problem Statement"
                            formValues={formValues.problemStatement}
                            placeHolder="Describe the problem statement"
                            type="Textarea"
                        />
                        {/* Project Challenge */}
                        <CustomInput
                            errors={errors?.projectChallenge}
                            form={form}
                            register={register}
                            inputName="projectChallenge"
                            name="Problem Challenge"
                            formValues={formValues.projectChallenge}
                            placeHolder="What were some challenges or constraints?"
                            type="Textarea"
                        />
                        {/* Design Features */}
                        <CustomInput
                            errors={errors?.designFeatures}
                            form={form}
                            register={register}
                            inputName="designFeatures"
                            name="Design Features"
                            formValues={formValues.designFeatures}
                            placeHolder="What is impact from your solution?"
                            type="Textarea"
                        />

                        {/* Design Impact */}
                        <CustomInput
                            errors={errors?.designImpact}
                            form={form}
                            register={register}
                            inputName="designImpact"
                            name="Design Impact"
                            formValues={formValues.designImpact}
                            placeHolder="What is impact from your solution?"
                            type="Textarea"
                        />
                        {/* Next Steps */}
                        <CustomInput
                            errors={errors?.nextSteps}
                            form={form}
                            register={register}
                            inputName="nextSteps"
                            name="Next Steps"
                            formValues={formValues.nextSteps}
                            placeHolder="What are your next steps and future plans on your solution?"
                            type="Textarea"
                        />
                        {/* Project Links */}
                        <div>
                            <FormLabel className={labelStyle}>Project Links*</FormLabel>
                            {linkFields.map((link, index) => (
                                <div key={link.id} className="py-2 flex items-center">
                                    <FormField
                                        name={`projectLinks.${index}.url`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        className={inputStyle}
                                                        placeholder="Enter link"
                                                        {...field}
                                                        {...register(`projectLinks.${index}.url`)}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-MVP-red" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="min-w-10 justify-center flex items-center">
                                        {index > 0 && <button className="flex items-center justify-center" onClick={() => handleDeleteLink(index)} aria-label="delete button">
                                            <img src={CloseButton} className="h-3 w-3" alt="delete team member button" />
                                        </button>}
                                    </div>
                                </div>


                            ))
                            }
                            <button
                                type="button"
                                className="mt-4 ml-auto flex items-center justify-center py-4 px-6 w-42 h-12 bg-MVP-light-blue border-[3px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-MVP-black rounded-[0.625rem] text-xl font-gilroy cursor-pointer"
                                aria-label="Add link"
                                onClick={handleAddLink}
                            >
                                <span>Add link</span>
                            </button>
                        </div>

                        {/* Upload image */}
                        <div>
                            <ImageUploadZone onFileChange={handleFileChange} />
                            {errors.file && (
                                <div className="flex items-center gap--2">
                                    <img src={ErrorIcon} alt="error icon" />
                                    <p className="text-red-500">{errors.file.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <Button type="submit" variant="default" >
                                Join
                            </Button>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </main>
    );
};

export default ProjectSubmissionPage2;


