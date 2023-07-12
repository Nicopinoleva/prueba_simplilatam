import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateCompanyMutation } from "../../hooks/generated";
import { useQueryClient } from "@tanstack/react-query";
import { rutValidate } from "../../helpers/validators";

type FormInput = {
  name: string;
  address: string;
  rut: string;
  phoneNumber: string;
};

export const CreateCompanyForm = () => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      rut: "",
      phoneNumber: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createCompanyMutate } = useCreateCompanyMutation({
    onSuccess: async () => {
      resetField("name");
      resetField("address");
      resetField("rut");
      resetField("phoneNumber");
      await queryClient.invalidateQueries();
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    createCompanyMutate(formData);
  };

  return (
    <Stack
      direction="row"
      component="form"
      id="createCompanyForm"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <Stack>
        <Controller
          control={control}
          name="name"
          render={({ field }) => <TextField {...field} label="Nombre" />}
          rules={{
            required: "Campo requerido.",
            validate: {
              isSmaller: (value) =>
                value.length > 100 ? "Debe ser menor a 100 caracteres." : true,
            },
          }}
        />
        {errors.name?.message && (
          <Typography color="error.dark">{errors.name?.message}</Typography>
        )}
      </Stack>
      <Stack>
        <Controller
          control={control}
          name="address"
          render={({ field }) => <TextField {...field} label="Dirección" />}
          rules={{
            required: "Campo requerido.",
            validate: {
              isSmaller: (value) =>
                value.length > 100 ? "Debe ser menor a 100 caracteres." : true,
            },
          }}
        />
        {errors.address?.message && (
          <Typography color="error.dark">{errors.address?.message}</Typography>
        )}
      </Stack>
      <Stack>
        <Controller
          control={control}
          name="rut"
          render={({ field }) => <TextField {...field} label="RUT" />}
          rules={{
            required: "Campo requerido.",
            validate: {
              isValid: (value) =>
                rutValidate(value) ? undefined : "Rut inválido.",
            },
          }}
        />
        {errors.rut?.message && (
          <Typography color="error.dark">{errors.rut?.message}</Typography>
        )}
      </Stack>
      <Stack>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => <TextField {...field} label="Número" />}
          rules={{
            required: "Campo requerido.",
            validate: {
              isSmaller: (value) =>
                value.length > 15 ? "Debe ser menor a 15 caracteres." : true,
            },
          }}
        />
        {errors.phoneNumber?.message && (
          <Typography color="error.dark">
            {errors.phoneNumber?.message}
          </Typography>
        )}
      </Stack>
      <LoadingButton variant="contained" type="submit" form="createCompanyForm">
        Crear empresa!
      </LoadingButton>
    </Stack>
  );
};
