import { AccountInfo } from '@safecoin/web3.js';

import { AccountInfo as TokenAccountInfo } from '@safecoin/safe-token';

export interface TokenAccount {
  pubkey: string;
  account: AccountInfo<Buffer>;
  info: TokenAccountInfo;
}
