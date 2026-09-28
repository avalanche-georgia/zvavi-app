---
description: On-demand code review, independent of any specific feature workflow. Reviews uncommitted changes if there are any, otherwise the current branch against its base.
---

Determine the review scope, in this order:

1. If arguments were given ($ARGUMENTS), treat that as the scope — a branch
   name, a commit range (e.g. `abc123..HEAD`), or the word `staged` for
   staged changes only.
2. Else, run `git status --porcelain`. If it shows any changes, review the
   full working tree diff (`git diff HEAD`) — staged and unstaged together.
3. Else, review the current branch's commits against its base: run
   `git merge-base HEAD master` and `git merge-base HEAD staging`, diff
   against whichever merge-base is more recent (closer to HEAD) — that's
   the actual fork point for this branch.

Report which scope you picked and why, in one line, before the review.

Then run the code-reviewer subagent (.claude/agents/code-reviewer.md)
against exactly that diff. Print its findings in full — do not summarize,
shorten, or filter them yourself.
