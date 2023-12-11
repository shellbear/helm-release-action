# helm-release-action

Build and release Helm packages on s3 repositories using Github Actions.

Instructions on how to set up a S3 bucket as a helm chart repository: https://andrewlock.net/how-to-create-a-helm-chart-repository-using-amazon-s3/.

## Changelog

- 0.2: Add an option for Relative URLs [Thanks to this PR](https://github.com/shellbear/helm-release-action/pull/4) [@aztechian](https://github.com/aztechian)
- 0.1: Initial release

## Examples

Using [aws-actions/configure-aws-credentials@v1](https://github.com/aws-actions/configure-aws-credentials) action to configure S3 access:

```yaml
name: Release
on: [push]
jobs:
  build:
    name: Chart release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      - name: Helm release
        uses: shellbear/helm-release-action@v0.2
        with:
          repo: s3://s3-bucket-example/
          chart: ./deployment/helm
```

## Parameters

### Inputs

#### Required

- `repo`: The S3 Helm repository bucket URL.

#### Optional

- `version`: Override Helm chart version.
- `chart`: Helm chart path. (default: `./`)
- `forceRelease`: If set to `false` and the chart already exists, exit normally and do not trigger an error. (default: `true`).
- `packageExtraArgs`: Helm [package](https://helm.sh/docs/helm/helm_package/) command extra arguments.
- `relativeUrls`: Helm-s3 push option for creating URLs that are relative to the Index location. By default, URLs are the full path using `s3://` protocol. If you intend to serve your Helm repository via http(s), you should enable this option. (default: `false`)

## Build with

- [helm-s3](https://github.com/hypnoglow/helm-s3.git)
- [helm-pack](https://github.com/thynquest/helm-pack.git): used instead of helm `package` command to suport `--value` flag.

## Author

- [shellbear](http://github.com/shellbear/)
