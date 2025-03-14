const setBrowserFingerprint = (req, res, next) => {
    if(!req.cookies.browserFingerPrint){
        const newFingerPrint = Math.random.toString(36).substring(2,15) +  Math.random.toString(36).substring(2,15)
        res.cookie("browserFingerPrint", newFingerPrint, {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
    }

    next();
}

export { setBrowserFingerprint }