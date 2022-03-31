import ask from '../interactive/ask'
import createTypeFile from '../file/create-file-type'
import createComponentFile from '../file/create-file-component'
import getComponentDir from '../file/get-dirs'
import message from '../interactive/message'

export default async (argv: any)  => {
  const dir = getComponentDir()
    const componentInfo = await getComponentInfoFromArgs(argv)
  
    message([
      '',
      `New Component: ${componentInfo.group}-${componentInfo.name}`,
      'These files will be created and changed',
      `[Change]: ${dir.type}/$element.ts`,
      `[Create]: ${dir.component}/${componentInfo.group}/blanc-element-${componentInfo.name}.ts`,
      ''
    ], 'success')

    while (true) {
      const confirm = await ask('Create (y/n)?')
      if (confirm === 'y' || confirm === 'yes') {
        createComponentFile(componentInfo)
        createTypeFile(componentInfo)
        message([
          `New component [${componentInfo.group}-${componentInfo.name}] is created successfully!`
        ], 'success')
        break
      } else if (confirm === 'n' || confirm === 'no') {
        message([
          `Canceled to create component`
        ], 'caution')
        break
      }
    }
}

const getComponentInfoFromArgs = async (argv: any) => {
    let cmpName: string = argv.name ? argv.name.toLowerCase() : null
    let cmpGroup: string = argv.group  ? argv.group.toLowerCase() : null
    const excludeGroupList = ['base']
    const isGroupValid = (enteredGroup: string) =>  (
      excludeGroupList.indexOf(enteredGroup.toLowerCase()) === -1 && enteredGroup !== null
    )
    const isGroupLetterAndNumber = (cmpGroup: string) => cmpGroup.match(/^[A-Za-z0-9]*$/)
    const isNameEmpty = (cmpName: string) => cmpName === null

    while (isNameEmpty(cmpName)) {
      const enterComponentName = await ask("Enter name of component")
      const isValidName = enterComponentName.match(/^[A-Za-z0-9]*$/)
      if (isValidName) {
        cmpName = enterComponentName.toLowerCase()
      } else {
        message([
          '[ERROR]: Enter name only letters and numbers!'
        ], 'error')
      }
    }
  
    while(!isGroupValid(cmpGroup) || !isGroupLetterAndNumber(cmpGroup)) {

      if (!isGroupLetterAndNumber(cmpGroup)) {
        message([
          '[ERROR]: Enter group only letters and numbers!'
        ], 'error')
      }

      if (!isGroupValid(cmpGroup)) {
        const messages = [
          '[ERROR]: Following names is not able to use as group-name!'
        ]
        excludeGroupList.forEach(group => messages.push(`* ${group}`))
        message(messages, 'error')
      }

      cmpGroup = await ask(`Enter group of component (default: common)`)

      if (cmpGroup === '') cmpGroup = 'common'
    }
  
    return { name: cmpName.toLowerCase(), group: cmpGroup.toLowerCase() }
  }
  