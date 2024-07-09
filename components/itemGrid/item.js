import Link from 'next/link';
import Image from 'next/image';

import styles from './item.module.scss';

export default function Item({ title, slug, image, summary, creator, type }) {
  return (
    <article className={styles.item}>
        
      <header>
        <div className={styles.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
        <Link href={`/${type}/${slug}`}>View Details</Link>
        </div>
      </div>
      
    </article>
  );
}