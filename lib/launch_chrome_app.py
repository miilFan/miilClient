#!/usr/bin/python
# -*- coding: utf-8 -*-

# Copyright (c) 2015 daiz

# Options:
#     s: シークレットモードで起動
#   run: 開発中のアプリを読み込む
# Usage: $ chrome a /path/to/app/

import os
import sys
import commands
import os.path

def main():
    args = sys.argv

    # chromeの実行ファイルのパス
    path_chrome = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
    
    # 起動オプション
    launch_option = ''
    # シークレットモードオプション
    opt_secret = '--incognito'
    # 開発中のアプリのロード（リロード）オプション
    opt_devapp = '--load-and-launch-app'
    # 開発アプリのパスを取得
    app_path = None
    if len(args) == 3:
        app_path = args[2]
    # 起動オプションを解析
    if len(args) >= 2:
        if 's' in args[1]:
            launch_option = '{} {}'.format(launch_option, opt_secret)
        if 'run' in args[1] and app_path != None:
            launch_option = '{} {}={}'.format(launch_option, opt_devapp, os.path.abspath(app_path))
    # 実行コマンドを生成
    command = '{}{}'.format(path_chrome, launch_option)
    commands.getoutput(command)

if __name__ == "__main__":
    main()
