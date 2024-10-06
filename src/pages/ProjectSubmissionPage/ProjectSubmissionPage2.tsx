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
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("hi")
        console.log(formValues)
        console.log(values)
    }
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
                    </form>
                </Form>
            </section>
        </main>
    );
};

export default ProjectSubmissionPage2;


