import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {createElement, useContext} from "react";
import BankContext from "../../../contexts/BankContext";
import UtilsContext from "../../../contexts/UtilsContext";

function CategoriesDialogTable({setOpenEditCategory, setEditCategory}) {
    const {categories} = useContext(BankContext);
    const {MUIIcons} = useContext(UtilsContext);

    const getIcon = (iconId) => {
        const icon = MUIIcons.filter(MUIIcon => MUIIcon.id === iconId)[0].icon;
        return (
            createElement(icon, {key: icon}, null)
        )
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={50} tooltip="The Icon">
                            <b>Icon</b>
                        </TableCell>
                        <TableCell width={300} tooltip="The Name">
                            <b>Name</b>
                        </TableCell>
                        <TableCell width={400} tooltip="The Description">
                            <b>Description</b>
                        </TableCell>
                        <TableCell width={100} tooltip="Edit">
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <TableContainer style={{minHeight: 500, maxHeight: 500}}>
                <Table>
                    <TableBody>
                        {categories && categories.map((category, index) => (
                            <TableRow
                                key={category.id}
                            >
                                <TableCell width={50}>{getIcon(category.icon)}</TableCell>
                                <TableCell width={300}>{category.name}</TableCell>
                                <TableCell width={400}>{category.description}</TableCell>
                                <TableCell width={100}>
                                    <Button
                                        variant='contained'
                                        onClick={(event) => {
                                            setOpenEditCategory(true);
                                            const editCategory = categories.filter(cat => cat.id === category.id)[0]
                                            setEditCategory(editCategory);
                                        }}
                                    >
                                        <EditIcon/>
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
