import Grid from "@mui/material/Grid";
import {Input, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";

function UploadTransactionsDialogContent({ inputChanged }) {
    const bankOptions = ['Rabobank'];
    const languageOptions = ['NL'];

    return (
        <Grid container spacing={2} pl={2} pt={2} pr={2}>
            <Grid item xs={3} >
                <div style={{ marginTop: 20, fontWeight: 'bold' }}>
                    Bank:
                </div>
            </Grid>
            <Grid
                item
                xs={9}
            >
                <Select
                    label="Bank"
                    name="bank"
                    style={{
                        marginLeft: 15,
                        width: '25%',
                    }}
                    onChange={inputChanged}
                    defaultValue={bankOptions[0]}
                >
                    {bankOptions.map(bank => (
                        <MenuItem
                            value={bank}
                            key={bank}
                        >
                            {bank}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={3}>
                <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                    Language:
                </div>
            </Grid>
            <Grid item xs={9}>
                <Select
                    label="Language"
                    name="language"
                    style={{
                        marginLeft: 15,
                        width: '15%',
                    }}
                    onChange={inputChanged}
                    defaultValue={languageOptions[0]}
                >
                    {languageOptions.map(language => (
                        <MenuItem
                            value={language}
                            key={language}
                        >
                            {language}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={3}>
                <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                    File:
                </div>
            </Grid>
            <Grid item xs={9}>
                <Input
                    type='file'
                    name='file'
                    onChange={inputChanged}
                    style={{
                        marginLeft: 15,
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default UploadTransactionsDialogContent;
