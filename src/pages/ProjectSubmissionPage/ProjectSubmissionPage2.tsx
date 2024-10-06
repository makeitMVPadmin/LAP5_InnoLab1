import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
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
import Clock from "../../assets/images/clock-type2.svg"
import CloseButton from "../../assets/images/Close.svg"
import UploadBox from "../../assets/images/uploadBox.svg"
import CustomInput from "../../components/CustomInput/CustomInput";


const formSchema = z.object({
    teamName: z.string().min(1, { message: "Team name is required." }),
    techStack: z.string().min(1, { message: "Tech stack is required." }),
    designTools: z.string().min(1, { message: "Design tools are required." }),
    problemStatement: z.string().min(1, { message: "Problem statement is required." }),
    projectChallenge: z.string().min(1, { message: "Project challenge is required." }),
    designFeatures: z.string().min(1, { message: "Design features are required." }),
    designImpact: z.string().min(1, { message: "Design impact is required." }),
    nextSteps: z.string().min(1, { message: "Next steps are required." }),
    // projectImage: z.string().url({ message: "Project image must be a valid URL." }),
    projectLinks: z.array(
        z.object({
            url: z.string().min(1, { message: "Project links ulr is required." }).max(64)
        })),
    teamMembers: z.array(
        z.object({
            name: z.string().min(1, { message: "Name is required." }),
            role: z.string().min(1, { message: "A role is required." }),
        })
    ).refine((members) => members.every(member => member.name && member.role), {
        message: "Each team member must have a name and a role.",
    }),
});
const ProjectSubmissionPage2 = () => {
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
            // projectImage: "",
            projectLinks: [{ url: "" }],
            teamMembers: [{ name: "", role: "" }]
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
    const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({
        control: form.control,
        name: "teamMembers",
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("hi")
        console.log(formValues)
        console.log(values)
    }

    const handleAddMember = () => {
        appendMember({ name: '', role: '' });
    };

    const handleDeleteMember = (index: number) => {
        removeMember(index)
    }
    console.log(errors)



    const textareaStyle = "min-h-40 w-full px-4 py-2 rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px] border-black bg-white placeholder:font-thin placeholder:font-poppins font-regular font-poppins"
    const counterStyle = "block text-xs text-black text-right mt-1 font-bold"
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
                                    <FormLabel className="text-sm font-medium flex-1 pb-2">Name</FormLabel>
                                    <FormLabel className="text-sm font-medium flex-1 pb-2">Role</FormLabel>
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
                                                            className={inputStyle}
                                                            placeholder="Enter name"
                                                            {...field}
                                                            {...register(`teamMembers.${index}.name`)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-MVP-red" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`teamMembers.${index}.role`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <Select onValueChange={(value) => {
                                                        setValue(`teamMembers.${index}.role`, value);
                                                    }} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className={inputStyle} >
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="font-gilroy font-bold rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px] border-black">
                                                            <SelectItem value="Software developer">Software Developer</SelectItem>
                                                            <SelectItem value="UX Designer">UX Designer</SelectItem>
                                                            <SelectItem value="Product Manager">Product Manager</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-MVP-red" />
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
                        {/* Upload image */}
                        <img className="w-1/2 pt-10" src={UploadBox} alt="upload icon" />
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


