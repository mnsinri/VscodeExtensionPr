//add sample markdown page to webview
import * as vscode from 'vscode';
import { promisify } from "util";
import { readFile } from "fs";
import * as path from 'path';

const readFileAsync = promisify(readFile);

export function registerWebviewCommand(context: vscode.ExtensionContext) : vscode.Disposable {
	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	return vscode.commands.registerCommand("testExtension.webview", () => {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		if (currentPanel !== undefined) {
			currentPanel.reveal(column);
			vscode.window.showInformationMessage('currentPanel is not undefined');
		}
		else {
			currentPanel = vscode.window.createWebviewPanel(
				'testWebview',
				'Okimoti++',
				column || vscode.ViewColumn.One,
				{ enableScripts: true }
			);
			loadAndSetHtml(currentPanel, path.join(context.extensionPath, "media/okimoti.html"));
			currentPanel.onDidDispose(
				() => { currentPanel = undefined; },
				null,
			);
			vscode.window.showInformationMessage('currentPanel was undefined, so create new one');
		}

	});
}

async function loadAndSetHtml(panel: vscode.WebviewPanel, path: string) {
	panel.webview.html = await readFileAsync(path, "utf-8");
}
