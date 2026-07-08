import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function DataTable({
  columns,
  rows,
  rowKey = "id",
  onEdit,
  onDeactivate,
}) {
  const showActions = onEdit || onDeactivate;

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field}>
                <b>{col.header}</b>
              </TableCell>
            ))}

            {showActions && (
              <TableCell>
                <b>Actions</b>
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[rowKey]}>
              {columns.map((col) => (
                <TableCell key={col.field}>{row[col.field] ?? ""}</TableCell>
              ))}

              {showActions && (
                <TableCell>
                  {onEdit && (
                    <Button size="small" onClick={() => onEdit(row)}>
                      Edit
                    </Button>
                  )}

                  {onDeactivate && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onDeactivate(row)}
                    >
                      Deactivate
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}