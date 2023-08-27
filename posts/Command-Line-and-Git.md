---
title: "Useful Git Commands"
date: "September 19, 2022"
excerpt: "Here are some useful git commands"
cover_image: ""
category: "UsefulTips"
author: "WayneCarl"
author_image: "/images/wayneswildworldImages/waterfall.jpg"
---

## Command Line

> **Ls**
> Lists the items/ available folders
>
> **Ls -l**
> Shows if it's a file or folder (starts with”-” = file “dr”= folder)
>
> **Cd**
> Puts you in the folder you type
>
> **Cp**
> Copies file & folder
>
> **Mv**
> Can move a file to a different
>
> **Rename**
> The command I'll use is this: "mv OtherStuff/ OtherThings"
>
> **Mk dir**
> Makes new folder
>
> **Deleting stuff**
> Rm (file) rm -rf (folders/directories)
>
> **Touch makes a new document**
>
> **Pwd**
> Prints the directories you’re in

## Git Hub

> ### Git- Committing
>
> - First get to the folder then git init
> - Then git add . (once you do this you can use commit -am “ “)
> - Git commit -m “Name/ Description of commit”
> - git remote add origin (Link that you copy from the repository)
> - git branch -m main
> - git push -u origin main
>
> ### Checking things
>
> - git status
> - git fetch{Allows you to pull other _**remote**_ branches that were created by other people}
> - git tree{Should learn about}
>
> ### Undoing things
>
> _Remove leaked file_ **git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ./.env" --prune-empty --tag-name-filter cat -- --all** > _use git log to view commits_
>
> - **Git Revert**
>   - {Undoes anything done in the specific commit
>   - (Must type :wq if screen pops up)}
> - **Git Reset**
>   - {Removes commits and goes back to a previous
>   - (does not change working directory \*git reset a43dg7 --hard will change)
>
> ### Pull/Branch
>
> - **Git branch**
>   - {Shows the branches you have}
> - **Git checkout -b name**
>   - {Makes new branch}
> - **git checkout -**
>   - Goes to last branch you were in
> - **Git checkout name**
>   - {Switches between branches}
> - **Git diff name**
>   - {Shows differences between the two branches}
> - **Git merge name**
>   - {Merges the changes onto current branch}
> - **Git branch -d name**
>   - {Deletes branch \*if it's been merged (-D works if branch has not been merged)}
> - **Git log --graph --oneline --decorate --all**
>   - Shows all branches
> - **git diff branch1..branch2**
>   - Shows differences between branches (add --name-only to only check files)
> - **git merge main --no-commit --no-ff -X theirs**
>   - This will essentially make the current branch EXACTLY _(will delete extra files on working branch)_ like main without actually merging anything

# Git hub lecture

[video link](https://www.youtube.com/watch?v=Uszj_k0DGsg)

> - **git diff** allows you to see the current changes in a file
> - git patch (**git add -p FileName**) lets you see the changes in the file and it will ask you if you want to add them to the staging area
> - **Git log** logs past commits
> - **Git log --graph --oneline --decorate** logs past commits nicely
> - **git merge --abort** aborts the merge (Good if you have a merge conflict you fucked up)
> - **git rebase BranchName** Like a merge but rewrites commit history
> - **git stash** Stores locally
>   - git stash save _Message_ saves a message to the stash
>   - git stash pop
>   - git stash list _lists all stashes_
>   - git stash apply 1 _pops the stash at index 1_

# FireShip Git

[video link](https://www.youtube.com/watch?v=8lGpZkjnkt4)

> - git pull is really a fetch and a merge
> - **git fork**
>   - _You say git push origin BranchName_
> - **Fixing shit**
>   - _git reset --hard HEAD~1_ This will remove the last commit
>   - git reset 5632fdtftdf635ddfstayfjh4743 _Doesen't remove the other commits_
>   - **git revert 4563fdtfdeyw5dew -m "this is a revert"**
> - git commit --amend -m(or --no-edit _to add staged files to past commit_)
> - **git squash** _Bundle commits_
>   1. git rebase master --interactive
>   2. switch pick to squash on the commits you wan to bundle into the commit with pick
> -
> -
