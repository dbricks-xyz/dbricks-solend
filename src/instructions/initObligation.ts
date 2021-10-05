import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import { struct, u8 } from "buffer-layout";
import { LendingInstruction } from "./instruction";

interface Data {
  instruction: number;
}

const DataLayout = struct<Data>([u8("instruction")]);

export const initObligationInstruction = (
  obligation: PublicKey,
  lendingMarket: PublicKey,
  obligationOwner: PublicKey,
  lendingProgram: PublicKey
): TransactionInstruction => {
  const data = Buffer.alloc(DataLayout.span);
  DataLayout.encode({ instruction: LendingInstruction.InitObligation }, data);

  const keys = [
    { pubkey: obligation, isSigner: false, isWritable: true },
    { pubkey: lendingMarket, isSigner: false, isWritable: false },
    { pubkey: obligationOwner, isSigner: true, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: lendingProgram,
    data,
  });
};
