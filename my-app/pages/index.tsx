import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'
const Home = () => {
  return (
    <div>
      <Head>
        <title>First Next</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <span>Hello</span>
      <Banner></Banner>
    </div>
  )
}

export default Home
