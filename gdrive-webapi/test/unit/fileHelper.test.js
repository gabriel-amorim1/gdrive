import {
    describe,
    test,
    expect,
    jest,
} from '@jest/globals';
import fs from 'fs'; 
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper', () => {
    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 66306,
                mode: 33204,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 9307183,
                size: 261243,
                blocks: 512,
                atimeMs: 1639499450922.3867,
                mtimeMs: 1639499450742.385,
                ctimeMs: 1639499450746.385,
                birthtimeMs: 1639499450738.385,
                atime: '2021-12-14T16:30:50.922Z',
                mtime: '2021-12-14T16:30:50.742Z',
                ctime: '2021-12-14T16:30:50.746Z',
                birthtime: '2021-12-14T16:30:50.738Z'
            };

            const mockUser = 'gabriel';
            process.env.USER = mockUser;
            
            const filename = 'file.png';

            jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename]);

            jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock);

            const result = await FileHelper.getFilesStatus('/tmp');

            const expectedResult = [
                {
                    size: '261 kB',
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ];

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
            expect(result).toMatchObject(expectedResult);
        });
    });
});