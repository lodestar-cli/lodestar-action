# lodestar-action

A github action for executing the lodestar cli

## Description

The [Lodestar](https://github.com/lodestar-cli/lodestar) cli is a way to manage your kuberenetes applications through various environments until they land in production.  This action is a way to easily pull in the cli and execute it in your GitHub Workflows.

## How to Use

The lodestar-action installs the lodestar cli and makes 100% of its features available to your workflow.  This action can be used to setup Lodestar as well as run it directly.  Some examples:

### Install Only (if you plan on using it in scripts)

    - uses: lodestar-cli/lodestar-action@v0.3.0
        with:
          command: install


### App Push

    - uses: lodestar-cli/lodestar-action@v0.3.0
        with:
          git-user: ${{ secrets.GIT_USER }}
          git-token: ${{ secrets.GIT_TOKEN }}
          command: app push
          config-path: test/test-config.yaml
          yaml-keys: tag=1234567
          dest-environment: dev

### App Promote

    - uses: lodestar-cli/lodestar-action@v0.3.0
        with:
          git-user: ${{ secrets.GIT_USER }}
          git-token: ${{ secrets.GIT_TOKEN }}
          command: app promote
          config-path: test/test-config.yaml
          src-environment: dev
          dest-environment: qa
