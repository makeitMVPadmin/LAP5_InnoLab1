import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProjectSubmission, SectionProps } from "../../types/submissionTypes"
import { createProjectSubmission } from "../../Firebase/FirebaseStore"
import { submissionSchema } from "../../schema/submissionSchema";
import { formatTextSections } from "../../utils/formatTextFunctions"
import { renderObjectArrayContent, renderEditableImages } from "../../utils/renderHelpers"
import { STYLES } from "../../constants/styles";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import EditButton from "../../components/EditButton/EditButton";
import Header from "../../components/Header/Header";
import Clock2 from "../../assets/images/clock-type2.svg"


const Section = ({ title, children, required, editButton }: SectionProps) => (
    <section className="space-y-2">
        <div className="flex justify-end">
            {editButton}
        </div>
        <h2 className="text-sm font-medium mt-4">{title}{required && '*'}</h2>
        {children}
    </section>
);

const ProjectReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventId } = useParams()

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

    const handleBack = () => { navigate(`/event/${eventId}/submit `, { state: { formData } }) }
    const handleCancelEdit = () => { setEditingSectionId(null); };
    const handleEditMode = () => { setIsEditMode(true) }
    const handleDeleteImage = (indexToRemove: Number) => {
        const newFiles = formData.projectFiles.filter((_, index: Number) => index !== indexToRemove);
        setFormData(prev => ({
            ...prev,
            projectFiles: newFiles
        }))
    }
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const parsedData = submissionSchema.safeParse(formData);
            if (!parsedData.success) {
                console.error("Validation errors:", parsedData.error.errors);
                return;
            }

            const formattedTeamMembers = formData.teamMembers.filter(
                (member: { name: string; role: string; }) => member.name.trim() !== "" && member.role.trim() !== ""
            );

            const formattedLinks = formData.projectLinks.filter(
                (link: { url: string; }) => link.url.trim() !== ""
            );

            const submissionFormData: ProjectSubmission = {
                ...formData,
                teamMembers: formattedTeamMembers,
                projectLinks: formattedLinks,
            };

            await createProjectSubmission(submissionFormData);
            // TO DO add navigation after the form has submitted 
            // set a alert model
            // navigate('/hackathons')


        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }

    }

    if (isLoading) {
        return <div>loading</div>
    }

    return (
        <div className="font-gilroy">
            <Header handleClick={handleBack} />
            <main className="px-5 w-full md:w-9/12 max-w-[930px] md:m-auto pb-32">
                <h1 className="text-4xl font-bold mb-5 pt-14">Review Submission</h1>
                <section className="flex py-12 justify-end gap-2 items-center">
                    <img className="w-6 h-6" src={Clock2} alt="clock icon" />
                    <p className="font-bold text-xl">Submission Ends In: 1h: 25m: 15s</p>
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
                        <h3>Upload Files</h3>
                        <div className="flex gap-4 pl-2">
                            <div className="w-1/2">
                                <Section

                                    title="Upload project files"
                                    editButton={
                                        <EditButton
                                            handleClick={() => handleEditSection("imageFiles")}
                                            isEditing={false}
                                            isEditMode={isEditMode} />}
                                >
                                    {renderEditableImages({
                                        sectionId: "imageFiles",
                                        content: formData.imageFiles,
                                        isEditing: editingSectionId === "imageFiles",
                                        handleSaveSection,
                                        handleDeleteImage,
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
                                        handleSaveSection,
                                        handleDeleteImage,
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
                    <Button
                        className={`${STYLES.primaryButton}`}
                        onClick={handleSubmit}
                        aria-label="submit button to submit project"
                    >
                        Submit Project
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default ProjectReviewPage;