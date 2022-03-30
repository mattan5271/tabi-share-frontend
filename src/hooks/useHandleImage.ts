type UploadProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  isMultiple: boolean;
  setImgState: React.Dispatch<React.SetStateAction<File | File[]>>;
  setPrevieImgState: React.Dispatch<React.SetStateAction<string | string[]>>;
};

type DeleteProps = {
  deleteImageUrl: string;
  setPrevieImgState: React.Dispatch<React.SetStateAction<string | string[]>>;
};

export const useHandleImage = () => {
  const uploadImage = ({ event, isMultiple, setImgState, setPrevieImgState }: UploadProps) => {
    if (!event) return;
    if (isMultiple) {
      const files: File[] = Array.from(event.target.files);
      setImgState(files);
      setPrevieImgState(files.map((file) => window.URL.createObjectURL(file)));
    } else {
      const file: File = event.target.files[0];
      setImgState(file);
      setPrevieImgState(window.URL.createObjectURL(file));
    }
  };

  const deleteImage = ({ deleteImageUrl, setPrevieImgState }: DeleteProps) => {
    setPrevieImgState((urls: string[]) => urls.filter((url: string) => url !== deleteImageUrl));
  };

  return { uploadImage, deleteImage };
};
