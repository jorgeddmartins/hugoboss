import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/react';

import Layout from '@components/Layout';
import Button, { ButtonTypes } from '@components/Button';

import { useMqttState } from '@utils/Mqtt';
import { sendEvent } from '@utils/analytics';

import s from './PageSplash.module.scss';

const TOPIC_QR = 'hugoboss/qr';
const TOPIC_QR_RESPONSE = 'hugoboss/qrResponse';

const Landing: NextPage = () => {
  const router = useRouter();
  const [UID] = useState(uuidv4());
  const query = router.query?.sid || '';
  const SID = !Array.isArray(query) && query ? query : uuidv4();

  const { client, connectionStatus } = useMqttState();
  const isDev =
    (process.env.NODE_ENV !== 'production' &&
      process.env.NEXT_PUBLIC_FAKEPROD !== 'true') ||
    window.location.href.includes('omm.digital') ||
    window.location.href.includes('azurestaticapps.net');

  useEffect(() => {
    if (client) {
      client.subscribe(TOPIC_QR_RESPONSE);
    }
  }, [client]);

  const start = useCallback(async () => {
    if (!client) {
      Sentry.setExtra('connectionStatus', connectionStatus);
      Sentry.captureException('Not linked to MQTT');
      return;
    }

    let timeout = setTimeout(() => {
      Sentry.captureException('MQTT not responding');
    }, 3000);

    // Send MQTT message
    client.publish(
      TOPIC_QR,
      JSON.stringify({ message: true, uid: UID, sid: SID })
    );

    // Send to GA
    sendEvent('start');

    if (isDev) {
      router.push(`/outfit?uid=${SID}`);
    } else {
      client.once('message', (topic, data) => {
        if (topic === TOPIC_QR_RESPONSE) {
          clearTimeout(timeout);
          const message = JSON.parse(data.toString());
          if ((message.sid = UID && message.uid === UID && message.accepted)) {
            router.push(`/outfit?sid=${SID}&uid=${UID}`);
          } else {
            router.push(`/in-use`);
          }
        }
      });
    }
  }, [router, SID, UID, client, isDev, connectionStatus]);

  const connected = connectionStatus === 'Connected';

  return (
    <Layout>
      <section className={s.landingWrap}>
        <div className={s.sectionFrame}>
          <div className={s.contentWrap}>
            <span className={s.smallTitle}>be your own boss</span>
            <span className={s.bigTitle}>Create your boss look</span>
            <p>
              Style your Boss Look using our latest collection and redeem a free
              gift
            </p>

            <Button
              type={connected ? ButtonTypes.WHITE : ButtonTypes.DISABLED}
              onClick={start}
            >
              {connected ? 'Let’s start' : 'Connecting...'}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
