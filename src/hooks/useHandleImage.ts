import { ChangeEvent, Dispatch, SetStateAction } from "react";

type UploadProps = {
  event: ChangeEvent<HTMLInputElement>;
  isMultiple: boolean;
  setImgState: Dispatch<SetStateAction<any>>;
  setPrevieImgState: Dispatch<SetStateAction<any>>;
};

type DeleteProps = {
  deleteImageUrl: string;
  setPrevieImgState: React.Dispatch<React.SetStateAction<any>>;
};

export const useHandleImage = () => {
  const uploadImage = ({ event, isMultiple, setImgState, setPrevieImgState }: UploadProps) => {
    if (!event.target.files) return;
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
