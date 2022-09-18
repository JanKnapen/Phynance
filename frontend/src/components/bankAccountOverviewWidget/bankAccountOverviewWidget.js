import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import {useContext} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";

function BankAccountOverviewWidget() {
    const { theme } = useContext(CustomThemeContext);

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
                width: '100%',
            }}
        >
            <Grid container>
                <Grid item xs={2}>
                    <Typography>
                        Overview
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountOverviewWidget;
