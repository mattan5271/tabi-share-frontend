type Props = {
  model: string;
  params: Params;
};

type Params = {
  key: string;
  value: any;
};

export const useCreateFormData = ({ model, params }: Props) => {
  const formData: FormData = new FormData();
  Object.entries(params).map(([key, value]) => {
    if (value == null || (Array.isArray(value) && !value.length)) return; // null、undefine、空配列の場合はパラメーターに乗せない
    if (key.match(/images/)) {
      value.map((image: File) => formData.append(`${model}[images][]`, image));
    } else {
      formData.append(`${model}[${key}]`, value);
    }
  });
  return formData;
};
