'use client'
import React, { useEffect, useRef } from 'react';

const ChatWidget = ({ token, assistantName, options }) => {
    const widgetRef = useRef(null);

    useEffect(() => {
        const loadWidget = () => {
            const script = document.createElement('script');
            script.src = 'https://9assistant-public.s3.ap-southeast-1.amazonaws.com/widget/widget.js';
            script.async = true;
            script.onload = () => {
                if (window.initializeWidget && widgetRef.current) {
                    window.initializeWidget(token, assistantName, options);
                }
            };
            document.body.appendChild(script);
        };

        if (typeof window !== 'undefined') {
            loadWidget();
        }

        return () => {
            // Clean up the script when the component unmounts
            const script = document.querySelector('script[src="https://9assistant-public.s3.ap-southeast-1.amazonaws.com/widget/widget.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [token, assistantName, options]);

    return <div ref={widgetRef} />;
};

export default ChatWidget;
