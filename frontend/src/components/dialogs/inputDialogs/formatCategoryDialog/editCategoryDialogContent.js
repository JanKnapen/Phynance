import Grid from "@mui/material/Grid";
import {MenuItem, Select, TextField} from "@mui/material";
import {createElement, useContext} from "react";
import UtilsContext from "../../../../contexts/UtilsContext";

function EditCategoryDialogContent({
    editCategory,
    onInputChange,
                                   }) {
    const { MUIIcons } = useContext(UtilsContext);

    const getIconName = (iconId) => {
        return MUIIcons.filter(MUIIcon => MUIIcon.id === iconId)[0].name;
    }

    return (
        <Grid container spacing={2} pl={2} pt={2} pr={2}>
            <Grid item xs={3} >
                <div style={{ marginTop: 20, fontWeight: 'bold' }}>
                    Name:
                </div>
            </Grid>
            <Grid
                item
                xs={9}
            >
                <TextField
                    label="Name"
                    name='name'
                    variant="standard"
                    style={{
                        marginLeft: 15,
                        width: '50%',
                    }}
                    onChange={onInputChange}
                    defaultValue={editCategory ? editCategory.name : ''}
                />
            </Grid>
            <Grid item xs={3}>
                <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                    Description:
                </div>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    label="Description"
                    name='description'
                    multiline
                    rows={3}
                    maxRows={3}
                    fullWidth
                    onChange={onInputChange}
                    defaultValue={editCategory ? editCategory.description : ''}
                />
            </Grid>
            <Grid item xs={3}>
                <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                    Icon:
                </div>
            </Grid>
            <Grid item xs={3}>
                <Select
                    style={{
                        width: '70%',
                    }}
                    label='Icon'
                    name='icon'
                    renderValue={(value) => {
                        if (value === '') return <></>
                        const icon = MUIIcons.filter(MUIIcon => MUIIcon.name === value)[0].icon
                        return (
                            createElement(icon, {key: icon}, null)
                        )
                    }}
                    onChange={onInputChange}
                    defaultValue={editCategory ? getIconName(editCategory.icon) : ''}
                >
                    {MUIIcons.map(MUIIcon => (
                        <MenuItem
                            value={MUIIcon.name}
                            key={MUIIcon.name}
                        >
                            {createElement(MUIIcon.icon, {key: MUIIcon.icon}, null)}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
    )
}

export default EditCategoryDialogContent;
