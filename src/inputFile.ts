import * as vscode from 'vscode';
import { basename } from 'path';

const classNum: number = 12;
const taskNum: number = 5;
const difficulty: string[] = [
	"kihon",
	"hatten"
];

const options: vscode.QuickPickOptions = {
	canPickMany: false,
	ignoreFocusOut: true,
	placeHolder: "どの課題を提出しますか？",
	title: "プロブラミング入門採点システム"
};

//["kihon1-1", "kihon1-2", ... , "hatten12-4", "hatten12-5"]
const kadai: string[] = difficulty.map(t =>
	Array.from({ length: classNum }, (_, i) =>
		Array.from({ length: taskNum }, (_, j) => `${t}${i+1}-${j+1}`)
	).flat()
).flat();

export function judgeCode(context: vscode.ExtensionContext): vscode.Disposable {
	return vscode.commands.registerCommand("testExtension.judge", () => {
		//ファイルパス
		let path: string = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri.path : "";
		print("path:\n" + path);

		//ファイル名
		let filename: string = basename(path);
		print("filename:\n" + filename);

		//ソースコード
		let code: string = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.getText() : "";
		print("code:\n" + code);

		vscode.window.showQuickPick(kadai, options)
			.then(result => result ? print(result) : print("undefind"));
	});
}

function print(text: string) {
	vscode.window.showInformationMessage(text);
}