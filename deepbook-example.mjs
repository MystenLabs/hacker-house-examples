import { DeepBookClient } from "@mysten/deepbook"
// import { Ed25519Keypair, TransactionBlock, RawSigner, JsonRpcProvider, Connection, testnetConnection } from '@mysten/sui.js';
import { SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

// const connection = new Connection({
//     fullnode: ''
//   });

// const provider = new JsonRpcProvider(testnetConnection);
// // Let's be bad developers and just hardcode our packages

// // sui client new-address ed25519  
// // Created new keypair for address with scheme ED25519: [0x255592ec5a35592aadf16f50aa9867ea92a5ea2866492d3fc6dd767596417dae]
// // Secret Recovery Phrase : [trophy conduct student type result lamp seven slam chest category tenant inherit]
const key_phrase="trophy conduct student type result lamp seven slam chest category tenant inherit";
export const keypair = Ed25519Keypair.deriveKeypair(key_phrase);

export async function executeTransactionBlock(
	myrawSigner,
	txb,
) {
    const result = await myrawSigner.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        options: {
          showEffects: true,
          showEvents: true,
          showInput: true,
        },
      });
	return result;
}

export const FLOAT_SCALING_FACTOR = 1_000_000_000n;
export const DEFAULT_TICK_SIZE = 1n * FLOAT_SCALING_FACTOR;
export const DEFAULT_LOT_SIZE = 1n;
export const GOLD = '0x702e0c66dfeaf9fc37d9b372f399163985dbd40cf7972bda7ba2caadfd256575::gold::GOLD';
export const FISH = '0x702e0c66dfeaf9fc37d9b372f399163985dbd40cf7972bda7ba2caadfd256575::fish::FISH';
export const IRON = '0x702e0c66dfeaf9fc37d9b372f399163985dbd40cf7972bda7ba2caadfd256575::iron::IRON';
export const WOOD = '0x702e0c66dfeaf9fc37d9b372f399163985dbd40cf7972bda7ba2caadfd256575::wood::WOOD';
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::gold::GOLD>
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::fish::FISH>
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::iron::IRON>
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::wood::WOOD>
const local_client = new SuiClient({ url: 'http://127.0.0.1:9000' })
const deepbook_client = new DeepBookClient(local_client);


// const test = await deepbook_client.getAllPools();
// console.log(test)
// Create pools for gold / fish

// pool_id: 0x538091bde22b3e38aae569ed1fb8621714c8193bc6819ea2e5ebb9ae700a42d2
// const txb_fish = deepbook_client.createPool(GOLD, FISH, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);

// const fish = await local_client.signAndExecuteTransactionBlock({transactionBlock: txb_fish,signer: keypair});
// console.log(fish);
// We can use this to make a game 
// Create order examples after initializing a custodian cap.
// const create_account_tx = deepbook_client.createAccount('0x255592ec5a35592aadf16f50aa9867ea92a5ea2866492d3fc6dd767596417dae');
// const res = await local_client.signAndExecuteTransactionBlock({transactionBlock: create_account_tx, signer: keypair});

// const res = await executeTransactionBlock(rawSigner, create_account_tx);
// console.log(res);
// Account_cap: 0x3b221136175c956ad551c3f9d874e87f65f1221c47077a01c0b6eef7f910580b
// 0x702e0c66dfeaf9fc37d9b372f399163985dbd40cf7972bda7ba2caadfd256575
const fish_pool_id = '0x43db437be5186cf75bbbf1fdc78019aa884aad5dcd8822c2195a79f35abc261d';
// const test = await deepbook_client.getPoolInfo(fish_pool_id);
// console.log(test);

deepbook_client.setAccountCap('0xcaba104a504d92efad33fb9f7db27cbf8bf765363224c899b8c802e713667f10');
// // Deposit some base asset into a pool 
const fish_coin_id = '0xa08d69d30b64b2ad65ea914a92e94a9808a6f0217c9d75e587ff6dcee18b0a9d';

// const fish_deposit_txn = await deepbook_client.deposit(fish_pool_id, fish_coin_id, BigInt(1000000000));
// const fish_deposit = await local_client.signAndExecuteTransactionBlock({transactionBlock: fish_deposit_txn, signer: keypair});

// // const fish_deposit = await executeTransactionBlock(rawSigner, fish_deposit_txn);

const gold_coin_id = '0xfa9c8a2c0528e5be2255529304e6b42c4f448556c3b9efc7ec221bedf94b1f83';
// const gold_deposit_txn = await deepbook_client.deposit(fish_pool_id, gold_coin_id, BigInt(100000000000));
// const gold_deposit = await local_client.signAndExecuteTransactionBlock({transactionBlock: gold_deposit_txn, signer: keypair});

// // // const gold_deposit = await executeTransactionBlock(rawSigner, gold_deposit_txn);

// // // console.log(fish_deposit);
// // // Deposit quote asset into this pool
// const limit_order_txn_ask = await deepbook_client.placeLimitOrder(fish_pool_id, 2n* DEFAULT_TICK_SIZE, 1n, "ask");
// const limit_ask = await local_client.signAndExecuteTransactionBlock({transactionBlock: limit_order_txn_ask, signer: keypair});

// // const limit_order_ask = await executeTransactionBlock(rawSigner, limit_order_txn_ask);

// const limit_order_txn_bid = await deepbook_client.placeLimitOrder(fish_pool_id, 1n* DEFAULT_TICK_SIZE, 1n, "bid");
// const limit_bid = await local_client.signAndExecuteTransactionBlock({transactionBlock: limit_order_txn_bid, signer: keypair});

// const limit_order_bid = await executeTransactionBlock(rawSigner, limit_order_txn_bid);

// // console.log(limit_order_ask);
// // console.log(limit_order_bid);

const resp = await local_client.getAllCoins({
  owner: '0x255592ec5a35592aadf16f50aa9867ea92a5ea2866492d3fc6dd767596417dae',
  // coinType: '0x86c94199a8f53097b5cdcadf2559454499f23774795c1768917705ef4b004b56::gold::GOLD',
});
// console.log(resp);

const base = resp.data[2].coinObjectId;
// console.log(baseCoin);
const place_market_order = await deepbook_client.placeMarketOrder(fish_pool_id, BigInt(1), "ask", base, undefined, undefined,'0x255592ec5a35592aadf16f50aa9867ea92a5ea2866492d3fc6dd767596417dae');
const limit_bid = await local_client.signAndExecuteTransactionBlock({transactionBlock: place_market_order, signer: keypair});

console.log(limit_bid)

// const get_asks = await deepbook_client.getLevel2BookStatus(fish_pool_id, BigInt(0), 10n *DEFAULT_TICK_SIZE, 'ask');
// console.log(get_asks);

// const get_bids = await deepbook_client.getLevel2BookStatus(fish_pool_id, BigInt(0), 10n *DEFAULT_TICK_SIZE, 'bid');
// console.log(get_bids);