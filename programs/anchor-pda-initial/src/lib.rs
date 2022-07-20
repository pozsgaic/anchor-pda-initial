use anchor_lang::prelude::*;

declare_id!("5oF1saqbg7beo7eAJ3oMWMJzjzGDw1LuTgUEYt7qwSnP");

// declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod anchor_pda_initial {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.voter.bump = *ctx.bumps.get("voter").unwrap();
        //ctx.accounts.authority = *ctx.accounts.authority.key;
        Ok(())
    }

    pub fn vote_like_dislike(ctx: Context<Vote>, like: bool) -> Result<()> {
        if like {
          ctx.accounts.voter.likes += 1;
        } else {
          ctx.accounts.voter.dislikes += 1;
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(init, seeds = [b"voter"], bump, payer = authority, space = 17)]
  pub voter: Account<'info, Voter>,

  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
  #[account(mut, seeds = [b"voter"], bump = voter.bump)]
  pub voter: Account<'info, Voter>,

  #[account(mut)]
  pub authority: Signer<'info>,
}

#[account]
#[derive(Default)]
pub struct Voter {
  likes: u64,
  dislikes: u64,
  bump: u8,
}

