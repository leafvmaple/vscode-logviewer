import * as vscode from 'vscode';

export class LogContentProvider implements vscode.TextDocumentContentProvider {

  private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

  get onDidChange(): vscode.Event<vscode.Uri> {
    return this._onDidChange.event;
  }

  provideTextDocumentContent(uri: vscode.Uri): string {
    const filePath = uri.path;

    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf-8');

    const replacedContent = content.replace(/_LUA_DUMP_ \[@(.*):\s*(\d+),\s*(\d+),\s*(\d+)\]/g, (match: any, path: any, num1: any, num2: any, num3: any) => {
      console.log(path);
      return `<change>`;
    });

    return replacedContent;
  }
}