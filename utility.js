//we use debounce function to not sending arbitary requests we gonna make a delay 
// until the user stops from typing


const debounce=(func,delay=1000)=>
{

    let timeoutId;
    return (...args)=>{
        if(timeoutId)
        {
            clearTimeout(timeoutId);
        }
        timeoutId=setTimeout(() => {
          func.apply(null,args);
        }, delay);
    };

};