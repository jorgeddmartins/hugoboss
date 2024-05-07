import s from './ModalHelp.module.scss';

const Helpmodal = () => {
  return (
    <section className={s.helpModalContent}>
      <h2 className={s.title}>How to create your own boss look</h2>
      <ol>
        <li>Accept the terms and conditions.</li>
        <li>Select the gender you want to style.</li>
        <li>Choose the outfits from the latest Be Your Own Boss Collection.</li>
        <li>
          Once happy submit the look to our Regent Street gallery (if you want
          to)
        </li>
        <li>
          if not then you can download your creation onto your phone to share on
          your socials using #BEYOUROWNBOSS.
        </li>
        <li>As a thank you there’s a gift you can use in store today!</li>
        <li>Happy Shopping!</li>
      </ol>
    </section>
  );
};

export default Helpmodal;
