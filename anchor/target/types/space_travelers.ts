/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/space_travelers.json`.
 */
export type SpaceTravelers = {
  "address": "8MHC4NHANThLdyyaJFmbCo5UB1fNoWAKw2twVyPGjGxr",
  "metadata": {
    "name": "spaceTravelers",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "SpaceX Space Travelers Program"
  },
  "instructions": [
    {
      "name": "buyTicket",
      "discriminator": [
        11,
        24,
        17,
        193,
        168,
        116,
        164,
        169
      ],
      "accounts": [
        {
          "name": "traveler",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  118,
                  101,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "travelersList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  118,
                  101,
                  108,
                  101,
                  114,
                  115,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "recipient",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "travelersList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  118,
                  101,
                  108,
                  101,
                  114,
                  115,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "traveler",
      "discriminator": [
        183,
        222,
        179,
        31,
        28,
        27,
        210,
        132
      ]
    },
    {
      "name": "travelersList",
      "discriminator": [
        165,
        77,
        43,
        94,
        78,
        206,
        201,
        190
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooLong",
      "msg": "名称太长，最多32个字符"
    },
    {
      "code": 6001,
      "name": "insufficientPayment",
      "msg": "支付金额不足，最少需要 0.01 SOL"
    }
  ],
  "types": [
    {
      "name": "traveler",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "travelersList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "totalTravelers",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
