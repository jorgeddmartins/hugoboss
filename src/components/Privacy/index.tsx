import { useState } from 'react';
import s from './Privacy.module.scss';
import { ReactComponent as Close } from '../../assets/img/close.svg';

type PrivacyProps = {
  onClose: () => void;
};

const Privacy = ({ onClose }: PrivacyProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = event => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div className={s.wrap}>
      <div className={s.scrollWrap}>
        <Close className={s.closeBtn} onClick={onClose} />
        <h2 className={s.title}>Terms and Conditions</h2>

        {scrollTop && <span className={s.gradientTop}></span>}

        <div className={s.scrollBar} onScroll={handleScroll}>
          <p className={s.topParagraph}>
            The following terms and conditions{' '}
            <strong>({`"Terms and Conditions"`})</strong> and privacy policy
            apply to entry in the{' '}
            <strong>{`"London Regent Street interactive Window"`}</strong>
            promotion (hereinafter referred to as the{' '}
            <strong>{`"Promotion"`})</strong>:
          </p>

          <ol>
            <li>
              HUGO BOSS UK Limited, 39 Plender Street, London NW1 0DT, Great
              Britain
              <strong>({`"HUGO BOSS"`})</strong> is the organiser and promoter
              of the Promotion.
            </li>
            <span className={s.contentTitle}>PRIZE</span>
            <li>
              1. Each person using the interactive window, following all steps
              as described in section 7 and meeting the eligibility criteria set
              out below <strong>({`"Participant"`})</strong> will receive one
              time one (1) giveaway consisting of an umbrella{' '}
              <strong>({`"the Prize"`})</strong>, while stocks last.
              <span className={s.space}>
                No cash alternative to any Prize will be provided.
              </span>
            </li>
            <li>
              Prizes are not inheritable nor for sale and may not be
              transferred, exchanged and/or redeemed for cash.
            </li>
            <li>
              The Participants will be responsible for the payment of taxes that
              may apply locally as well as any other charges or levies such as
              customs duties or other charges related to the Prize.
            </li>
            <span className={s.contentTitle}>PARTICIPATION</span>
            <li>
              The Promotion begins on February 13, 2023 (00:00 am BST) and ends
              as soon as the existing supply of 500 umbrellas has been
              distributed to Participants ({`"Promotion Period"`}) during the
              regular opening hours of the BOSS Store Regent Street. Entries
              submitted outside this period will not be accepted by HUGO BOSS.
              HUGO BOSS reserves the right to terminate the Promotion for cause,
              in whole or in part, at any time under consideration of the
              opposing interests. HUGO BOSS also reserves the right to terminate
              the Promotion for cause, in whole or in part, at any time under
              consideration of the opposing interest.
            </li>
            <li>
              The Promotion takes place in the BOSS Store Regent Street, 178-180
              Regent Street, London W1B5TW, United Kingdom.{' '}
              <strong>({`"Participating Store"`})</strong>
            </li>
            <li>
              In order to participate in the Promotion, the Participant needs to
              enter in the extra designed area in front of the interactive
              window. In this moment the interactive Window starts tracking the
              Participant in loose silhouette. After scanning the silhouette the
              interactive window shows the Participant the next steps (Call to
              Action). The Participant needs to scan the OR Code displayed in
              the interactive window of the Participating Store with his/her
              mobile phone. After the OR code has been scanned by the
              Participant,a mobile web page will open at the mobile phone and a
              Boss Look can be created on the opened mobile web page on the
              mobile phone. After the Boss Look is created, it can be shared
              (voluntarily) on the interactive window. Once the Boss Look has
              been created and shared on the interactive window, the participant
              will receivea voucher to collect the prize from the Participating
              Store. Participants will only redeem the Prize if the created Boss
              Look is shared on the interactive window. Entry to the Promotion
              is free of charge.
            </li>
            <li>
              The Participant is responsible for all costs which he or she
              incurs in connection with entry in the Promotion.
            </li>
            <span className={s.contentTitle}>ELIGIBILITY</span>
            <li>
              Participants under these Terms and conditions must be aged 18
              years or over.
            </li>
            <li>
              Each Participant can use the interactive window and create and
              sharea Boss Look as often as he/she wants but can redeem only one
              Prize.
            </li>
            <li>
              The Promotion is not open to employees of HUGO BOSS AG and/or
              affiliates of the HUGO BOSS Group and/or anyone else
              professionally connected with the Promotion, and/or their
              relatives and life partners.
            </li>
            <li>
              HUGO BOSS reserves the right to verify whethera Participant is
              eligible to take part in the Promotion. HUGO BOSS is especially
              entitled to aska Participant for their age and to confirm their
              identity with a valid ID.
            </li>
            <span className={s.contentTitle}>LIABILITY</span>
            <li>
              HUGO BOSS will not be liable if, through no fault of its own,
              emails, letters or prizes are lost, delayed, misdirected,
              corrupted or damaged in the mail and/or cannot be delivered for
              any reason provided that neither HUGO BOSS nor its vicarious
              agents have acted in a manner that was intentionally wrongful or
              grossly negligent. Emails will be deemed to be received on the
              date of transmission; communications sent by post will be deemed
              to be received 5 days after posting. Proof of submitting an entry
              is not proof of {`HUGO BOSS's`} receipt.
            </li>
            <li>
              HUGO BOSS accepts no responsibility for technical or other
              disturbances, including those resulting from the breakdown of its
              network, the Website, computer etc. which make entry to the
              Promotion, impossible.
            </li>
            <li>
              HUGO BOSS gives no warranties or representations about the quality
              or suitability of any prize. HUGO BOSS will only be responsible
              for damage which the Participant suffers in connection with
              entering the Promotion or accepting or using any prize as the
              result of gross negligence or intentional wrongdoing on its part
              or on the part of one of its vicarious agents or which the entrant
              suffers as the result ofa breach ofa material duty (i.e. a duty
              whose fulfillment is a prerequisite for the conduct of the
              Promotion and which the entrant was legitimately entitled to
              expect HUGO BOSS to comply with). This limit on liability does not
              apply to any damage resulting froma breach leading to the death,
              bodily injury and/or illness of the entrant or claims based on any
              applicable product liability law (Produkthaftungsgesetz) or any
              other liability which cannot be excluded by law.
            </li>
            <li>
              HUGO BOSS will not be liable for any failure to comply with its
              obligations in relation to the Promotion, and reserves the right
              to terminate the Promotion in whole or in part at any time if the
              Promotion (or any part of it) is not capable of running as
              planned, due in either case to any cause beyond the control of
              HUGO BOSS including, without limitation, a computer virus, force
              majeure technical failure, change of law, industrial action or
              unauthorised human intervention that could corrupt or affect the
              administration, security, fairness, integrity or proper conduct of
              the Promotion.
            </li>
            <span className={s.contentTitle}>INTELLECTUAL PROPERTY</span>
            <li>
              Participants acknowledge that all content on {`HUGO BOSS's`}
              {`' '`}
              interactive Window and any HUBO BOSS channel or media incl. HUGO
              BOSS website or opp is {`HUGO BOSS's`} exclusive property or is
              used with the express permission of the copyright and/or trademark
              owner. No content featured there may be reproduced, published or
              transmitted without our prior written consent. Copyright,
              trademark or other intellectual property right infringement may
              result in civil and/or criminal penalties.
            </li>
            <span className={s.contentTitle}>MISCELLANEOUS</span>
            <li>
              During the Promotion, the Terms and Conditions may be viewed at
              the cashdesk within the Participating Store and within [the
              interactive window and] the mobile web page before creating the
              Boss Look on the mobile phone for the Promotion.
            </li>
            <li>
              {`HUGO BOSS's`} decision on any aspect of the Promotion is final
              and binding and no correspondence will be entered into.
            </li>
            <li>
              1. English law will apply. If a Participant has his ordinary
              residency at the time of the entering the Promotion in another
              country within the European Union, any mandatory provisions of his
              or her local law will apply regardless of German law.
            </li>
            <li>
              If you have any queries about these Terms and Conditions or the
              Promotion, please contact HUGO BOSS at: HUGO BOSS AG (registered
              at the Local Court of Stuttgart, Germany, HRB36 0610) DieselstraBe
              12
              <span className={s.space}>
                72555 Metzingen Germany or by email at{' '}
                <strong>info@hugoboss.com</strong>
              </span>
            </li>
            <span className={s.contentTitle}>DATA PROTECTION</span>
            <li>
              No personal data will be collected from you as part of the
              Promotion. You can participate completely anonymously.
            </li>
          </ol>
        </div>
        {scrollTop && <span className={s.gradientBottom}></span>}
      </div>
    </div>
  );
};

export default Privacy;
