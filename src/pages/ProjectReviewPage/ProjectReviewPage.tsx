import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProjectSubmission, TeamMember, ProjectLink, SectionProps } from "../../types/submissionTypes"
import { createProjectSubmission } from "../../Firebase/FirebaseStore"
import { submissionSchema } from "../../schema/submissionSchema";
import { formatTextSections } from "../../utils/formatTextFunctions"
import { STYLES } from "../../constants/styles";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import EditButton from "../../components/EditButton/EditButton";
import ImportCard from "../../components/ImportCard/ImportCard";
import BackArrow from "../../assets/images/back.svg"
import Clock2 from "../../assets/images/clock-type2.svg"
import CloseIcon from "../../assets/images/Close.svg"


const renderObjectArrayContent = (
    sectionId: "teamMembers" | "projectLinks",
    content: TeamMember[] | ProjectLink[],
    isEditing: boolean,
    onUpdate: (newValue: any) => void
) => {
    if (!isEditing) {
        return (
            <ul className="space-y-2">
                {sectionId === "teamMembers" ? (
                    (content as TeamMember[]).map((member, i) => (
                        <li key={i} className="text-gray-700 font-poppins">
                            {member.name} - {member.role}
                        </li>
                    ))
                ) : (
                    (content as ProjectLink[]).map((link, i) => (
                        <li key={i} className="text-gray-700 font-poppins font-semibold underline decoration-2">
                            <a href={link.url}> {link.url}</a>
                        </li>
                    ))
                )}
            </ul>
        );
    }

    const handleRemoveItem = (index: number) => {
        const newContent = [...content];
        newContent.splice(index, 1);
        onUpdate(newContent);
    };

    const handleAddItem = () => {
        const newItem = sectionId === "teamMembers"
            ? { name: "", role: "" }
            : { url: "" };
        onUpdate([...content, newItem]);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const newContent = [...content];
        if (sectionId === "teamMembers") {
            (newContent[index] as TeamMember)[field as keyof TeamMember] = value;
        } else {
            (newContent[index] as ProjectLink)[field as keyof ProjectLink] = value;
        }
        onUpdate(newContent);
    };

    return (
        <div className="space-y-4">
            {sectionId === "teamMembers" ? (
                (content as TeamMember[]).map((member, index) => (
                    <div key={index} className="flex gap-4">
                        <Input
                            value={member.name}
                            className={`${STYLES.input} font-poppins`}
                            placeholder="Member name"
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                        <Input
                            value={member.role}
                            className={`${STYLES.input} font-poppins`}
                            placeholder="Member role"
                            onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className=""
                        >
                            <img className="w-6 h-6" src={CloseIcon} alt="delete item icon" />
                        </button>
                    </div>
                ))
            ) : (
                (content as ProjectLink[]).map((link, index) => (
                    <div key={index} className="flex gap-4">
                        <Input
                            value={link.url}
                            className={`${STYLES.input} font-poppins`}
                            placeholder="Project URL"
                            onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="p-2  hover:bg-red-50 rounded-md"
                        >
                            <img className="w-4 h-4" src={CloseIcon} alt="delete item icon" />
                        </button>
                    </div>
                ))
            )}
            <button
                type="button"
                onClick={handleAddItem}
                className={`${STYLES.secondaryButton} px-4 py-2 rounded-md`}
            >
                Add {sectionId === "teamMembers" ? "Team Member" : "Project Link"}
            </button>
        </div>
    );
};


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
    const { submissionFormData } = location.state || {};
    const [formData, setFormData] = useState(submissionFormData);
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleEditSection = (sectionId: string) => { setEditingSectionId(sectionId); };
    const handleSaveSection = (sectionId: string, newValue) => {
        setFormData(prev => ({
            ...prev,
            [sectionId]: newValue
        }));
        setEditingSectionId(null);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };
    const handleCancelEdit = () => { setEditingSectionId(null); };
    const handleEditMode = () => { setIsEditMode(true) }


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
    const handleDeleteImage = (indexToRemove: Number) => {
        const newFiles = formData.imageFiles.filter((_, index: Number) => index !== indexToRemove);
        setFormData(prev => ({
            ...prev,
            imageFiles: newFiles
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
            console.log("Form and image submitted successfully!");


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
            <header >
                <DashboardNavbar />
                <section className="h-[3rem] bg-MVP-soft-blue px-10">
                    <button className="flex items-center w-11 h-11 gap-2" aria-label="Go back to the previous page">
                        <img className="w-7 h-6" src={BackArrow} alt="Back Arrow" />
                        <span className="text-black text-lg inline-block">Back</span>
                    </button>
                </section>
            </header>

            <main className="px-5 w-full md:w-9/12 max-w-[930px] md:m-auto">
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
                    <EditButton
                        handleClick={handleEditMode}
                        isEditing={false}
                        isEditMode={!isEditMode}

                    />
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
                        title="Problem Challenge"
                        required={true}
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("problemChallenge")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        {renderEditableContent("problemChallenge", formData.projectChallenge
                        )}
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
                    <Section
                        title="Upload project files"
                        editButton={
                            <EditButton
                                handleClick={() => handleEditSection("nextSteps")}
                                isEditing={false}
                                isEditMode={isEditMode}
                            />
                        }
                    >
                        <div className="flex gap-4">{formData.imageFiles.map((file, index) => {
                            return (
                                <ImportCard key={`file-${index}`} fileName={file.name} handleDelete={() => handleDeleteImage(index)} />
                            )
                        })}</div>
                    </Section>

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

                    <div className="flex justify-end gap-2 mt-5 py-10">
                        <Button
                            className={`${STYLES.secondaryButton}`}
                        >
                            Back
                        </Button>
                        <Button
                            className={`${STYLES.primaryButton}`}
                            onClick={handleSubmit}
                        >
                            Submit Project
                        </Button>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default ProjectReviewPage;