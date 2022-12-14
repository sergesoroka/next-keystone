import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { DocumentRenderer } from "@keystone-6/document-renderer";

interface Fake {
  id: string;
  theme: string;
  subtheme: string;
  discription: [];
  source: string;
  date: string;
  verdict: string;
}
// @ts-ignore
export default function Home({ fakes }: Fake[]) {
  // @ts-ignore
  const rendered = fakes.map((fake) => {
    return (
      <div key={fake.id}>
        <h2>{fake.theme}</h2>
        <h3>{fake.subtheme}</h3>
        <DocumentRenderer document={fake.discription.document} />
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Keystone + Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{rendered}</main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Fakes {
        fakes {
          id
          theme
          subtheme
          discription {
            document
          }
          source
          date
          verdict
        }
      }
    `,
  });

  return {
    props: {
      fakes: data.fakes,
    },
  };
}
