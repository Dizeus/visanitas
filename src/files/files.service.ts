import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  createFile(file, filePath: string) {
    try {
      const fileName =
        uuid.v4() + '.' + file.originalname.split('.').reverse()[0];
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error of saving file',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
