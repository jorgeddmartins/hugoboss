import './fixMqtt.ts';
import React, { useEffect, useState, useMemo, useRef } from 'react';

import { connect, MqttClient } from 'mqtt';

import MqttContext from './Context';
import { Error, ConnectorProps, IMqttContext } from './types';

export default function Connector({
  children,
  brokerUrl,
  options = { keepalive: 0 },
  parserMethod
}: ConnectorProps) {
  const clientValid = useRef(false);
  const [connectionStatus, setStatus] = useState<string | Error>('Offline');
  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    if (!client && !clientValid.current) {
      clientValid.current = true;
      setStatus('Connecting');
      console.debug(`attempting to connect to ${brokerUrl}`);
      const mqtt = connect(brokerUrl, options);
      mqtt.on('connect', () => {
        console.debug('on connect');
        setStatus('Connected');
        setClient(mqtt);
      });
      mqtt.on('reconnect', () => {
        console.debug('on reconnect');
        setStatus('Reconnecting');
      });
      mqtt.on('error', () => {
        console.debug('on offline');
        setStatus('Offline');
      });
      mqtt.on('end', () => {
        console.debug('on end');
        setStatus('Offline');
      });
    }
    return () => {
      if (client) {
        console.debug('closing mqtt client');
        client.end(true);
        setClient(null);
        clientValid.current = false;
      }
    };
  }, [client, clientValid, brokerUrl, options]);

  const value: IMqttContext = useMemo<IMqttContext>(
    () => ({
      connectionStatus,
      client,
      parserMethod
    }),
    [connectionStatus, client, parserMethod]
  );

  return <MqttContext.Provider value={value}>{children}</MqttContext.Provider>;
}
