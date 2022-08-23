import { YogdaanContext } from '../../utils/YogdaanContext';
import YogdaanContract from '../../truffle/abis/Yogdaan.json';
import { NET_ID } from '../../utils/helpers';
import Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Forum from './forum';

export default function Body() {
  const router = useRouter();
  const { state, setState } = useContext(YogdaanContext);

  const connectToWallet = async (_accountType: number) => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      try {
        const isUnlocked = await window.ethereum._metamask.isUnlocked();
        if (!isUnlocked) throw new Error('Wallet Locked!');
        const web3 = new Web3(window.ethereum);
        const netId = await web3.eth.net.getId();
        if (netId !== NET_ID)
          alert('Wrong network, please switch to the Binance testnet!');
        else {
          const account = (await web3.eth.getAccounts())[0];
          const YogdaanContractAddress = await YogdaanContract.networks[netId]
            .address;
          const Yogdaan = new web3.eth.Contract(
            YogdaanContract.abi as AbiItem[],
            YogdaanContractAddress
          );

          setState({
            account: account,
            walletConnected: true,
            web3: web3,
            Contract: Yogdaan,
            accountType: _accountType,
          });

          console.log(state.account);

          var accountType = await state.YogdaanContract.methods
            .accountType(state.account)
            .call({
              from: state.account,
            });

          console.log('accountType:', accountType);

          if (accountType == 1 && _accountType == 1) {
            router.push('/user');
          }

          if (accountType == 2 && _accountType == 2) {
            router.push('/serviceprovider');
          }

          if (accountType == 0) {
            var addToPlatform = await state.YogdaanContract.methods
              .login(_accountType)
              .send({
                from: state.account,
              });

            console.log('New Account Type:', addToPlatform);

            var accountType = await state.YogdaanContract.methods
              .accountType(`${state.account}`)
              .call({
                from: state.account,
              });
          }
          if (accountType == 1 && _accountType == 1) {
            router.push('/user');
          } else if (accountType == 2 && _accountType == 2) {
            router.push('/serviceprovider');
          } else {
            alert('Something went wrong!!');
          }
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert('web3 not detected');
    }
  };

  return (
    <div className=' flex flex-row h-full '>
      <div className=' w-1/3 m-auto flex flex-col justify-center'>
        <div className=' font-extrabold text-7xl py-2 text-center mb-44'>
          Yogdaan
        </div>
        <div>
          <h1 className=' text-center font-semibold'>
            Choose your profile type
          </h1>
          <div className='flex flex-row justify-center items-center '>
            <button
              onClick={() => connectToWallet(1)}
              className='bg-blue m-2 hover:scale-105 cursor-pointer hover:brightness-125 rounded-xl lg:px-10 lg:py-2 text-white text-body text-center'>
              SHG
            </button>
            <button
              onClick={() => connectToWallet(2)}
              className='bg-blue m-2 hover:scale-105 cursor-pointer hover:brightness-125 rounded-xl lg:px-10 lg:py-2 text-white text-body text-center'>
              Bank
            </button>
          </div>
        </div>
      </div>
      <div className=' w-2/3 flex flex-col justify-center items-center '>
        <h1 className=' text-3xl font-extrabold py-2'>Discussion forum</h1>
        <div className=' h-[500px] my-2 overflow-y-scroll snap snap-y snap-mandatory flex flex-row flex-wrap hide-scroll-bar justify-center'>
          <Forum />
          <Forum />
          <Forum />
          <Forum />
        </div>
      </div>
    </div>
  );
}
