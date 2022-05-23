let readitDelete = document.createElement('div')
readitDelete.innerText = 'Delete'

readitDelete.style.position = 'fixed'
readitDelete.style.bottom = '15px'
readitDelete.style.right = '15px'
readitDelete.style.padding = '5px 10px'
readitDelete.style.fontSize = '20px'
readitDelete.style.fontWeight = 'bold'
readitDelete.style.background = 'dodgerblue'
readitDelete.style.color = 'white'
readitDelete.style.borderRadius = '5px'
readitDelete.style.cursor = 'default'
readitDelete.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)'
readitDelete.style.zIndex = '9999'

readitDelete.onclick = e => {
    window.opener.postMessage({
        action:'delete-reader-item',
        itemIndex:{{index}}
    },'*')
}

document.getElementsByTagName('body')[0].append(readitDelete)

let readitClose = document.createElement('div')
readitClose.innerText = 'Close'

readitClose.style.position = 'fixed'
readitClose.style.bottom = '15px'
readitClose.style.right = '95px'
readitClose.style.padding = '5px 10px'
readitClose.style.fontSize = '20px'
readitClose.style.fontWeight = 'bold'
readitClose.style.background = 'dodgerblue'
readitClose.style.color = 'white'
readitClose.style.borderRadius = '5px'
readitClose.style.cursor = 'default'
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)'
readitClose.style.zIndex = '9999'

readitClose.onclick = e => {
    window.opener.postMessage({
        action:'close-reader-item',
        itemIndex:{{index}}
    },'*')
}

document.getElementsByTagName('body')[0].append(readitClose)
