import { useEffect, useState } from 'react';
import useSubmissions from '../../hooks/useSubmissions';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const ProjectShowcasePage = () => {
    const { submissions } = useSubmissions('JxOyxzIBAWChYhsVjcE1');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchImage = async () => {
            if (submissions) {
                const storage = getStorage();
                const imageRef = ref(storage, 'gs://launchacademybackend.appspot.com/images/70baf20435ad1fd706bf9390e34454d5.jpg');

                try {
                    const url = await getDownloadURL(imageRef);
                    setImageUrl(url);
                } catch (err) {
                    setError((err as Error).message);
                }
            }
        };

        fetchImage();
    }, [submissions])

    return (
        <img src={imageUrl} className='w-[50%] h-[50%]' alt="test image"></img>
    );
}

export default ProjectShowcasePage;