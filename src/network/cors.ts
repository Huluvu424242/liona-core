
export const addCORSHeader = (req: any, res: any, next: any) => {
    // const origin = req.get('host') ||  req.get('origin') || "*";
    const origin = req.get('origin') || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
}

