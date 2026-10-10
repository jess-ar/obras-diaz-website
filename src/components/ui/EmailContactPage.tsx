import { COMPANY_EMAIL, COMPANY_MAILTO } from '@/config/constants';
import { CopyEmailButton } from './CopyEmailButton';
import './emailContactPage.css';

type EmailContactPageProps = {
  label: string;
  title: string;
  description: string;
  subject: string;
  image: { src: string; alt: string; width: number; height: number; caption: string };
  imageSide: 'left' | 'right';
};

export function EmailContactPage({
  label,
  title,
  description,
  subject,
  image,
  imageSide,
}: EmailContactPageProps) {
  return (
    <section aria-labelledby="email-page-title" className={`email-page email-page--${imageSide}`}>
      <div className="email-page-container">
        <div className="email-page-heading">
          <p>{label}</p>
          <span aria-hidden>Obras Díaz 2011 SL</span>
        </div>
        <div className="email-page-layout">
          <div className="email-page-content">
            <h1 id="email-page-title" className="email-page-title font-display">
              {title}
            </h1>
            <p className="email-page-description">{description}</p>
            <div className="email-page-actions">
              <p className="email-page-caption">Escríbenos</p>
              <a
                href={`${COMPANY_MAILTO}?subject=${encodeURIComponent(subject)}`}
                className="email-page-address"
              >
                {COMPANY_EMAIL}
              </a>
              <CopyEmailButton className="email-page-copy" />
            </div>
          </div>
          <figure className="email-page-figure">
            <div className="email-page-image">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                decoding="async"
              />
            </div>
            <figcaption>{image.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
