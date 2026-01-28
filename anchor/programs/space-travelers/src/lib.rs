use anchor_lang::prelude::*;

declare_id!("8MHC4NHANThLdyyaJFmbCo5UB1fNoWAKw2twVyPGjGxr");

#[program]
pub mod space_travelers {
    use super::*;

    // 初始化全局状态
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let travelers_list = &mut ctx.accounts.travelers_list;
        travelers_list.authority = ctx.accounts.authority.key();
        travelers_list.total_travelers = 0;
        travelers_list.total_amount = 0;
        Ok(())
    }

    // 购买船票并记录旅行者
    pub fn buy_ticket(
        ctx: Context<BuyTicket>,
        name: String,
        amount: u64,
    ) -> Result<()> {
        require!(name.len() <= 32, ErrorCode::NameTooLong);
        require!(amount >= 10_000_000, ErrorCode::InsufficientPayment); // 最少 0.01 SOL

        let traveler = &mut ctx.accounts.traveler;
        let travelers_list = &mut ctx.accounts.travelers_list;

        // 转账到接收地址
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.payer.key(),
            &ctx.accounts.recipient.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.payer.to_account_info(),
                ctx.accounts.recipient.to_account_info(),
            ],
        )?;

        // 记录旅行者信息
        traveler.wallet = ctx.accounts.payer.key();
        traveler.name = name;
        traveler.amount = amount;
        traveler.timestamp = Clock::get()?.unix_timestamp;
        traveler.bump = ctx.bumps.traveler;

        // 更新全局统计
        travelers_list.total_travelers += 1;
        travelers_list.total_amount += amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + TravelersList::INIT_SPACE,
        seeds = [b"travelers_list"],
        bump
    )]
    pub travelers_list: Account<'info, TravelersList>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyTicket<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + Traveler::INIT_SPACE,
        seeds = [b"traveler", payer.key().as_ref()],
        bump
    )]
    pub traveler: Account<'info, Traveler>,
    
    #[account(
        mut,
        seeds = [b"travelers_list"],
        bump
    )]
    pub travelers_list: Account<'info, TravelersList>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    /// CHECK: 接收支付的地址
    #[account(mut)]
    pub recipient: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Traveler {
    pub wallet: Pubkey,      // 32 bytes
    #[max_len(32)]
    pub name: String,        // 4 + 32 bytes
    pub amount: u64,         // 8 bytes
    pub timestamp: i64,      // 8 bytes
    pub bump: u8,            // 1 byte
}

#[account]
#[derive(InitSpace)]
pub struct TravelersList {
    pub authority: Pubkey,      // 32 bytes
    pub total_travelers: u64,   // 8 bytes
    pub total_amount: u64,      // 8 bytes
}

#[error_code]
pub enum ErrorCode {
    #[msg("名称太长，最多32个字符")]
    NameTooLong,
    #[msg("支付金额不足，最少需要 0.01 SOL")]
    InsufficientPayment,
}
