import { LoadingButton } from "@mui/lab";
import {
  Stack,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateEmployeeMutation,
  useGetCompaniesQuery,
} from "../../hooks/generated";
import { useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import { emailValidate, rutValidate } from "../../helpers/validators";
import { useState } from "react";

type CreateEmployeeFormType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

type FormInput = {
  name: string;
  email: string;
  rut: string;
  companyId: string;
};

export const CreateEmployeeForm = ({
  openDialog,
  setOpenDialog,
}: CreateEmployeeFormType) => {
  const { data } = useGetCompaniesQuery();
  const [createEmployeeError, setCreateEmployeeError] = useState("");
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      rut: "",
      companyId: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createEmployeeMutate, isLoading } = useCreateEmployeeMutation(
    {
      onSuccess: async (data) => {
        if (!data.createEmployee?.success) {
          setCreateEmployeeError(data?.createEmployee?.message || "");
        } else {
          resetField("name");
          resetField("email");
          resetField("rut");
          resetField("companyId");
          setOpenDialog(false);
          await queryClient.invalidateQueries();
        }
      },
      onError: (error) => {
        alert(JSON.stringify(error));
      },
    }
  );

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    const employeeData = {
      ...formData,
      companyId: +formData.companyId,
    };
    createEmployeeMutate(employeeData);
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <Stack
        sx={{ padding: "4rem" }}
        gap={4}
        direction="column"
        component="form"
        id="createEmployeeForm"
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
            name="rut"
            render={({ field }) => (
              <TextField
                {...field}
                label="RUT"
                onClick={() => setCreateEmployeeError("")}
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
            name="email"
            render={({ field }) => <TextField {...field} label="Email" />}
            rules={{
              required: "Campo requerido.",
              validate: {
                isSmaller: (value) =>
                  value.length > 100
                    ? "Debe ser menor a 100 caracteres."
                    : true,
                isValid: (value) =>
                  emailValidate(value) ? undefined : "Email inválido.",
              },
            }}
          />
          {errors.email?.message && (
            <Typography color="error.dark">{errors.email?.message}</Typography>
          )}
        </Stack>
        <Controller
          render={({ field }) => (
            <Select {...field} placeholder="Seleccionar empresas">
              {data?.getCompanies?.map((value) => (
                <MenuItem key={value?.id} value={value?.id}>
                  {value?.name}
                </MenuItem>
              ))}
            </Select>
          )}
          name="companyId"
          control={control}
        ></Controller>
        <Stack direction="row">
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            form="createEmployeeForm"
            loading={isLoading}
          >
            Guardar empleado
          </LoadingButton>
          {createEmployeeError && (
            <Typography color="error.dark">{createEmployeeError}</Typography>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};
