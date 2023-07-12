import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetCompaniesQuery } from "../../hooks/generated";
import { Stack, Typography } from "@mui/material";
import { CreateCompanyForm } from "./CreateCompanyForm";

export const Companies = () => {
  const { data, isLoading } = useGetCompaniesQuery();
  return (
    <>
      {isLoading ? (
        <Typography>Cargando!</Typography>
      ) : (
        <Stack direction="column">
          <CreateCompanyForm />
          {data?.getCompanies?.length && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell align="right">Dirección</StyledTableCell>
                    <StyledTableCell align="right">Rut</StyledTableCell>
                    <StyledTableCell align="right">Teléfono</StyledTableCell>
                  </TableRow>
                </TableHead>
                {/* Para próximo sprint agregar ícono de edición y eliminación, junto con su funcionalidad */}
                <TableBody>
                  {data?.getCompanies?.map((row) => (
                    <StyledTableRow key={row?.id}>
                      <StyledTableCell scope="row">{row?.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.address}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.rut}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.phoneNumber}
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
