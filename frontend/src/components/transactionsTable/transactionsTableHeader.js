import Grid from "@mui/material/Grid";

function TransactionsTableHeader() {
    return (
        <Grid
            item
            xs={12}
            container
            style={{
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            <Grid
                item
                xs={2}
                style={{
                    fontWeight: 'bold',
                }}
            >
                Date
            </Grid>
            <Grid
                item
                xs={1}
                style={{
                    fontWeight: 'bold',
                }}
            >
                Amount
            </Grid>
            <Grid
                item
                xs={8}
                style={{
                    fontWeight: 'bold',
                }}
            >
                Description
            </Grid>
            <Grid
                item
                xs={1}
                style={{
                    fontWeight: 'bold',
                }}
            >
                Category
            </Grid>
        </Grid>
    )
}

export default TransactionsTableHeader;
