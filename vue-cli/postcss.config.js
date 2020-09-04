module.exports = ({ file }) => {
  let isVant = file && file.dirname && file.dirname.indexOf('vant') > -1;
  let rootValue = isVant ? 37.5 : 75; // 判断条件 请自行调整
  return {
    plugins: {
      'postcss-pxtorem': {
        rootValue: rootValue,
        propList: ['*'],
      },
    },
  };
};
