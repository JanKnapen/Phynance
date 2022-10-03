function MastercardLogo({ size, halfSize, oneHalfSize }) {
    return (
        <>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: '#ea001b',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: '#f79f1a',
                        position: 'absolute',
                        left: halfSize,
                        zIndex: 0,
                    }}
                />
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: '#f79f1a',
                        position: 'absolute',
                        left: halfSize,
                        zIndex: 3,
                        opacity: 0.5,
                    }}
                />
            </div>
            <div style={{
                position: 'static',
                height: size,
                width: oneHalfSize
            }}></div>
        </>
    )
}

export default MastercardLogo;
