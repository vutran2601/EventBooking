import { routes } from '../../../routes';
import { Box, Typography, Button, Alert } from '@mui/material';

const Header = (props: any) => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'black',
                    boxSizing: 'border-box',
                    height: 'fit-content',
                    padding: '25px 25px 0px 25px',
                    textAlign: 'center',
                    position: 'sticky',
                    top: '0px',
                    zIndex: 9999,
                }}
            >
                {
                    props.successAlert &&
                    <Alert severity="success"
                        sx={{
                            position: 'absolute',
                            top: '20%',
                            left: '42%',
                            alignItems: 'center',
                            height: '40px'
                        }}
                    >
                        Successfully booked. <br/> Please check your email
                    </Alert>
                }
                
                <Typography
                    sx={{
                        marginBottom: '10px',
                        fontSize: '30px',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    Event Booking Management
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {routes.map((route, index) => {
                        return (
                            route.name !== undefined && (
                                <Button
                                    onClick={() => {}}
                                    key={index}
                                    href={route.path}
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname !== '/' &&
                                            window.location.pathname.includes(
                                                route.path
                                            )
                                                ? '#2DC275'
                                                : '',
                                        textDecoration: 'none',
                                        color: 'white',
                                        borderRadius: '0px',
                                        padding: '5px 20px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: window.location.pathname.includes(
                                                route.path
                                            ) ? '#2DC275' : 'gray',
                                        },
                                    }}
                                >
                                    {route.name}
                                </Button>
                            )
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};

export default Header;
