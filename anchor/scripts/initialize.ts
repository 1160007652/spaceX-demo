import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

async function main() {
  // 配置 provider
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // 加载程序
  const programId = new anchor.web3.PublicKey("8MHC4NHANThLdyyaJFmbCo5UB1fNoWAKw2twVyPGjGxr");
  const idl = await Program.fetchIdl(programId, provider);
  
  if (!idl) {
    throw new Error("IDL not found");
  }
  
  const program = new Program(idl, provider);

  // 计算 PDA
  const [travelersListPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("travelers_list")],
    program.programId
  );

  console.log("程序 ID:", program.programId.toBase58());
  console.log("TravelersList PDA:", travelersListPDA.toBase58());
  console.log("Authority:", provider.wallet.publicKey.toBase58());

  try {
    // 检查账户是否已存在
    try {
      const account = await program.account.travelersList.fetch(travelersListPDA);
      console.log("\n✅ 程序已经初始化过了！");
      console.log("统计信息:");
      console.log("- 总旅行者:", account.totalTravelers.toString());
      console.log("- 总金额:", (account.totalAmount.toNumber() / 1_000_000_000).toFixed(4), "SOL");
      return;
    } catch (e) {
      // 账户不存在，继续初始化
      console.log("\n开始初始化程序...");
    }

    // 初始化
    const tx = await program.methods
      .initialize()
      .accounts({
        travelersList: travelersListPDA,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("\n✅ 程序初始化成功!");
    console.log("交易签名:", tx);
    console.log("🔗 查看: https://explorer.solana.com/tx/" + tx + "?cluster=devnet");
    
    // 验证初始化
    const account = await program.account.travelersList.fetch(travelersListPDA);
    console.log("\n初始化后的状态:");
    console.log("- Authority:", account.authority.toBase58());
    console.log("- 总旅行者:", account.totalTravelers.toString());
    console.log("- 总金额:", account.totalAmount.toString());
    
  } catch (error) {
    console.error("\n❌ 初始化失败:", error);
    throw error;
  }
}

main()
  .then(() => {
    console.log("\n✨ 完成!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
