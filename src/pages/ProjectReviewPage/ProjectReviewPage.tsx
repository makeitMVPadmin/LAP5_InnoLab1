import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProjectSubmission, SectionProps } from "../../types/submissionTypes"
import { createProjectSubmission } from "../../Firebase/FirebaseStore"
import { submissionSchema } from "../../schema/submissionSchema";
import { formatTextSections } from "../../utils/formatTextFunctions"
import { renderObjectArrayContent, renderEditableImages } from "../../utils/renderHelpers"
import { useToast } from "../../hooks/use-toast"
import { STYLES } from "../../constants/styles";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import SubmissionModal from "../../components/SubmissionModal/SubmissionModal";
import EditButton from "../../components/EditButton/EditButton";
import Clock2 from "../../assets/images/clock-type2.svg"
import BellIcon from "../../assets/images/bell.svg"

const Section = ({ title, children, required, editButton }: SectionProps) => (
    <section className="space-y-2">
        <div className="flex justify-end">
            {editButton}
        </div>
        <h2 className="text-sm font-bold mt-4">{title}{required && '*'}</h2>
        {children}
    </section>
);

const ProjectReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventId } = useParams()
    const { toast } = useToast()

    const { submissionFormData } = location.state || {};
    const [formData, setFormData] = useState(submissionFormData);
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleEditSection = (sectionId: string) => { setEditingSectionId(sectionId); };
    const handleSaveSection = (sectionId: string, newValue: any) => {
        setFormData(prev => {
            if (sectionId === "projectFiles") {
                let updatedFiles;
                if (newValue instanceof File) {
                    updatedFiles = [...prev.projectFiles, newValue];
                } else if (Array.isArray(newValue) && newValue.every(item => item instanceof File)) {
                    updatedFiles = [...prev.projectFiles, ...newValue];
                } else {
                    console.error('Unexpected newValue type for projectFiles:', newValue);
                    return prev;
                }
                return {
                    ...prev,
                    projectFiles: updatedFiles
                };
            }
            return {
                ...prev,
                [sectionId]: newValue
            };
        });
        setEditingSectionId(null);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };


    const renderEditableContent = (sectionId: string, content: string, type: "text" | "array" = "text") => {
        const isEditing = editingSectionId === sectionId;

        if (!isEditing) {
            return (
                <div className="">
                    {type === "array" ? (
                        <ul className="space-y-0 list-disc">
                            {content.split(",").map((item, i) => (
                                <li key={i} className="text-gray-700 font-poppins ml-6">{item.trim()}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="list-disc text-gray-700 whitespace-pre-line font-poppins">{formatTextSections(content)}</p>
                    )}
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {type === "array" ? (
                    <Input
                        defaultValue={content}
                        className={`${STYLES.input}w-full font-poppins text-lg`}
                        placeholder="Enter comma-separated values"
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [sectionId]: e.target.value
                        }))}
                    />
                ) : (
                    <Textarea
                        defaultValue={content}
                        className={`${STYLES.textareaStyle} font-poppins text-lg`}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [sectionId]: e.target.value
                        }))}
                    />
                )}
                <div className="flex gap-2">
                    <Button
                        onClick={() => handleSaveSection(sectionId, formData[sectionId])}
                        className={`${STYLES.primaryButton}`}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={handleCancelEdit}
                        className={`${STYLES.secondaryButton}`}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    };
    const handleCancelEdit = () => { setEditingSectionId(null); };
    const handleEditMode = () => { setIsEditMode(true) }
    const handleDeleteFile = (fileType: 'projectFiles' | 'pdfFiles', indexToRemove: number) => {
        const newFiles = formData[fileType].filter((_: any, index: number) => index !== indexToRemove);
        setFormData(prev => ({
            ...prev,
            [fileType]: newFiles
        }));
    };
    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            // Validate form data
            const parsedData = submissionSchema.safeParse(formData);
            if (!parsedData.success) {
                console.error("Validation errors:", parsedData.error.errors);
                return;
            }

            // Filter empty team members and links
            const formattedTeamMembers = formData.teamMembers.filter(
                (member) => member.name.trim() !== "" && member.role.trim() !== ""
            );

            const formattedLinks = formData.projectLinks.filter(
                (link) => link.url.trim() !== ""
            );

            // Create submission data object
            const submissionFormData: ProjectSubmission = {
                ...formData,
                teamMembers: formattedTeamMembers,
                projectLinks: formattedLinks,
            };
            console.log("submission part 2", submissionFormData);


            await createProjectSubmission(submissionFormData);

            setTimeout(() => {
                toast({
                    description: (
                        <div className="flex items-center gap-3">
                            <div className="flex gap-2 justify-start items-center">
                                <img
                                    src={BellIcon}
                                    alt="success"
                                    className="h-6 w-6"
                                />
                                <p className="font-bold font-gilroy">Project was submitted successfully!</p>
                            </div>
                            {/* TODO- add button to review*/}
                        </div>
                    ),
                    className: "bg-white shadow-lg border-black border-3 rounded-[10px]",
                    duration: 2000,
                });
                navigate(`/event/${eventId}`);
            }, 2000);

        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>loading</div>
    }

    return (
        <div className="font-gilroy">
            <main className="px-5 w-full md:w-9/12 max-w-[930px] md:m-auto pb-32">
                <h1 className="text-4xl font-bold mb-5 pt-14">Review Submission</h1>
                <section className="flex py-12 justify-end gap-2 items-center">
                    {/* <img className="w-6 h-6" src={Clock2} alt="clock icon" />
                    <p className="font-bold text-xl">Submission Ends In: 1h: 25m: 15s</p> */}
                </section>
                <section>
                    {showAlert && (
                        <Alert className="mb-4 bg-MVP-soft-yellow border-none h-16 flex items-center">
                            <AlertDescription className="font-poppins font-xl">
                                Section updated successfully!
                            </AlertDescription>
                        </Alert>
                    )}
                </section>
                <article className="mt-8 flex flex-col gap-10">
                    <Section
                        title="Title"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("title")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("title", formData.title)}
                    </Section>

                    <Section
                        title="Team Name"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("teamName")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("teamName", formData.teamName)}
                    </Section>
                    <Section
                        title="Team Members"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("teamMembers")}
                                isEditing={editingSectionId === "teamMembers"}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderObjectArrayContent(
                            "teamMembers",
                            formData.teamMembers,
                            editingSectionId === "teamMembers",
                            (newValue) => setFormData(prev => ({ ...prev, teamMembers: newValue }))
                        )}
                    </Section>

                    <Section
                        title="Tech Stack"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("techStack")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("techStack", formData.techStack, "array")}
                    </Section>

                    <Section
                        title="Project Challenge"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("projectChallenge")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("projectChallenge", formData.projectChallenge)}
                    </Section>

                    <Section
                        title="Problem Statement"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("problemStatement")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("problemStatement", formData.problemStatement)}
                    </Section>

                    <Section
                        title="Design Features"
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("designFeatures")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("designFeatures", formData.designFeatures)}
                    </Section>

                    <Section
                        title="Design Impact"
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("designImpact")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("designImpact", formData.designImpact)}
                    </Section>

                    <Section
                        title="Next Steps"
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("nextSteps")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("nextSteps", formData.nextSteps)}
                    </Section>
                    <div className="">
                        <h3 className={`${STYLES.label}`}>Upload Files</h3>
                        <div className="flex gap-4 pl-2">
                            <div className="w-1/2">
                                <Section
                                    title="Upload project files"
                                    editButton={
                                        <EditButton
                                            handleClick={() => handleEditSection("projectFiles")}
                                            isEditing={false}
                                            isEditMode={isEditMode} />}
                                >
                                    {renderEditableImages({
                                        sectionId: "projectFiles",
                                        content: formData.projectFiles,
                                        isEditing: editingSectionId === "projectFiles",
                                        acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml'],
                                        handleSaveSection,
                                        handleDeleteFile,
                                        fileType: "projectFiles"
                                    })}
                                </Section>
                            </div>
                            <div className="w-1/2">
                                <Section
                                    title="Presentation Desk*"
                                    editButton={
                                        <EditButton
                                            handleClick={() => handleEditSection("pdfFiles")}
                                            isEditing={false}
                                            isEditMode={isEditMode} />}
                                >
                                    {renderEditableImages({
                                        sectionId: "pdfFiles",
                                        content: formData.pdfFiles,
                                        isEditing: editingSectionId === "pdfFiles",
                                        acceptedTypes: ['application/pdf'],
                                        handleSaveSection,
                                        handleDeleteFile,
                                        fileType: "pdfFiles"
                                    })}
                                </Section>
                            </div>
                        </div>

                    </div>


                    <Section
                        title="Project Links"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("projectLinks")}
                                isEditing={editingSectionId === "projectLinks"}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderObjectArrayContent(
                            "projectLinks",
                            formData.projectLinks,
                            editingSectionId === "projectLinks",
                            (newValue) => setFormData(prev => ({ ...prev, projectLinks: newValue }))
                        )}
                    </Section>

                </article>
            </main>
            <section className="h-[100px] w-full fixed bottom-0 px-8 border-t-[3px] border-MVP-black bg-MVP-white">
                <div className="max-w-[930px] md:m-auto flex justify-end gap-8 items-center pt-4">
                    <EditButton
                        handleClick={handleEditMode}
                        isEditing={false}
                        isEditMode={!isEditMode}
                    />
                    <SubmissionModal handleSubmit={handleSubmit} />
                </div>
            </section>
        </div>
    );
};

export default ProjectReviewPage;