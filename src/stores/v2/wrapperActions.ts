import { contractWrapper, externalContractWrapper } from '@helpers/contractWrapper';
import type { Signer, BigNumber, ContractTransaction } from 'ethers';
import { BigNumber as BN } from 'ethers';
import setTokenAllowance from '@helpers/setTokenAllowance';
import {
  setPendingWallet,
  setPendingTx,
  setSuccessTx,
  setPendingApproval,
  setError,
} from '@helpers/setToast';

export async function getData(_signer: Signer) {
  try {
    const { instance: gluxInstance } = await externalContractWrapper('glux', _signer);
    const supply = await gluxInstance.totalSupply();
    const exchangeRate = await gluxInstance.exchangeRate();
    const symbol = await gluxInstance.symbol();
    return { supply, exchangeRate, symbol };
  } catch (error) {
    setError(error.data ? await error.data.message : error.message, error);
    console.error(`[wrapperActions/getSupply]: ${error}`);
    throw Error(error);
  }
}

export async function getAllowance([_ownerAddress, _signer]: [string, Signer]) {
  try {
    const { instance: luxInstance } = await contractWrapper('LuxToken', _signer, 'ethereum');
    const { address: gluxAddress } = await externalContractWrapper('glux', _signer);
    const allowance = await luxInstance.allowance(_ownerAddress, gluxAddress);
    return { allowance };
  } catch (error) {
    setError(error.data ? await error.data.message : error.message, error);
    console.error(`[wrapperActions/getAllowance]: ${error}`);
    throw Error(error);
  }
}

export async function setAllowance(_signer: Signer) {
  try {
    const { address: luxAddress } = await await contractWrapper('LuxToken', _signer, 'ethereum');
    const { address: gluxAddress } = await externalContractWrapper('glux', _signer);
    setPendingApproval();
    // @ts-ignore
    const approval = (await setTokenAllowance(luxAddress, gluxAddress)) as ContractTransaction;
    setPendingTx();
    return approval;
  } catch (error) {
    setError(error.data ? await error.data.message : error.message, error);
    console.error(`[wrapperActions/setAllowance]: ${error}`);
    throw Error(error);
  }
}

export async function stake(
  _amount: BigNumber,
  _allowance: BigNumber,
  _useInfinite: boolean,
  _signer: Signer,
) {
  const { instance: gluxInstance, address: gluxAddress } = await externalContractWrapper('glux', _signer);
  try {
    const maxAllowance = BN.from(2).pow(256).sub(1);
    if (_allowance.lt(_amount)) {
      const { instance: luxInstance } = await contractWrapper('LuxToken', _signer, 'ethereum');
      setPendingApproval();
      const sendApe = (await luxInstance.approve(
        gluxAddress,
        _useInfinite ? maxAllowance : _amount,
      )) as ContractTransaction;
      await sendApe.wait();
    }
    setPendingWallet();
    const tx = (await gluxInstance.stake(_amount)) as ContractTransaction;
    setPendingTx();
    return await tx.wait().then((transaction) => {
      setSuccessTx(transaction.transactionHash);
      return true;
    });
  } catch (error) {
    setError(error.data ? await error.data.message : error.message, error);
    console.error(`[wrapperActions/stake]: ${error}`);
    throw Error(error);
  }
}

export async function unstake(_amount: BigNumber, _signer: Signer) {
  const { instance: gluxInstance } = await externalContractWrapper('glux', _signer);
  try {
    setPendingWallet();
    const tx = (await gluxInstance.unstake(_amount)) as ContractTransaction;
    setPendingTx();
    return await tx.wait().then((transaction) => {
      setSuccessTx(transaction.transactionHash);
      return true;
    });
  } catch (error) {
    setError(error.data ? await error.data.message : error.message, error);
    console.error(`[wrapperActions/unstake]: ${error}`);
    throw Error(error);
  }
}
