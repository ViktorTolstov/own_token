import type { NextApiRequest, NextApiResponse } from 'next'

require('dotenv').config();

const ProjectId = process.env.PROJECT_ID;
const Endpoint = process.env.ENDPOINT_HTTPS;
const ContractAddress = process.env.CONTRACT_ADDRESS;

const Address = `${Endpoint}${ProjectId}`;

const Web3 = require('web3');
let web3 = new Web3(Address);
const fs = require('fs');

type Data = {
  data: Array<DataElement>,
  error?: Error
}

type DataElement = {
  active: boolean,
  offerType: string,
  offerId: string,
  amountAlice: string,
  feeAlice: string,
  feeBob: string,
  smallestChunkSize: string,
  minimumSize: string,
  deadline: string,
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
  tokenBob: Array<any>,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const contractJson = fs.readFileSync('./public/MarsBaseExchange.json');
  const abi = JSON.parse(contractJson);

  const contractInstance = new web3.eth.Contract(abi.abi, ContractAddress);

  await contractInstance.methods.getAllOffers().call().then((result: Array<any>) => {
    let dataArray : Array<DataElement> = [];
    result.forEach(element => {
      dataArray.push({
        active: element.active,
        offerType: element.offerType,
        offerId: element.offerId,
        amountAlice: element.amountAlice,
        feeAlice: element.feeAlice,
        feeBob: element.feeBob,
        smallestChunkSize: element.smallestChunkSize,
        minimumSize: element.minimumSize,
        deadline: element.deadline,
        amountRemaining: element.amountRemaining,
        offerer: element.offerer,
        payoutAddress: element.payoutAddress,
        tokenAlice: element.tokenAlice,
        capabilities: element.capabilities,
        amountBob: element.amountBob,
        minimumOrderAmountsAlice: element.minimumOrderAmountsAlice,
        minimumOrderAmountsBob: element.minimumOrderAmountsBob,
        minimumOrderAddresses: element.minimumOrderAddresses,
        minimumOrderTokens: element.minimumOrderTokens,
        tokenBob: element.tokenBob,
      })
    });
    res.status(200).json({ data: dataArray });
  }).catch(function (err: Error) {
    console.log('err...\n' + err);
    res.status(500).json({ data: [], error: err });
  });
}
