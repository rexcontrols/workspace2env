# Workspace to env

Set an environment variable in the VSCode terminal to the currently opened workspace or folder, enabling its use in Git commands and user scripts.

## Features

This extension sets an environment variable to the currently opened workspace. If no workspace is open, it sets the variable to the currently opened folder.

## Usage
Example `.gitconfig`
```yaml
[core]
    editor = code -r --wait $FILE $WORKSPACE
[diff]
    tool = vscode
[difftool "vscode"]
    cmd = "code -r --wait --diff $LOCAL $REMOTE $WORKSPACE"
```

## Extension Settings
`workspace2env.envVarName`: "The name of the environment variable to set. Default: `WORKSPACE`"

## Known Issues

## Release Notes

### 0.0.1

Initial release.