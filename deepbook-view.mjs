// Minimal example showing inconsistent behavior for the get_level2_book_status_ask_side call.
import { BcsReader } from "@mysten/bcs";
import {JsonRpcProvider, TransactionBlock, Connection} from "@mysten/sui.js";

// import { inspect } from "util";

const DEEPBOOK_PACKAGE_ID = "0xdee9";
const DEEPBOOK_MODULE_CLOB = "clob_v2";

// Pretty print an object and show everything in it (i.e. infinite depth).
// export function dump(object) {
//   return inspect(object, {
//     showHidden: false,
//     depth: null,
//     colors: true,
//   });
// }

function bcsDecodeVectorU64(bytes) {
  let reader = new BcsReader(new Uint8Array(bytes));
  let vecLength = reader.readULEB();
  let elements = [];
  for (let i = 0; i < vecLength; i++) {
    elements.push(reader.read64());
  }
  return elements;
}

function leftPad(s, length) {
  while (s.length < length) {
    s = " " + s;
  }
  return s;
}

async function getL2Asks(maxPrice) {
  const poolId =
    "0x538091bde22b3e38aae569ed1fb8621714c8193bc6819ea2e5ebb9ae700a42d2";
  const baseCoinTypeTag = "0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::gold::GOLD";
  const quoteCoinTypeTag =
    "0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::fish::FISH";

  let provider = new JsonRpcProvider(
    new Connection({
      fullnode: "https://fullnode.testnet.sui.io:443/",
      websocket: "wss://fullnode.testnet.sui.io:443/",
    })
  );

  const tx = new TransactionBlock();
  tx.setGasBudget(1e9);

  tx.moveCall({
    target: `${DEEPBOOK_PACKAGE_ID}::${DEEPBOOK_MODULE_CLOB}::get_level2_book_status_ask_side`,
    arguments: [
      tx.object(poolId),
      tx.pure(0),
      tx.pure(maxPrice),
      tx.object("0x6"),
    ],
    typeArguments: [baseCoinTypeTag, quoteCoinTypeTag],
  });

  let got = await provider.devInspectTransactionBlock({
    sender:
      "0xf821d3483fc7725ebafaa5a3d12373d49901bdfce1484f219daa7066a30df77d",
    transactionBlock: tx,
  });
//   console.log(dump(got));

  if (got.effects.status.status == "success") {
    let prices = bcsDecodeVectorU64(got.results[0].returnValues[0][0]);
    let quantities = bcsDecodeVectorU64(got.results[0].returnValues[1][0]);
    console.log(`Asks with maxPrice=${maxPrice}:`);
    for (let i = 0; i < prices.length; i++) {
      let p = Number(prices[i]) / 1e6;
      let q = Number(quantities[i]) / 1e9;
      console.log(`  ${leftPad(String(q), 10)} @ ${p}`);
    }
  }
  return got;
}

async function getL2Bids(minPrice) {
    const poolId =
    "0x538091bde22b3e38aae569ed1fb8621714c8193bc6819ea2e5ebb9ae700a42d2";
  const baseCoinTypeTag = "0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::gold::GOLD";
  const quoteCoinTypeTag =
    "0xf398b9ecb31aed96c345538fb59ca5a1a2c247c5e60087411ead6c637129f1c4::fish::FISH";

  let provider = new JsonRpcProvider(
    new Connection({
      fullnode: "https://fullnode.testnet.sui.io:443/",
      websocket: "wss://fullnode.testnet.sui.io:443/",
    })
  );

  const tx = new TransactionBlock();
  tx.setGasBudget(1e9);

  tx.moveCall({
    target: `${DEEPBOOK_PACKAGE_ID}::${DEEPBOOK_MODULE_CLOB}::get_level2_book_status_bid_side`,
    arguments: [
      tx.object(poolId),
      tx.pure(minPrice),
      tx.pure(9999999999),
      tx.object("0x6"),
    ],
    typeArguments: [baseCoinTypeTag, quoteCoinTypeTag],
  });

  let got = await provider.devInspectTransactionBlock({
    sender:
      "0xf821d3483fc7725ebafaa5a3d12373d49901bdfce1484f219daa7066a30df77d",
    transactionBlock: tx,
  });
//   console.log(dump(got));

  if (got.effects.status.status == "success") {
    let prices = bcsDecodeVectorU64(got.results[0].returnValues[0][0]);
    let quantities = bcsDecodeVectorU64(got.results[0].returnValues[1][0]);
    console.log(`Bids with minPrice=${minPrice}:`);
    for (let i = 0; i < prices.length; i++) {
      let p = Number(prices[i]) / 1e6;
      let q = Number(quantities[i]) / 1e9;
      console.log(`  ${leftPad(String(q), 10)} @ ${p}`);
    }
  }
  return got;
}


async function main() {
  console.log("Running...");

  const U64_MAX = 18446744073709551615n;
  await getL2Bids(0); // Errors out. Expected.
  await getL2Asks(U64_MAX); // Errors out. Expected.

  // await getL2Asks(BigInt(0.63e6)); // Returns asks with price <= 0.63. Expected.
  // await getL2Asks(BigInt(0.61e6)); // Returns asks with price <= 0.61. Expected.
  // await getL2Asks(BigInt(0.25e6)); // Should return asks with price <= 0.25 but returns error instead!
//   await getL2Asks(BigInt(0.08e6)); // Should return asks with price <= 0.08, but returns some asks with price > 0.6!
  // await getL2Bids(BigInt(100e6)); // Should return asks with price <= 0.08, but returns some asks with price > 0.6!
}

main();
