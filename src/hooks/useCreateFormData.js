export const useCreateFormData = ({ model, params }) => {
  const formData = new FormData();
  Object.entries(params).map(([key, value]) => {
    if (value == null || (Array.isArray(value) && !value.length)) return; // null、undefine、空配列の場合はパラメーターに乗せない
    if (key.match(/images/)) {
      value.map((image) => formData.append(`${model}[images][]`, image));
    } else {
      formData.append(`${model}[${key}]`, value);
    }
  });
  return formData;
};
