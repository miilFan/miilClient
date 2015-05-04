#!/usr/bin/python
# -*- coding: utf-8 -*-

# (1) original/ のデータを destination/ にコピー
# (2) 実行時引数に与えられたtarget以外のコードを削除する

# Sample: python universe.py android

import os
import sys
import json
import subprocess
import os.path

# manifestファイル「universe.json」を読み込む
def openManifest():
    cwd = os.getcwd()
    file = "{}/{}".format(cwd, 'universe.json')
    f = open(file, 'r')
    return json.load(f)

# 引数を解釈し、manifestを照合して、targetを確定する
def getTarget(arg_target, manifest_targets):
    if arg_target in manifest_targets:
        return arg_target

# ビルド定数を取得する
def getConstJson(json):
    return json['consts']

# コピー元のディレクトリを取得する
def getCopyfrom(json):
    return json["original"]

# コピー先のディレクトリを取得する
def getCopyto(json):
    return json["destination"]

# コピーする
def copyto(dir_from, dir_to):
    if os.path.isdir(os.path.abspath(dir_to)) == False:
        subprocess.call(['mkdir', dir_to])
    subprocess.call(['cp', '-r', dir_from +'/', dir_to +'/'])
    return 1

# ファイルをtarget用に編集する
def editFiles(json, target, copyto):
    comment_head_style = json["comment_head"]
    files = json["files"]
    target_sign = comment_head_style + ' @'
    for file in files:
        file = "{}/{}".format(copyto, file)
        f = open(file, 'r')
        new_f = []
        make_comment_flag = False
        # 1行毎に読み込む作業を繰り返し、
        # targetと関係のないコードを除去する
        line = f.readline().decode("utf8")
        while line:
            if target_sign in line.rstrip():
                if line.strip().replace(target_sign, '') != target:
                    make_comment_flag = True
            if make_comment_flag == False and (comment_head_style in line.rstrip()) == False:
                # line = comment_head_style + ' ' + line
                new_f.append(line)
            # 次の一行を読み込む
            line = f.readline().decode("utf8")
            if comment_head_style in line.rstrip():
                make_comment_flag = False
        #print new_f
        f.close()
        # 編集結果をファイルに書き込む
        f = open(file, 'w')
        f.write(''.join(new_f).encode("utf8"))
        f.close()
    return 1

if __name__ == '__main__':
    args = sys.argv
    cwd = os.getcwd()
    jsonData = openManifest()
    if len(args) >= 2:
        target = getTarget(args[1], jsonData['target'])
        #constJsonData = getConstJson(jsonData)
        original = getCopyfrom(jsonData)
        destination = getCopyto(jsonData)

        task1 = copyto(original, destination)
        task2 = editFiles(jsonData, target, destination)
