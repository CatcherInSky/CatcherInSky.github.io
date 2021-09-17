# 博客同步语雀，GitHub Actions持续集成

## 语雀仓库配置
https://www.yuque.com/yuque/tygt6i/dlzc9g#SmzHJ

## 腾讯云函数配置

```
# -*- coding: utf8 -*-
import requests

def main_handler(event, context):
    r = requests.post("https://api.github.com/repos/CatcherInSky/CatcherInSky.github.io/dispatches",
    json = {"event_type": "yuque"},
    headers = { 'User-Agent': 'curl/7.52.1',
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'token ${your own token}'})
    if r.status_code == 204:
        return 'SUCCESS'
    else:
        return r.status_code
```
## github 配置
### 分支
source 分支存放hexo工程源码
master 分支存放打包后网页文件和github actions配置文件
### Session_Key
在仓库的Settings - Secrets - Repository secrets 里配置 SSH_PRIVATE_KEY 和 YUQUE_TOKEN 


## github actions配置 
与参考资料不同，因为.github文件夹属于隐藏文件夹，peaceiris无法将其发布。只能用hexo deploy命令发布，在deploy之前还需要配置SSH_PRIVATE_KEY


## yuque-hexo 配置
https://github.com/x-cold/yuque-hexo
package.json
```
  },
  "yuqueConfig": {
    "baseUrl": "https://www.yuque.com/api/v2",
    "login": "catcherinsky",
    "repo": "notes",
    "mdNameFormat": "title",
    "postPath": "source/_posts",
    "onlyPublished": false
  }
```

_config.yml
.github文件夹必须放在master分支才能生效，所以deploy的时候需要带上
```
deploy:
  type: git
  repository: git@github.com:CatcherInSky/CatcherInSky.github.io.git
  branch: master
  extend_dirs:
    - .github
```

## 图片403配置
使用injector添加meta信息
```
<meta name="referrer" content="same-origin/no-referrer">
```


© 2021 GitHub, Inc.