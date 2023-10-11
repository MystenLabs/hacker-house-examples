import { Ed25519Keypair, TransactionBlock, RawSigner, JsonRpcProvider, Connection } from '@mysten/sui.js';

const local_client = new SuiClient({ url: 'http://127.0.0.1:9000' })
// Let's be bad developers and just hardcode our packages

// sui client new-address ed25519  
//Created new keypair for address with scheme ED25519: [0xd02c0676a9cd9d70e554b5c3ee8bd17cfe93792f6aaa327b02b096ac3359a210]
//Secret Recovery Phrase : [window industry add wait punch output reject smart nuclear evoke blush rail]
const key_phrase="window industry add wait punch output reject smart nuclear evoke blush rail";
const keypair = Ed25519Keypair.deriveKeypair(key_phrase);
const rawSigner = new RawSigner(keypair, provider);

async function executeTransactionBlock(
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

const MAINNET_ROULETTE_PACKAGE_ID =
  "0xdcb0957ffbeffb4e4b934cc7df1b9b84fc40775de8bd7e0b188a725962496ea9";
const MAINNET_SUI_COIN_TYPE = "0x2::sui::SUI";

const CURRENT_GAME_ID = "0xe841a878f073ee4c221fe0a95367ad056a4824cf77dbd166e640da24eac06a88";
const MAINNET_HOUSE_DATA =
  "0xd6b9c261ab53d636760a104e4ab5f46c2a3e9cda58bd392488fc4efa6e43728c";

const RED_BET = 0;
const BLACK_BET = 1;

function getTxbToBetRedNTimes(n) {
    let txb = new TransactionBlock();

    for (let i = 0; i < n; i++) {
        const coin = txb.splitCoins(txb.gas, [txb.pure(1000000000)]);
        txb.moveCall({
            target: `${MAINNET_ROULETTE_PACKAGE_ID}::drand_based_roulette::place_bet`,
            typeArguments: [MAINNET_SUI_COIN_TYPE],
            arguments: [
                coin,
              txb.pure(RED_BET, `u8`),
              txb.pure([],`vector<u64>`,),
              txb.object(CURRENT_GAME_ID),
              txb.object(MAINNET_HOUSE_DATA),
            ],
          });
        }      
        return txb;
    }

    function getTxbToBetBlackNTimes(n) {
        let txb = new TransactionBlock();
    
        for (let i = 0; i < n; i++) {
            const coin = txb.splitCoins(txb.gas, [txb.pure(1000000000)]);
            txb.moveCall({
                target: `${MAINNET_ROULETTE_PACKAGE_ID}::drand_based_roulette::place_bet`,
                typeArguments: [MAINNET_SUI_COIN_TYPE],
                arguments: [
                    coin,
                  txb.pure(BLACK_BET, `u8`),
                  txb.pure([],`vector<u64>`,),
                  txb.object(CURRENT_GAME_ID),
                  txb.object(MAINNET_HOUSE_DATA),
                ],
              });
            }      
            return txb;
        }

for (let j = 0; j < 1; j++) { 

    let one_red_txb = getTxbToBetRedNTimes(25);
    // console.log(one_red_txb);
    let res = await executeTransactionBlock(rawSigner, one_red_txb);
    console.log(res);

    let one_black_txb = getTxbToBetBlackNTimes(25);
    let res_black = await executeTransactionBlock(rawSigner, one_black_txb);
    console.log(res_black);
}

// let one_black_txb = getTxbToBetBlackNTimes(500);
// console.log(one_black_txb);

// let res_black = await executeTransactionBlock(rawSigner, one_black_txb);
// console.log(res_black);
