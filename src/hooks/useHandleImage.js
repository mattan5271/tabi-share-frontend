export const useHandleImage = () => {
  const uploadImage = ({ event, isMultiple, setImgState, setPrevieImgState }) => {
    if (isMultiple) {
      const files = Array.from(event.target.files);
      setImgState(files);
      setPrevieImgState(files.map((file) => window.URL.createObjectURL(file)));
    } else {
      const file = event.target.files[0];
      setImgState(file);
      setPrevieImgState(window.URL.createObjectURL(file));
    }
  };

  const deleteImage = ({ deleteImageUrl, setPrevieImgState }) => {
    setPrevieImgState((urls) => urls.filter((url) => url !== deleteImageUrl));
  };

  return { uploadImage, deleteImage };
};
