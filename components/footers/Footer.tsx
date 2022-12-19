import styles from "../layout.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Built by <a rel="me" href="https://mastodon.social/@ravi">Ravi Vyas</a>
      </p>
      <p>
        Powered by <a href="https://nextjs.org/">NextJS</a>
      </p>
      <p>
        Hosted on <a href="https://vercel.com/">Vercel</a>.
      </p>
      <p>
        Design/Project inspired by
        <a href="https://github.com/philhawksworth/medium-export">
           Phil Hawksworth
        </a>
      </p>
    </div>
  );
}
