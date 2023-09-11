// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module test_coins_dee9::iron {
    use std::option;
    use sui::coin;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// The type identifier of coin. The coin will have a type
    /// tag of kind: `Coin<package_object::mycoin::MYCOIN>`
    /// Make sure that the name of the type matches the module's name.
    struct IRON has drop {}

    /// Module initializer is called once on module publish. A treasury
    /// cap is sent to the publisher, who then controls minting and burning
    fun init(witness: IRON, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(witness, 6, b"Iron", b"", b"", option::none(), ctx);
        transfer::public_freeze_object(metadata);
        coin::mint_and_transfer(&mut treasury, 1000000000000, tx_context::sender(ctx), ctx);
        transfer::public_transfer(treasury, tx_context::sender(ctx))
    }
}