import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateCompanyMutation } from "../../hooks/generated";
import Dialog from "@mui/material/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import { rutValidate } from "../../helpers/validators";
import { useState } from "react";

type CreateCompanyFormType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

type FormInput = {
  name: string;
  address: string;
  rut: string;
  phoneNumber: string;
};

export const CreateCompanyForm = ({
  openDialog,
  setOpenDialog,
}: CreateCompanyFormType) => {
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

  const [createCompanyError, setCreateCompanyError] = useState("");

  const queryClient = useQueryClient();

  const { mutate: createCompanyMutate, isLoading } = useCreateCompanyMutation({
    onSuccess: async (data) => {
      if (!data.createCompany?.success) {
        setCreateCompanyError(data?.createCompany?.message || "");
      } else {
        resetField("name");
        resetField("address");
        resetField("rut");
        resetField("phoneNumber");
        await queryClient.invalidateQueries();
        setOpenDialog(false);
      }
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    createCompanyMutate(formData);
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <Stack
        sx={{ padding: "4rem" }}
        gap={4}
        direction="column"
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
                  value.length > 100
                    ? "Debe ser menor a 100 caracteres."
                    : true,
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
                  value.length > 100
                    ? "Debe ser menor a 100 caracteres."
                    : true,
              },
            }}
          />
          {errors.address?.message && (
            <Typography color="error.dark">
              {errors.address?.message}
            </Typography>
          )}
        </Stack>
        <Stack>
          <Controller
            control={control}
            name="rut"
            render={({ field }) => (
              <TextField
                {...field}
                label="RUT"
                onClick={() => setCreateCompanyError("")}
              />
            )}
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
        <Stack direction="row">
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            form="createCompanyForm"
            loading={isLoading}
          >
            Guardar empresa
          </LoadingButton>
          {createCompanyError && (
            <Typography color="error.dark">{createCompanyError}</Typography>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};
