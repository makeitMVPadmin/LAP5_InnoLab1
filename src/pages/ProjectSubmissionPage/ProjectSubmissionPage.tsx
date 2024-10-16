
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { useAuth } from "../../context/AuthContext";
import { createProjectSubmission } from "../../Firebase/FirebaseStore"
import { submissionSchema } from "../../schema/submissionSchema";
import { ProjectSubmissionFormValues, ProjectSubmission } from "../../types/submissionTypes"
import { DEFAULT_FORM_VALUES } from "../../constants/submissionFormDefaults";
import { STYLES } from "../../constants/styles"
import { ROLES } from "../../constants/roles";
import { PLACEHOLDERS } from "../../constants/placeholders"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../../components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select"
import ImageUploadZone from "../../components/ImageUploadZone/ImageUploadZone";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import CustomInput from "../../components/CustomInput/CustomInput";
import Clock from "../../assets/images/clock-type2.svg"
import CloseButton from "../../assets/images/Close.svg"
import ErrorIcon from "../../assets/images/error.svg"

const ProjectSubmissionPage = () => {
    const { currentUser } = useAuth();
    const { eventId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);

    //Set Default values for form
    const form = useForm<ProjectSubmissionFormValues>({
        resolver: zodResolver(submissionSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    });


    const { handleSubmit, register, watch, setValue, formState: { errors } } = form
    const formValues = watch();

    const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({ control: form.control, name: "teamMembers", });
    const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({ control: form.control, name: "projectLinks" });

    async function onSubmit(values: ProjectSubmissionFormValues) {
        setIsLoading(true)

        try {
            // Validate the form data
            const parsedData = submissionSchema.safeParse(values);
            if (!parsedData.success) {
                console.error("Validation errors:", parsedData.error.errors);
                return;
            }

            const formattedTeamMembers = values.teamMembers.filter(
                (member) => member.name.trim() !== "" && member.role.trim() !== ""
            );

            const formattedLinks = values.projectLinks.filter(
                (link) => link.url.trim() !== ""
            );

            // Create the submission object with the required additional fields
            const submission: ProjectSubmission = {
                ...values,
                teamMembers: formattedTeamMembers,
                projectLinks: formattedLinks,
                userId: currentUser.uid,
                eventId: eventId as string
            };


            await createProjectSubmission(submission);
            console.log("Form and image submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }

    }

    const handleFileChange = (file: File) => {
        setFile(file);
        setValue('imageFile', file, { shouldValidate: true });
    };
    const handleAddLink = () => { appendLink({ url: "" }); };
    const handleDeleteLink = (index: number) => { removeLink(index) }
    const handleAddMember = () => appendMember({ name: "", role: "" });
    const handleDeleteMember = (index: number) => removeMember(index);

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
                    {/* TODO get date and count how much time left */}
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
                            placeHolder={PLACEHOLDERS.ENTER_TEAM_NAME}
                            type="Input"
                        />
                        {/* Team Members */}
                        <div className="w-full">
                            <div className="flex">
                                <div className="flex w-full items-baseline gap-4">
                                    <FormLabel className="text-sm font-medium flex-1">Name</FormLabel>
                                    <FormLabel className="text-sm font-medium flex-1">Role</FormLabel>
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
                                                            className={`${STYLES.input} ${errors.teamMembers && "border-MVP-red"}`}
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
                                                            <SelectTrigger className={`${STYLES.input} ${errors?.teamMembers && "border-MVP-red"}`} >
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className={`font-gilroy font-bold rounded-[10px] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px]  ${errors?.teamMembers?.[index]?.role ? 'border-MVP-red' : "border-black"}`}>
                                                            <SelectItem value={ROLES.SOFTWARE_DEVELOPER}>{ROLES.SOFTWARE_DEVELOPER}</SelectItem>
                                                            <SelectItem value={ROLES.UX_DESIGNER}>{ROLES.UX_DESIGNER}</SelectItem>
                                                            <SelectItem value={ROLES.PRODUCT_MANAGER}>{ROLES.PRODUCT_MANAGER}</SelectItem>
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
                            placeHolder={PLACEHOLDERS.ENTER_TECH_STACK}
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
                            placeHolder={PLACEHOLDERS.ENTER_DESIGN_TOOLS}
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
                            placeHolder={PLACEHOLDERS.ENTER_PROBLEM_STATEMENT}
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
                            placeHolder={PLACEHOLDERS.ENTER_PROBLEM_CHALLENGE}
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
                            placeHolder={PLACEHOLDERS.ENTER_DESIGN_FEATURES}
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
                            placeHolder={PLACEHOLDERS.ENTER_DESIGN_IMPACT}
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
                            placeHolder={PLACEHOLDERS.ENTER_NEXT_STEPS}
                            type="Textarea"
                        />
                        {/* Project Links */}
                        <div>
                            <FormLabel className={STYLES.label}>Project Links*</FormLabel>
                            {linkFields.map((link, index) => (
                                <div key={link.id} className="py-2 flex items-center">
                                    <FormField
                                        name={`projectLinks.${index}.url`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        className={`${STYLES.input} ${errors.projectLinks?.[index]?.url && "border-MVP-red"}`}
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
                                className={`${STYLES.primaryButton} mt-4 ml-auto flex items-center py-4 w-42 rounded-[0.625rem] text-MVP-black`}
                                aria-label="Add link"
                                onClick={handleAddLink}
                            >
                                <span>Add link</span>
                            </button>
                        </div>

                        {/* Upload image */}
                        <div className="w-1/2">
                            <ImageUploadZone onFileChange={handleFileChange} />
                            {errors.imageFile && (
                                <div className="flex items-center gap--2">
                                    <img src={ErrorIcon} alt="error icon" />
                                    <p className="text-red-500">{errors.imageFile.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 mt-5 py-10">
                            <Button type="button" className="h-12 bg-MVP-white font-gilroy text-lg text-MVP-black border-2 border-MVP-black">
                                Cancel
                            </Button>
                            <Button type="submit" className={STYLES.primaryButton}>
                                {isLoading ? "Loading...." : "Review Submission"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </main>
    );
};

export default ProjectSubmissionPage;


