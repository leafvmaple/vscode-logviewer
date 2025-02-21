// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LogContentProvider } from './log-preview';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "log-previewer" is now active!');

	const logContentProvider = new LogContentProvider();

	const disposableProvider = vscode.workspace.registerTextDocumentContentProvider(
		'log-preview',
		logContentProvider
	);

	const disposableOpenEvent = vscode.workspace.onDidOpenTextDocument(async (document) => {
		const fileName = document.fileName;
		if (!fileName.endsWith('.log')) {
		  return;
		}
	
		console.log(`Open .log File: ${fileName}`);
	
		const previewUri = vscode.Uri.parse(`log-preview:${fileName}`);
	
		const editor = await vscode.window.showTextDocument(previewUri, {
		  preview: false,
		});
	
		vscode.window.showInformationMessage(`change ${fileName} content to preview`);
	  });
	context.subscriptions.push(disposableProvider, disposableOpenEvent);
}

// This method is called when your extension is deactivated
export function deactivate() {}