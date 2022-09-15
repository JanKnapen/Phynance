import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";

function AddBankAccountDialogContent({
    onInputChange,
                                     }) {
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
                    name="name"
                    variant="standard"
                    style={{
                        marginLeft: 15,
                        width: '50%',
                    }}
                    onChange={onInputChange}
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
                    name="description"
                    multiline
                    rows={3}
                    maxRows={3}
                    fullWidth
                    onChange={onInputChange}
                />
            </Grid>
            <Grid item xs={3} >
                <div style={{ marginTop: 20, fontWeight: 'bold' }}>
                    IBAN:
                </div>
            </Grid>
            <Grid
                item
                xs={9}
            >
                <TextField
                    label="IBAN"
                    name="IBAN"
                    variant="standard"
                    style={{
                        marginLeft: 15,
                        width: '50%',
                    }}
                    onChange={onInputChange}
                />
            </Grid>
        </Grid>
    )
}

export default AddBankAccountDialogContent;
