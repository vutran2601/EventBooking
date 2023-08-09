import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    InputAdornment,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    faArrowLeft,
    faCalendar,
    faFilm,
    faLocationDot,
    faEnvelope,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

type EventDetailTitleType = {
    title: string;
};

type Seat = {
    seatPos: number;
    selected: boolean;
    seatSelectedArray: any;
    setSeatSelectedArray: any;
};

const getSeatMap = async (seatMapId: string) => {
    const response = await axios.get(
        `http://localhost:3000/events/seatmap/${seatMapId}`
    );
    return response.data;
};

const handleBookingTicket = async (formData: any, seatMapId: string) => {
    const getAllSeatId = await getSeatMap(seatMapId);
    const allSeatId = getAllSeatId
        .filter((seat: any) => {
            return formData.seats.includes(seat.seatPos);
        })
        .map((seat: any) => {
            return seat.id;
        });
    try {
        const response = await axios.post(
            'http://localhost:3000/tickets/create_ticket',
            {
                ...formData,
                seats_id: allSeatId,
            }
        );
        return response.status;
    } catch (err: any) {
        return err.response.status;
    }
};

const Back = () => {
    const navigation = useNavigate();

    return (
        <Box
            onClick={() => navigation(-1)}
            sx={{
                display: 'flex',
                gap: '10px',
                position: 'absolute',
                left: '30px',
                top: '30px',
                alignItems: 'center',
                cursor: 'pointer',
            }}
        >
            <FontAwesomeIcon icon={faArrowLeft} color="black" />
            <Typography variant="subtitle1">Back</Typography>
        </Box>
    );
};

const EventDetailTitle = (props: EventDetailTitleType) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    width: '600px',
                    textAlign: 'center',
                }}
            >
                {props.title}
            </Typography>
        </Box>
    );
};

const EventBooking = (props: any) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [alert, setAlert] = useState('');
    const [focused, setFocused] = useState({
        email: false,
        name: false,
    });
    const [totalCost, setTotalCost] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        event_id: location.state.event.id,
        seats: null as any,
    });

    useEffect(() => {
        const seatSelectedArray = [
            ...props.seatSelectedArray.normal,
            ...props.seatSelectedArray.vip,
            ...props.seatSelectedArray.sweetbox,
        ];
        setFormData({ ...formData, seats: seatSelectedArray });
        const price = {
            normal: location.state.event.price,
            vip: location.state.event.price * 2,
            sweetbox: location.state.event.price * 1.5,
        };
        const totalCost =
            props.seatSelectedArray.normal.length * price.normal +
            props.seatSelectedArray.vip.length * price.vip +
            props.seatSelectedArray.sweetbox.length * price.sweetbox;
        setTotalCost(totalCost);
    }, [props.seatSelectedArray]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '35px',
                alignItems: 'center',
            }}
        >
            {/* Title */}
            <Typography
                variant="h5"
                sx={{
                    color: '#2DC275',
                    fontWeight: 'bold',
                }}
            >
                Check information & Booking
            </Typography>

            {/* Content */}
            <Grid container sx={{ gap: '20px' }}>
                {/* Check seat and price */}
                <Grid
                    item
                    xs={5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        border: '3px solid #2DC275',
                        borderRadius: 2,
                        p: 2,
                        height: 'fit-content',
                        position: 'relative',
                    }}
                >
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Seat selected:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>&#x25CF; Normal:</Typography>
                        <Typography>
                            <b>
                                {props.seatSelectedArray.normal.length} seat(s)
                            </b>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>&#x25CF; VIP:</Typography>
                        <Typography>
                            <b>{props.seatSelectedArray.vip.length} seat(s)</b>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>&#x25CF; Sweetbox:</Typography>
                        <Typography>
                            <b>
                                {props.seatSelectedArray.sweetbox.length}{' '}
                                seat(s)
                            </b>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: '2px',
                            backgroundColor: 'black',
                            m: '10px 0px',
                        }}
                    ></Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>
                            <b>Total cost:</b>
                        </Typography>
                        <Typography>
                            <b>
                                {totalCost
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                VND
                            </b>
                        </Typography>
                    </Box>

                    {/* Input email and Name */}
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="example123@email.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                        onFocus={() => setFocused({ ...focused, email: true })}
                        onBlur={() => setFocused({ ...focused, email: false })}
                        label="Email address"
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#2DC275',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                    borderColor: '#2DC275',
                                },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        color={focused.email ? '#2DC275' : ''}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        value={formData.fullName}
                        placeholder="Your full name"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                fullName: event.target.value,
                            })
                        }
                        onFocus={() => setFocused({ ...focused, name: true })}
                        onBlur={() => setFocused({ ...focused, name: false })}
                        label="Name"
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#2DC275',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                    borderColor: '#2DC275',
                                },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        color={focused.name ? '#2DC275' : ''}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        onClick={() => {
                            if (
                                Object.values(formData).some(
                                    (value) =>
                                        value === '' || value.length === 0
                                )
                            ) {
                                setAlert('error');
                                setTimeout(() => setAlert(''), 2000);
                            } else {
                                setAlert('loading');
                                handleBookingTicket(
                                    formData,
                                    location.state.event.seatmap.id
                                ).then((statusCode) => {
                                    if (statusCode === 400) {
                                        setTimeout(
                                            () => setAlert('error'),
                                            1000
                                        );
                                        setTimeout(() => setAlert(''), 3000);
                                    } else if (statusCode === 201) {
                                        props.setSuccessAlert(true);
                                        setTimeout(
                                            () => props.setSuccessAlert(false),
                                            3000
                                        );
                                        navigation('/my_ticket');
                                    }
                                });
                            }
                        }}
                        sx={{
                            backgroundColor: '#2DC275',
                            p: 2,
                            color: 'white',
                            fontWeight: 'bold',
                            border: '1px solid #2DC275',
                            '&:hover': {
                                color: '#2DC275',
                            },
                        }}
                    >
                        Submit booking
                    </Button>
                    {alert === 'loading' && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                position: 'absolute',
                                top: '103%',
                                left: '15%',
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    color: '#2DC275',
                                }}
                            />
                            <Typography
                                sx={{
                                    color: '#2DC275',
                                }}
                            >
                                Booking your ticket...
                            </Typography>
                        </Box>
                    )}
                    {alert === 'success' && (
                        <Alert
                            severity="success"
                            sx={{
                                position: 'absolute',
                                top: '103%',
                                width: '78%',
                                alignItems: 'center',
                            }}
                        >
                            Successfully booked. <br /> Please check your email
                        </Alert>
                    )}
                    {alert === 'error' && (
                        <Alert
                            severity="error"
                            sx={{
                                position: 'absolute',
                                top: '103%',
                                width: '78%',
                            }}
                        >
                            Something went wrong
                        </Alert>
                    )}
                </Grid>

                {/* Event information */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        border: '3px solid #2DC275',
                        borderRadius: 2,
                        p: 2,
                        height: 'fit-content',
                    }}
                >
                    {/* Price and date */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {/* Price */}
                        <Box sx={{ display: 'flex', gap: '5px' }}>
                            <Typography>From:</Typography>
                            <Typography
                                sx={{
                                    color: '#2DC275',
                                    fontWeight: 'bold',
                                }}
                            >
                                {location.state.event.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                VND
                            </Typography>
                        </Box>
                        {/* eventDate */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCalendar}
                                style={{ color: '#2DC275' }}
                            />
                            <Typography>
                                {location.state.event.eventDate}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Type and location */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: '#828282',
                        }}
                    >
                        {/* Event type */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon icon={faFilm} />
                            <Typography>
                                {location.state.event.eventType}
                            </Typography>
                        </Box>
                        {/* Location */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                border: '1px solid #828282',
                                padding: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faLocationDot} />
                            <Typography>
                                {location.state.event.location}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Poster image */}
                    <Box
                        component="img"
                        alt={location.state.event.title}
                        src={location.state.event.posterImg}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const SeatMapAnnotation = () => {
    const location = useLocation();
    const price = {
        normal: location.state.event.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        vip: (location.state.event.price * 2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        sweetbox: (location.state.event.price * 1.5)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            {/* Normal */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#3d5afe',
                    }}
                ></Box>
                <Typography>
                    Normal (<b>{price.normal} VND/seat</b>)
                </Typography>
            </Box>

            {/* VIP */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#ffea00',
                    }}
                ></Box>
                <Typography>
                    VIP (<b>{price.vip} VND/seat</b>)
                </Typography>
            </Box>

            {/* Sweetbox */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#f50057',
                    }}
                ></Box>
                <Typography>
                    Sweetbox (<b>{price.sweetbox} VND/seat</b>)
                </Typography>
            </Box>

            {/* Sweetbox */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'gray',
                    }}
                ></Box>
                <Typography>
                    Unavailable
                </Typography>
            </Box>
        </Box>
    );
};

const Seat = (props: Seat) => {
    const [selected, setSelected] = useState(false);
    let color;
    if (props.seatPos <= 20) color = '#ffea00';
    else if (props.seatPos >= 21 && props.seatPos <= 80) color = '#3d5afe';
    else color = '#f50057';

    const handleSetSeatSelectedArray = (
        seatPos: any,
        seatSelectedArray: any,
        setSeatSelectedArray: any
    ) => {
        if (seatPos <= 20) {
            seatSelectedArray.vip.includes(seatPos)
                ? setSeatSelectedArray((prevState: any) => ({
                      ...prevState,
                      vip: prevState.vip.filter((num: any) => num !== seatPos),
                  }))
                : setSeatSelectedArray((prevState: any) => ({
                      ...prevState,
                      vip: [...prevState.vip, seatPos],
                  }));
        } else if (seatPos >= 21 && seatPos <= 80) {
            seatSelectedArray.normal.includes(seatPos)
                ? setSeatSelectedArray((prevState: any) => ({
                      ...prevState,
                      normal: prevState.normal.filter(
                          (num: any) => num !== seatPos
                      ),
                  }))
                : setSeatSelectedArray((prevState: any) => ({
                      ...prevState,
                      normal: [...prevState.normal, seatPos],
                  }));
        } else {
            seatSelectedArray.sweetbox.includes(seatPos)
                ? setSeatSelectedArray((prevState: any) => ({
                      ...prevState,
                      sweetbox: prevState.sweetbox.filter(
                          (num: any) => num !== seatPos
                      ),
                  }))
                : setSeatSelectedArray((prevState: any) => ({
                      ...prevState,
                      sweetbox: [...prevState.sweetbox, seatPos],
                  }));
        }
    };

    return (
        <Box
            onClick={() => {
                if (props.selected) return;
                else {
                    setSelected(!selected);
                    handleSetSeatSelectedArray(
                        props.seatPos,
                        props.seatSelectedArray,
                        props.setSeatSelectedArray
                    );
                }
            }}
            sx={{
                cursor: 'pointer',
                userSelect: 'none',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px solid ${props.selected ? 'gray' : color}`,
                backgroundColor: props.selected ? 'gray' : selected ? color : '',
                '&:hover': {
                    backgroundColor: props.selected ? '' : color,
                },
            }}
        >
            {props.seatPos}
        </Box>
    );
};

const SeatMap = (props: any) => {
    const location = useLocation();
    const [selectedSeat, setSelectedSeat] = useState<Array<number>>([]);
    const arraySeat = Array.from({ length: 100 }, (_, index) => index + 1);

    useEffect(() => {
        getSeatMap(location.state.event.seatmap.id).then((result) => {
            const selectedSeat = result
                .filter((seat: any) => {
                    return seat.status === 'unavailable';
                })
                .map((seat: any) => {
                    return seat.seatPos;
                });
            setSelectedSeat(selectedSeat);
        });
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '35px',
                alignItems: 'center',
            }}
        >
            {/* Title */}
            <Typography
                variant="h5"
                sx={{
                    color: '#2DC275',
                    fontWeight: 'bold',
                }}
            >
                Book your favorite tickets
            </Typography>

            {/* Annotation */}
            <SeatMapAnnotation />

            {/* Seatmap */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 1fr);',
                    gap: '10px',
                    p: '10px',
                    border: '3px solid #2DC275',
                    borderRadius: 2,
                }}
            >
                {arraySeat.map((seat, index) => {
                    return (
                        <Seat
                            key={index}
                            seatPos={seat}
                            selected={
                                selectedSeat.includes(seat) ? true : false
                            }
                            seatSelectedArray={props.seatSelectedArray}
                            setSeatSelectedArray={props.setSeatSelectedArray}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

const EventDetail = (props: any) => {
    const [seatSelectedArray, setSeatSelectedArray] = useState({
        normal: [],
        vip: [],
        sweetbox: [],
    });

    const location = useLocation();
    return (
        <Box
            sx={{
                height: '100%',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '50px',
                position: 'relative',
            }}
        >
            <Back />
            <EventDetailTitle title={location.state.event.title} />
            <Grid container spacing={2}>
                <Grid item lg={6} sm={12}>
                    <SeatMap
                        seatSelectedArray={seatSelectedArray}
                        setSeatSelectedArray={setSeatSelectedArray}
                    />
                </Grid>
                <Grid item lg={6} sm={12}>
                    <EventBooking
                        seatSelectedArray={seatSelectedArray}
                        setSuccessAlert={props.setSuccessAlert}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default EventDetail;
