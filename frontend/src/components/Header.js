import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Typography, Toolbar, Box, Button, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {

    const dispath = useDispatch();

    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [value,setValue] = useState();

    return (
        <div>
            <AppBar sx={{ backgroundColor: '#83069e', position : 'sticky' }} >
                <Toolbar>
                    <Typography variant="h4">Classic FashionBlogs</Typography>

                    {isLoggedIn && <Box display= "flex" marginLeft={'auto'} marginRight={'auto'}>
                        <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
                            <Tab LinkComponent={Link} to="/blogs" label = "All BLogs"/>
                            <Tab LinkComponent={Link} to="/myBlogs" label = "My BLogs"/>
                            <Tab LinkComponent={Link} to="/blogs/add" label = "Add BLog"/>

                        </Tabs>
                    </Box>}

                    <Box display="flex" marginLeft="auto">

                        { !isLoggedIn && < ><Button LinkComponent={Link} to="/auth"
                            variant='contained'
                            sx={{ margin: 1, borderRadius: 10 }}
                            color='info'>Login</Button>
                        <Button LinkComponent={Link} to="/auth"
                            variant='contained'
                            sx={{ margin: 1, borderRadius: 10 }}
                            color='info'>Signup</Button> </>}

                        {isLoggedIn && <Button 
                            onClick={() => dispath(authActions.logout())}
                            LinkComponent={Link} to="/auth"
                            variant='contained'
                            sx={{ margin: 1, borderRadius: 10 }}
                            color='info'>Logout</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
