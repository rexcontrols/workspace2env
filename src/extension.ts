// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let isListenerAdded = false;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "workspace2env" is now active!');

	if (!isListenerAdded) {
		context.subscriptions.push(vscode.window.onDidOpenTerminal(terminal => {
			activateTerminal(terminal);
		}));
		isListenerAdded = true;
	}

	activateTerminal(vscode.window.activeTerminal as vscode.Terminal);
}

function activateTerminal(terminal: vscode.Terminal) {
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

		if (terminal) {
			terminal.sendText(` export ${envName}=${workspace}`);
		}

		// get curently opened folder with vscode
		console.log(`${envName} ENV variable is set to ${workspace}`);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
