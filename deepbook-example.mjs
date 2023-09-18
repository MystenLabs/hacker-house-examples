import { DeepBookClient } from "@mysten/deepbook"
import { Ed25519Keypair, TransactionBlock, RawSigner, JsonRpcProvider, Connection, testnetConnection } from '@mysten/sui.js';
// const connection = new Connection({
//     fullnode: ''
//   });

const provider = new JsonRpcProvider(testnetConnection);
// Let's be bad developers and just hardcode our packages

// sui client new-address ed25519  
// Created new keypair for address with scheme ED25519: [0x255592ec5a35592aadf16f50aa9867ea92a5ea2866492d3fc6dd767596417dae]
// Secret Recovery Phrase : [trophy conduct student type result lamp seven slam chest category tenant inherit]
const key_phrase="trophy conduct student type result lamp seven slam chest category tenant inherit";
export const keypair = Ed25519Keypair.deriveKeypair(key_phrase);
const rawSigner = new RawSigner(keypair, provider);

export async function executeTransactionBlock(
	rawSigner,
	txb,
) {
    const result = await rawSigner.signAndExecuteTransactionBlock({
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
export const GOLD = '0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::gold::GOLD';
export const FISH = '0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::fish::FISH';
export const IRON = '0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::iron::IRON';
export const WOOD = '0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::wood::WOOD';
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::gold::GOLD>
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::fish::FISH>
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::iron::IRON>
// coin::Coin<0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::wood::WOOD>
const deepbook_client = new DeepBookClient();

// Create pools for gold / fish

// pool_id: 0x538091bde22b3e38aae569ed1fb8621714c8193bc6819ea2e5ebb9ae700a42d2
// const txb_fish = deepbook_client.createPool(GOLD, FISH, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);
// const fish = await executeTransactionBlock(rawSigner, txb_fish);

// 0x972258a8a854ba6a91f6b81e8446d2af9440eadb6fc586ab087a9f5c65930810
// const txb_wood = deepbook_client.createPool(GOLD, WOOD, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);
// const wood = await executeTransactionBlock(rawSigner, txb_wood);

// 0x2fa996d4df92d2abca01f4abfff5b9b62d61602b3f19f4fadb7a6dd951429355
// const txb_iron = deepbook_client.createPool(GOLD, IRON, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);
// const iron = await executeTransactionBlock(rawSigner, txb_iron);

// We can use this to make a game 
// Create order examples after initializing a custodian cap.
// const create_account_tx = deepbook_client.createAccount('0x255592ec5a35592aadf16f50aa9867ea92a5ea2866492d3fc6dd767596417dae');
// const res = await executeTransactionBlock(rawSigner, create_account_tx);
// console.log(res);
// Account_cap: 0x3b221136175c956ad551c3f9d874e87f65f1221c47077a01c0b6eef7f910580b

const fish_pool_id = '0x538091bde22b3e38aae569ed1fb8621714c8193bc6819ea2e5ebb9ae700a42d2';
deepbook_client.setAccountCap('0x3b221136175c956ad551c3f9d874e87f65f1221c47077a01c0b6eef7f910580b');
// Deposit some base asset into a pool 
const fish_coin_id = '0x81fead7a51c3c29d76a54316210a7823fb72366ab55b624024bdec7f2872c3ec';

// const fish_deposit_txn = await deepbook_client.deposit(fish_pool_id, fish_coin_id, BigInt(1000000000));
// const fish_deposit = await executeTransactionBlock(rawSigner, fish_deposit_txn);

const gold_coin_id = '0x6f91c237611244d82040e282adb16b1c0f4ae0780ebd985338bc9dac4f1e2d13';
// const gold_deposit_txn = await deepbook_client.deposit(fish_pool_id, gold_coin_id, BigInt(100000000000));
// const gold_deposit = await executeTransactionBlock(rawSigner, gold_deposit_txn);

// console.log(fish_deposit);
// Deposit quote asset into this pool
const limit_order_txn_ask = await deepbook_client.placeLimitOrder(fish_pool_id, 2n* DEFAULT_TICK_SIZE, 1n, "ask")
const limit_order_ask = await executeTransactionBlock(rawSigner, limit_order_txn_ask);

const limit_order_txn_bid = await deepbook_client.placeLimitOrder(fish_pool_id, 1n* DEFAULT_TICK_SIZE, 1n, "bid")
const limit_order_bid = await executeTransactionBlock(rawSigner, limit_order_txn_bid);

// console.log(limit_order_ask);
// console.log(limit_order_bid);

const get_asks = await deepbook_client.getLevel2BookStatus(fish_pool_id, BigInt(0), 10n *DEFAULT_TICK_SIZE, 'ask');
console.log(get_asks);

const get_bids = await deepbook_client.getLevel2BookStatus(fish_pool_id, BigInt(0), 10n *DEFAULT_TICK_SIZE, 'bid');
console.log(get_bids);