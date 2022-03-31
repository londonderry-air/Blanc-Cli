const modeList = [ 'add', '' ] as const
export type BlancCliMode = typeof modeList[number]

export default (argv: any): BlancCliMode => {
    const mode = argv._.length !== 1 ? '' : argv._[0]
    return modeList.indexOf(mode) === -1 ? '' : mode
}