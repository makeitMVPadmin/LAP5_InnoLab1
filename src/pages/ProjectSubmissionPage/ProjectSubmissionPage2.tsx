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
    return (
        <main className="font-gilroy">
        </main>
    );
};

export default ProjectSubmissionPage2;


