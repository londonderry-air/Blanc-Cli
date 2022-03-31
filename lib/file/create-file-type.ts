import fs from 'fs';
import message from '../interactive/message';
import { ComponentInfo } from '../types';
import createDirIfNotExist from './create-dir';
import getDirs from './get-dirs';
import getInitialTypeFileContent from "./get-initial-type";

export default (info: ComponentInfo) => {
    const dir = getDirs()
    const filePath = dir.type + '/$element.ts'
    const newTypeName = `${info.group ?? 'common'}-${info.name}`
    
    // check if file and directory is exist
    createDirIfNotExist(dir.type)
    createTypeFileIfNotExist(filePath)

    // get types file
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const fileContentLine = fileContent.split('\n')
    const newTypeIndex = fileContentLine.indexOf('] as const')
    const beforeLines = fileContentLine.slice(0, newTypeIndex)
    const afterLines = fileContentLine.slice(newTypeIndex, fileContent.length - 1)

    // check if type is already exist
    const componentTypeList = beforeLines.map((line: string) => 
        line.replace(/\s+/g, '')
            .replace(/,/g , '')
            .replace(/"/g, '')
    ).slice(1)
    const isComponentExist = componentTypeList.some(type => type === newTypeName)

    if (isComponentExist) {
        message(['ERROR: Entered component is already exist!'], 'error')
    } else {
        // add new component's type
        const fd = fs.openSync(filePath, 'w')
        beforeLines.forEach((line: string) => fs.writeSync(fd, line + '\n'))
        fs.writeSync(fd, `    "${newTypeName}"` + ',\n')
        afterLines.forEach((line: string) => fs.writeSync(fd, line + '\n'))
        fs.closeSync(fd);
    }
}

const createTypeFileIfNotExist = (filePath: string) => {
    if (!fs.existsSync(filePath)) {
      const fd = fs.openSync(filePath, 'w')
      const initialFileContent = getInitialTypeFileContent()
      initialFileContent.forEach(line => fs.writeSync(fd, line))
      fs.closeSync(fd)
    }
}