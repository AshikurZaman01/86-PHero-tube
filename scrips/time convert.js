

    const convertTime = (seconds) =>
    {
        const hrs = Math.floor(seconds / 3600);
        const min = Math.floor((seconds % 2600) / 60);
       
        return `${hrs} hrs ${min} min`
    }




