/* 
由于本项目使用的是 npm 所以并不会生效
因为这是 pnpm 的功能， 这里仅仅是为了练习 npm install element-plus --save
*/
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}