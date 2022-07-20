import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorPdaInitial } from "../target/types/anchor_pda_initial";
const { PublicKey } = anchor.web3;
const { SystemProgram } = anchor.web3;
describe("anchor-pda-initial", () => {
  // Configure the client to use the local cluster.
  //anchor.setProvider(anchor.AnchorProvider.env());
  //const provider = anchor.AnchorProvider.env();
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorPdaInitial as Program<AnchorPdaInitial>;
  let voterAccount, bump;
  let someOtherKeyPair = anchor.web3.Keypair.generate();

  /// Look up the voter account and bump before running the test.
  before(async () => {
    [voterAccount, bump] = await PublicKey.findProgramAddress([Buffer.from("voter")], program.programId);
  });

  it("Is initialized!", async () => {
    // Add your test here.
    console.log("VoterAccount = " + `${voterAccount}`);
    console.log("Bump = " + `${bump}`);
    await program.rpc.initialize( {
      accounts: {
        voter: voterAccount,
        authority: voterAccount,
        systemProgram: SystemProgram.programId,
      },
      signers : [someOtherKeyPair]
    });
    //console.log("Your transaction signature", tx);
  });
  it("Can vote!", async () => {
    // Add your test here.
    await program.rpc.voteLikeDislike(true, {
      accounts: {
        voter: voterAccount,
        authority: voterAccount,
        systemProgram: SystemProgram.programId,
      },
      signers : [someOtherKeyPair]
    });
  });
});
