import { useCallback, useEffect } from 'react';
import { useMqttState } from '@utils/Mqtt';

export default function OutfitController() {
  const { client } = useMqttState();

  const TOPIC_OUTFIT = 'hugoboss/outfit';
  const TOPIC_SUBMIT = 'hugoboss/submit';
  const TOPIC_START = 'hugoboss/start';

  const uid = new URLSearchParams(window.location.search).get('uid');

  const sendOutfit = useCallback(
    (item: string, code: string) => {
      client?.publish(TOPIC_OUTFIT, JSON.stringify({ item, code, uid }));
    },
    [client, uid]
  );

  const sendSubmit = useCallback(() => {
    client?.publish(TOPIC_SUBMIT, JSON.stringify({ message: 'SUBMIT', uid }));
  }, [client, uid]);

  const sendStart = useCallback(() => {
    client?.publish(TOPIC_START, JSON.stringify({ uid }));
  }, [client, uid]);

  useEffect(() => {
    sendStart();
  }, [client, uid, sendStart]);

  return (
    <>
      <button
        onClick={() => {
          sendOutfit('Cube', 'TT1');
        }}
      >
        Change Outfit ■
      </button>
      <button
        onClick={() => {
          sendOutfit('Sphere', 'TT2');
        }}
      >
        Change Outfit ●
      </button>
      <button onClick={sendSubmit}>Submit</button>
    </>
  );
}
