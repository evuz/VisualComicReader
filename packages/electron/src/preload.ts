const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

async function main () {
  await windowLoaded
  console.log('Init preload')
}

main()
