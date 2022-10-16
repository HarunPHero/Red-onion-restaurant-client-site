import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import Breakfast from '../Breakfast/Breakfast';
import Dinner from '../Dinner/Dinner';
import Lunch from '../Lunch/Lunch';
import './Foods.css';

const Foods = () => {
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };
  
    return (
      <>
      
        <Box id="all-foods" className='box' sx={{ width: '100%'}}>
            <h1 className='text-primary text-3xl uppercase mb-10 font-bold'>Our Foods</h1>
        <Box>
          <Tabs variant="fullWidth"value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary"
        indicatorColor={"secondary"}
       >
            <Tab label="Breakfast" {...a11yProps(0)} />
            <Tab label="Lunch" {...a11yProps(1)} />
            <Tab label="Dinner" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Breakfast></Breakfast>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Lunch></Lunch>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Dinner></Dinner>
        </TabPanel>
      </Box>
    
      </>

    );
};

export default Foods;