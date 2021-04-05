---
title: Git入门
categories:
- Git
tags:
- Git

date: 2017/12/16 23:47:41
---
简单记录Git用法以做记录

<!--more-->

## 关于版本控制

版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。

### 本地版本控制系统

文件夹备份法。复制整个项目目录来保存不同的版本，或许还会改名加上备份时间以示区别。

![local.png-19.8kB][1]

其中最流行的一种叫做 RCS，现今许多计算机系统上都还看得到它的踪影。 甚至在流行的 Mac OS X 系统上安装了开发者工具包之后，也可以使用 rcs 命令。 它的工作原理是在硬盘上保存补丁集（补丁是指文件修订前后的变化）；通过应用所有的补丁，可以重新计算出各个版本的文件内容。

### 集中化的版本控制系统（Centralized Version Control Systems）

使用一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。

![centralized.png-22.3kB][2]

这类系统，常见的有 CVS、Subversion 以及 Perforce 等，优点是有完善的权限系统，以及统一的服务端，适合商业软件的开发。缺点是如果出现中央服务器的单点故障，会有所有人无法工作甚至丢失文件的风险。

### 分布式版本控制系统(Distributed Version Control System)

客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来。 这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。

![distributed.png-26kB][3]

在这类系统中，像 Git、Mercurial、Bazaar、BitKeeper 以及 Darcs 等，它们相当于把集中式版本控制系统的服务端和客户端都交给参与开发的客户端来保管，只有需要不同开发者合并代码时，才需要一个中转站来完成。

#### 集成管理者工作流

Git 允许多个远程仓库存在，使得这样一种工作流成为可能：每个开发者拥有自己仓库的写权限和其他所有人仓库的读权限。 这种情形下通常会有个代表`‘官方’'项目的权威的仓库。 要为这个项目做贡献，你需要从该项目克隆出一个自己的公开仓库，然后将自己的修改推送上去。 接着你可以请求官方仓库的维护者拉取更新合并到主项目。 维护者可以将你的仓库作为远程仓库添加进来，在本地测试你的变更，将其合并入他们的分支并推送回官方仓库。 这一流程的工作方式如下所示

项目维护者推送到主仓库。

贡献者克隆此仓库，做出修改。

贡献者将数据推送到自己的公开仓库。

贡献者给维护者发送邮件，请求拉取自己的更新。

维护者在自己本地的仓库中，将贡献者的仓库加为远程仓库并合并修改。

维护者将合并后的修改推送到主仓库。

### 什么是Git


Git是目前世界上最先进的分布式版本控制系统。最初由Linus Torvalds编写，用作Linux内核代码的管理。

**直接记录快照，而非差异比较**

 Git 对待数据更像是一个 快照流。这是 Git 与几乎所有其它版本控制系统的重要区别。

**近乎所有操作都是本地执行**

**Git 保证完整性**

Git 中所有数据在存储前都计算校验和，然后以校验和来引用。 这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。 这个功能建构在 Git 底层，是构成 Git 哲学不可或缺的部分。 若你在传送过程中丢失信息或损坏文件，Git 就能发现。
Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。 这是一个由 40 个十六进制字符（0-9 和 a-f）组成字符串，基于 Git 中文件的内容或目录结构计算出来。 SHA-1 哈希看起来是这样：
>24b9da6552252987aa493b52f8696cd6d3b00373

Git 中使用这种哈希值的情况很多，你将经常看到这种哈希值。 实际上，Git 数据库中保存的信息都是以文件内容的哈希值来索引，而不是文件名。

**Git 一般只添加数据**

所有Git 操作，几乎只往 Git 数据库中增加数据。以删除数据为例，删除一个文件只会是这次提交的版本中没有这个文件的快照，不会删除前几个版本中的这个文件。

**三种状态**

已提交（committed）、已修改（modified）和已暂存（staged）

### 什么是github

github是一个用git做版本控制系统的项目托管平台。

**github上常见用语**

- Version Control（版本控制）: 任何一个能够让你了解文件的历史，以及该文件的发展进程的系统。
- Git：一个版本控制程序，通过对变更进行注释，以创建一个易于遍历的系统历史。
  Commit（提交）：在指定时间点对系统差异进行的注释 “快照”。
- Local（本地）：指任意时刻工作时正在使用的电脑。
- Remote（远程）： 指某个联网的位置。
- Repository (仓库，简称 repo)：配置了Git超级权限的特定文件夹，包含了你的项目或系统相关的所有文件。
- Github：获取本地提交历史记录，并进行远程存储，以便你可以从任何计算机访问这些记录。
- Pushing（推送）：取得本地Git提交（以及相关的所有工作），然后将其上传到在线Github。
- Pulling（拉取）：从在线的Github上获取最新的提交记录，然后合并到本地电脑上。
- Master (branch)：主分支，提交历史 “树”的 “树干”，包含所有已审核的内容/代码。
- Feature branch（功能分支/特性分支）：一个基于主分支的独立的位置，在再次并入到主分支之前，你可以在这里安全地写工作中的新任务。
- Pull Request（发布请求）：一个 Github 工具，允许用户轻松地查看某功能分支的更改 （the difference或 “diff”），同时允许用户在该分支合并到主分支之前对其进行讨论和调整。
- Merging（合并）：该操作指获取功能分支的提交，加入到主分支提交历史的顶部。
- Checking out（切换）：该操作指从一个分支切换到另一个分支。


## 一、基本操作
#### 1.设置用户信息
>$ git config --global user.name "用户名"

>$ git config --global user.email "用户邮箱"

当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：

再次强调，如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置。

很多 GUI 工具都会在第一次运行时帮助你配置这些信息。

#### 检查配置信息
如果想要检查你的配置，可以使用 git config --list 命令来列出所有 Git 当时能找到的配置。

>$ git config --list
user.name=John Doe
user.email=johndoe@example.com
color.status=auto
color.branch=auto
color.interactive=auto
color.diff=auto
...

你可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如：/etc/gitconfig 与 ~/.gitconfig）。 这种情况下，Git 会使用它找到的每一个变量的最后一个配置。

你可以通过输入 git config <key>： 来检查 Git 的某一项配置

>$ git config user.name
John Doe

#### 2.建库

>$ git init

#### 3.提交
>$ git add 文件名 文件名 文件名   --->从工作区提交文件到暂存区

>$ git commit -m "更改说明"       --->从暂存区提交修改到版本库

#### 4.查看
>$ git status   --->查看仓库状态

![lifecycle.png-13.4kB][4]
>$ git diff 文件名   --->查看修改内容

>$ git log   --->查看提交日志

查看日志具体信息[https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2]
>$ git reflog   --->查看命令日志

#### 5.回退
>$ git reset --hard HEAD^   --->回到上次修改

>$ git reset --hard commit_id   --->回到任意版本(提交码取前面7位就够了)
#### 6.撤销
>$ git checkout --文件名   --->把版本库中的文件替换当前文件，撤销所有未add修改

>$ git reset HEAD 文件名   --->把上一次add撤销

#### 7.删除
>$ git rm 文件名   --->从版本库中删除文件

>$ git commit -m "更改说明"   --->删除也是需要提交的修改

>$ git checkout --文件名   --->把版本库中的文件替换当前文件，误删恢复

#### 8.移动

>git mv file_from file_to

## 二、标签
先切换到需要打标签的分支上
>$ git tag 标签名字

查看所有标签
>$ git tag

给历史提交打标签
>$ git tag 标签名字 commit_id

显示标签分支的信息
>$ git show 标签名字

还可以通过-s用私钥签名一个标签：
>$ git tag -s v0.2 -m "signed version 0.2 released" fec145a

如果标签打错了，也可以删除
>$ git tag -d 标签名字

因为创建的标签都只存储在本地，不会自动推送到远程。
如果要推送某个标签到远程，使用命令
>$ git push origin 标签名

一次性推送全部尚未推送到远程的本地标签
>$ git push origin --tags
## 三、远程仓库

#### 1. 创建SSH Key
>$ ssh-keygen -t rsa -C "用户邮箱"

可在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

#### 2. 绑定GitHub
登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。

#### 3. 绑定库
在GitHub上创建一个新库之后，本地用git上传内容
>$ git remote add origin git@github.com:GitHub用户名/库名.git

添加上游
>$git remote add upstream https://github.com/GitHub用户名/库名.git

查看远程库的信息
>$ git remote -v

#### 4.推送本地库内容
把本地库的内容推送到远程，用git push命令把当前分支master推送到远程。
>$ git push -u origin master

由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样。

#### 5.克隆远程库内容
>$ git clone git@github.com:GitHub用户名/库名.git (文件名)

#### 6.抓取远程库内容
>$ git fetch

这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 git fetch 命令会将数据拉取到你的本地仓库 - 它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

## 四、分支管理

master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点
![master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点][5]


当我们创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上：
![][6]
首先，我们创建dev分支，然后切换到dev分支：
>$  git checkout -b dev

命令加上-b参数表示创建并切换，相当于以下两条命令：

>$  git branch dev

>$  git checkout dev

查看所有分支(当前分支前面会标一个*号)
>$ git branch

切换回master分支：
>$  git checkout master

把dev分支的工作成果合并到当前分支上：
>$  git merge -m "合并说明" dev

删除dev分支
>$  git branch -d dev

查看分支合并图
>$ git log --graph

以图形化的方式展现提交的日志
>$gitk 

暂时分支（当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。）
>$ git stash   --->创建暂时分支保存当前工作区内容

>$ git stash apply   --->恢复暂时分支 

>$ git stash drop   --->删除暂时分支

>$ git stash pop   --->恢复并删除暂时分支 

>$ git stash list   --->查看所有暂时分支



## 参考资料

http://blog.jobbole.com/111187/
https://zhuanlan.zhihu.com/p/45724857




[1]: http://static.zybuluo.com/CatcherInSky/8sgqkyhk2ynwlhmpp8x2dvrj/local.png
[2]: http://static.zybuluo.com/CatcherInSky/278sftvmncalon23zgmx813w/centralized.png
[3]: http://static.zybuluo.com/CatcherInSky/qn0p8pmbwndxp2jy98czrl7f/distributed.png
[4]: http://static.zybuluo.com/CatcherInSky/yk6jsujk957i1d6jo4iol1kk/lifecycle.png
[5]: http://www.liaoxuefeng.com/files/attachments/0013849087937492135fbf4bbd24dfcbc18349a8a59d36d000/0
[6]:http://www.liaoxuefeng.com/files/attachments/001384908811773187a597e2d844eefb11f5cf5d56135ca000/0

