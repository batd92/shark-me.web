'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const BotScriptLoader = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        setScriptLoaded(true);
    }, []);

    return (
        <>{scriptLoaded && <Script async defer src="/index-CFweBvuu.js" />}</>
    );
};

export default BotScriptLoader;
