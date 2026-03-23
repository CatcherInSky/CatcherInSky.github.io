# GitHub Pages Incident Report: `/pinyin-ime` returns 404

## Summary

- Site root `https://catcherinsky.github.io/` returns `200`.
- Subpath `https://catcherinsky.github.io/pinyin-ime/` and `https://catcherinsky.github.io/pinyin-ime/index.html` return `404`.
- Build logs, uploaded artifact, and deployed artifact payload all confirm `pinyin-ime` files are present.
- This indicates a GitHub Pages external serving/sync issue instead of a Hexo build issue.

## Repository and Workflow

- Repository: `CatcherInSky/CatcherInSky.github.io`
- Workflow: `.github/workflows/pinyin-ime.yml`
- Trigger type: `repository_dispatch` (`pinyin-ime`)
- Pages source: `GitHub Actions` (verified in repository settings)

## Key Evidence (IDs and Links)

- Workflow run ID: `23450625612`
- Job ID: `68226446715`
- Deployment ID: `4151816713`
- Artifact ID used by deploy-pages: `6064395848`
- Pages URL: `https://catcherinsky.github.io/`
- Deploy job URL: `https://github.com/CatcherInSky/CatcherInSky.github.io/actions/runs/23450625612/job/68226446715`

## Build-Side Evidence

The build step generated `pinyin-ime` files successfully (from workflow logs):

- `Generated: pinyin-ime/index.html`
- `Generated: pinyin-ime/.nojekyll`
- Additional generated assets under `pinyin-ime/assets/*`

The pre-upload verification step also shows:

- `public/pinyin-ime` directory exists
- `public/pinyin-ime/index.html` exists
- `public/pinyin-ime/.nojekyll` exists

## Deploy-Side Evidence

From job raw logs:

- `Artifact github-pages-pinyin-ime-23450625612-1 ... Artifact ID 6064395848`
- `Fetching artifact metadata for "github-pages-pinyin-ime-23450625612-1" in this workflow run`
- `Creating Pages deployment with payload:`
  - `"artifact_id": 6064395848`
  - `"pages_build_version": "b9e79c5cf7ea2c907b3ee7dfb77e4d412e008ab9"`

From deployments API:

- Deployment `4151816713` status chain: `waiting -> queued -> in_progress -> success`
- `environment_url`: `https://catcherinsky.github.io/`
- `log_url` points to the same run/job above

## Artifact Integrity Evidence

Downloaded and inspected deployed artifact tar (`artifact_id=6064395848`):

- `./pinyin-ime/index.html`
- `./pinyin-ime/.nojekyll`
- `./pinyin-ime/react/index.html`
- `./pinyin-ime/vue/index.html`
- `./pinyin-ime/web_component/index.html`

This confirms the deployed artifact includes `/pinyin-ime`.

## Runtime Evidence (Public Endpoint)

`curl -I` results:

- `https://catcherinsky.github.io/` -> `HTTP/2 200`
- `https://catcherinsky.github.io/pinyin-ime/` -> `HTTP/2 404`
- `https://catcherinsky.github.io/pinyin-ime/index.html` -> `HTTP/2 404`

This reproduces the issue from outside GitHub Actions environment.

## Hexo Scope Clarification

Local static serving of generated output works:

- `http://localhost:4173/pinyin-ime` is accessible.

So Hexo generation and static file output are correct. The issue is after successful deploy, at public serving layer.

## Commands Used (for reproducibility)

```bash
# Check deployment statuses
gh api repos/CatcherInSky/CatcherInSky.github.io/deployments/4151816713/statuses \
  --jq '.[] | {state,created_at,updated_at,environment_url,log_url,target_url,description}'

# Download and inspect deployed artifact
RUN_ID=23450625612
ART_ID=6064395848
mkdir -p /tmp/pages-check && cd /tmp/pages-check
gh api repos/CatcherInSky/CatcherInSky.github.io/actions/artifacts/$ART_ID/zip > artifact.zip
unzip -o artifact.zip -d out
tar -tf out/artifact.tar | head -n 80

# Public endpoint checks
curl -I "https://catcherinsky.github.io/pinyin-ime/index.html?t=$(date +%s)"
curl -I "https://catcherinsky.github.io/pinyin-ime/?t=$(date +%s)"
curl -I "https://catcherinsky.github.io/?t=$(date +%s)"
```

## Official Documentation References

- Troubleshooting Pages 404:
  - <https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites>
- Configuring publishing source:
  - <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
- GitHub Status:
  - <https://www.githubstatus.com/>

## Suggested Support Ticket Text

We are using GitHub Pages with `Source = GitHub Actions` for `CatcherInSky/CatcherInSky.github.io`.

Deployment `4151816713` is `success`, and `deploy-pages` payload references `artifact_id=6064395848`.
We downloaded and inspected the exact artifact and confirmed `./pinyin-ime/index.html` is present.
However, the public URL `https://catcherinsky.github.io/pinyin-ime/index.html` consistently returns `404`, while root `https://catcherinsky.github.io/` returns `200`.

Please help investigate a potential Pages serving/sync inconsistency for this successful deployment.
