const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const nodeSsh = require('node-ssh');

const ssh = new nodeSsh();
const srcPath = path.resolve(__dirname, '../build');
const remote = '120.79.153.1';
const remotePath = '/root/work/album-server';
const username = process.argv[2]    //用户名
const password = process.argv[3]    //密码

const zipTemp = path.resolve(__dirname, './public.zip');

if (!password || !username) {
    console.log('请输入服务器用户名和密码'); 
} else {
    console.log(username, password);
    console.log('开始压缩资源...');
    startZip();
}

//  压缩
function startZip() {
    var archive = archiver('zip', {
        zlib: { level: 5 }  //  最多扫描5层
    }).on('error', function(err) {
        throw err;
    });

    var output = fs.createWriteStream(zipTemp)
        .on('close', function(err) {
            /**
             * 压缩结束才开始上传
             */
            if (err) {
                console.log('关闭archiver异常', err);
                return;
            }

            console.log('已压缩;');
            console.log('开始上传至服务器...');
            upload();
        });

    archive.pipe(output);
    archive.directory(srcPath, '/public');
    archive.finalize();
}

//上传
function upload() {
    ssh.connect({
        host: remote,
        username,
        password,
        port: 22,
        tryKeyboard: true
    }).then(function() {
        ssh.putFile(zipTemp, remotePath + '/public.zip').then(function(status) {
            console.log('上传成功;');
            console.log('开始执行远程脚本...');
            startRemoteShell();
        }).catch(err => {
            console.log('文件传输错误：', err);
            process.exit(0);
        }).finally(() => {
            fs.unlink(zipTemp, err => {
                console.log('temp cleared.');
            });
        });
    }).catch(err => {
        console.log('ssh连接失败，：', err);
        process.exit(0);
    })
}

//  执行远程脚本
function startRemoteShell() {
    ssh.execCommand('sh deploy.sh', {cwd: remotePath}).then(function(result) {
        console.log('远程STDOUT输出：', result.stdout);
        console.log('远程STDERR输出：', result.stderr);
        if (!result.stderr) {
            console.log('发布成功！');
            process.exit(0);
        }
    })
}