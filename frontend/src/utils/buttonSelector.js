import {Button} from "@mui/material";

function ButtonSelector({ options, currentOption, setCurrentOption }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
            }}
        >
            {options.map((option, index) => (
                <Button
                    variant={currentOption === option ? 'contained' : 'text'}
                    disabled={currentOption === option}
                    onClick={() => setCurrentOption(option)}
                    style={{
                        width: 1/options.length * 100 + '%',
                    }}
                    key={option}
                >
                    {option}
                </Button>
            ))}
        </div>
    )
}

export default ButtonSelector;
