'use strict'

import * as vscode from 'vscode'

const extensionName = 'rspec-debug'

const getConfig = () => vscode.workspace.getConfiguration().get(extensionName) as any

export function defaultLaunchOptions (): { program: String, useBundler: boolean } {
  const { bundlerPath, useBundler } = getConfig()
  return { program: bundlerPath, useBundler }
}
