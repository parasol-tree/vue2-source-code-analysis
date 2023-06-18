const initTemplateFn = function (vm) {
  console.log(vm.prototype)
  // vm.prototype._$mountFn = function () {
  //   console.log('wocao');
  // }
  // const options = vm._$options
  // console.log(options);
  // if (options) {}
}

export {
  initTemplateFn as __initTemplateFn
}
