const axios = require('axios')
const compareVersions = require('compare-versions')

module.exports = async (v) => {
  console.log('正在查询...');
  // 拿到所有的 Node 版本
  const { data } = await axios
    .get('https://nodejs.org/dist/index.json')
  
  // 把目标版本的 LTS 都挑选出来
  return data.filter(node => {
    const cp = v
      ? (compareVersions(node.version, 'v' + v + '.0.0') >= 0)
      : true
    return node.lts && cp
  }).map(it => {
    // 除去 files, openssl, uv 这些字段，其他的全部返回
    const { files, openssl, uv, ...rest } = it
    return { ...rest }
  })
}