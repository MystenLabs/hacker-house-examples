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
// gold / iron 
// gold / wood
const txb_fish = deepbook_client.createPool(GOLD, FISH, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);
const fish = await executeTransactionBlock(rawSigner, txb_fish);
console.log(fish);
const txb_wood = deepbook_client.createPool(GOLD, WOOD, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);
const wood = await executeTransactionBlock(rawSigner, txb_wood);
console.log(wood);
const txb_iron = deepbook_client.createPool(GOLD, IRON, DEFAULT_TICK_SIZE, DEFAULT_LOT_SIZE);
const iron = await executeTransactionBlock(rawSigner, txb_iron);
console.log(iron);

// We can use this to make a game 
// Create order examples

//