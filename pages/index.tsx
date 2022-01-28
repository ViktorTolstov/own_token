import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

import EnhancedTable from "../components/tableComponent"

type Data = {
  data: Array<DataElement>,
  error?: Error
}

type DataElement = {
  active: boolean,
  offerType: number,
  offerId: string,
  amountAlice: number,
  feeAlice: string,
  feeBob: string,
  smallestChunkSize: string,
  minimumSize: string,
  deadline: number,
  amountRemaining: string,
  offerer: string,
  payoutAddress: string,
  tokenAlice: string,
  capabilities: Array<any>,
  amountBob: Array<any>,
  minimumOrderAmountsAlice: Array<any>,
  minimumOrderAmountsBob: Array<any>,
  minimumOrderAddresses: Array<any>,
  minimumOrderTokens: Array<any>,
  tokenBob: Array<string>,
}

const Home = ({ offers }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.container}>
      <EnhancedTable contractData={offers}/>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
  const url = `http://localhost:3000/api/getAllOffers`
  let resp = await fetch(url, {
    method: "GET"
  });
  let data = await resp.json();

  if (data.error) {
    console.log(data.error)
    return { props: {} }
  }
  let offers : Data = data.data;
  return { props: { offers } }
}


export default Home
