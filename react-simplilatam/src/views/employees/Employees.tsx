import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetEmployeesQuery } from "../../hooks/generated";
import { Stack, Typography } from "@mui/material";
import { CreateEmployeeForm } from "./CreateEmployeeForm";

export const Employees = () => {
  const { data, isLoading } = useGetEmployeesQuery();
  return (
    <>
      {isLoading ? (
        <Typography>Cargando!</Typography>
      ) : (
        <Stack direction="column">
          <CreateEmployeeForm />
          {data?.getEmployees?.length && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell align="right">RUT</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Empresa</StyledTableCell>
                  </TableRow>
                </TableHead>
                {/* Para próximo sprint agregar ícono de edición y eliminación, junto con su funcionalidad */}
                <TableBody>
                  {data?.getEmployees?.map((row) => (
                    <StyledTableRow key={row?.id}>
                      <StyledTableCell scope="row">{row?.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.rut}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.email}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.company?.name}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      )}
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
