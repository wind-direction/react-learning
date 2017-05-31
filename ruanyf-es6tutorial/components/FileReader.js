/**
 * Created by wind on 17/5/26.
 */
import shell from 'shelljs';

class FileReader {
  constructor(path) {
    this.__path__ = path;
    this.point = 1;
    this.eof = this.getEof();
    this.readLine = this.readLine.bind(this);
    this.close = this.close.bind(this);
  }

  getEof() {
    // 文件行数
    let child = shell.exec(`wc -l ${this.__path__}`, {silent:true});
    let res = child.stdout.split(' ').unshift();
    return res;
  }

  readLine() {
    let child = shell.exec(`sed -n '${this.point},${this.point}p' ${this.__path__}`,{silent:true});
    this.setPoint();
    return child.stdout;
  }

  setPoint() {
    let nextLineNum = this.point + 1;
    if(nextLineNum > this.eof) {
      this.eof = false;
    }else{
      this.point = nextLineNum;
    }
  }

  close() {
    this.eof = false;
    this.point = 0;
    this.__path__ = false;
    console.log('读取结束!');
  }
}

export default FileReader;