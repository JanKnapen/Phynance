import Grid from "@mui/material/Grid";
import MastercardLogo from "../../utils/mastercardLogo";

function BankAccountCardLogo({ IBAN }) {
    return (
        <div
            style={{
                backgroundColor: '#1d36b4',
                borderRadius: 10,
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
                        {IBAN ? IBAN.match(/.{1,4}/g).join(' ') : ''}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountCardLogo;
