import {Button} from "@mui/material";

function ButtonSelector({options, currentOption}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
            }}
        >
            {options.map((option, index) => (
                <Button
                    variant={currentOption === option.name ? 'contained' : 'text'}
                    disabled={option.disable && currentOption === option.name}
                    onClick={option.onClick}
                    style={{
                        width: 1 / options.length * 100 + '%',
                    }}
                    key={option.name}
                >
                    {option.name}
                </Button>
            ))}
        </div>
    )
}

export default ButtonSelector;
