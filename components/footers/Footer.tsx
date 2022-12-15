import styles from "../layout.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Built by <a href="https://twitter.com/ravivyas84"> Ravi Vyas</a>
      </p>
      <p>
        Powered by <a href="https://nextjs.org/">NextJS</a>
      </p>
      <p>
        Hosted on <a href="https://www.netlify.com">Netlify</a>.
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
