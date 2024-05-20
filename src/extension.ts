// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "workspace2env" is now active!');

	const currentEditor = vscode.window.activeTextEditor;

	let workspace: string | undefined;

	// if vscode.workspace.workspaceFile is not undefine
	if (vscode.workspace.workspaceFile) {
		workspace = vscode.workspace.workspaceFile.fsPath;
	}
	else if (vscode.workspace.workspaceFolders) {
		workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;
	}

	if (workspace) {
		// get ENV variable name from settings
		const envName = vscode.workspace.getConfiguration().get("workspace2env.envVarName");

		// set the ENV variable
		const terminalOs = process.platform;
		let terminalOsKey: string | undefined;

		switch (terminalOs) {
			case "win32":
				terminalOsKey = 'terminal.integrated.env.windows';
				break;
			case "darwin":
				terminalOsKey = 'terminal.integrated.env.osx';
				break;
			case "linux":
				terminalOsKey = 'terminal.integrated.env.linux';
				break;
			default:
				vscode.window.showErrorMessage("Workspace to env: Unsupported OS");
				return;
		}

		const terminalConfig = vscode.workspace.getConfiguration().get<Record<string, string>>(terminalOsKey);

		if (terminalConfig) {
			terminalConfig[envName as string] = workspace;
			vscode.workspace.getConfiguration().update(terminalOsKey, terminalConfig, vscode.ConfigurationTarget.Workspace);
		} else {
			vscode.window.showErrorMessage("Workspace to env: Terminal configuration not found");
		}

		// get curently opened folder with vscode
		console.log(`${envName} ENV variable is set to ${workspace}`);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
