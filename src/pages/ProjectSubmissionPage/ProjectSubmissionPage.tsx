
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { useAuth } from "../../context/AuthContext";
import { submissionSchema } from "../../schema/submissionSchema";
import { ProjectSubmissionFormValues, ProjectSubmission, TeamMember, ProjectLink } from "../../types/submissionTypes"
import { DEFAULT_FORM_VALUES } from "../../constants/submissionFormDefaults";
import { STYLES } from "../../constants/styles"
import { ROLES } from "../../constants/roles";
import { PLACEHOLDERS } from "../../constants/placeholders"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../../components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select"
import Header from "../../components/Header/Header";
import FileUploadZone from "../../components/FileUploadZone/FileUploadZone";
import CustomInput from "../../components/CustomInput/CustomInput";
import ImportCard from "../../components/ImportCard/ImportCard"
import Clock from "../../assets/images/clock-type2.svg"
import CloseButton from "../../assets/images/Close.svg"
import ErrorIcon from "../../assets/images/error.svg"

const ProjectSubmissionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state || {};
    const { currentUser } = useAuth();
    const { eventId } = useParams()
    const [file, setFile] = useState<File[]>([]);
    const [pdfFile, setPdfFile] = useState<File[]>([]);

    //Set default values for form
    const form = useForm<ProjectSubmissionFormValues>({
        resolver: zodResolver(submissionSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    });

    const { handleSubmit, register, watch, setValue, formState: { errors } } = form
    const formValues = watch();

    useEffect(() => {
        //To set the data if the user goes back from the review page
        if (formData) {
            setValue("teamName", formData.teamName);
            setValue("title", formData.title);
            setValue("techStack", formData.techStack);
            setValue("designTools", formData.designTools);
            setValue("designFeatures", formData.designFeatures);
            setValue("problemStatement", formData.problemStatement);
            setValue("designImpact", formData.designImpact);
            setValue("nextSteps", formData.nextSteps);

            // Handle array fields
            if (Array.isArray(formData.teamMembers)) {
                setValue("teamMembers", formData.teamMembers.map((member: TeamMember) => ({
                    name: member.name || '',
                    role: member.role || ''
                })));
            }
            if (Array.isArray(formData.projectLinks)) {
                setValue("projectLinks", formData.projectLinks.map((link: ProjectLink) => ({
                    url: link.url || ''
                })));
            }
            if (Array.isArray(formData.projectFiles)) {
                setValue("projectFiles", formData.projectFiles);
            }
            if (Array.isArray(formData.pdfFiles)) {
                setValue("pdfFiles", formData.pdfFiles);
            }
        }
    }, [formData, setValue])

    const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({ control: form.control, name: "teamMembers", });
    const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({ control: form.control, name: "projectLinks" });

    async function onSubmit(values: ProjectSubmissionFormValues) {

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

        const submissionFormData: ProjectSubmission = {
            ...values,
            teamMembers: formattedTeamMembers,
            projectLinks: formattedLinks,
            userId: currentUser.uid,
            eventId: eventId as string
        };
        console.log("Submission part 1", submissionFormData)
        navigate(`/event/${eventId}/review-submit`, { state: { submissionFormData } })
    }


    const handleFileChange = (newFiles: File[]) => {
        const MAX_FILES = 3
        setFile(prevFiles => {
            if (prevFiles.length >= MAX_FILES) {
                return prevFiles
            }
            const updatedFiles = [...prevFiles, ...newFiles];
            setValue('projectFiles', updatedFiles, { shouldValidate: true });
            return updatedFiles;
        });
    };

    const handlePdfChange = (newFiles: File[]) => {
        const MAX_FILES = 1
        setPdfFile(prevFiles => {
            if (prevFiles.length >= MAX_FILES) {
                return prevFiles
            }
            const updatedFiles = [...prevFiles, ...newFiles];
            setValue('pdfFiles', updatedFiles, { shouldValidate: true });
            return updatedFiles;
        });
    }


    const handleAddLink = () => { appendLink({ url: "" }); };
    const handleAddMember = () => appendMember({ name: "", role: "" });
    const handleDeleteLink = (index: number) => { removeLink(index) }
    const handleDeleteMember = (index: number) => removeMember(index);
    const handleDeleteFile = (indexToRemove: Number) => {
        const newFiles = file.filter((_, index) => index !== indexToRemove);
        setFile(newFiles)

    }
    const handleDeletePdf = (indexToRemove) => {
        const newFiles = pdfFile.filter((_, index) => index !== indexToRemove);
        setPdfFile(newFiles)
    }
    const handleBack = () => { navigate(-1) }

    return (
        <main className="font-gilroy">
            <Header handleClick={handleBack} />
            <section className="px-5 w-full md:w-9/12 max-w-[930px] md:m-auto">
                <h1 className="text-4xl font-gilroy font-bold mb-5 pt-14">Project Submission</h1>
                <div className="flex py-12 justify-end gap-2 items-center">
                    <img className="w-6	h-6" src={Clock} alt="clock icon" />
                    {/* TODO get date and count how much time left */}
                    <p className="font-bold text-xl">Submission Ends In: 1h: 25m: 15s</p>
                </div>
                <Form {...form} >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <CustomInput
                            errors={errors?.title}
                            form={form}
                            register={register}
                            inputName="title"
                            name="Title"
                            formValues={formValues.title}
                            placeHolder={PLACEHOLDERS.ENTER_TITLE}
                            type="Input"
                        />
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
                                                            <SelectItem value={ROLES.DATA_ANALYST}>{ROLES.DATA_ANALYST}</SelectItem>
                                                            <SelectItem value={ROLES.FRONTEND_DEVELOPER}>{ROLES.FRONTEND_DEVELOPER}</SelectItem>
                                                            <SelectItem value={ROLES.FULLSTACK_DEVELOPER}>{ROLES.FULLSTACK_DEVELOPER}</SelectItem>
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

                        {/* Upload image */}
                        <div className="">
                            <h3 className={`${STYLES.label}`}>Upload Files</h3>
                            <div className="flex gap-6">
                                <div className="w-1/2">
                                    <h4 className={`${STYLES.label} px-2`}>Project Files</h4>
                                    <div className="pt-2">
                                        <FileUploadZone
                                            onFileChange={handleFileChange}
                                            acceptedTypes={['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml']}
                                        />
                                        <p className={`${STYLES.label} px-2 pt-2`}>supported formats: JPEG, PNG, PDF, SVG</p>
                                        <p className={`${STYLES.label} px-2`}>maximum size: 10MB</p>
                                    </div>
                                    <div className="pb-6">
                                        <div className="flex gap-4">
                                            {file.length > 0 && file.map((item, index) => {
                                                return (
                                                    <ImportCard key={`file-${index}`} fileName={item.name} handleDelete={() => handleDeleteFile(index)} />
                                                )
                                            })}
                                        </div>
                                        {errors.projectFiles && (
                                            <div className="flex items-center gap-2">
                                                <img className="w-10 h-11 basis-3 p-6" src={ErrorIcon} alt="error icon" />
                                                <p className="text-red-500">{errors.projectFiles.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <h4 className={`${STYLES.label} px-2`}>Presentation Deck*</h4>
                                    <div className="pt-2">
                                        <FileUploadZone
                                            onFileChange={handlePdfChange}
                                            acceptedTypes={['application/pdf']}

                                        />
                                        <p className={`${STYLES.label} px-2 pt-2`}>supported formats: PDF</p>
                                        <p className={`${STYLES.label} px-2`}>maximum size: 10MB</p>
                                    </div>
                                    <div className="pb-6">
                                        <div className="flex gap-4">
                                            {pdfFile.length > 0 && pdfFile.map((item, index) => {
                                                return (
                                                    <ImportCard key={`file-${index}`} fileName={item.name} handleDelete={() => handleDeletePdf(index)} />
                                                )
                                            })}
                                        </div>
                                        {errors.pdfFiles && (
                                            <div className="flex items-center gap-2">
                                                <img className="w-10 h-11 basis-3 p-6" src={ErrorIcon} alt="error icon" />
                                                <p className="text-red-500">{errors.pdfFiles.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                        </div>


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

                        <div className="flex justify-end gap-2 mt-5 py-10">
                            <Button type="button" className={STYLES.secondaryButton} onClick={handleBack}>
                                Cancel
                            </Button>
                            <Button type="submit" className={`${STYLES.primaryButton}`}>
                                Review Submission
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </main>
    );
};

export default ProjectSubmissionPage;


