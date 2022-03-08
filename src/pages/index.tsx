import { FC } from 'react'
import Head from 'next/head';
import Splash from './login';

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>Indications</title>
      </Head>
      <Splash />
    </div>
  );
};

export default Home;
 