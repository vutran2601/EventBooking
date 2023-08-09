import { useState, useEffect, SetStateAction } from 'react';
import {
    Box,
    TextField,
    Grid,
    Typography,
    CircularProgress,
    Alert,
    Button,
    InputAdornment
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faFilm,
    faLocationDot,
    faGlobe,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

type Type_EventItem = {
    id: string;
    title: string;
    posterImg: string;
    eventDate: string;
    location: string;
    eventType: string;
    price: string;
    status: string;
    seatmap: {
        id: string;
        status: boolean;
    };
    setEventList: any;
};

const handleGetAllEvents = async () => {
    const response = await axios.get('http://localhost:3000/events');
    return response.data;
};

const handleSearchAllEvent = async (keyword: string) => {
    const response = await axios.get('http://localhost:3000/events/search', {
        params: {
            query: keyword,
        },
    });
    return response.data;
};

const handlePublishEvent = async (id: string, setLoading: any, setEventList: any) => {
    setLoading(true);
    await axios.put(`http://localhost:3000/events/update_status/${id}`);
    setTimeout(async () => {
        const updatedEventList = await handleGetAllEvents()
        setEventList(updatedEventList)
    }, 1000)
    setTimeout(() => setLoading(false), 1000)
};

const EventItem = (props: Type_EventItem) => {
    const [loading, setLoading] = useState(false);
    return (
        <Grid item xl={3} md={4} sm={6} xs={12}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                maxHeight: '500px',
                alignContent: 'space-between',
                justifyContent: 'space-between',
            }}
        >
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        minHeight: '300px'
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
                        Publishing event...
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Poster image */}
                    <Box
                        component="img"
                        alt={props.title}
                        src={props.posterImg}
                        sx={{
                            marginBottom: '10px',
                            height: '150px',
                            width: 'fit-content',
                        }}
                    />

                    {/* Main content */}
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        {/* Event title */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            {props.title}
                        </Typography>

                        {/* Price ---- eventDate */}
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
                                    {props.price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            '.'
                                        )}{' '}
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
                                    icon={faCalendarDays}
                                    style={{ color: '#2DC275' }}
                                />
                                <Typography>{props.eventDate}</Typography>
                            </Box>
                        </Box>

                        {/* Event type ---- Location */}
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
                                <Typography>{props.eventType}</Typography>
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
                                <Typography>{props.location}</Typography>
                            </Box>
                        </Box>

                        {/* Status */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {/* Label */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faGlobe} />
                                <Typography>Status</Typography>
                            </Box>
                            {/* Status */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                {props.status === 'published' ? (
                                    <Alert severity="success">Published</Alert>
                                ) : (
                                    <Alert severity="error">Unpublished</Alert>
                                )}
                            </Box>
                        </Box>

                        {/* Publish button */}
                        <Button
                            disabled={props.status === 'published' ? true : false}
                            onClick={() => handlePublishEvent(props.id, setLoading, props.setEventList)}
                            sx={{
                                width: '100%',
                                backgroundColor: '#2DC275',
                                p: 1,
                                color: 'white',
                                border: '1px solid #2DC275',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: '#2DC275',
                                    backgroundColor: 'white',
                                },
                            }}
                        >
                            PUBLISH EVENT
                        </Button>
                    </Box>
                </>
            )}
        </Grid>
    );
};

const PublishEvent = () => {
    const [focused, setFocuses] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [eventList, setEventList] = useState<Array<Type_EventItem>>([]);
    useEffect(() => {
        const FetchEvents = async () => {
            setIsLoading(true)
            const eventGetAllResult = await handleGetAllEvents();
            setEventList(eventGetAllResult);
            setTimeout(() => setIsLoading(false), 1000)
        };
        FetchEvents();
    }, []);

    return (
        <Box
            sx={{
                height: '100%',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
            }}
        >
            {/* Search event */}
            <TextField
                placeholder="Search events..."
                onFocus={() => setFocuses(true)}
                onBlur={() => setFocuses(false)}
                onChange={async (event) => {
                    setIsLoading(true);
                    let eventSearchResult: [Type_EventItem];
                    if (event.currentTarget.value === '') {
                        eventSearchResult = await handleGetAllEvents();
                    } else {
                        eventSearchResult = await handleSearchAllEvent(
                            event.currentTarget.value
                        );
                    }
                    setEventList(eventSearchResult);
                    setTimeout(() => setIsLoading(false), 500);
                }}
                sx={{
                    width: '250px',
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2DC275',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2DC275',
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                color={focused ? '#2DC275' : ''}
                            />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Main page */}
            {loading ? (
                <CircularProgress
                    sx={{
                        color: '#2DC275',
                    }}
                />
            ) : eventList.length === 0 ? (
                <Typography>No event found</Typography>
            ) : (
                <Grid container spacing={4}>
                    {eventList.map((event, index) => {
                        let eventDate = new Date(
                            event.eventDate
                        ).toLocaleDateString('en-GB', {
                            timeZone: 'Asia/Ho_Chi_Minh',
                            hour12: false,
                        });
                        return (
                            <EventItem
                                key={index}
                                id={event.id}
                                title={event.title}
                                posterImg={event.posterImg}
                                eventDate={eventDate}
                                location={event.location}
                                eventType={event.eventType}
                                price={event.price}
                                seatmap={event.seatmap}
                                status={event.status}
                                setEventList={setEventList}
                            />
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default PublishEvent;
