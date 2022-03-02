import { Account } from 'secretjs'

export type CHAINIDTYPE = string | Error;
export type HEIGHTTYPE = number | Error;
export type ACCOUNTTYPE = Account | undefined;
export type ENVTYPES = string | undefined;

// fee of type
export type CustomFeeTypes = {
  upload: {
      amount: {
          amount: string;
          denom: string;
      }[];
      gas: string;
  };
  init: {
      amount: {
          amount: string;
          denom: string;
      }[];
      gas: string;
  };
  exec: {
      amount: {
          amount: string;
          denom: string;
      }[];
      gas: string;
  };
  send: {
    amount: {
      amount: string;
      denom: string;
    }[];
    gas: string;
  };
}

// init msg
export type INITMSGTYPE = {
  name: string;
  symbol: string;
  entropy: string;
  config: {
      public_owner: boolean;
  };
}