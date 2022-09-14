import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function CategoriesDialogTable({ categories, setOpenEditCategory, setCategoryEditId }) {
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={300} tooltip="The Name">
                            <b>Name</b>
                        </TableCell>
                        <TableCell tooltip="The Description">
                            <b>Description</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <TableContainer style={{ minHeight: 500, maxHeight: 500}}>
                <Table>
                    <TableBody>
                        { categories && categories.map((category, index) => (
                            <TableRow>
                                <TableCell width={300}>{category.name}</TableCell>
                                <TableCell width={400}>{category.description}</TableCell>
                                <TableCell>
                                    <Button
                                        variant='contained'
                                        onClick={(event) => {
                                            setOpenEditCategory(true);
                                            setCategoryEditId(category.id);
                                        }}
                                    >
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CategoriesDialogTable;
