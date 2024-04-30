import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService]
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create file successfully and create directory if it doesn't exist", () => {
    const file = {
      originalname: 'Rick.jpg',
      buffer: Buffer.from('file content')
    };
    const filePath = 'testFilePath';
    const spyWriteFileSync = jest.spyOn(fs, 'writeFileSync');
    const spyExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const spyMkdirSync = jest.spyOn(fs, 'mkdirSync');
    const result = service.createFile(file, filePath);

    expect(result).toStrictEqual(expect.any(String));
    expect(spyWriteFileSync).toHaveBeenCalledWith(
      expect.any(String),
      file.buffer
    );
    expect(spyExistsSync).toHaveBeenCalledWith(filePath);
    expect(spyMkdirSync).toHaveBeenCalledWith(filePath, { recursive: true });
  });

  it('should throw an HttpException when creating file fails', () => {
    const file = {
      originalname: 'Rick.jpg',
      buffer: Buffer.from('file content')
    };
    const filePath = 'testFilePath';
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('File writing error');
    });

    expect(() => {
      service.createFile(file, filePath);
    }).toThrowError(HttpException);

    expect(() => {
      service.createFile(file, filePath);
    }).toThrowError(
      new HttpException(
        'Error of saving file',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    );
  });
});
