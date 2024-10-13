import { TeamMember, ProjectLink } from "../types/submissionTypes"
import { STYLES } from "../constants/styles";
import { Input } from "../components/ui/input";
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { formatTextSections } from '../utils/formatTextFunctions'
import ImportCard from '../components/ImportCard/ImportCard';
import ImageUploadZone from "../components/ImageUploadZone/ImageUploadZone"
import CloseIcon from "../assets/images/Close.svg"


export const renderObjectArrayContent = (
  sectionId: "teamMembers" | "projectLinks",
  content: TeamMember[] | ProjectLink[],
  isEditing: boolean,
  onUpdate: (newValue: any) => void
) => {
  if (!isEditing) {
    return (
      <ul className="space-y-2">
        {sectionId === "teamMembers"
          ? (content as TeamMember[]).map((member, i) => (
            <li key={i} className="text-gray-700 font-poppins">
              {member.name} - {member.role}
            </li>
          ))
          : (content as ProjectLink[]).map((link, i) => (
            <li
              key={i}
              className="text-gray-700 font-poppins font-semibold underline decoration-2"
            >
              <a href={link.url}> {link.url}</a>
            </li>
          ))}
      </ul>
    );
  }

  const handleRemoveItem = (index: number) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    onUpdate(newContent);
  };

  const handleAddItem = () => {
    const newItem =
      sectionId === "teamMembers" ? { name: "", role: "" } : { url: "" };
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
      {sectionId === "teamMembers"
        ? (content as TeamMember[]).map((member, index) => (
          <div key={index} className="flex gap-4">
            <Input
              value={member.name}
              className={`${STYLES.input} font-poppins`}
              placeholder="Member name"
              onChange={(e) =>
                handleInputChange(index, "name", e.target.value)
              }
            />
            <Input
              value={member.role}
              className={`${STYLES.input} font-poppins`}
              placeholder="Member role"
              onChange={(e) =>
                handleInputChange(index, "role", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className=""
            >
              <img
                className="w-6 h-6"
                src={CloseIcon}
                alt="delete item icon"
              />
            </button>
          </div>
        ))
        : (content as ProjectLink[]).map((link, index) => (
          <div key={index} className="flex gap-4">
            <Input
              value={link.url}
              className={`${STYLES.input} font-poppins`}
              placeholder="Project URL"
              onChange={(e) =>
                handleInputChange(index, "url", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="p-2  hover:bg-red-50 rounded-md"
            >
              <img
                className="w-4 h-4"
                src={CloseIcon}
                alt="delete item icon"
              />
            </button>
          </div>
        ))}
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



interface RenderEditableContentProps {
  sectionId: string;
  content: string;
  type?: 'text' | 'array';
  isEditing: boolean;
  formData: Record<string, any>;
  onSave: (sectionId: string, newValue: any) => void;
  onCancel: () => void;
  onUpdate: (sectionId: string, newValue: string) => void;
}

// export const renderEditableContent = ({
//   sectionId,
//   content,
//   type = 'text',
//   isEditing,
//   formData,
//   onSave,
//   onCancel,
//   onUpdate,
// }: RenderEditableContentProps): JSX.Element => {
//   const [tempContent, setTempContent] = useState(content);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTempContent(e.target.value); // Update temp state without triggering save
//   };

//   const handleSaveClick = () => {
//     onSave(sectionId, tempContent); // Commit changes only when "Save" is clicked
//   };

//   if (!isEditing) {
//     return (
//       <div className="">
//         {type === "array" ? (
//           <ul className="space-y-0 list-disc">
//             {Array.isArray(content)
//               ? content.map((item, i) => (
//                 <li key={i} className="text-gray-700 font-poppins ml-6">{item.trim()}</li>
//               ))
//               : typeof content === 'string'
//                 ? content.split(',').map((str, i) => (
//                   <li key={i} className="text-gray-700 font-poppins ml-6">{str.trim()}</li>
//                 ))
//                 : null
//             }
//           </ul>
//         ) : (
//           <p className="text-gray-700">{content}</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         value={tempContent}
//         onChange={handleInputChange} // Update local state on input change
//         className="border rounded p-2"
//       />
//       <button onClick={handleSaveClick} className="text-blue-500 ml-2">Save</button>
//       <button onClick={onCancel} className="text-red-500 ml-2">Cancel</button>
//     </div>
//   );
// };

export const renderEditableImages = ({
  sectionId,
  content,
  isEditing,
  handleSaveSection,
  handleDeleteImage,
}
) => {
  if (!isEditing) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {content.map((file, index) => (
            <ImportCard key={`file-${index}`} fileName={file.name} handleDelete={() => handleDeleteImage(index)} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <ImageUploadZone onFileChange={(files) => handleSaveSection(sectionId, files)} />
      <div className="flex gap-4">
        {content.map((file, index) => (
          <ImportCard key={`file-${index}`} fileName={file.name} handleDelete={() => handleDeleteImage(index)} />
        ))}
      </div>
    </div>
  )
}