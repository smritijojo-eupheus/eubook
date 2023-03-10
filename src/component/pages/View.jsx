import React from 'react'
import Navbar from '../Navbar/Navbar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import MaterialTabs from '../MaterialTabs/MaterialTabs';
import VerticalTabs from '../MaterialTabs/VerticalTabs';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const View= () => {
  const theme = useTheme();
  console.log(theme);
  const isMatch=useMediaQuery(theme.breakpoints.down('md'));

  
  return (
    <div className='w-full'>
   <div><Navbar/></div>
   <div className='w-full  p-2 shadow-sm shadow-slate-200 px-6 '>
    <div className='text-blue-500'> DashBoard</div>
    <div><Breadcrumb/></div>
    </div>
    
    <div className='bg-white h-screen w-full p-3'>
        <div className='p-2 md:p-4 text-lg'>My Study Material</div>
        {/* <div className='md:px-3'> <MaterialTabs/></div> */}
        <div className='border-stone-300  '>
          {isMatch?(<>
          <div className='flex flex-col w-full '>
            <div className=''><VerticalTabs/></div>
           <div className=''><MaterialTabs/></div>
            </div>
        
          {/* <div className='w-full'>
            <iframe  src='https://eupheus-perfectice.s3.ap-south-1.amazonaws.com/E+-Book/Nectar+Semester+1/EVS+Book+1+Semester+1_updated.pdf'  className=" p-5 h-screen !w-[95%]"/>
        </div> */}

          </>):(<>
        <div className='flex flex-row w-full ml-4'>
            <div className='border-zinc-300 border-2 py-1 mt-[2rem]  '>
                <VerticalTabs/>
                </div>
                <div className='w-[80%] ml-5'><MaterialTabs/></div>
            </div>
            
      
        </>)}
       </div>
    </div>
    </div>


    
  )
}

export default View