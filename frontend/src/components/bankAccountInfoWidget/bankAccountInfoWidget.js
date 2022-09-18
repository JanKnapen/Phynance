import {useContext} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import MastercardLogo from "../../utils/mastercardLogo";

function BankAccountInfoWidget() {
    const { theme } = useContext(CustomThemeContext);

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
                width: '100%',
            }}
        >
            <Grid container
                  pt={5}
                  pl={5}
            >
                <Grid item xs={12}>
                    <div
                        style={{
                            backgroundColor: '#1d36b4',
                            borderRadius: 10,
                            width: '90%',
                            height: '18vh',
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12} pt={3} pl={3}>
                                <MastercardLogo size={'1.5vw'} halfSize={'0.75vw'} oneHalfSize={'1.5vw'}/>
                            </Grid>
                            <Grid item xs={12} pt={5}>
                                <div
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1vw',
                                        letterSpacing: '0.1vw',
                                    }}
                                >
                                    NL70 RABO 0340 1550 00
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                {/*<Grid item xs={2}>*/}
                {/*    <Typography>*/}
                {/*        Info*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    )
}

export default BankAccountInfoWidget;
