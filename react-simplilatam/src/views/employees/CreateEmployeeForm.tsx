import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography, MenuItem, Select } from "@mui/material";
import {
  Controller,
  NestedValue,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  GetCompaniesQuery,
  useCreateEmployeeMutation,
  useGetCompaniesQuery,
} from "../../hooks/generated";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";
import { GraphQLError } from "graphql";
import ReactSelect from "react-select";
import {
  emailValidate,
  rutFormater,
  rutValidate,
} from "../../helpers/validators";

type FormInput = {
  name: string;
  email: string;
  rut: string;
  companyId: string;
};

export const CreateEmployeeForm = () => {
  const { data, isLoading } = useGetCompaniesQuery();
  const {
    control,
    handleSubmit,
    resetField,
    setValue,
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

  const { mutate: createEmployeeMutate } = useCreateEmployeeMutation({
    onSuccess: async () => {
      resetField("name");
      resetField("email");
      resetField("rut");
      resetField("companyId");
      await queryClient.invalidateQueries();
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    const employeeData = {
      ...formData,
      companyId: +formData.companyId,
    };
    createEmployeeMutate(employeeData);
  };

  return (
    <Stack
      direction="row"
      component="form"
      id="createEmployeeyForm"
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
          name="email"
          render={({ field }) => <TextField {...field} label="Email" />}
          rules={{
            required: "Campo requerido.",
            validate: {
              isSmaller: (value) =>
                value.length > 100 ? "Debe ser menor a 100 caracteres." : true,
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
          <Select {...field} placeholder="Empresa">
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
      <LoadingButton
        variant="contained"
        type="submit"
        form="createEmployeeyForm"
      >
        Crear empleado!
      </LoadingButton>
    </Stack>
  );
};
