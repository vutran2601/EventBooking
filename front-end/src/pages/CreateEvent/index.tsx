import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Alert,
    Grid,
    CircularProgress
} from '@mui/material';
import {
    faFilm,
    faVolleyball,
    faLocationDot,
    faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const handleCreateEvent = async (formData: any, setLoading: any, setAlert: any, setFormData: any) => {
    try {
        setLoading(true)
        await axios.post('http://localhost:3000/events/create_event', {
            title: formData.eventtitle,
            eventType: formData.eventtype,
            location: formData.location,
            price: formData.price,
            eventDate: formData.eventdate,
            posterImg: formData.posterImg,
            address: ''
        }, {headers:{'Content-Type':'multipart/form-data'}})
        setLoading(false)
        setAlert('success')
        setTimeout(() => setAlert(''), 2000)
        setFormData({
            eventtitle: '',
            eventtype: '',
            location: '',
            price: '',
            eventdate: null,
            posterImg: null
        })
    } catch (err) {
        console.log(err)
    }
};

const EventInputField = (props: any) => {
    const [focused, setFocused] = useState(false);
    const IconMapping: { [key: string]: React.ReactElement } = {
        eventtitle: (
            <FontAwesomeIcon
                icon={faVolleyball}
                color={focused ? '#2DC275' : ''}
            />
        ),
        eventtype: (
            <FontAwesomeIcon icon={faFilm} color={focused ? '#2DC275' : ''} />
        ),
        location: (
            <FontAwesomeIcon
                icon={faLocationDot}
                color={focused ? '#2DC275' : ''}
            />
        ),
        price: (
            <FontAwesomeIcon
                icon={faDollarSign}
                color={focused ? '#2DC275' : ''}
            />
        ),
    };
    const lowercaseType = props.type.replace(/\s/g, '').toLowerCase();

    return (
        <TextField
            fullWidth
            className='text-field'
            value={props.formData[lowercaseType]}
            onChange={(event) => props.setFormData({...props.formData, [lowercaseType]: event.target.value})}
            type={props.type === 'Price' ? 'number' : 'text'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            label={props.type + (props.type === 'Price' ? ' (VND)' : '')}
            sx={{
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
                        {IconMapping[lowercaseType]}
                    </InputAdornment>
                ),
            }}
        />
    );
};

const CreateEvent = () => {
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const [formData, setFormData] = useState({
        eventtitle: '',
        eventtype: '',
        location: '',
        price: '',
        eventdate: null,
        posterImg: null as any
    });

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
            {/* Title */}
            <Typography
                variant="h5"
                sx={{
                    color: '#2DC275',
                    fontWeight: 'bold',
                }}
            >
                Create event
            </Typography>

            {/* Fields */}
            <Grid
                container
                spacing={2}
                sx={{
                    width: '50%',
                    padding: '20px 20px 30px 0px',
                    borderRadius: 2,
                }}
            >
                {/* Left field */}
                <Grid item xs={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    {/* Event type and location */}
                    <EventInputField type="Event title" formData={formData} setFormData={setFormData}/>
                    <EventInputField type="Location" formData={formData} setFormData={setFormData}/>

                    {/* Upload poster image */}
                    <Button component="label"
                        sx={{
                            fontSize: 10,
                            width: '50%',
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
                        Upload poster image
                        <input
                            type="file"
                            
                            hidden
                            onChange={(event: any) => setFormData({...formData, posterImg: event.target.files[0]})}
                        />
                    </Button>

                    {/* Poster image box */}
                    <Box
                        component="img"
                        src={formData.posterImg && URL.createObjectURL(formData.posterImg)}
                        sx={{
                            width: '100%'
                        }}
                    />
                </Grid>

                {/* Right field */}
                <Grid item xs={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    {/* Event date */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            value={formData.eventdate}
                            onChange={(date) => setFormData({...formData, eventdate: date})}
                            label="Event date"
                            format="DD/MM/YYYY"
                            openTo='day'
                            sx={{
                                width: '100%',
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#2DC275',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#2DC275',
                                },
                            }}
                        />
                    </LocalizationProvider>
                    
                    {/* Event type and price */}
                    <EventInputField type="Event type" formData={formData} setFormData={setFormData}/>
                    <EventInputField type="Price" formData={formData} setFormData={setFormData}/>

                    {/* Create event button */}
                    <Button
                        onClick={() => {
                            if (Object.values(formData).some(value => value === '' || value === null)) {
                                setAlert('error')
                                setTimeout(() => setAlert(''), 2000)
                            } else {
                                handleCreateEvent(formData, setLoading, setAlert, setFormData)
                            }
                        }}
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
                        SUBMIT
                    </Button>

                    {/* Loading when creating event */}
                    {
                        loading &&
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px'
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    color: '#2DC275',
                                }}
                            />
                            <Typography
                                sx={{
                                    color: '#2DC275'
                                }}
                            >
                                Creating event...
                            </Typography>
                        </Box>
                    }

                    {/* Alert result */}
                    {
                        alert === 'success' &&
                        <Alert severity="success">Successfully created event</Alert>
                    }
                    {
                        alert === 'error' &&
                        <Alert severity="error">Something went wrong</Alert>
                    }
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateEvent;
