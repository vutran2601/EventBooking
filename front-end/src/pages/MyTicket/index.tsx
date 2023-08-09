import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Grid,
    Typography,
    CircularProgress,
    InputAdornment,
    Button
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faFilm,
    faLocationDot,
    faMagnifyingGlass,
    faMoneyCheckDollar,
    faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const handleGetUserTickets = async (keyword: string, setLoading: any, setTicketList: any) => {
    console.warn(keyword)
    setLoading(true)
    try {
        const response = await axios.get(`http://localhost:3000/tickets/user_tickets/${keyword}`)
        setTicketList(response.data)
    } catch (err) {
        console.error(err)
    }
    setTimeout(() => setLoading(false), 1000)
}

const TicketItem = (props: any) => {
    let cost;
    if (props.seat.seatType === 'normal') cost = props.event.price
    else if (props.seat.seatType === 'vip') cost = props.event.price * 2
    else cost = props.event.price * 1.5

    return (
        <Grid item xl={3} md={4} sm={6} xs={12}
            onClick={() => {}}
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
            {/* Main content */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    p: '10px',
                    borderRadius: 2,
                    border: `2px solid ${ props.seat.seatType === 'vip' ? '#ffea00' :
                    props.seat.seatType === 'normal' ? '#3d5afe' : '#f50057'}`
                }}
            >
                {/* Event title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    {props.event.title}
                </Typography>

                {/* Event type */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        color: '#828282',
                    }}
                >
                    <FontAwesomeIcon icon={faFilm} />
                    <Typography>{props.event.eventType}</Typography>
                </Box>

                {/* Location ---- eventDate */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* Location */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            border: '1px solid #828282',
                            padding: '10px',
                            color: '#828282',
                        }}
                    >
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Typography>{props.event.location}</Typography>
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

                {/* Seat */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* Seat */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>Seat</Typography>
                    </Box>
    
                    {/* Seat (Category) */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '6px',
                            alignItems: 'center',
                        }}
                    >
                        <Typography 
                            sx={{ 
                                fontWeight: 'bold',
                                color: props.seat.seatType === 'vip' ? '#ffea00' :
                                props.seat.seatType === 'normal' ? '#3d5afe' : '#f50057'
                            }} 
                        >
                            {`${props.seat.seatPos} (${props.seat.seatType})`}
                        </Typography>
                    </Box>
                </Box>

                {/* Price */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>Cost</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', alignSelf: 'flex-end' }}>
                        
                        <Typography
                            sx={{
                                color: '#2DC275',
                                fontWeight: 'bold',
                            }}
                        >
                            {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VND'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
    
};

const MyTicket = () => {
    const [focused, setFocuses] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const [ticketList, setTicketList] = useState<Array<any>>([])

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
                placeholder="Type your confirmation code..."
                onFocus={() => setFocuses(true)}
                onBlur={() => setFocuses(false)}
                value={keyword}
                onChange={(event) => setKeyword(event.target.value.trim())}
                sx={{
                    width: '450px',
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
                                icon={faMagnifyingGlass}
                                color={focused ? '#2DC275' : ''}
                            />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <Button
                            onClick={() => {
                                if (keyword === '') return
                                else {
                                    handleGetUserTickets(keyword, setLoading, setTicketList)
                                }
                            }}
                            sx={{
                                backgroundColor: '#2DC275',
                                padding: '5px 20px',
                                color: 'white',
                                border: '1px solid #2DC275',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: '#2DC275',
                                    backgroundColor: 'white',
                                },
                            }}
                        >
                            Search
                        </Button>
                    )
                }}
            />

            {/* Main page */}
            {loading ? (
                <CircularProgress
                    sx={{
                        color: '#2DC275',
                    }}
                />
            ) : ticketList.length === 0 ? (
                <Typography>No ticket found</Typography>
            ) : (
                <Grid container spacing={5}>
                    {
                        ticketList.map((ticket, index) => {
                            let eventDate = new Date(ticket.event.eventDate)
                            .toLocaleDateString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false } )
                            return (
                                <TicketItem
                                    key={index}
                                    eventDate={eventDate}
                                    event={ticket.event}
                                    seat={ticket.seat}
                                />
                            )
                        })
                    }
                </Grid>
            )}
        </Box>
    );
};

export default MyTicket;
