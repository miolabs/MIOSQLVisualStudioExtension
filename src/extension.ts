import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('PostgreSQL Canvas extension is activated');
  
  const disposable = vscode.commands.registerCommand('pgCanvas.connect', () => {
    vscode.window.showInformationMessage('PostgreSQL Canvas: Connect command executed');
  });
  
  context.subscriptions.push(disposable);
}

export function deactivate() {}
