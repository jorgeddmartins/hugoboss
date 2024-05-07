import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PageOutfitAvatar from './PageOutfitAvatar';
import PageOutfitSelect from './PageOutfitSelect';
import PageMoreThanOne from './PageMoreThanOne';

import { useMqttState } from '@utils/Mqtt';
import { sendEvent } from '@utils/analytics';

enum Stage {
  AVATAR,
  OUTFIT,
  MORETHANONE
}

export type Avatar = 'm' | 'f';

export type Outfit = {
  top: string;
  bottom: string;
};

const TOPIC_START = 'hugoboss/start';
const TOPIC_START_RESPONSE = 'hugoboss/startResponse';
const TOPIC_OUTFIT = 'hugoboss/outfit';
const TOPIC_OUTFIT_RESPONSE = 'hugoboss/outfitResponse';
const TOPIC_SUBMIT = 'hugoboss/submit';
const TOPIC_SUBMIT_RESPONSE = 'hugoboss/submitResponse';
const TOPIC_END = 'hugoboss/end';

type PageOutfitProps = {
  UID: string;
  SID: string;
};

const PageOutfit = ({ UID, SID }: PageOutfitProps) => {
  const router = useRouter();
  const { client } = useMqttState();

  const [stage, setStage] = useState(Stage.AVATAR);
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [outfitSelectBlocked, setOutfitSelectBlocked] = useState(false);
  const [outfit, setOutfit] = useState<Outfit | null>(null);

  const isDev =
    (process.env.NODE_ENV !== 'production' &&
      process.env.NEXT_PUBLIC_FAKEPROD !== 'true') ||
    window.location.href.includes('omm.digital') ||
    window.location.href.includes('azurestaticapps.net');

  useEffect(() => {
    if (client) {
      client.subscribe(TOPIC_START_RESPONSE);
      client.subscribe(TOPIC_OUTFIT_RESPONSE);
      client.subscribe(TOPIC_SUBMIT_RESPONSE);
    }
  }, [client]);

  const selectAvatar = useCallback(
    async (answer: Avatar) => {
      // send MQTT message
      client.publish(
        TOPIC_START,
        JSON.stringify({ message: answer, uid: UID, sid: SID })
      );

      // Send to GA
      sendEvent('select_avatar', {
        avatar: answer
      });

      if (isDev) {
        setAvatar(answer);
        setStage(Stage.MORETHANONE);
      } else {
        client.once('message', message => {
          if (message === TOPIC_START_RESPONSE) {
            setAvatar(answer);
            setStage(Stage.MORETHANONE);

            // todo: if in use go to correct page
            // router.push('/in-use')
          }
        });
      }
    },
    [client, UID, SID, isDev]
  );

  const selectOutfit = useCallback(
    async (key: keyof Outfit, id: string) => {
      if (outfitSelectBlocked) {
        return;
      }

      const newOutfit = {
        ...outfit,
        [key]: id
      };

      if (
        outfit &&
        outfit.top === newOutfit.top &&
        outfit.bottom === newOutfit.bottom
      ) {
        return;
      }

      // Send to MQTT
      client.publish(
        TOPIC_OUTFIT,
        JSON.stringify({
          uid: UID,
          sid: SID,
          item: id,
          code: id
        })
      );

      if (isDev) {
        setOutfit(newOutfit);
      } else {
        setOutfitSelectBlocked(true);
        setOutfit(newOutfit);

        // Wait for it to get unblocked
        client.once('message', message => {
          if (message === TOPIC_OUTFIT_RESPONSE) {
            setOutfitSelectBlocked(false);
          }
        });
      }
    },
    [outfitSelectBlocked, client, UID, SID, isDev, outfit]
  );

  const acceptOutfit = useCallback(async () => {
    // Send to MQTT
    client.publish(TOPIC_SUBMIT, JSON.stringify({ uid: UID, sid: SID }));

    // Send to GA
    sendEvent('select_outfit', {
      avatar,
      ...outfit
    });

    // Send stop message to MQTT
    client.publish(TOPIC_END, JSON.stringify({ uid: UID }));

    // Keep track of when event was finished
    localStorage.setItem('add_to_gallery', Date.now().toString());

    if (isDev) {
      router.push('/thank-you');
    } else {
      // Wait for preview url
      client.once('message', message => {
        if (message === TOPIC_SUBMIT_RESPONSE) {
          router.push('/thank-you');
        }
      });
    }
  }, [client, UID, SID, isDev, avatar, outfit, router]);

  const goBack = useCallback(() => {
    let next: Stage;

    switch (stage) {
      case Stage.AVATAR:
        router.push('/');
        return;

      case Stage.OUTFIT:
        next = Stage.AVATAR;
        break;

      default:
        next = stage;
    }

    setStage(next);
  }, [stage, router]);

  const goOutfit = useCallback(() => {
    setStage(Stage.OUTFIT);
  }, []);

  switch (stage) {
    case Stage.AVATAR:
      return <PageOutfitAvatar goBack={goBack} selectAvatar={selectAvatar} />;
    case Stage.OUTFIT:
      return (
        <PageOutfitSelect
          avatar={avatar}
          outfit={outfit}
          blocked={outfitSelectBlocked}
          selectOutfit={selectOutfit}
          acceptOutfit={acceptOutfit}
          goBack={goBack}
        />
      );
    case Stage.MORETHANONE:
      return <PageMoreThanOne goOutfit={goOutfit} />;
    default:
      throw new Error('Stage not found');
  }
};

export default PageOutfit;
