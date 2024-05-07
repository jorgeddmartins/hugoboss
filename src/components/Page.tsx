import dynamic from 'next/dynamic';
import { useLocalStorage } from 'react-use';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useMount } from 'react-use';

import Meta from '@components/Meta';
import { consent } from '@utils/analytics';

const Connector = dynamic(() => import('@utils/Mqtt/Connector'), {
  ssr: false
});

export type Page = {
  cookies: {
    functional: boolean;
    analytics: boolean;
    terms: boolean;
    setAccepted: (
      key: 'functional' | 'analytics' | 'terms' | 'cookies',
      value: boolean
    ) => void;
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const PageContext = createContext<Page>({
  cookies: null
});

type PageProps = {
  children: React.ReactNode;
};

const Page = ({ children }: PageProps) => {
  const [acceptedTerms, setAcceptedTerms] = useLocalStorage(
    'accept-terms',
    false
  );
  const [acceptedFunctionalCookies, setFunctionalCookies] = useLocalStorage(
    'accept-functional',
    false
  );
  const [acceptedAnalyticsCookies, setAnalyticsCookies] = useLocalStorage(
    'accept-analytics',
    false
  );
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  const acceptCookies = useCallback(
    (key: 'functional' | 'analytics' | 'terms' | 'cookies', value: boolean) => {
      if (key === 'functional' || key === 'cookies') {
        setFunctionalCookies(value);
      }
      if (key === 'analytics' || key === 'cookies') {
        setAnalyticsCookies(value);
        consent();
      }
      if (key === 'terms') {
        setAcceptedTerms(value);
      }
    },
    [setFunctionalCookies, setAnalyticsCookies, setAcceptedTerms]
  );

  useMount(() => {
    try {
      const accepted =
        JSON.parse(localStorage.getItem('accept-functional')) || false;
      const analytics =
        JSON.parse(localStorage.getItem('accept-analytics')) || false;
      if (!accepted) {
        setShowCookiePopup(true);
      }

      if (analytics) {
        consent();
      }
    } catch (e) {
      console.warn('Localstorage not supported, always showing cookie popup');
    }
  });

  return (
    <PageContext.Provider
      value={{
        cookies: {
          terms: acceptedTerms,
          analytics: acceptedAnalyticsCookies,
          functional: acceptedFunctionalCookies,
          setAccepted: acceptCookies,
          showPopup: showCookiePopup,
          setShowPopup: setShowCookiePopup
        }
      }}
    >
      <Meta />
      <Connector
        brokerUrl={`wss://${process.env.NEXT_PUBLIC_MQTT_HOST || ''}`}
        options={{
          port: parseInt(process.env.NEXT_PUBLIC_MQTT_PORT || '9001', 10)
        }}
        parserMethod={msg => new TextDecoder().decode(msg)}
      >
        {children}
      </Connector>
    </PageContext.Provider>
  );
};

export default Page;
